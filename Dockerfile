FROM mhart/alpine-node:14 

LABEL maintainer="maintainer@domain.com"

# Create app directory
WORKDIR /var/www/backend

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy important files
COPY .eslintrc.js nest-cli.json tsconfig.json tsconfig.build.json ormconfig.json ./

# Copy env
#COPY .env.docker /var/www/backend/.env

# Add storage folder to the container (If you want to add other folder contents to the container)
# ADD storage /var/www/backend/storage

# Entrypoint command
# You can update this to run other NodeJS apps
CMD [ "npm", "run", "start:dev", "--preserveWatchOutput" ]