const sequelize = require('../config/db'); // Sequelize instance
const Product = require('../models/Product'); // Load models individually
const Image = require('../models/Image'); // Load models individually
const Category= require('../models/Category'); // Load models individually
const User = require('../models/User'); // Load models individually
const Address = require('../models/Address');
const Information = require('../models/Information');

async function syncTables() {
    try {
        // Synchronize tables explicitly in 
        await Address.sync({ alter: true });
        await Information.sync({ alter: true });
        await Image.sync({ alter: true });
        await User.sync({ alter: true });
        await Category.sync({ alter: true });
        await Product.sync({ alter: true });
        
        
        


        console.log('✅ All tables synchronized successfully!');
    } catch (error) {
        console.error('❌ Error synchronizing tables:', error);
    } finally {
        await sequelize.close();
    }
}

syncTables();
