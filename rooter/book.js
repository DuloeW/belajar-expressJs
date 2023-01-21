const express = require("express");
const rooter = express.Router();
const bookController = require("../controller/bookController");
const uploudFile = require("../middleware/uploud")


rooter
  .route("/books")
  .get(bookController.get)
  .post(uploudFile.single("gambar") ,bookController.post)

rooter.get("/books/create", bookController.create)
rooter.get("/books/:id", bookController.detail);
rooter.get("/books/update/:id", bookController.update)

rooter.post("/books/update-book/:id", uploudFile.single("gambar"), bookController.put)

module.exports = rooter;
