FROM node:19

WORKDIR /app
COPY . .

ARG GH_TOKEN
ENV GH_TOKEN $GH_TOKEN

RUN yarn set version 3.5.1
RUN yarn --immutable

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "dev"]
