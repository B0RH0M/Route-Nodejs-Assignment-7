import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';

// I using neonDB for this project
export const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: 'neondb',
  user: 'neondb_owner',
  password: 'npg_Wg2YSH3pZlmU',
  host: 'ep-weathered-frog-ah0dc8bv-pooler.c-3.us-east-1.aws.neon.tech',
  port: 5432,
  ssl: true,
  clientMinMessages: 'notice',
});

export const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to db successfully.")
  } catch(error) {
    console.error("Unable to connect to database.", error)
  }
}

export const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: false, force: false });  
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  } 
}