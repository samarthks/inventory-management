require("dotenv").config();
const express = require("express");

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

app.use(express.json());

//insert data
app.post("/product", create_product_data);

//Get all data
app.get("/getproduct", getAlldata);

//Get particular employee with unique product id
app.get("/getproduct/:product_id", getparticulardata);

//edit data with particular id
app.put("/updateproduct/:product_id", updateparticulardata);

//delete data with particular id
app.delete("/deleteproduct/:product_id", deleteparticulardata);

//delete all data
app.delete("/deleteproduct", deleteAlldata);

//export all data to csv
app.get("/exportproduct", exportAlldata);

//export data with product id to csv
app.get("/exportproduct/:product_id", exportparticulardata);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
