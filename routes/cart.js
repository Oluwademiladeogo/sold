const express = require("express");
const router = express.Router();
const { cartschema } = require("../models/cart");
router.get("/", async (req, res) => {
  try {
    if (!req.cookies.cartitem) {
      res.cookie("cartitem", []);
    }
    let card = req.cookies.cartitem;
    // console.log(req.cookies, req.cookies.cartitem)
    const items = [];
    for (let i = 0; i < card.length; i++) {
      const cardval = card[i];

      const carditem = await cartschema.findOne({ card: cardval });
      items.push(carditem);
    }
    items.forEach((item) => {
      // console.log(item.cardname)
    });
    res.render("pages/cart", {
      cookies: req.cookies,
      //number of cards in cart
      length: card.length,
      items: items,
    });
  } catch (error) {
    console.error(error);
    let message = "Something happened, please log in to view cart";
    res.status(500).render("pages/error", {
      message: message,
      cookies: req.cookies,
      errcode: 500,
      link: "/logout",
    });
  }
});
router.post("/", async (req, res) => {
  try {
    const card = await cartschema.findOne({ card: req.body.card });
    //not completed. remains to update quantity, possibly, we use mongo
    if (card) {
      const additem = card.card;
      const existingCartItems = req.cookies.cartitem || [];
      // Find the index of the card in existingCartItems
      const existingCartItemIndex = existingCartItems.findIndex(
        (item) => item.card === card
      );
      //   console.log(existingCartItemIndex, existingCartItems)

      if (existingCartItemIndex !== -1) {
        // console.log(existingCartItemIndex, existingCartItems)
        // If the card already exists in the cart, increase its quantity
        existingCartItems[existingCartItemIndex].quantity++;
      } else {
        // If the card is not in the cart, add it with quantity 1
        existingCartItems.push(additem);
      }
      //   console.log(existingCartItems)
      // Set the updated cartitem cookie
      res.cookie("cartitem", existingCartItems);
      //   console.log("done", req.cookies.cartitem);
      res.redirect(req.body.dir);
    } else {
      let message = "Item not found";
      res.status(404).render("pages/error", {
        message: message,
        cookies: req.cookies,
        errcode: 404,
        link: "/logout",
      });
    }
  } catch (error) {
    console.error(error);
    let message = "Internal Server Error";
    res.status(500).render("pages/error", {
      message: message,
      cookies: req.cookies,
      errcode: 500,
      link: "/logout",
    });
  }
});

module.exports = router;
