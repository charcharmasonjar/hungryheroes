-- drops and creates order_items table
DROP TABLE IF EXISTS order_items CASCADE;

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY NOT NULL,
  food_order_id INTEGER REFERENCES food_orders(id) ON DELETE CASCADE NOT NULL,
  menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE NOT NULL
);
