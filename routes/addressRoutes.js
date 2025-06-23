const express = require('express');
const router = express.Router();

const {
  createAddressAndAttachToUser,
  getAllAddresses,
  getAddressById,
  updateAddress,
  deleteAddress
} = require('../controllers/addressController');
const { authenticateUser } = require('../middlewares/authMiddleware');


const validateRequest = require('../middlewares/validateRequest');
const {
  createAddressSchema,
  updateAddressSchema
} = require('../validations/addressValidation.js');  // Adjust path and names as needed

router.post(
  '/',
  authenticateUser,
  validateRequest(createAddressSchema),
  createAddressAndAttachToUser
);

router.get('/', getAllAddresses);
router.get('/:id', getAddressById);
router.put('/:id', validateRequest(updateAddressSchema), updateAddress);
router.delete('/:id', deleteAddress);

module.exports = router;
