# Usa una versión específica de Node.js como base
FROM node:18.15.0-alpine

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el package.json y el package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia todo el código fuente al contenedor
COPY . .

# Expone el puerto que usa la aplicación (cambia si usas otro puerto en tu app)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
