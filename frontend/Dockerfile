# Wybierz obraz bazowy Node.js
FROM node:16-alpine

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj pliki `package.json` i `package-lock.json` (jeśli istnieje)
COPY package*.json ./

# Zainstaluj zależności projektu
RUN npm install

# Skopiuj pozostałe pliki projektu
COPY . .

# Odsłoń port 8080 na potrzeby serwera deweloperskiego
EXPOSE 8080

# Uruchom serwer deweloperski
CMD ["npm", "run", "serve"]
