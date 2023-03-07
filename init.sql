CREATE SCHEMA IF NOT EXISTS myschema;

CREATE TABLE IF NOT EXISTS myschema.users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
);

CREATE TABLE IF NOT EXISTS myschema.tasks (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  done BOOLEAN DEFAULT FALSE,
  user_id INTEGER NOT NULL REFERENCES myschema.users(id)
);
