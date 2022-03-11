ARG NODE_VERSION=16.13.0

FROM node:${NODE_VERSION}-alpine as app
# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY yarn.lock ./

COPY src src/
COPY plugins plugins/
COPY .env.example ecosystem.config.js tsconfig.json index.ts ./

RUN yarn

VOLUME [ "/app" ]

ENV CRON_INTERVAL="*/1 * * * *"
ENV NODEOS_ENDPOINT="https://wax.eosn.com"
ENV PRIVATE_KEYS="<PRIVATE KEY>"
ENV ACCOUNT="<ACCOUNT>"
ENV PERMISSION="<PERMISSION>"

# Run the app
CMD ["sh", "-c", "yarn start"]
