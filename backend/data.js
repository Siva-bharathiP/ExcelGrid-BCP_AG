// Import required modules
const express = require('express');
const pool = require('./pool'); // Assuming you have a pool instance for database connection

const router = express.Router();

// Define a GET route to fetch data from the database
router.get('/', async (req, res) => {
  try {
    // Call the stored procedure or query to fetch data from the database
    const [result] = await pool.query('SELECT * FROM employee'); // Replace 'YourTableName' with the actual table name

    // Extract rows from the result
    const rows = result;

    // Send the data as JSON response
    res.status(200).json(rows);
    // console.log("data",rows)
  } catch (error) {
    // Handle errors
    console.error('Error retrieving data:', error);
    res.status(500).json({ message: 'Error retrieving data' });
  }
});

// Export the router
module.exports = router;
