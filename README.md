# Inventory-management

The application is designed in forms of api structure.
Eaach CRUD operation has its own api.
I have used postgresql,node.js,swagger UI,express for develooping the aapplication.
I have chosed to export data as csv as additional feaature.

**To run the application**

Step 1:
Run following command
```sh
npm install
```

Step 2:
Install Postgresql and setup

Step 3:
open postgresql
```sh
psql postgres
```
Step4: Create database
```sh
CREATE DATABASE inventory_manage_database;
\c inventory_manage_database
```
Step5: Create sequence
```sh
create sequence inveentory_seq increment 1 start 1;
```
Step 6: Create table
```sh
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
```
Step 7: Database connection in database_setup.js. If you change name or port or any other paraameter.Please change accordingly in the database_setup.js
```sh
const pool = new Pool({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    database:process.env.DB_NAME
})
```

**Note: I have attached the script.sql file for your reference.**

After finishing previous steps.
Run following:

Step 7: run the application in node
```sh
npm start
```
The application will run on http://localhost:8000

You will be able to use the application and all the api for creating,deleting,updating, exporting product data easily. Link: http://localhost:8000/product-apis/#/

For reference of how application looks:
You can look at this link: https://inventory-manage-app.herokuapp.com/product-apis/#/

**Note: It is only for reference.Please follow all the steps above and run in localhost environment for better functioning of the app.**
