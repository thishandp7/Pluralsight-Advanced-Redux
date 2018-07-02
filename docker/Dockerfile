FROM node:alpine

RUN mkdir -p /app
WORKDIR /app

ARG APP_LOCATION

COPY ${APP_LOCATION}/package.json /app
RUN npm install --production && npm install -g babel-cli

COPY ${APP_LOCATION} /app

ENV NODE_ENV production

CMD ["npm", "start" ]
