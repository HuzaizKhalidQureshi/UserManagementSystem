const axios = require("axios");

const homeRouter = (req, res) => {
  axios
    .get("http://localhost:3000/api/users/")
    .then(function (response) {
      console.log(response.data);
      res.render("index", { users: response.data });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
};

const addUser = (req, res) => {
  res.render("add_user");
};

const updateUser = (req, res) => {
  axios
    .get("http://localhost:3000/api/users", { params: { id: req.query.id } })
    .then(function (userdata) {
      res.render("update_user", { user: userdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  homeRouter,
  addUser,
  updateUser,
};
