CREATE TABLE "products" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" text,
  "status" varchar(50),
  "price" int,
  "code" VARCHAR(50) NOT NULL,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "customers" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar(50) NOT NULL,
  "phone" varchar(15) UNIQUE NOT NULL,
  "email" varchar(100) UNIQUE NOT NULL,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "orders" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "customer_id" int,
  "total_quantity" int NOT NULL,
  "total_price" int NOT NULL,
  "status" varchar(50),
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "order_details" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "order_id" int,
  "product_id" int,
  "quantity" int NOT NULL,
  "total_price" int NOT NULL,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

ALTER TABLE "orders" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");

ALTER TABLE "order_details" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "order_details" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

-- tạo thông tin khách hàng
INSERT INTO customers (name, email, phone)
VALUES 
	('Tạ Hoàng A', 'hoangA@gmail.com', '0983212211'),
	('Tạ Hoàng B', 'hoangB@gmail.com', '0983212212'),
	('Tạ Hoàng C', 'hoangC@gmail.com', '0983212213'),
	('Dương Văn A', 'vanA@gmail.com', '0983212214'),
	('Dương Văn B', 'vanB@gmail.com', '0983212215'),
	('Dương Văn C', 'vanC@gmail.com', '0983212216');

SELECT * FROM customers

--Tạo thông tin sản phẩm: 
INSERT INTO products(name , status, price, code)
VALUES 
	('Sản phẩm 1', 'Còn Hàng', 1000, 'SP_01'),
	('Sản phẩm 2', 'Hết Hàng', 2000, 'SP_02'),
	('Sản phẩm 3', 'Còn Hàng', 3000, 'SP_03'),
	('Sản phẩm 4', 'Hết Hàng', 4000, 'SP_04'),
	('Sản phẩm 5', 'Còn Hàng', 5000, 'SP_05'),
	('Sản phẩm 6', 'Hết Hàng', 6000, 'SP_06');

SELECT * FROM products

-- Tạo danh sách đơn hàng: 
INSERT INTO orders(customer_id, total_quantity, total_price, status)
VALUES 
	(1, 3, 5000, 'Đang Xử Lý'),
	(2, 3, 11000, 'Đã Đặt Hàng'),
	(3, 2, 11000, 'Đang Xử Lý'),
	(4, 11, 17000, 'Đang Xử Lý'),
	(5, 2, 12000, 'Đang Xử Lý'),
	(6, 2, 6000, 'Đã Đặt Hàng');

SELECT * FROM  orders

-- Tạo dữ liệu cho chi tiết sản phẩm : 
INSERT INTO order_details(order_id ,product_id , quantity, total_price)
VALUES 
	(1, 1, 1, 1000),
	(1, 2, 2, 4000),
	(2, 3, 1, 3000),
	(2, 4, 2, 8000),
	(3, 5, 1, 5000),
	(3, 6, 1, 6000),
	(4, 1, 5, 5000),
	(4, 2, 4, 6000),
	(4, 3, 2, 6000),
	(5, 6, 2, 12000),
	(6, 3, 2, 6000);
	
SELECT * FROM  order_details

-- Xem danh sách đơn hàng :
SELECT DISTINCT 
     customers.name AS customer_name,
	 customers.email AS customer_email,
	 customers.phone AS customer_phone,
	 orders.total_quantity AS total_quantity,
	 orders.total_price AS total_price,
	 orders.status AS status_order,
	 orders.created_at 
FROM
	customers
INNER JOIN orders
ON orders.customer_id = customers.id
INNER JOIN order_details
ON order_details.order_id = orders.id

-- Xem chi tiết đơn hàng :
SELECT
     customers.name AS customer_name,
	 customers.email AS customer_email,
	 customers.phone AS customer_phone,
	 products.name AS product_name,
	 products.code AS product_code,
	 products.price AS product_price,
	 order_details.quantity ,
	 order_details.total_price,
	 orders.status,
	 order_details.created_at,
	 order_details.updated_at
FROM
	customers
INNER JOIN orders
ON orders.customer_id = customers.id
INNER JOIN order_details
ON order_details.order_id = orders.id
INNER JOIN products
ON order_details.product_id = products.id

	
	
	
	
	
	
	
	
	