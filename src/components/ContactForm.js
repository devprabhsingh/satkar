import React, { useState } from "react";
import ServiceField from "./ServiceField"; // Import the new component
import Link from "next/link";

// Validation function for date
const validateDate = (date) => {
  if (date.length === 10) {
    const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
    const match = date.match(regex);
    if (!match) return false;

    const [_, day, month, year] = match.map(Number);
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;

    // Create a date object for the provided date
    const inputDate = new Date(year, month - 1, day);

    // Create a date object for the current date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the start of the day for comparison

    // Check if the date is in the future
    if (inputDate > today) return false;

    return true;
  } else {
    return false;
  }
};

const ContactForm = ({ contacts, onAdd, onCancel }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [acServiceDates, setAcServiceDates] = useState([]);
  const [roServiceDates, setRoServiceDates] = useState([]);
  const [geyserServiceDates, setGeyserServiceDates] = useState([]);
  const [wmServiceDates, setWmServiceDates] = useState([]);
  const [fridgeServiceDates, setFridgeServiceDates] = useState([]);

  const [showAcDeleteButtons, setShowAcDeleteButtons] = useState(false);
  const [showRoDeleteButtons, setShowRoDeleteButtons] = useState(false);
  const [showGeyserDeleteButtons, setShowGeyserDeleteButtons] = useState(false);
  const [showWmDeleteButtons, setShowWmDeleteButtons] = useState(false);
  const [showFridgeDeleteButtons, setShowFridgeDeleteButtons] = useState(false);

  const handlePhoneChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    setPhone(rawValue);
  };

  const formattedPhone = phone.length > 10 ? phone.slice(0, 10) : phone;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      alert("Please fill in the name.");
      return;
    }

    const isAcValid = acServiceDates.every(({ date }) => validateDate(date));
    const isRoValid = roServiceDates.every(({ date }) => validateDate(date));
    const isGeyserValid = geyserServiceDates.every(({ date }) =>
      validateDate(date)
    );
    const isWmValid = wmServiceDates.every(({ date }) => validateDate(date));
    const isFridgeValid = fridgeServiceDates.every(({ date }) =>
      validateDate(date)
    );

    if (
      acServiceDates.length === 0 &&
      roServiceDates.length === 0 &&
      geyserServiceDates.length === 0 &&
      wmServiceDates.length === 0 &&
      fridgeServiceDates.length === 0
    ) {
      alert("Please add at least one service date.");
      return;
    }

    // Validate dates for each service
    if (acServiceDates.length > 0 && !isAcValid) {
      alert("Please enter valid AC service dates in dd-mm-yyyy format.");
      return;
    }
    if (roServiceDates.length > 0 && !isRoValid) {
      alert("Please enter valid RO service dates in dd-mm-yyyy format.");
      return;
    }
    if (geyserServiceDates.length > 0 && !isGeyserValid) {
      alert("Please enter valid Geyser service dates in dd-mm-yyyy format.");
      return;
    }
    if (wmServiceDates.length > 0 && !isWmValid) {
      alert(
        "Please enter valid Washing Machine service dates in dd-mm-yyyy format."
      );
      return;
    }
    if (fridgeServiceDates.length > 0 && !isFridgeValid) {
      alert("Please enter valid Fridge service dates in dd-mm-yyyy format.");
      return;
    }

    // Submission code here...

    try {
      const exists = contacts.some(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      );

      if (!exists) {
        const response = await fetch("/api/add-contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            phone: formattedPhone,
            acServiceDates,
            roServiceDates,
            geyserServiceDates,
            wmServiceDates,
            fridgeServiceDates,
          }),
        });

        if (!response.ok) throw new Error("Failed to add customer");

        alert("CUSTOMER added successfully");

        // Reset form fields
        setName("");
        setPhone("");
        setAcServiceDates([]);
        setRoServiceDates([]);
        setGeyserServiceDates([]);
        setWmServiceDates([]);
        setFridgeServiceDates([]);

        window.location.href = window.location.href;
      } else {
        alert("NAME already exists");
      }

      onCancel();
    } catch (error) {
      alert("Error adding contact: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <button type="button" onClick={onCancel} style={styles.backButton}>
        Back to Main Page
      </button>

      <div style={styles.field}>
        <label style={styles.label}>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
      </div>
      <div style={styles.field}>
        <label style={styles.label}>Phone Number:</label>
        <input
          type="text"
          value={formattedPhone}
          onChange={handlePhoneChange}
          style={styles.input}
        />
      </div>

      {/* AC Service Dates */}
      <ServiceField
        serviceDates={acServiceDates}
        setServiceDates={setAcServiceDates}
        label="AC"
        showDeleteButtons={showAcDeleteButtons}
        setShowDeleteButtons={setShowAcDeleteButtons}
      />

      {/* RO Service Dates */}
      <ServiceField
        serviceDates={roServiceDates}
        setServiceDates={setRoServiceDates}
        label="RO"
        showDeleteButtons={showRoDeleteButtons}
        setShowDeleteButtons={setShowRoDeleteButtons}
      />

      {/* Geyser Service Dates */}
      <ServiceField
        serviceDates={geyserServiceDates}
        setServiceDates={setGeyserServiceDates}
        label="Geyser"
        showDeleteButtons={showGeyserDeleteButtons}
        setShowDeleteButtons={setShowGeyserDeleteButtons}
      />

      {/* Washing Machine Service Dates */}
      <ServiceField
        serviceDates={wmServiceDates}
        setServiceDates={setWmServiceDates}
        label="Washing Machine"
        showDeleteButtons={showWmDeleteButtons}
        setShowDeleteButtons={setShowWmDeleteButtons}
      />

      {/* Fridge Service Dates */}
      <ServiceField
        serviceDates={fridgeServiceDates}
        setServiceDates={setFridgeServiceDates}
        label="Fridge"
        showDeleteButtons={showFridgeDeleteButtons}
        setShowDeleteButtons={setShowFridgeDeleteButtons}
      />

      <div style={styles.buttonContainer}>
        <button type="submit" style={styles.submitButton}>
          Add Customer
        </button>
        <button type="button" onClick={onCancel} style={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  );
};

const styles = {
  form: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
    width: "70%",
    margin: "auto",
  },
  field: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "blue",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "20px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    boxShadow: "inset 0px 1px 3px rgba(0, 0, 0, 0.1)",
    transition: "border-color 0.2s ease",
    marginBottom: "10px",
    fontWeight: "bold",
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
  submitButton: {
    padding: "10px 20px",
    fontSize: "18px",
    color: "#fff",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  cancelButton: {
    padding: "10px 20px",
    fontSize: "18px",
    color: "#fff",
    backgroundColor: "#6c757d",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  backButton: {
    width: "100%",
    backgroundColor: "gray",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "10px",
    cursor: "pointer",
    fontSize: "18px",
    marginBottom: "10px",
  },
};

export default ContactForm;
