# 🚚 Coordinadora Quotation & Delivery API

Backend service for Coordinadora’s shipping quotation and delivery platform. Implements user registration & authentication, shipping quotes, shipment management, real-time status tracking + history, and interactive API docs.

---

## 📚 Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Prerequisites](#prerequisites)
* [Getting Started](#getting-started)
* [Docker Compose](#docker-compose)
* [Configuration](#configuration)
* [API Endpoints](#api-endpoints)

  * [Authentication](#authentication)
  * [Quote Calculation](#quote-calculation)
  * [Shipments (HU3)](#shipments-hu3)
  * [Status Tracking (HU4)](#status-tracking-hu4)
* [OpenAPI / Swagger UI](#openapi--swagger-ui)
* [Testing](#testing)
* [Project Structure](#project-structure)
* [Contributing](#contributing)
* [License](#license)

---

## ✨ Features

1. **User Authentication** (JWT, bcrypt)
2. **Shipping Quote** (real vs volumetric weight)
3. **Shipment Management** (create, list, get by ID)
4. **Real-Time Status Tracking** via WebSockets + Redis Pub/Sub
5. **Status History** persisted in database
6. **Input Validation** with express-validator
7. **Clean Architecture** (Domain, Application, Infrastructure, Interfaces)
8. **Interactive API Docs** with Swagger UI
9. **Integration Tests** covering all user stories

---

## 🛠 Tech Stack

* **Runtime:** Node.js with TypeScript
* **Server:** Express.js
* **Dependency Injection:** tsyringe
* **Database:** PostgreSQL
* **Cache / Pub-Sub:** Redis
* **WebSockets:** socket.io + @socket.io/redis-adapter
* **Validation:** express-validator
* **API Docs:** swagger-jsdoc + swagger-ui-express
* **Testing:** Jest + Supertest

---

## 🚧 Prerequisites

* Node.js v16+
* Docker & Docker Compose

---

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/Backend-quotation-and-delivery.git
   cd Backend-quotation-and-delivery
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a file named `.env` in the project root with the following keys:

   ```dotenv
   PORT=3000

   # PostgreSQL
   DB_HOST=postgres
   DB_PORT=5432
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB=appdb

   # Redis
   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379

   # JWT
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=1h
   ```

4. **Launch services with Docker Compose**

   ```bash
   docker-compose up -d
   ```

   * Postgres initializes via SQL scripts in `./migrations/`.
   * Redis runs on default port.

5. **Run the application**

   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:3000`.

---

## 🐳 Docker Compose

```yaml
version: '3.8'
services:
  db:
    image: postgres:15
    env_file: ./.env
    ports:
      - "${DB_PORT}:5432"
    volumes:
      - db_data:/var/lib/postgresql/data
      - ./migrations:/docker-entrypoint-initdb.d:ro

  redis:
    image: redis:7
    env_file: ./.env
    ports:
      - "${REDIS_PORT}:6379"
    volumes:
      - redis_data:/data

volumes:
  db_data:
  redis_data:
```

---

## ⚙️ Configuration

Key files and folders:

* `src/main/server.ts`: Express setup, middleware, WebSocket + Redis adapter
* `src/main/container.ts`: Dependency Injection registrations
* `src/main/swagger.ts`: Swagger/OpenAPI configuration
* `migrations/`: SQL schema and seed scripts

---

## 📦 API Endpoints

### Authentication

| Method | Path             | Auth | Description       |
| ------ | ---------------- | ---- | ----------------- |
| POST   | `/auth/register` | ❌    | Register new user |
| POST   | `/auth/login`    | ❌    | Login and get JWT |

### Quote Calculation

| Method | Path     | Auth | Description                            |
| ------ | -------- | ---- | -------------------------------------- |
| POST   | `/quote` | ✅    | Calculate shipping quote by dimensions |

### Shipments (HU3)

| Method | Path             | Auth | Description               |
| ------ | ---------------- | ---- | ------------------------- |
| POST   | `/shipments`     | ✅    | Create a new shipment     |
| GET    | `/shipments`     | ✅    | List all user’s shipments |
| GET    | `/shipments/:id` | ✅    | Get shipment by ID        |

### Status Tracking (HU4)

| Method | Path                      | Auth | Description                         |
| ------ | ------------------------- | ---- | ----------------------------------- |
| PUT    | `/shipments/{id}/status`  | ✅    | Update shipment status & create log |
| GET    | `/shipments/{id}/history` | ✅    | Retrieve shipment status history    |

---

## 📖 OpenAPI / Swagger UI

Browse interactive API docs at:

```
http://localhost:3000/docs
```

Schemas available:

* `RegisterUserDTO`, `LoginUserDTO`
* `QuoteRequestDTO`, `QuoteResponseDTO`
* `RegisterShipmentDTO`, `ShipmentResponseDTO`
* `ChangeStatusRequest`, `StatusHistoryRecord`

---

## 🧪 Testing

Run integration tests:

```bash
npm run test
```

Covers end-to-end flows for all user stories (HU1–HU4).

---

## 🗂️ Project Structure

```
├── migrations/                 # DB schema + seed SQL
├── server/
│   ├── application/            # Use-cases, DTOs, ports
│   ├── domain/                 # Entities, errors, repos interfaces
│   ├── infrastructure/         # DB adapters, Redis publisher
│   ├── interfaces/             # Controllers, routes, validators
│   ├── main/                   # Server bootstrap, DI, swagger
│   ├── middleware/             # Validation & auth middlewares
│   └── __tests__/              # Integration tests
├── .env                        # Environment variables
├── docker-compose.yml
├── package.json
└── tsconfig.json
```
AisDev

