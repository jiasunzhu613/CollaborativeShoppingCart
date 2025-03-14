# Set base python3 image
FROM --platform=$BUILDPLATFORM python:3.13.1-alpine AS builder

# Set working directory
WORKDIR /backend

# Copy requirements.txt to install dependencies
COPY requirements.txt /backend
# Install dependencies
RUN --mount=type=cache,target=/root/.cache/pip \
    pip3 install -r requirements.txt

# Copy all files into working directory in container
COPY . .

# Set flask environment variables
ENV FLASK_APP=__init__
ENV FLASK_DEBUG=True
ENV FLASK_RUN_HOST=0.0.0.0 
ENV FLASK_RUN_PORT=8080

# Expose port
EXPOSE 8080

# Start applications
CMD ["flask", "run"]