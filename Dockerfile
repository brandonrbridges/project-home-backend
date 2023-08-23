FROM node:18-alpine

WORKDIR /usr/src/project-home-backend

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3001

CMD ["node", "dist/main.js"]