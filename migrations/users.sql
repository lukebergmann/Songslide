DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(30),
  email VARCHAR(255),
  password VARCHAR(255),
  card_number VARCHAR (30),
  artist_id INTEGER DEFAULT NULL REFERENCES artists(id) ON DELETE CASCADE
);


-- How come there is an artists id in the users table?
