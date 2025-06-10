# syntax=docker/dockerfile:1
FROM node:20-alpine AS builder

# Install bun
RUN npm install -g bun

WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build args (these will be passed from docker-compose)
ARG VITE_PUBLIC_APPWRITE_ENDPOINT
ARG VITE_PUBLIC_APPWRITE_PROJECT_ID
ARG APPWRITE_API_SECRET

# Set environment variables for build
ENV VITE_PUBLIC_APPWRITE_ENDPOINT=$VITE_PUBLIC_APPWRITE_ENDPOINT
ENV VITE_PUBLIC_APPWRITE_PROJECT_ID=$VITE_PUBLIC_APPWRITE_PROJECT_ID
ENV APPWRITE_API_SECRET=$APPWRITE_API_SECRET

# Build the application
RUN bun run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy built application from builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json

# Install only production dependencies (if any runtime deps needed)
# RUN npm ci --only=production

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership of the app directory
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Set environment variable for port
ENV PORT=3000

# Start the application
CMD ["node", "build/index.js"]
