# Dockerfile, Image, Container
FROM node:alpine as build

WORKDIR /jump-frontend

COPY package.json .

RUN npm install

COPY . .

ENV REACT_APP_API_SEARCH=https://jumpbe.cert.cfapps.eu10.hana.ondemand.com/api/search
ENV REACT_APP_API_SEARCH_CREATE=https://jumpbe.cert.cfapps.eu10.hana.ondemand.com/api/search/create
ENV REACT_APP_API_SEARCH_DELETE=https://jumpbe.cert.cfapps.eu10.hana.ondemand.com/api/search/delete
ENV REACT_APP_API_ITEMS_DELETE=https://jumpbe.cert.cfapps.eu10.hana.ondemand.com/api/items/delete
ENV REACT_APP_API_SCRAP=https://jumpse.cert.cfapps.eu10.hana.ondemand.com/task

RUN npm run build


FROM nginx

COPY --from=build /jump-frontend/build /usr/share/nginx/html