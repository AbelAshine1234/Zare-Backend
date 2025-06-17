const express = require('express');
const router = express.Router();

const {
  createAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
  deleteAddress
} = require('../controllers/addressController');

const validateRequest = require('../middlewares/validateRequest');
const {
  createAddressSchema,
  updateAddressSchema
} = require('../validations/addressValidation.js');  // Adjust path and names as needed

router.post('/', validateRequest(createAddressSchema), createAddress);
router.get('/', getAllAddresses);
router.get('/:id', getAddressById);
router.put('/:id', validateRequest(updateAddressSchema), updateAddress);
router.delete('/:id', deleteAddress);

module.exports = router;
