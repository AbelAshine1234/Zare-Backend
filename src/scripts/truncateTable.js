const sequelize = require('../config/db'); // Adjust the path based on your project structure
const User = require('../models/User');
const Address = require('../models/Address');
const Image = require('../models/Image');

async function truncateTables() {
    try {
        await sequelize.sync(); // Ensure tables exist before truncating
        
        await User.destroy({ where: {}, force: true });
        await Address.destroy({ where: {}, force: true });
        await Image.destroy({ where: {}, force: true });
        
        console.log('All tables truncated successfully!');
    } catch (error) {
        console.error('Error truncating tables:', error);
    }
}

truncateTables();