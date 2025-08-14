FROM node:lts-alpine as build-stage

# définit le dossier 'app' comme dossier de travail
WORKDIR /app

# copie 'package.json' et 'package-lock.json' (si disponible)
COPY package*.json ./

# installe les dépendances du projet
RUN npm install

# copie les fichiers et dossiers du projet
COPY . .

# construit l'app pour la production
RUN npm run build

# étape de production
FROM nginx:alpine

# Copie de la configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie des fichiers buildés
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
