-- drops and creates menu_items table
-- default is that menu items are not on special
DROP TABLE IF EXISTS menu_items CASCADE;

CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255),
  description TEXT,
  image_url VARCHAR(255),
  price INTEGER,
  calories INTEGER,
  prep_time INTEGER,
  special BOOLEAN NOT NULL DEFAULT FALSE,
  course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE NOT NULL
);
