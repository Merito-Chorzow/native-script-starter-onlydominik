[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Uu9lUx8_)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=22090987&assignment_repo_type=AssignmentRepo)
# NativeScript: Scan Inventory

## Cel
Zbuduj podstawową aplikację w **NativeScript używając framework Angular**, która używa **natywnej funkcji** oraz **komunikuje się z API**, z **3–4 widokami**.

## Zakres i wymagania funkcjonalne
- **Natywna funkcja (min. 1):** wybierz i uzasadnij (np. aparat/kamera – skan/zdjęcie, pliki, geolokalizacja, latarka, wibracje).
- **API (min. 1 endpoint):** pobranie listy elementów lub zapis nowego.
- **Widoki (3–4):**
  1. **Lista produktów** (nazwa, kod, mini-status).
  2. **Szczegóły produktu** (opis, zdjęcie/skan, akcje: usuń/edytuj).
  3. **Dodaj produkt** (formularz + akcja natywna, np. „zeskanuj/zdjęcie”).
  4. *(Opcjonalnie)* **Ustawienia** (np. preferencje, tryb offline).
- **Walidacja:** minimalna w formularzu (np. wymagane pola).

## Testowanie lokalne (w trakcie developmentu)
- Uruchom na **urządzeniu/emulatorze**.
- Pokaż: dodanie produktu z użyciem **natywnej funkcji** (np. zdjęcie/skan), pojawienie się na liście.
- Pokaż komunikację z **API** (pobranie/zapis) i zachowanie przy błędach/uprawnieniach.

## Definition of Done (DoD)
- [x] 3–4 widoki + nawigacja.
- [x] Co najmniej 1 **natywna funkcja**.
- [x] Integracja z **API** (GET/POST).
- [x] Walidacja formularza + podstawowa obsługa błędów.
- [x] Aktualizacja `README.md`, zrzuty ekranów, min. 3 commity.

---

## Opis implementacji

### Widoki
Aplikacja posiada 4 widoki:
1. **Lista produktów** - wyświetla produkty z nazwą, kodem i statusem dostępności
2. **Szczegóły produktu** - pokazuje pełne informacje o produkcie, pozwala usunąć, edytować i zmienić status
3. **Dodaj produkt** - formularz do dodawania nowego produktu ze zdjęciem
4. **Edytuj produkt** - formularz do edycji istniejącego produktu

### Natywna funkcja - Kamera
Do robienia zdjęć produktów użyto biblioteki `@nativescript/camera`. Pozwala ona na:
- Pobranie uprawnień do kamery (`requestCameraPermissions`)
- Zrobienie zdjęcia (`takePicture`)

### API
Aplikacja komunikuje się z API `https://jsonplaceholder.typicode.com`:
- **GET** `/posts?_limit=10` - pobieranie listy produktów
- **POST** `/posts` - dodawanie nowego produktu
- **PUT** `/posts/:id` - aktualizacja produktu
- **DELETE** `/posts/:id` - usuwanie produktu

Do komunikacji z API użyto `HttpClient` z `@angular/common/http`.

### Walidacja
Formularze posiadają walidację wymaganych pól:
- Nazwa produktu - wymagana
- Kod produktu - wymagany przy dodawaniu

## Zdjęcia:

- Lista produktów

![img.png](img.png)

- Szczegóły produktu

![img_1.png](img_1.png)

- Dodawanie produktu

![img_2.png](img_2.png)

- Edytowanie produktu

![img_3.png](img_3.png)

