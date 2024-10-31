const { User } = require('../models');
const bcrypt = require('bcrypt');

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
    const users = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!users) {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "Success",
      data: users,
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
  const { name, email, password, phone, alamat, role } = req.body;

  try {
    const user = await User.findOne({
      where: { id: req.params.id },
    });

    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "Pengguna tidak ditemukan",
        isSuccess: false,
      });
    }

    // Update data secara langsung ke instance user
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password; // Remember to hash passwords before saving
    user.phone = phone || user.phone;
    user.alamat = alamat || user.alamat;
    user.role = role || user.role;

    await user.save();

    res.status(200).json({
      status: "Success",
      message: "Sukses update user",
      isSuccess: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Failed",
      message: "Terjadi kesalahan pada server",
      isSuccess: false,
    });
  }
};

const createUser = async (req, res, next) => {
  const { name, email, password, phone, alamat, role } = req.body;

  // Cek jika password tidak ada atau kosong
  if (!password) {
    return res.status(400).json({
      status: "Failed",
      message: "Password harus diisi",
      isSuccess: false,
    });
  }

  try {
    // Enkripsi password sebelum menyimpannya
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword, // Simpan password terenkripsi
      phone,
      alamat,
      role,
    });

    res.status(201).json({
      status: "Success",
      message: "Pengguna berhasil dibuat",
      data: newUser,
      isSuccess: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Failed",
      message: "Gagal membuat pengguna",
      error: err.message,
      isSuccess: false,
    });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
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

    await User.destroy({
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
  createUser,
  deleteUser,
};
