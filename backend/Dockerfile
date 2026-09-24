# Backend Dockerfile for Lancelot Solana App
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package manifests
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application source code
COPY . .

# Expose server port
EXPOSE 5000

# Set environment to production
ENV NODE_ENV=production
ENV PORT=5000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

# Start server
CMD ["node", "src/server.js"]
