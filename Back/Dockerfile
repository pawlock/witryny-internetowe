# syntax=docker/dockerfile:1
FROM node:18.16-alpine
ARG dburl
WORKDIR /backend
COPY ./ ./
RUN npm install 
RUN DATABASE_URL="$dburl" npx prisma db push
RUN npx prisma generate
CMD ["node", "index.js"]