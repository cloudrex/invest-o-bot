FROM node:10
ADD . /app
WORKDIR /app
CMD ["npm", "install"]
ENTRYPOINT ["npm", "start"]