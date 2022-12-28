FROM node:19 AS build

WORKDIR /build

COPY . /build

RUN yarn install

ENV SKIPCODEGEN=true
ARG GOOGLE_CLIENT_ID
ENV VITE_GOOGLE_CLIENTID=$GOOGLE_CLIENT_ID

RUN yarn workspace @caats/web build
RUN yarn workspace @caats/nest prisma generate
RUN yarn workspace @caats/nest build

RUN yarn install --production

FROM node:19-slim

WORKDIR /caats

COPY --from=build /build /caats

EXPOSE 3000

WORKDIR /caats/packages/nest

CMD ["node", "dist/main.js"]
