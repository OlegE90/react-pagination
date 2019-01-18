FROM node:9.1

# install git
RUN apt-get update && apt-get install -y git

WORKDIR /usr/src/app

RUN git clone --depth 1 --branch=master https://github.com/OlegE90/react-pagination.git .

RUN npm install

EXPOSE 8090

CMD [ "npm", "run", "start-inside-docker" ]
