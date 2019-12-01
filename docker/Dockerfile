FROM keyto/node:10 as builder

LABEL maintainer="keyto <keyto1995@outlook.com>"

RUN set -ex \
&& apk add --no-cache git \
&& git clone https://github.com/Keyto1995/blog-vue.git \
&& cd /blog-vue/ \
&& npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/ \
&& npm install \
&& npm run build

FROM nginx:alpine

COPY --from=builder /blog-vue/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/

EXPOSE 80
