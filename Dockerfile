FROM node:22.18.0-alpine3.22
RUN mkdir /app
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]