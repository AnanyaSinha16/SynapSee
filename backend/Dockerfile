FROM node:18-slim

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production

COPY . .

# Create uploads dir
RUN mkdir -p uploads

ENV PORT=4000
EXPOSE 4000
CMD [ "node", "server.js" ]
