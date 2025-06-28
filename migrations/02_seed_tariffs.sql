-- migrations/02_seed_tariffs.sql
-- This script seeds the tariffs table with initial data for different routes and weight ranges.
-- Bogotá ⇄ Medellín
INSERT INTO tariffs (origin, destination, weight_min_kg, weight_max_kg, price_cents) VALUES
  ('Bogota',     'Medellin',     0,  5,   12000),
  ('Bogota',     'Medellin',     5, 10,   18000),
  ('Bogota',     'Medellin',    10, 20,   25000),
  ('Medellin',   'Bogota',       0,  5,   12000),
  ('Medellin',   'Bogota',       5, 10,   18000),
  ('Medellin',   'Bogota',      10, 20,   25000);

-- Bogotá ⇄ Cali
INSERT INTO tariffs (origin, destination, weight_min_kg, weight_max_kg, price_cents) VALUES
  ('Bogota',     'Cali',         0,  5,   15000),
  ('Bogota',     'Cali',         5, 10,   21000),
  ('Bogota',     'Cali',        10, 20,   28000),
  ('Cali',       'Bogota',       0,  5,   15000),
  ('Cali',       'Bogota',       5, 10,   21000),
  ('Cali',       'Bogota',      10, 20,   28000);

-- Medellín ⇄ Cali
INSERT INTO tariffs (origin, destination, weight_min_kg, weight_max_kg, price_cents) VALUES
  ('Medellin',   'Cali',         0,  5,   14000),
  ('Medellin',   'Cali',         5, 10,   20000),
  ('Medellin',   'Cali',        10, 20,   26000),
  ('Cali',       'Medellin',     0,  5,   14000),
  ('Cali',       'Medellin',     5, 10,   20000),
  ('Cali',       'Medellin',    10, 20,   26000);

-- Bogotá ⇄ Barranquilla
INSERT INTO tariffs (origin, destination, weight_min_kg, weight_max_kg, price_cents) VALUES
  ('Bogota',        'Barranquilla', 0,  5,   20000),
  ('Bogota',        'Barranquilla', 5, 10,   26000),
  ('Bogota',        'Barranquilla',10, 20,   33000),
  ('Barranquilla',  'Bogota',       0,  5,   20000),
  ('Barranquilla',  'Bogota',       5, 10,   26000),
  ('Barranquilla',  'Bogota',      10, 20,   33000);

-- Bogotá ⇄ Cartagena
INSERT INTO tariffs (origin, destination, weight_min_kg, weight_max_kg, price_cents) VALUES
  ('Bogota',     'Cartagena',    0,  5,   21000),
  ('Bogota',     'Cartagena',    5, 10,   27000),
  ('Bogota',     'Cartagena',   10, 20,   35000),
  ('Cartagena',  'Bogota',       0,  5,   21000),
  ('Cartagena',  'Bogota',       5, 10,   27000),
  ('Cartagena',  'Bogota',      10, 20,   35000);

-- Medellín ⇄ Barranquilla
INSERT INTO tariffs (origin, destination, weight_min_kg, weight_max_kg, price_cents) VALUES
  ('Medellin',   'Barranquilla', 0,  5,   22000),
  ('Medellin',   'Barranquilla', 5, 10,   28000),
  ('Medellin',   'Barranquilla',10, 20,   35000),
  ('Barranquilla','Medellin',     0,  5,   22000),
  ('Barranquilla','Medellin',     5, 10,   28000),
  ('Barranquilla','Medellin',    10, 20,   35000);

-- Cali ⇄ Barranquilla
INSERT INTO tariffs (origin, destination, weight_min_kg, weight_max_kg, price_cents) VALUES
  ('Cali',       'Barranquilla', 0,  5,   24000),
  ('Cali',       'Barranquilla', 5, 10,   30000),
  ('Cali',       'Barranquilla',10, 20,   38000),
  ('Barranquilla','Cali',        0,  5,   24000),
  ('Barranquilla','Cali',        5, 10,   30000),
  ('Barranquilla','Cali',       10, 20,   38000);
