CREATE DATABASE medicine_delivery;

CREATE TABLE "User" (
  id serial PRIMARY KEY,
  name varchar NOT NULL,
  email varchar NOT NULL,
  phone varchar(20) NOT NULL,
  address varchar NOT NULL
);

CREATE TABLE Shop (
  id serial PRIMARY KEY,
  name varchar UNIQUE NOT NULL
);

CREATE TABLE MedicineItem (
  id serial PRIMARY KEY,
  name varchar NOT NULL,
  price real NOT NULL,
  image_name varchar NOT NULL,
  shop_id integer NOT NULL
);

CREATE TABLE OrderItem (
  id serial PRIMARY KEY,
  quantity integer NOT NULL,
  medicine_item_id integer NOT NULL,
  order_id integer NOT NULL
);

CREATE TABLE "Order" (
  id serial PRIMARY KEY,
  user_id integer NOT NULL
);

ALTER TABLE MedicineItem ADD FOREIGN KEY (shop_id) REFERENCES Shop (id);

ALTER TABLE OrderItem ADD FOREIGN KEY (medicine_item_id) REFERENCES MedicineItem (id);

ALTER TABLE OrderItem ADD FOREIGN KEY (order_id) REFERENCES "Order" (id);

ALTER TABLE "Order" ADD FOREIGN KEY (user_id) REFERENCES "User" (id);

INSERT INTO Shop(name) VALUES ('Health Plus');
INSERT INTO Shop(name) VALUES ('WellCare');
INSERT INTO Shop(name) VALUES ('MediCure');
INSERT INTO Shop(name) VALUES ('CureMart');

INSERT INTO MedicineItem(name, price, image_name, shop_id) VALUES ('Aspirin', 5.99, 'HP-Aspirin.jpg', 1);
INSERT INTO MedicineItem(name, price, image_name, shop_id) VALUES ('Ibuprofen', 7.49, 'HP-Ibuprofen.jpg', 1);
INSERT INTO MedicineItem(name, price, image_name, shop_id) VALUES ('Amoxicillin', 12.99, 'HP-Amoxicillin.webp', 1);
INSERT INTO MedicineItem(name, price, image_name, shop_id) VALUES ('Loratadine', 8.75, 'HP-Loratadine.jpg', 1);
INSERT INTO MedicineItem(name, price, image_name, shop_id) VALUES ('Omeprazole', 15.25, 'HP-Omeprazole.jpg', 1);

INSERT INTO MedicineItem(name, price, image_name, shop_id) VALUES ('Paracetamol', 4.50, 'WC-Paracetamol.jpg', 2);
INSERT INTO MedicineItem(name, price, image_name, shop_id) VALUES ('Ciprofloxacin', 10.99, 'WC-Ciprofloxacin.jpg', 2);
INSERT INTO MedicineItem(name, price, image_name, shop_id) VALUES ('Diphenhydramine', 6.25, 'WC-Diphenhydramine.webp', 2);
INSERT INTO MedicineItem(name, price, image_name, shop_id) VALUES ('Hydrochlorothiazide', 9.99, 'WC-Hydrochlorothiazide.jpg', 2);

INSERT INTO MedicineItem(name, price, image_name, shop_id) VALUES ('Atorvastatin', 11.75, 'MC-Atorvastatin.jpg', 3);
INSERT INTO MedicineItem(name, price, image_name, shop_id) VALUES ('Prednisone', 8.99, 'MC-Prednisone.jpg', 3);
INSERT INTO MedicineItem(name, price, image_name, shop_id) VALUES ('Sertraline', 13.50, 'MC-Sertraline.jpg', 3);
INSERT INTO MedicineItem(name, price, image_name, shop_id) VALUES ('Lisinopril', 6.75, 'MC-Lisinopril.webp', 3);

INSERT INTO MedicineItem(name, price, image_name, shop_id) VALUES ('Acetaminophen', 5.25, 'CM-Acetaminophen.jpg', 4);
INSERT INTO MedicineItem(name, price, image_name, shop_id) VALUES ('Ranitidine', 6.99, 'CM-Ranitidine.jpg', 4);
INSERT INTO MedicineItem(name, price, image_name, shop_id) VALUES ('Amlodipine', 9.50, 'CM-Amlodipine.jpg', 4);
INSERT INTO MedicineItem(name, price, image_name, shop_id) VALUES ('Clonazepam', 8.25, 'CM-Clonazepam.jpg', 4);
INSERT INTO MedicineItem(name, price, image_name, shop_id) VALUES ('Levothyroxine', 12.99, 'CM-Levothyroxine.jpg', 4);
INSERT INTO MedicineItem(name, price, image_name, shop_id) VALUES ('Simvastatin', 10.25, 'CM-Simvastatin.jpg', 4);