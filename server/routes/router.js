const express = require("express");
const route = express.Router();

const controller = require("../controller/controller");
const services = require("../services/render");

route.get("/", services.homeRouter);
route.get("/add-user", services.addUser);
route.get("/update-user", services.updateUser);

route.post("/api/users", controller.create);
route.get("/api/users", controller.find);
route.put("/api/users/:id", controller.update);
route.delete("/api/users/:id", controller.delete);
route.get("/api/users/:id", controller.findOneUser);

module.exports = route;
