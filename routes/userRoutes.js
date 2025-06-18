const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, verifyOTP,getAllUsers,getUserById,getCustomers,getSellers,attachAddressToUser,attachInformationToUser} = require('../controllers/userController');
const { authenticateUser } = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');
const { registerUserSchema, loginUserSchema,verifyOTPSchema,attachAddressSchema ,attachInformationSchema} = require('../validations/userValidation');
const { verify } = require('jsonwebtoken');


router.post('/register', validateRequest(registerUserSchema), registerUser);
router.post('/login', validateRequest(loginUserSchema), loginUser);
router.post('/verify', validateRequest(verifyOTPSchema), verifyOTP);
router.get('/profile', authenticateUser, getUserProfile);


// Analytics geting all users and e.t.c

router.get('/', authenticateUser, getAllUsers);
router.get('/:id', authenticateUser, getUserById);
router.get('/role/customers', authenticateUser, getCustomers);
router.get('/role/sellers', authenticateUser, getSellers);


// Attach user to address

router.post('/attach-address', authenticateUser, validateRequest(attachAddressSchema), attachAddressToUser);
router.post('/attach-information', authenticateUser, validateRequest(attachInformationSchema), attachInformationToUser);


module.exports = router;
