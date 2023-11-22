const UserDB = require("../model/model");

exports.create = async (req, res) => {
  // Validate user input
  const { name, email, gender, status } = req.body;
  if (!name || !email || !gender || !status) {
    return res.status(400).send("All fields are required! Please try again");
  }

  const newUser = new UserDB({
    name,
    email,
    gender,
    status,
  });

  try {
    const data = await newUser.save();
    res.redirect("/add-user");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.find = async (req, res) => {
  try {
    const data = await UserDB.find();
    if (!data) {
      res.status(400).send("data not found");
      return;
    }
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await UserDB.findById(id);
    if (!data) {
      res.status(404).send({
        message: `Cannot Update user with ${id}. Maybe user not found!`,
      });
    } else {
      res.status(200).json(data); // Use 200 status for success
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .send({ message: "Data to update can not be empty" });
    }
    const id = req.params.id;
    const data = await UserDB.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    if (!data) {
      res.status(404).send({
        message: `Cannot Update user with ${id}. Maybe user not found!`,
      });
    } else {
      res.status(200).json(data); // Use 200 status for success
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await UserDB.findByIdAndDelete(id);
    if (!data) {
      res.status(404).send({
        message: `Cannot find user with ${id}. Maybe user not found!`,
      });
      return;
    }
    res.status(201).send("Data has been deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
