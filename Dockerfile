FROM --platform=linux/amd64 nikolaik/python-nodejs:python3.10-nodejs20
WORKDIR /app
COPY . .
RUN yarn --frozen-lockfile && yarn build
ENTRYPOINT ["yarn", "start:prod"]