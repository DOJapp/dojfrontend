# Use the official Node.js image with Alpine (lightweight version)
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package.json package-lock.json ./

# Install all dependencies (including dev dependencies for React)
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Expose the port that the React app will run on (default React port is 3000)
EXPOSE 3000

# Start the React app in development mode (with live-reloading)
CMD ["npm", "start"]
