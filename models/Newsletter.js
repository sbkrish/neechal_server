// models/user.js
import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Waitlist = sequelize.define('Newsletter', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
 }, {
    tableName: 'NewsletterEmails',
    timestamps: true // Adds createdAt and updatedAt fields automatically
  });
  
  export default Waitlist;