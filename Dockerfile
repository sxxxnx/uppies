FROM node:20-alpine

# Install bun
RUN npm install -g bun

WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./

# Install ALL dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build args
ARG VITE_PUBLIC_APPWRITE_ENDPOINT
ARG VITE_PUBLIC_APPWRITE_PROJECT_ID
ARG APPWRITE_API_SECRET

# Set environment variables for build
ENV VITE_PUBLIC_APPWRITE_ENDPOINT=$VITE_PUBLIC_APPWRITE_ENDPOINT
ENV VITE_PUBLIC_APPWRITE_PROJECT_ID=$VITE_PUBLIC_APPWRITE_PROJECT_ID
ENV APPWRITE_API_SECRET=$APPWRITE_API_SECRET

# Build the application
RUN bun run build

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 && \
    chown -R nextjs:nodejs /app

USER nextjs

# Expose port
EXPOSE 3000
ENV PORT=3000

# Start the application
CMD ["node", "build/index.js"]
