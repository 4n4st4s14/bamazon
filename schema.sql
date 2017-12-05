DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT(10) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE departments (
  department_id INT AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(100) NULL,
  over_head_costs INT(10) NULL,
  PRIMARY KEY (department_id)
);

-- ALTER TABLE products
-- ADD [COLUMN] product_sales DECIMAL(10,2) NULL [FIRST|AFTER stock_quantity]
--
-- ALTER TABLE products ADD COLUMN product_sales FLOAT(10,2) NOT NULL DEFAULT 0.00;
-- SELECT * FROM products;

-- INSERT INTO departments (department_name, over_head_costs)
-- VALUES("Kitchen", 500),("Decor", 300000),("Pets", 600),("Outdoor", 200),("Travel", 5000),("hygiene", 300);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Goats In Trees 2018 Calendar", "Decor", 9.37, 18), ("Bat House", "Outdoor", 24.99, 4),("Louis Vuitton Toilet", "Decor", 100000.00, 8),("Cats", "Pets", 4, 46),("Tamagotchi", "Pets", 78.00, 13),("Pancake Printer", "Kitchen", 250, 6),("Big Box of Ladybugs", "Outdoor", 24.00, 25),("Cactus", "Pets", 16.20, 2),("Modobag", "Travel", 1395, 33), ("Thermos", "Kitchen", 8.99, 15);
