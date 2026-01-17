import { DataTypes } from "@sequelize/core";
import { sequelize } from "../database.js"

export const commentModel = sequelize.define("Comment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      table: 'posts', // name of Target model
      key: 'id',      // key in Target model that we're referencing
    },
  }
  ,
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
  tableName: "comments"
})

export default commentModel;