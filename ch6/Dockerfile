FROM node
COPY package.json .
RUN npm install
COPY app.js .
EXPOSE 8000
CMD [ "npm", "start" ]
