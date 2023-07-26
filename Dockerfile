FROM node:16 AS builder

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Generate Prisma schema and run migrations
RUN npx prisma generate

# Build the application
RUN npm run build

CMD [ "npm", "run", "start:prod" ]