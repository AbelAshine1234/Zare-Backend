const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
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
    timestamps: true
});

module.exports = Category;
