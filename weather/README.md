# Weather App

Prosta aplikacja pogodowa, która wyświetla informacje o pogodzie dla miasta podanego przez użytkownika.

## Funkcje

- wyszukiwanie pogody dla wybranego miasta
- wyświetlanie temperatury
- wyświetlanie opisu pogody
- wyświetlanie wilgotności i daty
- obsługa nieprawidłowych lokalizacji oraz błędów zapytania

## Technologie

- Node.js
- Express.js
- EJS
- Visual Crossing Weather API

## Wymagania

- Node.js 18 lub nowszy
- darmowy klucz API z serwisu Visual Crossing Weather

## Jak uruchomić projekt

1. Otwórz folder projektu w terminalu:

   ```bash
   cd weather
   ```

2. Zainstaluj zależności:

   ```bash
   npm install
   ```

3. Utwórz w folderze projektu plik `.env` i dodaj do niego swój klucz API:

   ```env
   API_KEY=twoj_klucz_api
   ```

4. Uruchom aplikację:

   ```bash
   node index.js
   ```

5. Otwórz w przeglądarce [http://localhost:3000](http://localhost:3000).
