const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Address = require('./Address'); // Import Address model
const Image = require('./Image'); // Import Image model

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('superadmin', 'admin', 'seller', 'customer', 'driver'),
        allowNull: false
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    address_id: {  
        type: DataTypes.INTEGER,
        allowNull: true, 
        references: {
            model: Address,
            key: 'id'
        },
        onDelete: 'SET NULL' // If address is deleted, set address_id to NULL
    },
    profile_picture_id: { // Foreign key linking to Image model
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Image,
            key: 'id'
        },
        onDelete: 'SET NULL' // If profile picture is deleted, set to NULL
    }
    
}, {
    timestamps: true
});

module.exports = User;