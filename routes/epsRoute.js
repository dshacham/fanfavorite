const Route = require("express").Router();
const { getEp, getEps, postEp, putEp, deleteEp } = require("../controllers/epController");
const auth = require("../middleware/authenticator");

Route.get("/", auth, getEps);
Route.get("/:id", auth, getEp);
Route.post("/", auth, postEp);
Route.put("/:id", auth, putEp);
Route.delete("/:id", auth, deleteEp);

module.exports = Route;