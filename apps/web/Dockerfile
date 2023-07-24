ARG WORKSPACE=@payload-custom-website
ARG PACKAGE=web
ARG BASE_IMAGE=node:18.15.0-bullseye-slim
#ARG DISTROLESS=gcr.io/distroless/nodejs:18
# docker run --entrypoint sh -it [IMAGE_NAME:TAG] to debug
ARG DISTROLESS=gcr.io/distroless/nodejs:debug
#ARG DISTROLESS=node:18.15.0-bullseye-slim

# Need a lightweight base image since pnpm isn't included by default
FROM $BASE_IMAGE AS base
RUN npm i -g pnpm && \
      export SHELL=$(which bash) && \
      SHELL=$SHELL pnpm setup

# Prune workspace
FROM base AS pruner
WORKDIR /app
ARG WORKSPACE
ARG PACKAGE
COPY . .
RUN pnpm dlx turbo prune --scope=$WORKSPACE/$PACKAGE --docker


FROM base AS installer
WORKDIR /app
ARG WORKSPACE
ARG PACKAGE
# Install dependencies since they change less often
COPY .gitignore .gitignore
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile --prefer-offline
# Build the project
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json
# Build then use pnpm's own prune to generate node_modules with only prod deps
RUN pnpm dlx turbo run build --filter=$WORKSPACE/$PACKAGE
RUN pnpm --filter=$PACKAGE --prod deploy pruned

FROM $DISTROLESS AS production
WORKDIR /app
ARG WORKSPACE
ARG PACKAGE
ENV NODE_ENV=production
ENV APP_ENV=production
ENV REMIX_BUILD_PATH=../build/index.js
COPY --from=installer /app/apps/$PACKAGE/build build
COPY --from=installer /app/apps/$PACKAGE/public public
COPY --from=installer /app/apps/$PACKAGE/dist dist
COPY --from=installer /app/pruned/package.json ./
COPY --from=installer /app/pruned/node_modules node_modules
ENV NODE_OPTIONS '--max-old-space-size=896 -r @cspotcode/source-map-support/register --max-semi-space-size=64'
CMD ["dist/index.js"]
