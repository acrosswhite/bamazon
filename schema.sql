DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
id INTEGER AUTO_INCREMENT NOT NULL,
product_name VARCHAR(200) NOT NULL,
department_name VARCHAR(100),
price FLOAT(10),
stock_quantity INT(10),
PRIMARY KEY(id)
)

SELECT * FROM products