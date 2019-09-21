FROM node:12-alpine
MAINTAINER "contact@koumoul.com"

ENV NODE_ENV production

WORKDIR /webapp
ADD package.json .
ADD package-lock.json .
RUN npm install --production

ADD config config
ADD server server
ADD README.md .

EXPOSE 8080

CMD ["node", "server"]
