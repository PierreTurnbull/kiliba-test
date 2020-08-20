FROM node:alpine AS build
WORKDIR /home/node
COPY package.json .
RUN npm i
COPY . .
RUN npm run build

FROM node:alpine
WORKDIR /home/node
COPY --from=build /home/node/package.json .
COPY --from=build /home/node/dist ./dist
COPY --from=build /home/node/devops/prod/secrets/.env .env
COPY --from=build /home/node/node_modules ./node_modules
CMD ["npm", "run", "start:prod"]