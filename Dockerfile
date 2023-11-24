FROM node:21 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build

COPY . /build
WORKDIR /build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# -- Build section --

FROM build AS nest-build

WORKDIR /build/packages/nest

RUN pnpm prisma generate
RUN pnpm build

WORKDIR /build

RUN pnpm deploy --filter @caats/nest --prod /prod/nest

FROM build AS app-build

WORKDIR /build/packages/app

ARG GOOGLE_CLIENT_ID
ENV VITE_GOOGLE_CLIENTID=$GOOGLE_CLIENT_ID

RUN pnpm build

# -- Deploy section --

# -> Nest
FROM base AS nest

COPY --from=nest-build /prod/nest /caats/nest
COPY --from=nest-build /build/packages/nest/dist /caats/nest/dist

WORKDIR /caats/nest

ENV NODE_ENV=production
EXPOSE 3000

CMD ["pnpm", "start"]

# -> App on Caddy
FROM caddy:2 AS app

COPY --from=app-build /build/packages/app/dist /caats/app/dist

COPY ./caddy/Caddyfile /etc/caddy/Caddyfile

FROM build AS scrapy-build

WORKDIR /build/packages/scrapy

RUN pnpm build
RUN pnpm deploy --filter @caats/scrapy --prod /prod/scrapy

# -> Scrapy
FROM base AS scraper

COPY --from=scrapy-build /prod/scrapy /caats/scrapy
COPY --from=scrapy-build /build/packages/scrapy/dist /caats/scrapy/dist

WORKDIR /caats/scrapy

ENV NODE_ENV=production
ENV NEST_GRAPHQL="http://nest:3000/graphql"
ENV SCRAPY_RATE=90


CMD ["pnpm", "scrapy", "steal", "--api", "${NEST_GRAPHQL}", "--rate", "${SCRAPY_RATE}"]



# FROM node:21 AS build

# WORKDIR /build

# COPY package.json /build/package.json
# COPY yarn.lock /build/yarn.lock

# # -- Application section --
# FROM build AS app-build

# COPY ./packages/app/package.json /build/packages/app/package.json
# COPY ./packages/nest/package.json /build/packages/nest/package.json

# RUN yarn install

# COPY ./packages/app /build/packages/app
# COPY ./packages/nest /build/packages/nest

# ENV SKIPCODEGEN=true
# ARG GOOGLE_CLIENT_ID
# ENV VITE_GOOGLE_CLIENTID=$GOOGLE_CLIENT_ID

# RUN yarn workspace @caats/app vite build
# RUN yarn workspace @caats/nest prisma generate
# RUN yarn workspace @caats/nest build

# RUN yarn install --production

# FROM node:21 AS application

# WORKDIR /caats

# COPY --from=app-build /build /caats

# ENV NODE_ENV=production

# EXPOSE 3000

# WORKDIR /caats/packages/nest

# CMD ["yarn", "start"]

# # -- Scraper section --
# FROM build AS scraper-build

# COPY ./packages/scrapy/package.json /build/packages/scrapy/package.json

# RUN yarn install

# COPY ./packages/scrapy /build/packages/scrapy

# RUN yarn workspace @caats/scrapy build

# RUN yarn install --production

# FROM node:20 AS scraper

# WORKDIR /caats

# COPY --from=scraper-build /build /caats

# WORKDIR /caats/packages/scrapy

# ENV NODE_ENV=production

# CMD ["yarn", "scrapy"]
