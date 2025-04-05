const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, verifyOTP} = require('../controllers/userController');
const { authenticateUser } = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');
const { registerUserSchema, loginUserSchema,verifyOTPSchema } = require('../validations/userValidation');
const { verify } = require('jsonwebtoken');


router.post('/register', validateRequest(registerUserSchema), registerUser);
router.post('/login', validateRequest(loginUserSchema), loginUser);
router.post('/verify', validateRequest(verifyOTPSchema), verifyOTP);
router.get('/profile', authenticateUser, getUserProfile);

module.exports = router;
