# Use an official Node.js runtime as the base image
FROM node:18-alpine3.18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY tsconfig.json file
COPY tsconfig.json ./

COPY src ./src/

# Install dependencies using npm
RUN npm ci
# RUN npx prisma migrate deploy
# RUN npx prisma generate

EXPOSE ${PORT}

# Specify the command to run your application
# CMD npm start
ENTRYPOINT  ["sh", "init.sh"]
