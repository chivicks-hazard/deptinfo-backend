const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "sqlchivicks",
  database: "deptinfo",
});

async function initialisePool() {
  let connection;

  try {
    connection = await pool.getConnection();
    console.log("\x1b[32mConnected to the database\x1b[0m");
  } catch (error) {
    console.error("Error initializing database pool:", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

async function executeQuery(query: string) {
  let connection;

  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(query);
    return rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

// create a middleware function to export the db connection to other parts of the backend app
const dbController = {
  executeQuery,
};

// How does it work?
// const dbController = require("./dbController");

// dbController.executeQuery("SELECT * FROM users");

// dbController.executeQuery("SELECT * FROM users")
//   .then((rows) => {
//     console.log(rows);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

async function endPool() {
  try {
    await pool.end();
    console.log("The database connection has been closed.");
  } catch (error) {
    console.error("Error closing the database connection:", error);
  }
}

module.exports = { initialisePool, dbController, executeQuery, endPool };
