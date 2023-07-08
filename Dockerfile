FROM node:16-bullseye as node

RUN apt-get update && apt-get install -y \
    && apt-get install -y netcat \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

EXPOSE 3000
ENV HOST=0.0.0.0