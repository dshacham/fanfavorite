const Route = require("express").Router();
const { getFic, getFics, postFic, putFic, deleteFic } = require("../controllers/ficController");
const auth = require("../middleware/authenticator");

Route.get("/", auth, getFics);
Route.get("/:id", auth, getFic);
Route.post("/", auth, postFic);
Route.put("/:id", auth, putFic);
Route.delete("/:id", auth, deleteFic);

module.exports = Route;