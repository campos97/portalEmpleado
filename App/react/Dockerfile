# Usa la imagen oficial de Node.js como base
FROM node:18-alpine AS build

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el package.json y el package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia todo el código fuente al contenedor
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Usa una imagen de Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos construidos desde el paso de construcción al directorio de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copia el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80 para acceder a la aplicación
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
