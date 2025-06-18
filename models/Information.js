const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Information = sequelize.define('Information', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  license: {
    type: DataTypes.STRING,
    allowNull: false,   // Required
    validate: {
      isUrl: {
        msg: 'License must be a valid URL.'
      }
    }
  },
  cover_picture: {
    type: DataTypes.STRING,
    allowNull: false,   // Required
    validate: {
      isUrl: {
        msg: 'Cover picture must be a valid URL.'
      }
    }
  },
  fayda: {
    type: DataTypes.STRING,
    allowNull: false,   // Required
    validate: {
      isUrl: {
        msg: 'Fayda must be a valid URL.'
      }
    }
  }
}, {
  timestamps: true
});

module.exports = Information;
