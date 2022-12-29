FROM node:19 AS build

WORKDIR /build

COPY package.json /build/package.json
COPY yarn.lock /build/yarn.lock

FROM build AS app-build

COPY ./packages/app/package.json /build/packages/app/package.json
COPY ./packages/nest/package.json /build/packages/nest/package.json

RUN yarn install

COPY ./packages/app /build/packages/app
COPY ./packages/nest /build/packages/nest

ENV SKIPCODEGEN=true
ARG GOOGLE_CLIENT_ID
ENV VITE_GOOGLE_CLIENTID=$GOOGLE_CLIENT_ID

RUN yarn workspace @caats/app build
RUN yarn workspace @caats/nest prisma generate
RUN yarn workspace @caats/nest build

RUN yarn install --production

FROM node:19-slim AS application

WORKDIR /caats

COPY --from=app-build /build /caats

EXPOSE 3000

WORKDIR /caats/packages/nest

CMD ["node", "dist/main.js"]

FROM build AS scraper-build

COPY ./packages/scrapy/package.json /build/packages/scrapy/package.json

RUN yarn install

COPY ./packages/scrapy /build/packages/scrapy

RUN yarn workspace @caats/scrapy tsc

RUN yarn install --production

FROM node:19-slim AS scraper

WORKDIR /caats

COPY --from=scraper-build /build /caats

WORKDIR /caats/packages/scrapy

CMD ["node", "dist/index.js"]
