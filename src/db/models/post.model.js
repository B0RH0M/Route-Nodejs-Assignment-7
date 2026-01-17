import { DataTypes } from "@sequelize/core";
import { sequelize } from "../database.js"

export const postModel = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      table: 'users', // name of Target model
      key: 'id',      // key in Target model that we're referencing
    },
  }
}, {
  timestamps: true,
  paranoid: true,     // allow soft deletes
  tableName: "posts"
})

export default postModel;