import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import ExcelGrid from "./ExcelGrid";
import { PortURL } from "./Config";
import { positions } from "@mui/system";

const Dashboard = () => {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); 
  const [RowId, setRowId] = useState(null); 
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const storedUsername = "sandhya.k@tringapps.net";
      const storedOrganization = "Brothers";
      const response = await fetch(
        `${PortURL}/data?username=${storedUsername}&organization=${storedOrganization}`
      );
      if (response.ok) {
        const excelData = await response.json();
        const modifiedData = excelData.map((row) => ({
          ...row,
          MonthYear: addOneMinuteToDate(row.MonthYear),
        }));
        setData(modifiedData);
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  

  const addOneMinuteToDate = (dateString) => {
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() + 1000);
    return date.toISOString();
  };


  const handleEdit = (index, id) => {
    setRowId(index);
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setRowId(null);
    setIsEditMode(false);
  };

const handleInputChange = (e, key, index) => {
  const { value } = e.target;
  const updatedData = [...Data];
  updatedData[index] = {
    ...updatedData[index],
    [key]: value
  };
  setData(updatedData);
};


  const handleSave = (index) => {
    console.log("Saving data for row index:", index);
    setRowId(null);
    setIsEditMode(false);
  };

  const handleDelete = (index) => {
    console.log("Deleting row at index:", index);
  };

  
  // Define columns array
  const columns = [
    { field: 'ID', headerName: 'id', flex:2, editable: true },

    { field: 'MonthYear', headerName: 'Month/Year', width: 150, editable: true },
    { field: 'CompanyName', headerName: 'Company Name', width: 200, editable: true },
    { field: 'RevenueActual', headerName: 'Revenue Actual', width: 180, editable: true },
    { field: 'RevenueBudget', headerName: 'Revenue Budget', width: 180, editable: true },
    { field: 'GrossProfitActual', headerName: 'Gross Profit Actual', width: 200, editable: true },
    { field: 'GrossProfitBudget', headerName: 'Gross Profit Budget', width: 200, editable: true },
    { field: 'SGAActual', headerName: 'SG&A Actual', width: 160, editable: true },
    { field: 'SGABudget', headerName: 'SG&A Budget', width: 160, editable: true },
    { field: 'EBITDAActual', headerName: 'EBITDA Actual', width: 180, editable: true },
    { field: 'EBITDABudget', headerName: 'EBITDA Budget', width: 180, editable: true },
    { field: 'CapExActual', headerName: 'CapEx Actual', width: 150, editable: true },
    { field: 'CapExBudget', headerName: 'CapEx Budget', width: 150, editable: true },
    { field: 'FixedAssetsNetActual', headerName: 'Fixed Assets (Net) Actual', width: 250, editable: true },
    { field: 'FixedAssetsNetBudget', headerName: 'Fixed Assets (Net) Budget', width: 250, editable: true },
    { field: 'CashActual', headerName: 'Cash Actual', width: 150, editable: true },
    { field: 'CashBudget', headerName: 'Cash Budget', width: 150, editable: true },
    { field: 'TotalDebtActual', headerName: 'Total Debt Actual', width: 200, editable: true },
    { field: 'TotalDebtBudget', headerName: 'Total Debt Budget', width: 200, editable: true },
    { field: 'AccountsReceivableActual', headerName: 'Accounts Receivable Actual', width: 250, editable: true },
    { field: 'AccountsReceivableBudget', headerName: 'Accounts Receivable Budget', width: 250, editable: true },
    { field: 'AccountsPayableActual', headerName: 'Accounts Payable Actual', width: 250, editable: true },
    { field: 'AccountsPayableBudget', headerName: 'Accounts Payable Budget', width: 250, editable: true },
    { field: 'InventoryActual', headerName: 'Inventory Actual', width: 150, editable: true },
    { field: 'InventoryBudget', headerName: 'Inventory Budget', width: 150, editable: true },
    { field: 'EmployeesActual', headerName: 'Employees Actual', width: 150, editable: true },
    { field: 'EmployeesBudget', headerName: 'Employees Budget', width: 150, editable: true },
    { field: 'Quarter', headerName: 'Quarter', width: 120, editable: true },

  ];


  

  return (
    <div style={{ height: 500 }}>
      <ExcelGrid
        Data={Data}
        columns={columns}
        loading={loading}
        handleEdit={handleEdit}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
        handleSave={handleSave}
        handleInputChange={handleInputChange}
        RowId={RowId}
        isEditMode={isEditMode}
      />
    </div>
  );
}

export default Dashboard;
