const { User } = require("../models");
console.log(User);

const findUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.status(200).json({
      status: "Success",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: "Failed to retrieve users",
      error: err.message,
    });
  }
};

const findUserById = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "Success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: "Failed to retrieve user",
      error: err.message,
    });
  }
};

const updateUser = async (req, res, next) => {
  const { name, email, phone, alamat, role } = req.body;

  try {
    const user = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
      });
    }

    await Users.update(
      {
        name,
        email,
        phone,
        alamat,
        role,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "User updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: "Failed to update user",
      error: err.message,
    });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
      });
    }

    await Users.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: "Failed to delete user",
      error: err.message,
    });
  }
};

module.exports = {
  findUsers,
  findUserById,
  updateUser,
  deleteUser,
};
