const pool = require("./database_setup");
const fs = require("fs");
const converter = require("json-2-csv");

const exportAlldata = async (req, res) => {
  try {
    const getdata = await pool.query("SELECT * FROM PRODUCT_INVENTORY");

    const jsondata = getdata.rows;
    const todos = jsondata;

    converter.json2csv(todos, (err, csv) => {
      if (err) {
        throw err;
      }
      //console.log(csv);
      fs.writeFileSync("exportdata.csv", csv);
      res.send(csv);
    });
    res.attachment('exportdata.csv');
  } catch (error) {
    res.status(500).json(error);
  }
};

const exportparticulardata = async (req, res) => {
  try {
    const { product_id } = req.params;
    const {
      product_name,
      date_of_order,
      client_name,
      client_email,
      client_address,
      quantity_ordered,
    } = req.body;
    let particulardata = {};
    const getdata = await pool.query(
      "SELECT * FROM PRODUCT_INVENTORY WHERE product_id=$1",
      [product_id]
    );
    particulardata = getdata.rows[0];
    if (!particulardata) {
      particulardata = { Information: " No data Available " };
    }
    const todos = particulardata;

    converter.json2csv(todos, (err, csv) => {
      if (err) {
        throw err;
      }

      //console.log(csv);
      fs.writeFileSync("exportdata.csv", csv)
      res.send(csv);
    });
    res.attachment("exportdata.csv");
    
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  exportAlldata,
  exportparticulardata,
};

