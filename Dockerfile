# Use Node.js official image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if any) for dependency installation
COPY package*.json ./

# Install dependencies (if you have any in package.json)
RUN npm install

# Copy the rest of your app's source code into the container
COPY . .

# Expose the port the app will run on
EXPOSE 8080

# Command to run the app
CMD ["node", "server.js"]

