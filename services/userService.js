const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const twilio = require('twilio')
const User = require('../models/User');
require('dotenv').config();

const crypto = require('crypto');
const { sendOTP } = require("../utils/sendOTP");
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


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
    try {
        const verificationCheck = await client.verify.v2
            .services(process.env.VERIFY_SERVICE_SID)
            .verificationChecks.create({ to: phone_number, code: otp });

        if (verificationCheck.status !== "approved") {
            return { success: false, status: 400, message: "Invalid or expired OTP" };
        }

        // Mark the user as verified in your database
        const user = await User.findOne({ where: { phone_number } });
        if (user) {
            user.verified = true;
            await user.save();
        }

        return { success: true, message: "User verified successfully" };
    } catch (error) {
        console.error("OTP verification failed:", error.message);
        return { success: false, status: 500, message: "Failed to verify OTP. Please try again." };
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
