FROM node:lts-alpine

# Working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --silent

# Copy source
COPY . .

# Port
EXPOSE 8080

# Start server
CMD ["node", "app.js"]
