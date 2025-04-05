const UserService = require('../services/userService');
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

module.exports = { registerUser, loginUser, getUserProfile,verifyOTP };
