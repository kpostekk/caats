<div align="center">
    <h1>🐈‍⬛ CaaTS</h1>
    <p><i>Cats as a Timetable Service</i></p>
    <p>Dostępny na <a href="https://caats.kpostek.dev/">caats.kpostek.dev</a>
</div>

## Dlaczego?

|                                      | CaaTS                                                            | Altapi                                            | Plan Zajęć PJATK            |
| ------------------------------------ | ---------------------------------------------------------------- | ------------------------------------------------- | --------------------------- |
| Średni czas oczekiwania na zapytania | 12ms                                                             | 112ms                                             | 1481ms                      |
| Wygodna aplikacja webowa             | ✅                                                                | 🤔                                                | ❌                           |
| Logowanie i synchronizacja           | ✅                                                                | ❌                                                 | ✅                           |
| Wsparcie dla ICS                     | ✅                                                                | ✅                                                 | ⚠️częściowe i niepełne dane |
| Wykorzystane technologie             | NestJS, Fastify, Mercurius, Prisma, Postgres, React, TailwindCSS | NestJS, Express, Mongoose, MongoDB, React, NextUI | ASP.NET 4.0, TelerikUI      |
| Dostęp do API                        | GraphQL                                                          | OpenAPIv3 REST                                    | ❌                           |

### Zmiany w stosunku do Altapi

#### Frontend

- Bump do Vite 4 oraz React 18 (oraz wielu innych bibliotek)
- Poprawne wykorzystanie global states manager'a
- Wykorzystanie TailwindCSS zamiast NextUI
- Usprawniony UX

#### Backend

- Obsługa użytkowników
- Wykorzystanie JWT do autoryzacji
- Zmiana ORM z Mongoose na Prisma
- Poprawny design bazy danych (rozłożenie danych, indeksy, relacje)
- Wykorzystanie GraphQL zamiast REST
- Optymalizacje wewnątrz konfiguracji NestJS

#### Scraper

- Uproszczony protokół komunikacji z API
- Czyszczenie danych przed zapisem do bazy
- Masywna redukcja codebase
- Optymalizacja wydajności
- Poprawiona wydajność dla wielu scraperów
