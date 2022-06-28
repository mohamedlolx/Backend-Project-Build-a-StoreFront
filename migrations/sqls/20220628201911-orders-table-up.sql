CREATE TABLE orders(
    order_id SERIAL PRIMARY KEY,
    order_status VARCHAR(50) NOT NULL,
    user_id int,  FOREIGN KEY (user_id) REFERENCES users (user_id) );