# Use the official lightweight Node.js 18 image.
# https://hub.docker.com/_/node
FROM node:19-alpine

# Create and change to the app directory.
WORKDIR /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package.json yarn.lock ./

# Install dependencies.
# If you add a package-lock.json speed your build by switching to 'npm ci'.
# RUN npm ci --only=production
# RUN npm install --production
# RUN yarn install --
RUN npm install -g typescript

RUN yarn install
# Copy local code to the container image.
COPY . .

RUN yarn build

# Run the web service on container startup.
CMD ["yarn", "dev"]