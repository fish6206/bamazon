DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  item_id INT default 0,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES (1, "nike air force ones", "men's clothing", 125, 25);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES (2, "vans slip ons", "men's clothing", 45, 32);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3, "Wilson Football", "sports", 60, 15);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4, "fire stick", "electronics", 40, 10);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5, "echo dot", "electronics", 30, 50);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, "the wonkey donkey", "books", 13, 5);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7, "diary of a whimpy kid", "books", 22, 10);