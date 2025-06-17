const Address = require('../models/Address');

// Create new address
exports.createAddress = async (req, res) => {
  try {
    const { place_id } = req.body;

    if (!place_id) {
      return res.status(400).json({ success: false, message: 'Place ID is required.' });
    }

    // Check if address already exists
    const existingAddress = await Address.findOne({ where: { place_id } });

    if (existingAddress) {
      return res.status(200).json({
        success: true,
        message: 'Address already exists.',
        data: existingAddress
      });
    }

    // Otherwise, create a new one
    const address = await Address.create(req.body);
    res.status(201).json({ success: true, data: address });

  } catch (error) {
    console.error('Error creating address:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create address',
      error: error.message
    });
  }
};


// Get all addresses
exports.getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.findAll();
    res.status(200).json({ success: true, data: addresses });
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch addresses', error: error.message });
  }
};

// Get single address by ID
exports.getAddressById = async (req, res) => {
  try {
    const address = await Address.findByPk(req.params.id);
    if (!address) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }
    res.status(200).json({ success: true, data: address });
  } catch (error) {
    console.error('Error fetching address:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch address', error: error.message });
  }
};

// Update address
exports.updateAddress = async (req, res) => {
  try {
    const [updated] = await Address.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    const updatedAddress = await Address.findByPk(req.params.id);
    res.status(200).json({ success: true, data: updatedAddress });
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ success: false, message: 'Failed to update address', error: error.message });
  }
};

// Delete address
exports.deleteAddress = async (req, res) => {
  try {
    const deleted = await Address.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    res.status(200).json({ success: true, message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ success: false, message: 'Failed to delete address', error: error.message });
  }
};
