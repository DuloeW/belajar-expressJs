const express = require("express");
const router = express.Router();
const userControler = require('../controller/userController')

router
  .route("/users")
  .get(userControler.get)
  .post(userControler.post);

router.get('/users/create', userControler.create)

router.get('/users/:id', userControler.getId)

router.get("/users/update/:id", userControler.update);

router.post("/user/update-user/:id", userControler.put)

router.get("/users/delete/:id", userControler.delete)

module.exports = router;
