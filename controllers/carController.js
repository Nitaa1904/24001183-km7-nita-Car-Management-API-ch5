const { Car } = require("../models");
const imagekit = require("../lib/imagekit");
const path = require("path");

// CREATE a new car
const createCar = async (req, res) => {
    const { name, stock, price } = req.body;
    const imageFile = req.file;
    try {
      let imageUrl = null;
  
      if (imageFile) {
        const uploadResponse = await imagekit.upload({
          file: imageFile.buffer.toString('base64'),
          fileName: `${name}_image`, 
        });
        imageUrl = uploadResponse.url;
      }
  
      const newCar = await Car.create({
        name,
        images: imageUrl,
        stock,
        price,
      });
  
      res.status(201).json({
        status: "Success",
        message: "Car created successfully",
        data: newCar,
      });
    } catch (error) {
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
    const imageFile = req.file;
    try {
      const car = await Car.findByPk(req.params.id);
      if (!car) {
        return res.status(404).json({
          status: "Error",
          message: "Car not found",
        });
      }
  
      let imageUrl = car.images;
  
      if (imageFile) {
        const uploadResponse = await imagekit.upload({
          file: imageFile.buffer.toString('base64'),
          fileName: `${name}_updated_image`,
        });
        imageUrl = uploadResponse.url;
      }
  
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