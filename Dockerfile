# Use official Node.js image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files and lockfile first for caching
COPY package.json pnpm-lock.yaml ./

# Enable Corepack and install dependencies with pnpm
RUN corepack enable && pnpm install --frozen-lockfile

# Copy rest of the app
COPY . .

# Build the app for production
RUN pnpm build

# Expose port used by Vite preview
EXPOSE 3000

# Run preview server on all interfaces so the container is reachable
CMD ["pnpm", "preview", "--host", "0.0.0.0", "--port", "3000"]