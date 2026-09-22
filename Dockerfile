FROM node:22-alpine

WORKDIR /usr/src/app

ENV KAFKA_CLUSTER_ID=
ENV KAFKA_BROKER=
ENV KAFKA_TOPIC=
ENV KAFKA_CONSUMER_ID=
ENV MONGO_URI=

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]