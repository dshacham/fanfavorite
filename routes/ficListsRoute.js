const Route = require("express").Router();
const { getFicList, getFicLists, postFicList, putFicList, deleteFicList } = require("../controllers/ficListController");
const auth = require("../middleware/authenticator");

Route.get("/", getFicLists);
Route.get("/", getFicList);
Route.post("/", auth, postFicList);
Route.put("/:id", putFicList);
Route.delete("/:id", deleteFicList);

module.exports = Route;