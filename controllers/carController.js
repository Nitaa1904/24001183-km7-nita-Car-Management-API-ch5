const { Car } = require("../models");
const imagekit = require("../lib/imagekit");
const path = require("path");

// CREATE a new car
const createCar = async (req, res) => {
    try {
      const file = req.file; // Ambil file dari req.file
  
      // Pastikan ada file yang di-upload
      if (!file) {
        return res.status(400).json({
          status: "Error",
          message: "Image file is required",
        });
      }
  
      const split = file.originalname.split(".");
      const ext = split[split.length - 1]; // Dapatkan ekstensi file
      const { name, stock, price } = req.body;
  
      // Upload file ke ImageKit
      const uploadedImage = await imagekit.upload({
        file: file.buffer, // Ambil buffer file untuk di-upload
        fileName: `${split[0]}-${Date.now()}.${ext}`, // Nama file unik
      });
  
      // Periksa jika upload gagal
      if (!uploadedImage) {
        return res.status(500).json({
          status: "Error",
          message: "Failed to upload image to ImageKit",
        });
      }
  
      // Buat entri mobil baru di database
      const newCar = await Car.create({
        name,
        images: uploadedImage.url, // Simpan URL gambar dari ImageKit
        stock,
        price,
      });
  
      // Kirim response sukses
      res.status(201).json({
        status: "Success",
        message: "Car created successfully",
        data: newCar,
      });
    } catch (error) {
      // Tangani error
      res.status(500).json({
        status: "Error",
        message: "Failed to create car",
        error: error.message,
      });
    }
  };
  
  
  
  // READ all cars
async function getAllCars(req, res) {
    try {
      const cars = await Car.findAll();
      return res.status(200).json({
        status: "Success",
        message: "Cars retrieved successfully",
        data: cars,
      });
    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            message: error.message,
            isSuccess: false,
            data: null,
        });
    }
  };
  
  // READ a single car by ID
  const getCarById = async (req, res) => {
    try {
      const id = req.params.id;
      const car = await Car.findByPk(id);
      if (!car) {
        return res.status(404).json({
            status: "Fail",
            message: "Car not found",
            isSuccess: false,
            data: null,
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Car retrieved successfully",
        data: car,
      });
    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            message: error.message,
            isSuccess: false,
            data: null,
        });
    }
  };
  
  // UPDATE a car by ID
  const updateCar = async (req, res) => {
    const { name, stock, price } = req.body;
    const file = req.file; // Ganti images dengan file
    try {
      const car = await Car.findByPk(req.params.id);
      if (!car) {
        return res.status(404).json({
          status: "Error",
          message: "Car not found",
        });
      }
  
      let imageUrl = car.images; // Ambil URL gambar lama
  
      // Periksa apakah ada file baru yang di-upload
      if (file) {
        const uploadResponse = await imagekit.upload({
          file: file.buffer.toString('base64'),
          fileName: `${name}_updated_image`,
        });
        imageUrl = uploadResponse.url; // Update URL gambar
      }
  
      // Update informasi mobil
      await car.update({
        name,
        images: imageUrl,
        stock,
        price,
      });
  
      res.status(200).json({
        status: "Success",
        message: "Car updated successfully",
        data: car,
      });
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: "Failed to update car",
        error: error.message,
      });
    }
  };
  
  
  
  // DELETE a car by ID
  const deleteCar = async (req, res) => {
    try {
      const deleted = await Car.destroy({
        where: { id: req.params.id },
      });
      if (!deleted) {
        return res.status(404).json({
          status: "Error",
          message: "Car not found",
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Car deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: "Failed to delete car",
        error: error.message,
      });
    }
  };
  
  module.exports = {
    createCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar,
  };