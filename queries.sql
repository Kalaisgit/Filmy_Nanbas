CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  film VARCHAR(200) NOT NULL,
  yor INTEGER,
  genre VARCHAR(200),
  rating FLOAT,
  review TEXT
);

