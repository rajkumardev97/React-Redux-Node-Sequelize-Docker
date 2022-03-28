require("dotenv").config();
const express = require("express");
const cors = require("cors");
var bcrypt = require("bcryptjs");

const app = express();

var corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const User = db.user;

db.sequelize.sync({ force: true }).then(() => {
  createAdmin();
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to oncare application." });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function createAdmin() {
  User.create({
    username: "admin",
    email: "admin@oncare.com",
    password: bcrypt.hashSync("admin@123", 8),
    isAdmin: true
  });
}
