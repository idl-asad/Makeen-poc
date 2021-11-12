FROM node:16-alpine as base
WORKDIR /app

FROM base as development
COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build
RUN rm -rf src

RUN rm -rf ./node_modules
RUN npm install --production

FROM base as release

COPY --from=development /app/ ./

EXPOSE 8080

CMD [ "node", "./dist/index.js" ]