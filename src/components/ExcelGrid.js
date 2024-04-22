import React, { useState } from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import "../styles/dashboard.css";
import "../styles/ExcelGrid.css";
import LoadingSpinner from "./LoadSpinner";

const ExcelGrid = ({ Data, columns,loading,handleEdit,handleCancel,handleDelete,handleSave,handleInputChange,RowId,isEditMode,RowData}) => {
 

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear().toString().substr(-2);
        return `${month} ${year}`;
      };

  return (
    <Container fluid className="mt-2">
            {loading && <LoadingSpinner />} 

      <Row className="row Render-Row">
        <Col className="col Render-Col">
          <div className="table-responsive render">
            <Table striped bordered hover>
              <thead className="sticky-header">
                <tr>
                  {columns.map(({ field, headerName }) => (
                    <th key={field}>{headerName}</th>
                  ))}
                  <th className="action-cell">Action</th>
                </tr>
              </thead>
              <tbody>
                {Data.map((row, index) => (
                  <tr key={index}>
                    {columns.map(({ field }) => (
                     <td key={field}>
                     {RowId === index ? (
                       field==='ID'||field === 'MonthYear' || field === 'CompanyName' ? (
                         <span>{RowData[field]}</span>
                       ) : (
                         <input
                           type="text"
                           className='GridInput'
                           value={RowData[field]}
                           onChange={(e) => handleInputChange(e, field)}
                         />
                       )
                     ) : (
                       field === 'MonthYear' ? (
                         <span>{formatDate(row[field])}</span>
                       ) : (
                         <span>{row[field]}</span>
                       )
                     )}
                   </td>
                   
                    ))}
                    <td className="action-cell">
                      {isEditMode && RowId === index ? (
                        <div className="action-buttons">
                          <button
                            className="btn btn-sm Save"
                            onClick={() => handleSave(index)}
                          >
                            <FontAwesomeIcon icon={faSave} />
                          </button>
                          <button
                            className="btn btn-sm Cancel"
                            onClick={handleCancel}
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                        </div>
                      ) : (
                        <div className="action-buttons">
                          <button
                            className="btn btn-sm Edit"
                            onClick={() => handleEdit(index)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            className="btn btn-sm Delete"
                            onClick={() => handleDelete(index)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ExcelGrid;
