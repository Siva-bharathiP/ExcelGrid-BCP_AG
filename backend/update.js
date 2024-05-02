const express = require('express');
const pool = require('./pool'); // Assuming you have a pool instance for database connection

const router = express.Router();

// Define a PUT route to update data in the database
router.put('/', async (req, res) => {
  try {
    const { id } = req.body; // Extract id from the request parameters
    const newData = req.body; // Extract updated data from the request body

    // Call the stored procedure or query to update data in the database
    await pool.query('UPDATE employee SET ? WHERE id = ?', [newData, id]); // Replace 'employee' with the actual table name

    // Send a success response
    res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error updating data:', error);
    res.status(500).json({ message: 'Error updating data' });
  }
});

// Export the router
module.exports = router;
