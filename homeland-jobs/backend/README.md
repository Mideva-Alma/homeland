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

- All endpoints return consistent JSON.
- Role-based access enforced via middleware.
- See code for detailed request/response bodies.

---

**AI Tools Used:** GitHub Copilot and ChatGPT

