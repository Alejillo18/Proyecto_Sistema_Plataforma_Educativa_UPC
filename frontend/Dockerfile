FROM node:20-alpine
WORKDIR /app
RUN npm install -g @angular/cli
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4200
RUN sed -i 's|localhost:3000|backend:3000|g' proxy.conf.json
CMD npx ng serve --host 0.0.0.0 --allowed-hosts true --poll 2000
