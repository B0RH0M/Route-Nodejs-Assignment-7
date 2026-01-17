import { DataTypes } from "@sequelize/core";
import { sequelize } from "../database.js"

export const userModel = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      checkLength(value) { // custom validator to check name length
        if (value.length <= 2) {
          throw new Error("Name must be longer than 2 characters.");
        }

        return true;
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      value: true,
      msg: "Email address already in use!"
    },
    validate: {
      isEmail: true // apply built-in validation to validate the email format
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      checkLength(value) { // custom validator to check password length
        if (value.length <= 6) {
          throw new Error("Password must be longer than 6 characters.");
        }

        return true;
      },
      // I prefer to use this regex for better password validation
      // RegExp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
    }
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user',
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoid: true, // allow soft deletes
  tableName: "users"
})

export default userModel;