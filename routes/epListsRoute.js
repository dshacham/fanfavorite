const Route = require("express").Router();
const { getEpList, getEpLists, postEpList, putEpList, deleteEpList } = require("../controllers/epListController");
const auth = require("../middleware/authenticator");

Route.get("/", getEpLists);
Route.get("/:id", getEpList);
Route.post("/", auth, postEpList);
Route.put("/:id", putEpList);
Route.delete("/:id", deleteEpList);

module.exports = Route;