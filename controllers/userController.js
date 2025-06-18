const UserService = require('../services/userService');
const Address = require('../models/Address')
const User = require('../models/User');
const Information = require('../models/Information');
const registerUser = async (req, res) => {
    try {
        const user = await UserService.createUser(req.body);
        res.status(201).json({
            message: "User registered successfully. OTP sent for verification.",
            user_id: user.id,
        });
    } catch (error) {
        console.error("Error in registerUser:", error.message);
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({
                message: "User already exists with this email or phone number",
            });
        }
        res.status(400).json({ message: error.message });
    }
};

const verifyOTP = async (req, res) => {
    const { phone_number, otp } = req.body;

    try {
        const result = await UserService.verifyOTPService(phone_number, otp);

        if (!result.success) {
            return res.status(result.status).json({ message: result.message });
        }

        res.json({ message: result.message });
    } catch (error) {
        console.error("Error in verifyOTP:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


const loginUser = async (req, res) => {
    try {
        const { phone_number, password } = req.body; 
        const token = await UserService.loginUser(phone_number, password);
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};


const getUserProfile = async (req, res) => {
    try {
        const user = await UserService.getUserById(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ success: true, data: users });
  } catch (error) {
    console.error("getAllUsers error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

// 2. Get single user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    console.error("getUserById error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};

// 3. Get all customers (role = 'customer')
const getCustomers = async (req, res) => {
  try {
    const customers = await User.findAll({ where: { role: "customer" } });
    res.json({ success: true, data: customers });
  } catch (error) {
    console.error("getCustomers error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch customers",
      error: error.message,
    });
  }
};

// 4. Get all sellers (role = 'seller')
const getSellers = async (req, res) => {
  try {
    const sellers = await User.findAll({ where: { role: "seller" } });
    res.json({ success: true, data: sellers });
  } catch (error) {
    console.error("getSellers error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch sellers",
      error: error.message,
    });
  }
};

const attachAddressToUser = async (req, res) => {
  try {
    const userId = req.user.id; // Assumes user is authenticated
    const { address_id } = req.body;

    // Just do the business logic — no validation here
    const address = await Address.findByPk(address_id);
    if (!address) {
      return res.status(404).json({ success: false, message: 'Address not found.' });
    }

    const user = await User.findByPk(userId);
    user.address_id = address_id;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Address attached to user successfully.',
      data: user,
    });
  } catch (error) {
    console.error('attachAddressToUser error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

const attachInformationToUser = async (req, res) => {
  try {
      const userId = req.user.id; // Assumes user is authenticated
      const {information_id } = req.body;

      const information = await Information.findByPk(information_id);
      if (!information) {
          return res.status(404).json({ success: false, message: 'Information not found.' });
      }

      const user = await User.findByPk(userId); // Use the correct model
      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found.' });
      }

      // CORRECTED: Assign the ID of the business_info object
      user.information_id = information.id;
      await user.save();

      return res.status(200).json({
          success: true,
          message: 'Information attached to user successfully.',
          data: user,
      });
  } catch (error) {
      console.error('attach Information error:', error);
      return res.status(500).json({
          success: false,
          message: 'Internal server error',
          error: error.message,
      });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  verifyOTP,
  getAllUsers,
  getUserById,
  getCustomers,
  getSellers,
  attachAddressToUser,
  attachInformationToUser
};
