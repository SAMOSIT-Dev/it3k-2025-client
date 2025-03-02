# Use an official Node.js runtime as a parent image
FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Ensure corepack is enabled for correct npm version handling
RUN npm install -g corepack@latest

# Copy package.json and package-lock.json first to take advantage of Docker caching
COPY ./package.json ./package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY ./ ./

COPY .env .env

# Build the Next.js application
RUN npm run build

# Use a minimal Node.js image for production
FROM node:20-alpine AS runner
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app .



# Install only production dependencies
RUN npm ci --only=production

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]
