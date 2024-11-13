// models/user.js
import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Registration = sequelize.define('Student', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    gender: {
      type: DataTypes.ENUM('Male', 'Female', 'Other'),
      allowNull: false
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    whatsapp: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    laptop: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    degree: {
      type: DataTypes.ENUM('UG', 'PG', 'Diploma', 'Other'),
      allowNull: false
    },
    graduation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        len: [4, 4]
      }
    },
    dialCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 5]
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Students',
    timestamps: true // Adds createdAt and updatedAt fields automatically
  });
  
  export default Registration;