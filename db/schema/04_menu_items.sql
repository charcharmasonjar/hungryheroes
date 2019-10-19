-- drops and creates menu_items table
-- default is that menu items are not on pecial
DROP TABLE IF EXISTS menu_items;

CREATE TABLE menu_items {
  id SERIAL PRIMARY KEY NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  price INTEGER,
  calories INTEGER,
  special BOOLEAN NOT NULL DEFAULT FALSE,
  course_id INTEGER REFERENCES courses(id) NOT NULL
};
