const express = require("express");
const router = express.Router();
const userControler = require('../controller/userController')

router
  .route("/users")
  .get(userControler.get)
  .post(userControler.post);

router.put("/users", userControler.put);

router.delete("/users/:id", userControler.delete);

module.exports = router;
