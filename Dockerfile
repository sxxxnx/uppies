FROM node:20-alpine

# Install bun
RUN npm install -g bun

WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build args for build-time environment variables
ARG VITE_PUBLIC_APPWRITE_ENDPOINT
ARG VITE_PUBLIC_APPWRITE_PROJECT_ID
ARG APPWRITE_API_SECRET

# Set environment variables for build
ENV VITE_PUBLIC_APPWRITE_ENDPOINT=$VITE_PUBLIC_APPWRITE_ENDPOINT
ENV VITE_PUBLIC_APPWRITE_PROJECT_ID=$VITE_PUBLIC_APPWRITE_PROJECT_ID
ENV APPWRITE_API_SECRET=$APPWRITE_API_SECRET

# Build the application
RUN bun run build

# Expose port
EXPOSE 3000

# Set environment variable for port
ENV PORT=3000

# Start the application
CMD ["node", "build/index.js"]
