# Use node base image
FROM node:20
# RUN useradd -ms /bin/sh -u 1001 frontend
# USER frontend

# Set working directory
WORKDIR /usr/src/frontend

# Copy package files
COPY package.json /usr/src/frontend

# Install dependencies
RUN npm i

COPY . .

EXPOSE 3000

# Copy source files into application directory
# COPY --from=frontend:frontend . /frontend

CMD ["npm", "run", "dev"]

