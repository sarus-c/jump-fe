# Dockerfile, Image, Container
FROM node:alpine as build

WORKDIR /jump-frontend

COPY package.json .

RUN npm install

COPY . .

ARG REACT_APP_API_SEARCH=https://jumpbe.cert.cfapps.eu10.hana.ondemand.com/api/search
ARG REACT_APP_API_SEARCH_CREATE=https://jumpbe.cert.cfapps.eu10.hana.ondemand.com/api/search/create
ARG REACT_APP_API_SEARCH_DELETE=https://jumpbe.cert.cfapps.eu10.hana.ondemand.com/api/search/delete
ARG REACT_APP_API_ITEMS_DELETE=https://jumpbe.cert.cfapps.eu10.hana.ondemand.com/api/items/delete
ARG REACT_APP_API_SCRAP=https://jumpse.cert.cfapps.eu10.hana.ondemand.com/task

ENV REACT_APP_API_SEARCH=${REACT_APP_API_SEARCH}
ENV REACT_APP_API_SEARCH_CREATE=${REACT_APP_API_SEARCH_CREATE}
ENV REACT_APP_API_SEARCH_DELETE=${REACT_APP_API_SEARCH_DELETE}
ENV REACT_APP_API_ITEMS_DELETE=${REACT_APP_API_ITEMS_DELETE}
ENV REACT_APP_API_SCRAP=${REACT_APP_API_SCRAP}

RUN npm run build


FROM nginx

COPY --from=build /jump-frontend/build /usr/share/nginx/html