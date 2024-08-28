FROM node:alpine
# FROM node:18.17.1 AS builder
RUN mkdir -p /home/node/app/node_modules
WORKDIR /home/node/app
COPY . . 
RUN rm -rf node_modules ; rm -rf dist
RUN npm i
RUN npm run build

# RUN chown -R node:node /home/node/app
EXPOSE 8080
# USER node
CMD npm run start

# CMD ["pm2-runtime", "dist/index.js"]