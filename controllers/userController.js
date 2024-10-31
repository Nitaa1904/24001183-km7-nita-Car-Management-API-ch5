const { User } = require("../models");
const imagekit = require("../lib/imagekit");

async function readAllUsers(req, res) {
  try {
    const users = await User.findAll();
    res.render("admin/userList", { users });
  } catch (error) {
    console.error(error);
    res.status(500).render("errors/500", {
      status: "Failed",
      message: "Failed to get users data",
      isSuccess: false,
      error: error.message,
    });
  }
}

const createPage = (req, res) => {
  try {
    res.render("users/create", { layout: "layout" });
  } catch (error) {
    res.render("errors/404", { layout: "layout" });
  }
};

async function getUserbyId(req, res) {
  try {
    const id = req.params.id;

    // Ambil data user berdasarkan ID
    const user = await User.findByPk(id);

    // Jika user tidak ditemukan
    if (!user) {
      return res.status(404).json({
        status: "Fail",
        message: "User not found",
        isSuccess: false,
        data: null,
      });
    }

    // Render detail user tanpa cek role
    res.render("users/detail", { user });
  } catch (error) {
    console.error(error); // Log kesalahan untuk debugging
    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: false,
      error: error.message,
    });
  }
}

const createUser = async (req, res) => {
  const { name, email, password, phone, alamat, role } = req.body;

  try {
    if (req.file) {
      const file = req.file;
      const split = file.originalname.split(".");
      const ext = split[split.length - 1];

      const uploadedPhotoProfile = await imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
        extension: ext,
      });
      req.body.foto_profil = uploadedPhotoProfile.url;
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      alamat,
      role,
      foto_profil: req.body.foto_profil,
    });

    res.redirect("/dashboard/users");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const editPage = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).render("errors/404", { layout: "layout" });
    }

    res.render("users/edit", { user, layout: "layout" });
  } catch (error) {
    return res.status(500).render("errors/500", { layout: "layout" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, phone, alamat, role } = req.body;

  try {
    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).render("errors/404", { layout: "layout" });
    }

    if (req.file) {
      const file = req.file;
      const split = file.originalname.split(".");
      const ext = split[split.length - 1];

      const uploadedPhotoProfile = await imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
        extension: ext,
      });

      if (!uploadedPhotoProfile) {
        return res.status(400).render("errors/400", { layout: "layout" });
      }

      user.foto_profil = req.body.foto_profil;
    }
    user.name = name;
    user.email = email;

    if (password) {
      user.password = password;
    }

    user.phone = phone;
    user.alamat = alamat;
    user.role = role;

    await user.save();
    res.redirect("/dashboard/users");
  } catch (error) {
    res.status(500).render("errors/500", { layout: "layout" });
  }
};

module.exports = {
  readAllUsers,
  editPage,
  createPage,
  createUser,
  updateUser,
  getUserbyId,
};
