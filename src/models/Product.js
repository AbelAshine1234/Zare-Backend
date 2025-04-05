const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./Category'); // Import Category model
const User = require('./User'); // Import User model

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    stock_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category_id: { // Foreign key linking to Category model
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category, // References the Category table
            key: 'id',
        },
        onDelete: 'CASCADE', // If the category is deleted, also delete the product
    },
    owner_id: { // Foreign key linking to User model
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // References the User table
            key: 'id',
        },
        onDelete: 'CASCADE', // If the user is deleted, also delete the product
    },
    images: {
        type: DataTypes.JSON, // Use JSON to store multiple image URLs
        allowNull: true,
        validate: {
            isArray(value) {
                if (!Array.isArray(value)) {
                    throw new Error('Images must be an array of URLs.');
                }
            }
        }
    }
}, {
    timestamps: true,
});

module.exports = Product;
