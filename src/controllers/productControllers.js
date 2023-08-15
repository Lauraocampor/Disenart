const fs = require("fs");
const path = require("path");

const productModel = require("../models/productModel");

const controller = {
  details: (req, res) => {
    const productiId = req.params.id;
    const selectedProduct = productModel.findById(productiId);

    res.render("createdProductDetail", { product: selectedProduct });
  },
  cart: (req, res) => {
    res.render("cart");
  },
  createProduct: (req, res) => {
    res.render("createProduct");
  },
  editProduct: (req, res) => {
    const product = productModel.findById(Number(req.params.id));

    res.render("editProduct", { product });
  },
  userProduct: (req, res) => {
    const product = productModel.findById(Number(req.params.id));

    res.render("details", { product });
  },
  searchResults: function (req, res) {
    if (!req.params.category) {
      searchResults = productModel.queryResults(req.query.searchinfo);
    } else {
      searchResults = productModel.categoryResults(req.params.category);
    }
    res.render("searchResults", {searchResults});
  },

  // @GET /products

  store: (req, res) => {
    const filenames = req.files.map((file) => file.filename);

    let newProduct = {
      productName: req.body.productName,
      productColor: req.body.productColor,
      productSize: req.body.productSize,
      productPrice: req.body.productPrice,
      productDescription: req.body.productDescription,
      productStock: req.body.productStock,
      productImages: filenames,
    };

    const createdProduct = productModel.createProduct(newProduct);

    res.redirect("/products/" + createdProduct.id);
  },

  updateProduct: (req, res) => {
    const filenames = req.files.map((file) => file.filename);
    let updatedProduct = {
      id: Number(req.params.id),
    };

    updatedProduct = {
      ...updatedProduct,
      ...req.body,
      productImages: filenames,
    };

    /* 
       const updatedProduct = req.body;
       updatedProduct.id = Number(req.params.id); 
   */

    productModel.updateProduct(updatedProduct);

    //chequear este redirect cuando quede listo el listado de productos
    res.redirect("/products/productList");

    /* ' + updatedProduct.id + 
    
       detail');    */
  },

  deleteProduct: (req, res) => {
    productModel.delete(Number(req.params.id));

    //chequear este redirect cuando quede listo el listado de productos
    res.redirect("/products/productList");
  },
};

module.exports = controller;
