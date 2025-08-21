FROM node:22.18.0-alpine3.22
RUN ls -al
RUN pwd
RUN mkdir /app
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./
RUN npm run build
EXPOSE 3000
ENTRYPOINT [ "start.sh" ]