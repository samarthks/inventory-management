--create database
CREATE DATABASE inventory_manage_database;

--create sequence
create sequence inveentory_seq increment 1 start 1;

--Create table query
CREATE TABLE product_inventory(
		product_id INTEGER NOT NULL DEFAULT nextval('inveentory_seq'),
		product_name varchar(50) NOT NULL,
		date_of_order TIMESTAMP NOT NULL,
       client_name varchar(50),
       client_email varchar(50),
		client_address varchar(100),
		quantity_ordered integer,
		CONSTRAINT prod PRIMARY KEY(product_id)
);