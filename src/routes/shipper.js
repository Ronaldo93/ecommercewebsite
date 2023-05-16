const express = require("express");
const router = express.Router();


const order = require("../model/order");
// Make diffetent Distribution Hub page
router.get("/:productDistributionHub", (req, res) => {
    const productDistributionHub = req.params.productDistributionHub;
    const hub = productDistributionHub.replace('-', ' ');
  
    order.find({ productDistributionHub: hub })
      .then((orders) => {
        if (orders.length > 0) {
          res.render('hub', { orders });
        } else {
          res.send("No orders found" );
        }
      })
      .catch((error) => {
        console.log("Error retrieving orders:", error);
        res.render("error", { message: "Error retrieving orders" });
      });
  });
  // Make update hub
  router.get('/:productDistributionHub/:id', (req, res) => {
    const { productDistributionHub, id } = req.params;
  
    // Replace hyphen with space in productDistributionHub
    const hub = productDistributionHub.replace('-', ' ');
    
    order.findById(id)
      .then(product => {
        if (product.productDistributionHub == hub) {
          res.render('update_hub', { product });
        } else {
          res.send('Not found any product');
        }
      })
      .catch((error) => {
        console.log("Error retrieving orders:", error);
        res.render("error", { message: "Error retrieving orders" });
      });
  });

  router.post('/:productDistributionHub/:id',(req,res)=>{
    const { productDistributionHub, id } = req.params;
  
    const hub = productDistributionHub;
    
    order.findByIdAndDelete(id)
      .then(product => {
        if (!product) {
          return res.send("Not found any product matching the ID!");
        }
        res.redirect(req.baseUrl + "/" + hub);
      })
      .catch((error) => {
        console.log("Error retrieving orders:", error);
        res.render("error", { message: "Error retrieving orders" });
      });
  })
module.exports = router;
