<div align="center">
    <h1>🐈‍⬛ CaaTS</h1>
    <p><i>Cats as a Timetable Service</i></p>
    <p>Dostępny na <a href="https://caats.kpostek.dev/">caats.kpostek.dev</a>
</div>

## Dlaczego?

|                                      | CaaTS                                                            | Altapi                                            | Plan Zajęć PJATK                         |
| ------------------------------------ | ---------------------------------------------------------------- | ------------------------------------------------- | ---------------------------------------- |
| Średni czas oczekiwania na zapytania | <45ms                                                            | <115ms                                            | <620ms (lub <1730ms w ogólnej wersji)    |
| Wygodna aplikacja webowa             | ✅                                                                | 🤔                                                | ❌                                        |
| Logowanie i synchronizacja           | ✅                                                                | ❌                                                 | ✅                                        |
| Wsparcie dla subskrybcji ICS         | ✅                                                                | ✅                                                 | ❌                                        |
| Dostęp do API                        | GraphQL                                                          | OpenAPIv3 REST                                    | ❌                                        |
| Format zapytań                       | GraphQL**                                                        | REST                                              | ViewState*                               |
| Format odpowiedzi                    | JSON                                                             | JSON                                              | CSV + HTML                               |
| Wykorzystane technologie             | NestJS, Fastify, Mercurius, Prisma, Postgres, React, TailwindCSS | NestJS, Express, Mongoose, MongoDB, React, NextUI | ASP.NET 4.0, SQL Server 2008, TelerikUI* |

> *zaobserwowany stack technologiczny, może się różnić w rzeczywistości
> 
> **nie dotyczy subskrypcji ICS

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

## Porównanie "side by side"

Od lewej: CaaTS, Altapi, Plan zajęć PJATK


https://user-images.githubusercontent.com/30326322/210854927-a036c456-5ac7-4038-af0b-0bd2870a1077.mp4

