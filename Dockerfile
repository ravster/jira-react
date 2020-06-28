FROM node:alpine3.12
WORKDIR /app
COPY . /app
#CMD ["yarn", "start"]
CMD ["sh", "entrypoint.sh"]