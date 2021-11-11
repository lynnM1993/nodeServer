FROM node AS build_stage
WORKDIR /app
COPY . /app/ 
RUN npm install 
RUN cd /app
CMD npm run start