import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import ExcelGrid from "./ExcelGrid";
import { PortURL } from "./Config";
import ConfirmationModal from "./ConfirmationModal ";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [rowId, setRowId] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${PortURL}/api/data`);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index, id) => {
    setRowId(index);
    setIsEditMode(true);
  };

  const handleSave = async (index, id) => {
    try {
      const updatedRowData = data[index];

      const response = await fetch(`${PortURL}/api/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRowData)
      });

      if (!response.ok) {
        throw new Error('Failed to update employee data');
      }

      const responseData = await response.json();
      console.log('Updated employee data:', responseData);

      setRowId(null);
      setIsEditMode(false);
    } catch (error) {
      console.error('Error updating employee data:', error);
    }
  };

  const handleCancel = () => {
    setRowId(null);
    setIsEditMode(false);
  };

  const handleInputChange = (e, key, index) => {
    const { value } = e.target;
    const updatedData = [...data];
    updatedData[index] = {
      ...updatedData[index],
      [key]: value
    };
    setData(updatedData);
  };

  const handleDelete = (id) => {
    console.log("Deleting row with id:", id);
    setDeleteConfirmation(true);
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`${PortURL}/api/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: deleteId })
      });

      if (!response.ok) {
        throw new Error('Failed to delete data');
      }

      setData(data.filter(row => row.id !== deleteId));
      console.log('Data deleted successfully');
      setDeleteConfirmation(false);
    } catch (error) {
      console.error('Error deleting data:', error.message);
      // Handle errors as needed
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation(false);
    setDeleteId(null);
  };

  const columns = [
    // Define your columns array
  ];

  return (
    <div style={{ height: 500 }}>
      <ExcelGrid
        data={data}
        columns={columns}
        loading={loading}
        handleEdit={handleEdit}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
        handleSave={handleSave}
        handleInputChange={handleInputChange}
        rowId={rowId}
        isEditMode={isEditMode}
      />
      <ConfirmationModal
        show={deleteConfirmation}
        onHide={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Row"
        message="Are you sure you want to delete this row?"
        cancelText="Cancel"
        confirmText="Delete"
        cancelVariant="secondary"
        confirmVariant="danger"
      />
    </div>
  );
};

export default Dashboard;
