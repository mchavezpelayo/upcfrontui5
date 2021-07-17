FROM node:12.17.0-alpine as first
WORKDIR /usr/local/app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./ /usr/local/app
RUN npm install
RUN npm run build


FROM nginx:1.21.0-alpine
COPY --from=first /usr/local/app/dist /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]