# docker build --no-cache -t front . && docker run -p 4200:80 front
FROM node:latest as build

WORKDIR /app
COPY . /app/
RUN npm install
RUN npm run build

FROM nginx:latest

COPY --from=build /app/dist/front/browser /usr/share/nginx/html
EXPOSE 80