const { authJwt } = require("../middleware");
const users = require("../controllers/user.controller");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Retrieve all Users
  app.get("/api/users/", [authJwt.verifyToken, authJwt.isAdmin], users.findAll);

  // Retrieve a single User with id
  app.get("/api/users/:id", [authJwt.verifyToken], users.findOne);

  // Update a User with id
  app.put(
    "/api/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    users.update
  );

  // Delete a User with id
  app.delete(
    "/api/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    users.delete
  );
};
