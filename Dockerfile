# Installing dependencies:
FROM node:19-alpine AS install-dependencies
WORKDIR /user/src/app
COPY package*.json ./
RUN npm ci
COPY . .


# Creating a build:
FROM node:19-alpine AS test
WORKDIR /user/src/app
COPY --from=install-dependencies /user/src/app ./
RUN npm run test
USER node

# Creating a build:
FROM node:19-alpine AS create-build
WORKDIR /user/src/app
COPY --from=install-dependencies /user/src/app ./
RUN npm run build
USER node

# Running the application:
FROM node:19-alpine AS run
WORKDIR /user/src/app
COPY --from=install-dependencies /user/src/app/node_modules ./node_modules
COPY --from=create-build /user/src/app/dist ./dist
COPY package.json ./
CMD ["npm", "run", "start:prod"]
