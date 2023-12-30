CREATE TABLE "customers" (
  "id" varchar(50) PRIMARY KEY,
  "name" varchar(50) NOT NULL,
  "address" text NOT NULL,
  "phone" varchar(15) UNIQUE NOT NULL,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "room" (
  "id" varchar(50) PRIMARY KEY,
  "type_room" varchar(50) NOT NULL,
  "total_customer" int NOT NULL,
  "price" int NOT NULL,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "service" (
  "id" varchar(50) PRIMARY KEY,
  "name" varchar(50) NOT NULL,
  "unit" varchar(10) NOT NULL,
  "price" int NOT NULL,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "detail_service" (
  "book_room_id" varchar(50),
  "service_id" varchar(50),
  "quantity" int NOT NULL,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "book_room" (
  "id" varchar(50) PRIMARY KEY,
  "room_id" varchar(50),
  "customer_id" varchar(50),
  "book_date" date NOT NULL,
  "start_time" time NOT NULL,
  "end_time" time NOT NULL,
  "deposits" int NOT NULL,
  "note" text,
  "status" varchar(50) NOT NULL,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

ALTER TABLE "book_room" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");

ALTER TABLE "book_room" ADD FOREIGN KEY ("room_id") REFERENCES "room" ("id");

ALTER TABLE "detail_service" ADD FOREIGN KEY ("book_room_id") REFERENCES "book_room" ("id");

ALTER TABLE "detail_service" ADD FOREIGN KEY ("service_id") REFERENCES "service" ("id");

INSERT INTO customers(id ,name, address, phone) 
VALUES 
('KH001', 'Nguyễn A', 'Cổ Nhuế', 0123321),
('KH002', 'Nguyễn B', 'Cổ Nhuế 1', 0123322),
('KH003', 'Nguyễn Xúc Xắc', 'Trần Cung 1', 0123323),
('KH004', 'Nguyễn Tài Xỉu', 'Trần Cung 2', 0123324),
('KH005', 'Nguyễn  Xỉu', 'Trần Cung 12', 01233243);


SELECT * FROM customers


INSERT INTO room(id, type_room, total_customer, price)
VALUES 
('VIP01', 'Vip 1', 15, 50000),
('VIP02', 'Vip 2', 15, 60000),
('VIP03', 'Vip 3', 20, 70000),
('VIP04', 'Vip 4', 25, 80000);



SELECT * FROM room

INSERT INTO service(id, name, unit, price)
VALUES 
('SP01', 'Hoa quả', 'mâm', 20000),
('SP02', 'Bia', 'chai', 11000),
('SP03', 'Hạt hướng dương', 'gói', 2000),
('SP04', 'Ngũ quả', 'mâm', 2000000);

SELECT * FROM service


INSERT INTO book_room(id, room_id, customer_id, book_date, start_time, end_time, deposits, note, status)
VALUES 
('OD01', 'VIP01', 'KH001', '01/01/2023', '20:30', '21:30', 10000, 'Không ăn cơm', 'Đã đặt'),
('OD02', 'VIP02', 'KH002', '01/01/2023', '20:30', '21:30', 12000, 'Không ăn cơm', 'Đã hủy'),
('OD03', 'VIP03', 'KH003', '02/01/2023', '21:30', '22:30', 13000, '', 'Đã đặt'),
('OD07', 'VIP04', 'KH004', '03/01/2023', '20:30', '23:30', 14000, '', 'Đã đặt'),
('OD04', 'VIP04', 'KH005', '04/01/2023', '21:30', '23:30', 14000, '', 'Đã đặt'),
('OD05', 'VIP04', 'KH005', '05/01/2023', '21:30', '23:30', 14000, '', 'Đã đặt'),
('OD06', 'VIP04', 'KH005', '06/01/2023', '21:30', '23:30', 14000, '', 'Đã đặt');
 
 

 


SELECT * FROM book_room

INSERT INTO detail_service(book_room_id, service_id, quantity)
VALUES 
('OD01', 'SP01', 2 ),
('OD01', 'SP02', 2 ),
('OD02', 'SP02', 3 ),
('OD02', 'SP01', 2 ),
('OD03', 'SP01', 4 ),
('OD03', 'SP03', 1 ),
('OD04', 'SP04', 5 ),
('OD04', 'SP02', 5 );

SELECT * FROM detail_service



SELECT 
    book_room.id AS MaDatPhong,
    book_room.room_id AS MaPhong,
    room.type_room AS LoaiPhong,
    customers.name AS TenKH,
	room.price AS GIAPHONG,
    room.price * EXTRACT(HOUR FROM book_room.end_time - book_room.start_time) AS TongTienHat,
    service.price * detail_service.quantity AS TongTienDV,
    room.price * EXTRACT(HOUR FROM book_room.end_time - book_room.start_time) + (service.price * detail_service.quantity) AS TongTienPhaiTra

FROM book_room
JOIN room ON room.id = book_room.room_id
JOIN customers ON customers.id = book_room.customer_id
LEFT JOIN detail_service ON detail_service.book_room_id  = book_room.id
LEFT JOIN service ON service.id  = detail_service.service_id 
GROUP BY TongTienHat, TongTienDV, TongTienPhaiTra, MaDatPhong,MaPhong, LoaiPhong,GIAPHONG, TenKH ;


SELECT 
 customers.*
FROM customers
INNER JOIN book_room ON customers.id = book_room.customer_id
WHERE customers.address = 'Cổ Nhuế 1';

SELECT
    room.id,
    room.type_room,
    room.total_customer,
    room.price,
    COUNT(book_room.room_id) AS SoLanDat
FROM
    room
JOIN
    book_room ON room.id = book_room.room_id
WHERE
    book_room.status= 'Đã đặt'
GROUP BY
    room.id, room.type_room, room.total_customer, room.price
HAVING
    COUNT(book_room.status)> 2;