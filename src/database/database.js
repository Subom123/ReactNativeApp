// database.js
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydatabase.db');

const createTables = () => {
  db.transaction((tx) => {
    // Create the Recipes table
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS Recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT
      )
    `);
    // Create the Favorites table
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS Favorites (
        recipeId INTEGER PRIMARY KEY,
        name TEXT,
        rating TEXT,
        time TEXT,
        difficulty TEXT,
        calories TEXT,
        color TEXT,
        description TEXT
      )
    `);
    tx.executeSql(`
    CREATE TABLE IF NOT EXISTS Food (
      recipeId INTEGER PRIMARY KEY,
      name TEXT,
      rating TEXT,
      time TEXT,
      difficulty TEXT,
      calories TEXT,
      color TEXT,
      description TEXT,
      image TEXT
    )
  `);
  });

};

db.transaction((tx) => {
  // Open the database and create tables after the database is opened
  createTables();
});

export default db;
