-- migrations/01_init_schema.sql

-- 1) Usuarios
CREATE TABLE IF NOT EXISTS users (
  id           SERIAL PRIMARY KEY,
  email        TEXT UNIQUE NOT NULL,
  password     TEXT NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 2) Tarifas
CREATE TABLE IF NOT EXISTS tariffs (
  id             SERIAL PRIMARY KEY,
  origin         TEXT NOT NULL,
  destination    TEXT NOT NULL,
  weight_min_kg  INTEGER NOT NULL,
  weight_max_kg  INTEGER NOT NULL,
  price_cents    BIGINT NOT NULL,
  CONSTRAINT uniq_route_weight UNIQUE(origin, destination, weight_min_kg, weight_max_kg)
);

-- 3) Órdenes de envío
CREATE TABLE IF NOT EXISTS shipments (
  id                 SERIAL PRIMARY KEY,
  user_id            INTEGER NOT NULL REFERENCES users(id),
  origin             TEXT NOT NULL,
  destination        TEXT NOT NULL,
  weight_kg          NUMERIC(8,2) NOT NULL,
  length_cm          NUMERIC(8,2) NOT NULL,
  width_cm           NUMERIC(8,2) NOT NULL,
  height_cm          NUMERIC(8,2) NOT NULL,
  volumetric_weight  NUMERIC(8,2) GENERATED ALWAYS AS ((length_cm * width_cm * height_cm) / 2500) STORED,
  chargeable_weight  NUMERIC(8,2) NOT NULL,
  quoted_price_cents BIGINT NOT NULL,
  status             TEXT NOT NULL DEFAULT 'En espera',
  created_at         TIMESTAMPTZ DEFAULT NOW()
);

-- 4) Historial de estados
CREATE TABLE IF NOT EXISTS shipment_status_history (
  id           SERIAL PRIMARY KEY,
  shipment_id  INTEGER NOT NULL REFERENCES shipments(id),
  status       TEXT NOT NULL,
  changed_at   TIMESTAMPTZ DEFAULT NOW()
);
