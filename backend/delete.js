const express = require('express');
const pool = require('./pool'); // Assuming you have a pool instance for database connection

const router = express.Router();

// Define a DELETE route to delete data from the database
router.post('/', async (req, res) => {
  try {
    const { id } = req.body; // Extract id from the request body

    // Call the stored procedure or query to delete data from the database
    await pool.query('DELETE FROM employee WHERE id = ?', [id]); // Replace 'YourTableName' with the actual table name and 'id' with the primary key

    // Send a success response
    res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error deleting data:', error);
    res.status(500).json({ message: 'Error deleting data' });
  }
});

// Export the router
module.exports = router;
