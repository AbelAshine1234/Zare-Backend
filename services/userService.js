const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const twilio = require('twilio')
const User = require('../models/User');
require('dotenv').config();

const crypto = require('crypto');
const { sendOTP } = require("../utils/sendOTP");
const client = twilio("ACad91b82ae8a1a8de3957958635a3be70", "2978199df6f773719806bf552ca8e420");


const createUser = async (userData) => {
    const { name, surname, phone_number, email, password, role } = userData;

    // Hash password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with `verified: false`
    const user = await User.create({
        name,
        surname,
        phone_number,
        email,
        password: hashedPassword,
        role,
        verified: false,
    });

    // Send OTP to user's phone using Twilio Verify
    await sendOTP(phone_number);

    return user;
};



 

const verifyOTPService = async (phone_number, otp) => {
  if (!process.env.VERIFY_SERVICE_SID) {
    return {
      success: false,
      status: 500,
      message: "Verification service configuration missing.",
    };
  }

  try {
    const verificationCheck = await client.verify.v2
      .services(process.env.VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: phone_number,
        code: otp,
      });

    if (verificationCheck.status === "approved") {
       // Mark the user as verified in your database
       const user = await User.findOne({ where: { phone_number } });
       if (user) {
           user.verified = true;
           await user.save();
       }

       return { success: true, message: "User verified successfully" }
    } else {
      return {
        success: false,
        status: 400,
        message: "OTP verification failed or code incorrect.",
      };
    }
  } catch (error) {
    // This can be due to Twilio errors, network issues, etc.
    return {
      success: false,
      status: 500,
      message: error.message || "Verification service error.",
    };
  }
};

  



const loginUser = async (phone_number, password) => {
    const user = await User.findOne({ where: { phone_number } });

    if (!user) throw new Error("User not found");

    if (!user.verified) throw new Error("User is not verified");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};


const getUserById = async (id) => {
    const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
    if (!user) throw new Error('User not found');
    return user;
};

module.exports = { createUser, loginUser, getUserById, verifyOTPService };
