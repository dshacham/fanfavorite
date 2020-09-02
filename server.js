const express = require("express");
const server = express();
const mongoose = require("mongoose");
const createError = require("http-errors");
const env = require("./config/config");
const { cors } = require("./middleware/security");


const indexRoute = require("./routes/indexRoute");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const ficsRoute = require("./routes/ficsRoute");
const ficListsRoute = require("./routes/ficListsRoute");
const epsRoute = require("./routes/epsRoute");
const epListsRoute = require("./routes/epListsRoute");
const emailRouter = require("./routes/forgotPassRoute");

const PORT = process.env.PORT || 4000;

mongoose.connect(env.db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", (err) => console.log(err));
mongoose.connection.on("open", () => console.log("database connected"));

server.use(express.json());
server.use(cors);
server.use(express.urlencoded({ extended: false }));
server.use(express.static("client/build"));

server.use("/*", indexRoute);
server.use("/users", userRoute);
server.use("/admin", adminRoute);
server.use("/ficlists", ficListsRoute);
server.use("/fanfics", ficsRoute);
server.use("/eplists", epListsRoute);
server.use("/episodes", epsRoute);
server.use("/reset_password", emailRouter);

server.use((req, res, next) => {
    next(createError(404));
});

server.use((err, req, res, next) => {
    res.json({ status: err.status, err: err.message });
});

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});