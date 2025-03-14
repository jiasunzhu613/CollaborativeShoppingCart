# Use node base image
FROM node:20

# Set working directory
WORKDIR /frontend

# Copy package files
COPY package*.json /frontend

# Install dependencies
RUN npm i

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

