const express = require("express");
const multer = require("multer")
const rooter = express.Router();
const bookController = require("../controller/bookController");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploud/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage });

rooter
  .route("/books")
  .get(bookController.get)
  .post(upload.single('file') ,bookController.post)

rooter
  .route("/books/create")
  .get(bookController.create)
  .post( bookController.post);
  
rooter.get("/books/:id", bookController.detail);

module.exports = rooter;
