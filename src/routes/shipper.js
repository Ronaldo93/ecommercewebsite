const express = require("express");
const router = express.Router();

const order = require("../model/order");
// Make diffetent Distribution Hub page

// @route GET /shipper/:distributionHubname
// @desc render distributionHubname page
// @access private
router.get("/:distributionHubname", (req, res) => {
  const distributionHubname = req.params.distributionHubname;
  const hub = distributionHubname.replace("-", " ");

  order
    .find({ distributionHubname: hub })
    .then((orders) => {
      if (orders.length > 0) {
        res.render("hub", { orders });
      } else {
        res.send("No orders found");
      }
    })
    .catch((error) => {
      console.log("Error retrieving orders:", error);
      res.render("error", { message: "Error retrieving orders" });
    });
});

// Make update hub
router.get("/:distributionHubname/:id", (req, res) => {
  const { distributionHubname, id } = req.params;

  // Replace hyphen with space in distributionHubname
  const hub = distributionHubname.replace("-", " ");

  order
    .findById(id)
    .then((product) => {
      if (product.distributionHubname == hub) {
        res.render("update_hub", { product });
      } else {
        res.send("Not found any product");
      }
    })
    .catch((error) => {
      console.log("Error retrieving orders:", error);
      res.render("error", { message: "Error retrieving orders" });
    });
});

router.post("/:distributionHubname/:id", (req, res) => {
  const { distributionHubname, id } = req.params;

  const hub = distributionHubname;

  order
    .findByIdAndDelete(id)
    .then((product) => {
      if (!product) {
        return res.send("Not found any product matching the ID!");
      }
      res.redirect(req.baseUrl + "/" + hub);
    })
    .catch((error) => {
      console.log("Error retrieving orders:", error);
      res.render("error", { message: "Error retrieving orders" });
    });
});
module.exports = router;
