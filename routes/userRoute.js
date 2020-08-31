const Route = require("express").Router();
const { getUsers, getUser, postUser, putUsername, putPassword, deleteUser, login} = require("../controllers/userController");
const { validateUser } = require("../middleware/userValidator");
const { editUsernameValidator } = require("../middleware/editUsernameValidator");
const { editPasswordValidator } = require("../middleware/editPasswordValidator");
const auth = require("../middleware/authenticator");

Route.get("/", auth, getUser);
Route.post("/", validateUser(), postUser);
Route.post("/login", login);
Route.put("/username", auth, editUsernameValidator(), putUsername);
Route.put("/password", auth, editPasswordValidator(), putPassword);
Route.delete("/:id", auth, deleteUser);

module.exports = Route;