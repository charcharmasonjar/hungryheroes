-- drops and creates courses table (apps, mains, desserts, etc)
DROP TABLE IF EXISTS courses CASCADE;

CREATE TABLE courses (
  id INTEGER PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);
