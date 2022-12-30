# Nest GraphQL backend

## Instalacja

*Do wykonania poniższej instalacji jest potrzebna baza danych Postgres.*

1. Utwórz plik `.env` z poniższymi zmiennymi
 - `DATABASE_URL`
 - `GOOGLE_CLIENT_ID`
 - `GOOGLE_SECRET`
 - `JWT_SECRET`

2. Wykonaj migracje bazy danych wywołując komendę `yarn prisma migrate deploy`

3. Wykonaj `yarn install`

## Uruchamianie

```bash
yarn dev
# lub
yarn node -r @swc/register src/main.ts
```
