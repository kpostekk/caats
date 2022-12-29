FROM node:19 AS build

WORKDIR /build

COPY . /build

RUN yarn install

FROM build AS app-build

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

RUN yarn workspace @caats/scrapy tsc

RUN yarn install --production

FROM node:19-slim AS scraper

WORKDIR /caats

COPY --from=scraper-build /build /caats

WORKDIR /caats/packages/scrapy

CMD ["node", "dist/index.js"]
