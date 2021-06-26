FROM node:10-slim
WORKDIR /app
COPY package.json ./app
RUN npm install
COPY . /app
CMD cd server && npm install && npm run build && npm start 
EXPOSE 8082