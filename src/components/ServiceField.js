import React from "react";

const ServiceField = ({
  serviceDates,
  setServiceDates,
  label,
  showDeleteButtons,
  setShowDeleteButtons,
}) => {
  const handleAddDateField = () => {
    setServiceDates([
      ...serviceDates,
      { date: "", description: "", price: "" },
    ]);
    setShowDeleteButtons(true);
  };

  const handleDeleteDateField = (index) => {
    setServiceDates((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFieldChange = (index, field, value) => {
    setServiceDates((prev) => {
      const updatedFields = [...prev];
      updatedFields[index][field] = value;
      return updatedFields;
    });
  };

  return (
    <div>
      <button onClick={handleAddDateField} style={styles.addButton}>
        Add {label}
      </button>
      {serviceDates.map((item, index) => (
        <div key={index} style={styles.dateField}>
          <input
            type="text"
            value={item.date}
            onChange={(e) => handleFieldChange(index, "date", e.target.value)}
            placeholder="dd-mm-yyyy"
            style={styles.input}
          />
          <input
            type="text"
            value={item.description}
            onChange={(e) =>
              handleFieldChange(index, "description", e.target.value)
            }
            placeholder="Description"
            style={styles.input}
          />
          <input
            type="text"
            value={item.price}
            onChange={(e) => handleFieldChange(index, "price", e.target.value)}
            placeholder="Price"
            style={styles.input}
          />
          {showDeleteButtons && serviceDates.length > 0 && (
            <button
              type="button"
              onClick={() => handleDeleteDateField(index)}
              style={styles.deleteButton}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  field: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "17px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    boxShadow: "inset 0px 1px 3px rgba(0, 0, 0, 0.1)",
    transition: "border-color 0.2s ease",
    marginBottom: "10px",
  },
  dateField: {
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
  },
  addButton: {
    marginTop: "10px",
    padding: "10px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#4A90E2",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  },
  deleteButton: {
    marginTop: "5px",
    padding: "8px",
    fontSize: "18px",
    color: "white",
    backgroundColor: "#E94F4F",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  button: {
    padding: "10px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#4A90E2",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
    width: "100%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    marginTop: "50px",
  },
};

export default ServiceField;
