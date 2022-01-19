const pool=require('./database_setup');

const create_product_data= async (req, res) => {
    try {
      const {
        product_name,
        date_of_order,
        client_name,
        client_email,
        client_address,
        quantity_ordered,
      } = req.body;
      const insert_data = await pool.query(
        "INSERT INTO PRODUCT_INVENTORY(product_name,date_of_order,client_name,client_email,client_address,quantity_ordered) VALUES($1,$2,$3,$4,$5,$6) returning *",
        [
          product_name,
          date_of_order,
          client_name,
          client_email,
          client_address,
          quantity_ordered,
        ]
      );
      //console.log(insert_data.rows[0]);
      res.json(insert_data.rows[0]);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  const getAlldata=async (req, res) => {
    try {
      const getdata = await pool.query("SELECT * FROM PRODUCT_INVENTORY");
      res.json(getdata.rows);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  const getparticulardata=async (req, res) => {
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
        particulardata = { Information: " No data Available. Please check product id. " };
      }
      res.json(particulardata);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  const updateparticulardata=async (req, res) => {
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
      const updatedata = await pool.query(
        "UPDATE PRODUCT_INVENTORY SET product_name= $1, date_of_order= $2, client_name= $3, client_email= $4, client_address= $5, quantity_ordered= $6 WHERE product_id= $7 returning *",
        [
          product_name,
          date_of_order,
          client_name,
          client_email,
          client_address,
          quantity_ordered,
          product_id,
        ]
      );
      res.json(updatedata.rows[0]);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  const deleteparticulardata=async (req, res) => {
    try {
      const { product_id } = req.params;
      let del = {};
      const deletedata = await pool.query(
        "DELETE FROM PRODUCT_INVENTORY WHERE product_id= $1 returning *",
        [product_id]
      );
      del = deletedata.rows[0];
      if (!del) {
        del = { Information: "  No data Available. Please check product id. " };
      }
      res.json(del);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  const deleteAlldata=async (req, res) => {
    try {
      const { product_id } = req.params;
      let del = {};
      const deletedata = await pool.query(
        "DELETE FROM PRODUCT_INVENTORY");
      del = deletedata.rows[0];
      if (!del) {
        del = { Information: " No data Available " };
      }
      res.json(del);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  module.exports={
    create_product_data,
    updateparticulardata,
    getAlldata,
    getparticulardata,
    deleteAlldata,
    deleteparticulardata  
  }