FROM node:9-slim
WORKDIR /app
COPY package.json ./app
RUN npm install
COPY . /app
CMD cd server && npm install && npm start 
EXPOSE 8082