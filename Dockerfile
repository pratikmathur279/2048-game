# FROM node@sha256:fa3b47406397ede8387fdfa6cce308b05c8195fc0117404775ae27d2940f0fd5 AS ui-build
FROM node:16 AS app-build
WORKDIR /usr/src/app

RUN npm install nodemon -g

# server config
COPY server/ ./server/
RUN cd server && npm install
COPY ./server/index.js ./server/

# client config
COPY client/ ./client/
# RUN cd client && npm install

EXPOSE 3010

CMD ["nodemon", "./server/index.js"]