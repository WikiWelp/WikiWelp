FROM docker.io/library/node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 80
CMD ["serve", "-s", "dist/wikiwelp-frontend/browser", "-l", "80"]
