const Route = require("express").Router();
const { getUsers, getUser, putUserInfo, putPassword, deleteUser} = require("../controllers/adminController");
const auth = require("../middleware/authenticator");
const isAdmin = require("../middleware/rolesAuthenticator");


Route.get("/", auth, isAdmin, getUsers);
Route.get("/:id", auth, isAdmin, getUser);
Route.put("/userinfo/:id", auth, isAdmin, putUserInfo);
Route.put("/password/:id", auth, isAdmin, putPassword);
Route.delete("/:id", auth, isAdmin, deleteUser);

module.exports = Route;