# Use an official Node.js runtime as the base image
FROM node:18-alpine3.18

ENV DATABASE_URL=postgresql://postgres:postgres@database:5432/fiap?schema=public
ENV MERCADO_PAGO_ACCESS_TOKEN=TEST-2237631272880335-083014-8ac23da20b7770a81b7139a6ab344999-27824690
ENV MERCADO_PAGO_BASE_URL=https://api.mercadopago.com

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm ci
# ENV DATABASE_URL postgresql://postgres:postgres@database:5432/fiap?schema=public

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Generate prisma client
# RUN npx prisma generate

EXPOSE 8081

# Specify the command to run your application
ENTRYPOINT  ["npm start"]