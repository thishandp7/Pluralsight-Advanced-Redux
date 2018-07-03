FROM node:alpine

RUN mkdir -p /app
WORKDIR /app

ARG APP_LOCATION
ARG PORT

COPY ${APP_LOCATION}/package.json /app
RUN npm install --production && npm install -g babel-cli

COPY ${APP_LOCATION} /app

EXPOSE ${PORT}

CMD ["npm", "start" ]
