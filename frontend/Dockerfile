FROM node:alpine as build
WORKDIR /app
COPY . .
RUN npm i && npm run build

FROM nginx:latest as production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
