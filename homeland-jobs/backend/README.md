# Homeland Backend API

## Folder Structure
```
backend/
  src/
    controllers/
    middlewares/
    models/
    routes/
    utils/
    config/
    services/
    app.js
    server.js
  tests/
  .env.example
  README.md
  package.json
```

**Why this structure?**
- `controllers/`: Route logic, keeps routes clean.
- `middlewares/`: Auth, validation, error handling.
- `models/`: Mongoose/Sequelize schemas.
- `routes/`: Route definitions.
- `utils/`: Helper functions (e.g., autoReleaseEscrow).
- `config/`: DB, JWT, and other configs.
- `services/`: Business logic (e.g., payments).
- `tests/`: Automated and integration tests.

## API Endpoint Contract

| Method | Endpoint | Role | Returns |
| ------ | -------------------------------------------: | ------------------- | ---------------------------- |
| POST   |                         `/api/auth/register` | Public              | New user object              |
| POST   |                            `/api/auth/login` | Public              | Access token + refresh token |
| POST   |                          `/api/auth/refresh` | Public              | New access token             |
| GET    |                               `/api/auth/me` | Authenticated       | Current user profile         |
| GET    |                                  `/api/jobs` | Public              | Paginated jobs               |
| POST   |                                  `/api/jobs` | Employer            | Created job                  |
| GET    |                              `/api/jobs/:id` | Public              | Single job details           |
| POST   |                    `/api/jobs/:id/proposals` | Freelancer          | Created proposal             |
| PUT    | `/api/jobs/:id/proposals/:proposalId/accept` | Employer            | Updated contract             |
| POST   |                    `/api/contracts/:id/fund` | Employer            | Escrow + receipt             |
| POST   |                 `/api/contracts/:id/deliver` | Freelancer          | Updated contract             |
| POST   |                 `/api/contracts/:id/approve` | Employer            | Released payment             |
| POST   |                 `/api/contracts/:id/dispute` | Employer/Freelancer | Dispute object               |

---

## API Documentation

### Auth Endpoints
| Method | Endpoint                | Auth         | Request Body / Params | Success Response | Error Responses |
|--------|-------------------------|--------------|----------------------|------------------|----------------|
| POST   | /api/auth/register      | Public       | name, email, phone, password, role | 201 user object (no password) | 400 validation, 409 duplicate |
| POST   | /api/auth/login         | Public       | email, password      | 200 accessToken, refreshToken | 401 invalid credentials |
| POST   | /api/auth/refresh       | Public       | refreshToken         | 200 new accessToken | 401 invalid token |
| GET    | /api/auth/me            | Bearer Token | -                    | 200 user profile  | 401 unauthorized |

### Jobs Endpoints
| Method | Endpoint                | Auth         | Request Body / Params | Success Response | Error Responses |
|--------|-------------------------|--------------|----------------------|------------------|----------------|
| GET    | /api/jobs               | Public       | search, category, location, budget_min, budget_max, sort, page, limit | 200 jobs, total | 500 server error |
| POST   | /api/jobs               | Employer     | title, description, category, location, budget | 201 job | 400 validation, 403 forbidden |
| GET    | /api/jobs/:id           | Public       | -                    | 200 job, proposalCount | 404 not found |
| POST   | /api/jobs/:id/proposals | Freelancer   | cover_letter, proposed_budget, timeline_days | 201 proposal | 400 validation, 409 duplicate, 404 not found |
| PUT    | /api/jobs/:id/proposals/:proposalId/accept | Employer | - | 200 proposal | 403 forbidden, 404 not found |

### Contracts/Escrow Endpoints
| Method | Endpoint                | Auth         | Request Body / Params | Success Response | Error Responses |
|--------|-------------------------|--------------|----------------------|------------------|----------------|
| POST   | /api/contracts/:id/fund     | Employer     | -                    | 200 receipt, contract | 400/404/500 |
| POST   | /api/contracts/:id/deliver  | Freelancer   | -                    | 200 contract    | 400/404/500 |
| POST   | /api/contracts/:id/approve  | Employer     | -                    | 200 contract    | 400/404/500 |
| POST   | /api/contracts/:id/dispute  | Employer/Freelancer | reason (min 20 chars) | 200 contract | 400/404/500 |

---

## Automated Tests

- Run all tests with:
  ```bash
  npm install --save-dev supertest jest
  npx jest
  ```
- Tests cover:
  1. Successful registration returns 201 with correct fields
  2. Login with wrong password returns 401
  3. Freelancer cannot POST a job (returns 403)

---

## Postman/Thunder Client Collection
- Use the above endpoint documentation to create requests in Postman or Thunder Client.
- Cover all endpoints: register, login, refresh, me, jobs CRUD, proposals, contracts/escrow.
- Export your collection and include it in the repo as `postman_collection.json` or similar.

---

**AI Tools Used:** GitHub Copilot

