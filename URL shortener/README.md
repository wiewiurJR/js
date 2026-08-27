# URL Shortener

Prosta aplikacja internetowa, która tworzy krótki link na podstawie długiego adresu URL.

## Funkcje

- tworzenie unikalnego, krótkiego identyfikatora dla każdego adresu URL
- przekierowanie krótkiego linku do oryginalnego adresu
- zapobieganie tworzeniu duplikatów dla tego samego adresu URL
- lokalne zapisywanie linków w pliku `links.json`

## Technologie

- Node.js
- Express.js
- EJS

## Jak uruchomić projekt

1. Otwórz folder projektu w terminalu:

   ```bash
   cd "URL shortener"
   ```

2. Zainstaluj zależności:

   ```bash
   npm install
   ```

3. Uruchom aplikację:

   ```bash
   node index.js
   ```

4. Otwórz w przeglądarce [http://localhost:3000](http://localhost:3000).

Plik `links.json` zostanie utworzony automatycznie po pierwszym uruchomieniu aplikacji.
