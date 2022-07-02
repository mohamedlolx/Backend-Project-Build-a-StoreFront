# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index: `'products/' [GET]`
  //go to : localhost:3000/api/products

- Show: `'products/:product_id' [GET]`
  //go to : localhost:3000/api/products/:product_id

- Create: (args: Product)[token required]: `'products/' [POST] (token)`
  send for example: {"product_name":"xxx","price":200} as Json Data
  to : localhost:3000/api/products

- [ADDED] Update:`'products/:product_id [PATCH] (token)`
  send for example another data to edit product info : {"product_name":"xxx","price":200} as Json Data
  to : localhost:3000/api/products/:product_id

- [ADDED] Delete: `'products/:product_id [DELETE] (token)`
  just make delete request to : localhost:3000/api/products/:product_id

#### Users

- Create (args: User): `'users/' [POST] ` // [First the user should Create new User]
  send for example: {"user_name":"xxx","first_name":"xxx","last_name":"xxx",password"xxx"} as Json Data
  //go to : localhost:3000/api/users

- Authenticate (args: user_name, password): `'users/authenticate' [POST] `
  // [Second the user should authenticate to get the token to do anything in the code]
  send for example: {"user_name":"xxx",password"xxx"} as Json Data
  //go to : localhost:3000/api/users/authenticate

- Index [token required]: `'users/' [GET] (token)`
  //go to : localhost:3000/api/users

- Show [token required]: `'users/:user_id' [GET] (token)`
  //go to : localhost:3000/api/users/:user_id

- [ADDED] Update [token required]: `'users/:user_id' [PATCH] (token)`
  send for example: {"user_name":"xxx","first_name":"xxx","last_name":"xxx",password"xxx"} as Json Data
  //go to : localhost:3000/api/users/:user_id

- [ADDED] Delete [token required]: `'users/:user_id' [DELETE] (token)`
  //go to : localhost:3000/api/users/:user_id

#### Orders

- show [token required]: `'orders/:order_id' [GET] (token)`
  //go to : localhost:3000/api/orders/:order_id

- Create Order [token required]: `'orders/' [POST] (token)`
  send for example: {"user_id":"xxx","order_status":"xxx"} as Json Data
  //go to : localhost:3000/api/orders/

- [ADDED] Update order's status [token required]: `'orders/:order_id' [PATCH] (token)`
  send for example: {"user_id":"xxx","order_status":"xxx"} as Json Data
  //go to : localhost:3000/api/orders/:order_id

- [ADDED] Delete [token required]: `'orders/:order_id [DELETE] (token)`
  //go to : localhost:3000/api/orders/:order_id

#### Products of order

- show [token required]: `'prord/:product_order_id' [GET] (token)`
  //go to : localhost:3000/api/prord/:product_order_id

- Create products Order by order_id : [token required]: `'prord/' [POST] (token)`
  send for example: {"order_id":"xxx","product_id":"xxx","quantity":5} as Json Data
  //go to : localhost:3000/api/prord/

- [ADDED] Update products Order :[token required]: `'prord/:product_order_id' [PATCH] (token)`
  //to update it you weather the quantity or the product_id will gonna change
  send for example: {"order_id":"xxx","product_id":"xxx","quantity":5} as Json Data
  //go to : localhost:3000/api/prord/:product_order_id

- [ADDED] Delete [token required]: `'prord/:product_order_id [DELETE] (token)`
  //go to : localhost:3000/api/prord/:product_order_id

## Data Shapes

#### prodcuts

- product_id
- product_name
- price

```
Table: products:

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE products(
    product_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    product_name VARCHAR (50) NOT NULL UNIQUE,
    price VARCHAR (50) NOT NULL);

```

#### users

- user_id
- user_name
- first_name
- last_name
- password

```
Table: users:

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    user_name VARCHAR (50) NOT NULL UNIQUE ,
    first_name VARCHAR (50) NOT NULL,
    last_name VARCHAR (50) NOT NULL,
    password VARCHAR (255) NOT NULL);)

```

#### orders

- order_id
- order_status
- user_id

```
Table: orders:

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE orders(
    order_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    order_status VARCHAR(50) NOT NULL,
    user_id uuid DEFAULT uuid_generate_v4 (),  FOREIGN KEY (user_id) REFERENCES users (user_id) );

```

#### products_orders

- product_order_id
- product_id
- order_id
- quantity

```
Table: products_orders:

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE products_orders(
    product_order_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    product_id uuid DEFAULT uuid_generate_v4 (),
    order_id uuid DEFAULT uuid_generate_v4 (),
    quantity int ,
    FOREIGN KEY (product_id) REFERENCES products (product_id),
    FOREIGN KEY (order_id) REFERENCES orders (order_id) );


```

#### Also the Types : I have 4 types users, products, order, products_orders : >>>

type users = {
user_id: string
user_name: string
first_name: string
last_name: string
password: string
}

type prodcuts = {
product_id: string
product_name: string
price: string
}

type orders = {
order_id: string
order_status: string
user_id: string
}

type products_orders = {
product_order_id: string
product_id: string
order_id: string
quantity: number
}
