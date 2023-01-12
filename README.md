<div align="center">
    <a href="https://caats.app"><img alt="Tak, lubię SYCe. A co?" width="400" src="https://user-images.githubusercontent.com/30326322/212149829-0341926f-35d2-4e7b-ba46-f5bfa884a59e.PNG"></a>
    <p><i>Cats as a Timetable Service</i></p>
    <p>
        <a href="https://codeclimate.com/github/kpostekk/caats/maintainability"><img src="https://api.codeclimate.com/v1/badges/263c7c9bbe2163a7d7f5/maintainability" /></a>
    </p>
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
