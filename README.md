# Zadanie Rekrutacyjne

## Opis

Aplikacja służy do przetwarzania tekstu artykułu na format HTML za pomocą API OpenAI. Wczytuje ona plik tekstowy z artykułem, 
przesyła go do OpenAI w celu wygenerowania struktury HTML, a następnie zapisuje wynikowy kod w pliku `artykul.html`. 
HTML jest stylizowany przy użyciu plików CSS i JS, aby uzyskać estetyczny wygląd.

## Wymagania

Aby uruchomić aplikację, potrzebujesz zainstalowanego środowiska **Node.js**.

## Instalacja

1. **Skopiuj repozytorium** na swoje lokalne urządzenie.
2. **Otwórz terminal** w głównym folderze projektu.
3. **Zainstaluj wymagane moduły** Node.js za pomocą polecenia:

   ```
   npm install
W pliku `package.json` znajdują się następujące zależności:

* `axios`: do obsługi zapytań HTTP do API OpenAI.
* `dotenv`: do zarządzania kluczami API i innymi poufnymi danymi konfiguracyjnymi.
 
4. **Ustaw klucz API OpenAI:**

* Skopiuj swój klucz API OpenAI i zapisz go w pliku `.env`, który powinien znajdować się w folderze `config`.
* Struktura pliku .env powinna wyglądać następująco:
```
  OPENAI_API_KEY=your_openai_api_key_here
```
## Struktura Projektu

* `articles_html/`: Folder, który zawiera pliki HTML, w tym `podglad.html` oraz `szablon.html`.
* `articles_txt/`: Folder z plikiem tekstowym `article.txt`, który jest wczytywany przez aplikację.
* `config/`: Folder zawierający plik `ApiOpenAiKey.env` z kluczem API.
* `css/`: Folder ze stylami CSS (`styles.css`), używanymi do stylizacji generowanego HTML.
* `js/`: Folder ze skryptami JS (`script.js`), które dodają interaktywne funkcje do podglądu artykułu.
* `src/`: Główny folder aplikacji zawierający plik `app.js`, który uruchamia cały proces przetwarzania tekstu artykułu.
  
## Uruchomienie Aplikacji
1. **Uruchom aplikację za pomocą komendy:**
```
npm start
```
Aplikacja odczyta plik tekstowy `article.txt`, przekaże go do API OpenAI, a następnie wygenerowany HTML zapisze w pliku `artykul.html`.

## Użycie
Po wygenerowaniu pliku `artykul.html` możesz otworzyć go w przeglądarce, aby zobaczyć wygenerowany artykuł wraz ze stylami i formatowaniem.

## Uwagi
* Upewnij się, że masz poprawny klucz API w pliku `.env`, ponieważ bez niego aplikacja nie będzie mogła połączyć się z OpenAI.
* Jeśli wystąpią jakiekolwiek błędy, sprawdź, czy wszystkie moduły są poprawnie zainstalowane i czy masz aktywne połączenie internetowe.
  
## Autor
Projekt wykonany w ramach zadania rekrutacyjnego.
