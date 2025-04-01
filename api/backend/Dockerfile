# Set base python3 image
FROM --platform=$BUILDPLATFORM python:3.13.1-alpine AS builder
# FROM public.ecr.aws/lambda/python:3.12
# RUN adduser -D -u 1001 -s /bin/sh backend
# USER backend

# Set working directory
WORKDIR /usr/src/backend

# Copy requirements.txt to install dependencies
COPY requirements.txt /usr/src/backend
# COPY requirements.txt ${LAMBDA_TASK_ROOT}
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

# Copy source files into application directory
# COPY --from=backend:backend . /backend

# Start applications
CMD ["python", "-m", "flask", "run"]
# CMD ["__init__.lambda_handler"]
