const { Sequelize, QueryTypes } = require("sequelize");
const config = require("../config/config.json");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

// Connect to the default "postgres" database to create the target database
const adminSequelize = new Sequelize("postgres", dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: "postgres",
  logging: false,
});

async function createDatabase() {
  try {
    // Check if database exists
    const [databases] = await adminSequelize.query(
      "SELECT datname FROM pg_database WHERE datname = :dbName",
      {
        replacements: { dbName: dbConfig.database },
        type: QueryTypes.SELECT,
      }
    );

    if (!databases || databases.length === 0) {
      await adminSequelize.query(`CREATE DATABASE "${dbConfig.database}";`);
      console.log(`Database '${dbConfig.database}' created successfully.`);
    } else {
      console.log(`Database '${dbConfig.database}' already exists.`);
    }
  } catch (error) {
    console.error("Error creating database:", error);
  } finally {
    await adminSequelize.close();
  }
}

createDatabase();
