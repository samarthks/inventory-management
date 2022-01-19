require("dotenv").config();
const cors = require("cors");
const express = require("express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const {
  create_product_data,
  updateparticulardata,
  getAlldata,
  getparticulardata,
  deleteAlldata,
  deleteparticulardata,
} = require("./crud");
const { exportAlldata, exportparticulardata } = require("./exportcsv");

const app = express();
const PORT = process.env.CLIENT_PORT;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Inventory Management API",
      version: "1.0.0",
      description: "Inventory Management API for all the products.",
      servers: ["http://localhost:8000"],
    },
  },
  apis: ["index.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/product-apis", swaggerUI.serve, swaggerUI.setup(swaggerDocs));


app.use(express.json());

/**
 * @swagger
 * definitions:
 *  Product_inventory:
 *   type: object
 *   properties:
 *    product_name:
 *     type: string
 *     description: name of the product
 *     example: 'TV'
 *    date_of_order:
 *     type: string
 *     description: date of order
 *     example: '2022-01-05'
 *    client_name:
 *     type: string
 *     description: name of the client
 *     example: 'ABC'
 *    client_email:
 *     type: string
 *     description: email of the client
 *     example: 'ABC@email.com'
 *    client_address:
 *     type: string
 *     description: address of the client
 *     example: 'CANADA'
 *    quantity_ordered:
 *     type: integer
 *     description: quantity ordered
 *     example: 4
 */

/**
 * @swagger
 * /product:
 *  post:
 *   summary: create product
 *   description: create product for the inventory management
 *   requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Product_inventory'
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */
app.post("/product", cors(), create_product_data);

//Get all data
/**
 * @swagger
 * /getproduct:
 *  get:
 *   summary: get all product data
 *   description: list of all the products
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */
app.get("/getproduct", getAlldata);

//Get particular employee with unique product id
/**
 * @swagger
 * /getproduct/{product_id}:
 *  get:
 *   summary: get particular product
 *   description: get particular product details
 *   parameters:
 *    - in: path
 *      name: product_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the product
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 */
app.get("/getproduct/:product_id", getparticulardata);

//edit data with particular id
/**
 * @swagger
 * /updateproduct/{product_id}:
 *  put:
 *   summary: update product
 *   description: updates the product details of requested product id. Edit the data in the Request Body column
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: product_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: product_id of the product
 *      example: 2
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Product_inventory'
 *   responses:
 *    200:
 *     description: success
 */
app.put("/updateproduct/:product_id", updateparticulardata);

//delete data with particular id

/**
 * @swagger
 * /deleteproduct/{product_id}:
 *  delete:
 *   summary: delete product
 *   description: delete product with particular product id
 *   parameters:
 *    - in: path
 *      name: product_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: product id of the product
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 */
app.delete("/deleteproduct/:product_id", deleteparticulardata);

//delete all data
/**
 * @swagger
 * /deleteproduct:
 *  delete:
 *   summary: delete all product data
 *   description: no product data is available
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */
app.delete("/deleteproduct", deleteAlldata);

//export all data to csv
/**
 * @swagger
 * /exportproduct:
 *  get:
 *   summary: get all product data in csv
 *   description: After clicking try it out button it will genereate a file. CLick downlad file and it will generate csv file on your machine.
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */
app.get("/exportproduct", exportAlldata);

//export data with product id to csv
/**
 * @swagger
 * /exportproduct/{product_id}:
 *  get:
 *   summary: get particular product data in csv
 *   description: After clicking try it out button it will genereate a file. CLick downlad file and it will generate csv file on your machine.
 *   parameters:
 *    - in: path
 *      name: product_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: product id of the product
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 */
app.get("/exportproduct/:product_id", exportparticulardata);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

