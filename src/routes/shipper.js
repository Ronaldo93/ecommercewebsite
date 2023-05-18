/*  RMIT University Vietnam
  Course: COSC2430 Web Programming
  Semester: 2023A
  Assessment: Assignment 2
  Author: BrotherHood group 
  ID: Bao Tuan (s3977886),Phu Chau(s3975133),Tuan Minh(s3978609),Tuan Kiet(s3978885),Minh Hien(s3978807)
  Acknowledgement: https://www.w3schools.com/ */

const express = require("express");
const router = express.Router();

const order = require("../model/order");
const distributionHub = require("../model/distributionhub");
// Make diffetent Distribution Hub page

// @route GET /shipper/:distributionHubname
// @desc render distributionHubname page
// @access private
router.get("/:distributionHubname", async (req, res) => {
  const distributionHubname = req.params.distributionHubname;
  const hub = distributionHubname.replace("-", " ");
  console.log(hub);
  // Find the id of the distribution hub
  const finalhub = await distributionHub.findOne({ name: hub })
  .then((hub) => {
    if (hub) {
      console.log(hub._id);
      return hub._id;
    } else {
      return res.send("No hub found");
    }
  });
  // Find all orders with the same distribution hub name -> populate it with distribution hub info
  order
    .find({ distributionHub: finalhub })
    .populate("distributionHub")
    .then((orders) => {
      if (orders.length > 0) {
        console.log(orders);
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
  // populate the distribution hub to get all info from distribution hub schema
  order
    .findById(id)
    .populate("distributionHub")
    .then((product) => {
      console.log(product.distributionHub.name);
      if (product.distributionHub.name == hub) {
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

  const updates = Object.keys(req.body);
  const allowedUpdates = ['order_status'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.send({ error: 'Invalid updates!' });
  }

  const updatedOrder = { order_status: req.body.order_status };

  order.findByIdAndUpdate(id, updatedOrder, {
      new: true,
      runValidators: true,
    })
    .then(order => {
      if (!order) {
        return res.send('Not found any order matching the ID!');
      }
      res.redirect('/shipper/' + distributionHubname);
    })
    .catch(error => res.send(error));
});
module.exports = router;
