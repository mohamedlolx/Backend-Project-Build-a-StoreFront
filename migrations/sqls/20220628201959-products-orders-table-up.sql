CREATE TABLE products_orders(
    product_order_id SERIAL PRIMARY KEY,
    product_id int, 
    order_id int, 
    quantity int , 
    FOREIGN KEY (product_id) REFERENCES products (product_id),
    FOREIGN KEY (order_id) REFERENCES orders (order_id) );
    