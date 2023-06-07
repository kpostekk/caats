FROM node:20 AS build

WORKDIR /build

COPY package.json /build/package.json
COPY yarn.lock /build/yarn.lock

# -- Application section --
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

FROM node:20-slim AS application

WORKDIR /caats

COPY --from=app-build /build /caats

ENV NODE_ENV=production

EXPOSE 3000

WORKDIR /caats/packages/nest

CMD ["yarn", "start"]

# -- Scraper section --
FROM build AS scraper-build

COPY ./packages/scrapy/package.json /build/packages/scrapy/package.json

RUN yarn install

COPY ./packages/scrapy /build/packages/scrapy

RUN yarn workspace @caats/scrapy build

RUN yarn install --production

FROM node:19-slim AS scraper

WORKDIR /caats

COPY --from=scraper-build /build /caats

WORKDIR /caats/packages/scrapy

ENV NODE_ENV=production

CMD ["yarn", "scrapy"]
