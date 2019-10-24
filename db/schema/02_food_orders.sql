-- drops and creates food_orders table
-- default order status is true/active
DROP TABLE IF EXISTS food_orders CASCADE;

CREATE TABLE food_orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  completed_at TIMESTAMP,
  comments TEXT,
  status BOOLEAN NOT NULL DEFAULT FALSE
);
