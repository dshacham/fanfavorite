const Route = require("express").Router();
const { getEp, getEps, postEp, putEp, deleteEp } = require("../controllers/epsController");
const auth = require("../middleware/authenticator");


Route.get("/", getEps);
Route.get("/", getEp);
Route.post("/", auth, postEp);
Route.put("/:id", putEp);
Route.delete("/:id", deleteEp);

module.exports = Route;