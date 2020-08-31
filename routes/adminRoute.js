const Route = require("express").Router();
const { getUsers, getUser, putUser, deleteUser} = require("../controllers/adminController");
const auth = require("../middleware/authenticator");
const isAdmin = require("../middleware/rolesAuthenticator");


Route.get("/", auth, isAdmin, getUsers);
Route.get("/:id", auth, isAdmin, getUser);
Route.put("/:id", auth, isAdmin, putUser);
Route.delete("/:id", auth, isAdmin, deleteUser);

module.exports = Route;