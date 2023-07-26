FROM node:16 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# COPY package*.json ./
# COPY prisma ./prisma/

COPY ./prisma /prisma
COPY ./package*.json /app

# Install app dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Generate Prisma schema and run migrations
RUN npx prisma generate
# RUN npx prisma migrate deploy --preview-feature

FROM node:16

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]