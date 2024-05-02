import React from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import "../styles/dashboard.css";
import "../styles/ExcelGrid.css";
import LoadingSpinner from "./LoadSpinner";

const ExcelGrid = ({ data, loading, handleEdit, handleCancel, handleDelete, handleSave, handleInputChange, rowId, isEditMode }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <Container fluid className="mt-2">
      {loading && <LoadingSpinner />}

      <Row className="row Render-Row">
        <Col className="col Render-Col">
          <div className="table-responsive render">
            <Table striped bordered hover>
              <thead className="sticky-header">
                <tr>
                  {Object.keys(data[0]).map((field, index) => (
                    <th key={index}>{field}</th>
                  ))}
                  <th className="action-cell">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.entries(row).map(([key, value], columnIndex) => (
                      <td key={columnIndex}>
                        {isEditMode && rowId === rowIndex ? (
                          <input
                            type="text"
                            className='GridInput'
                            value={value}
                            onChange={(e) => handleInputChange(e, key, rowIndex)}
                          />
                        ) : (
                          <span>{value}</span>
                        )}
                      </td>
                    ))}
                    <td className="action-cell">
                      {isEditMode && rowId === rowIndex ? (
                        <div className="action-buttons">
                          <button
                            className="btn btn-sm Save"
                            onClick={() => handleSave(rowIndex,row.id)}
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
                            onClick={() => handleEdit(rowIndex,row.id)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            className="btn btn-sm Delete"
                            onClick={() => handleDelete(row.id)}
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
