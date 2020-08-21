const Route = require("express").Router();
const { getFic, getFics, postFic, putFic, deleteFic } = require("../controllers/ficsController");
const auth = require("../middleware/authenticator");

Route.get("/", getFics);
Route.get("/", getFic);
Route.post("/", auth, postFic);
Route.put("/:id", putFic);
Route.delete("/:id", deleteFic);

module.exports = Route;