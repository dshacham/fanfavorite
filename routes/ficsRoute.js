const Route = require("express").Router();
const { getFic, getFics, postFic, putFic, deleteFic } = require("../controllers/ficsController");
const { getFicList, getFicLists, postFicList, putFicList, deleteFicList } = require("../controllers/ficListController");
const auth = require("../middleware/authenticator");

Route.get("/", auth, getFicLists);
Route.get("/:id", auth, getFicList);
Route.post("/", auth, postFicList);
Route.put("/:id", auth, putFicList);
Route.delete("/:id", auth, deleteFicList);

Route.get("/", getFics);
Route.get("/:id", getFic);
Route.post("/", auth, postFic);
Route.put("/:id", auth, putFic);
Route.delete("/:id", auth, deleteFic);

module.exports = Route;