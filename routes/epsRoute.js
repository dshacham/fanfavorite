const Route = require("express").Router();
const { getEp, getEps, postEp, putEp, deleteEp } = require("../controllers/epsController");
const { getEpList, getEpLists, postEpList, putEpList, deleteEpList } = require("../controllers/epListController");
const auth = require("../middleware/authenticator");

Route.get("/", auth, getEpLists);
Route.get("/:id", auth, getEpList);
Route.post("/", auth, postEpList);
Route.put("/:id", auth, putEpList);
Route.delete("/:id", auth, deleteEpList);

Route.get("/", auth, getEps);
Route.get("/:id", auth, getEp);
Route.post("/", auth, postEp);
Route.put("/:id", auth, putEp);
Route.delete("/:id", auth, deleteEp);

module.exports = Route;