FROM node:22

WORKDIR /home/build/WORKDIR
COPY . .

RUN npm i -g bun@latest
RUN npm i -g nodemon@latest

RUN npm i

EXPOSE 3000
CMD ["nodemon"]