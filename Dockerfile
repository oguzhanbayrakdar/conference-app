FROM node:18.19.0 AS angular-build
WORKDIR /app
RUN npm cache clean --force
COPY package.json ./
COPY package-lock.json ./
RUN npm install -g @angular/cli@17.1.1 --loglevel verbose
RUN npm install --loglevel verbose
COPY . ./
RUN ng build --configuration production

FROM nginx:stable AS angular-runtime
COPY --from=angular-build /app/dist/conference-app/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80