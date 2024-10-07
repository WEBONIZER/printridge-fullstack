FROM node

WORKDIR /home/build/frontend
COPY . .

RUN npm i

EXPOSE 3000
CMD ["npm","run","prod"]