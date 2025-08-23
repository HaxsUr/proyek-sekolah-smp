# Gunakan versi Node.js yang stabil
FROM node:18-alpine

# Atur direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json terlebih dahulu
COPY package*.json ./

# Instal semua dependensi
RUN npm install

# Salin sisa kode aplikasi Anda
COPY . .

# Beritahu Docker port mana yang akan digunakan oleh aplikasi
EXPOSE 5000

# Perintah untuk menjalankan aplikasi
CMD ["npm", "run", "start"]