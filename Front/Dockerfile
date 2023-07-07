# syntax=docker/dockerfile:1
FROM node:18.16-alpine
WORKDIR /frontend
COPY ./ ./
RUN yarn install
RUN yarn build
CMD ["yarn", "start"]