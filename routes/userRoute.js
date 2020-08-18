const Route = require("express").Router();
const { getUsers, getUser, postUser, putUser, deleteUser, login} = require("../controllers/userController");
const { validateUser } = require("../middleware/userValidator");
const auth = require("../middleware/authenticator");
const isAdmin = require("../middleware/rolesAuthenticator");


Route.get("/admin", auth, isAdmin, getUsers);
Route.get("/:id", auth, getUser);
Route.post("/", validateUser(), postUser);
Route.post("/login", login);
Route.put("/:id", auth, putUser);
Route.delete("/:id", auth, deleteUser);

module.exports = Route;