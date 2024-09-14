import React, { useState } from 'react';

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

const ContactForm = ({contacts, onAdd, onCancel }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [acServiceDates, setAcServiceDates] = useState([]);
  const [roServiceDates, setRoServiceDates] = useState([]);
  const [showAcDeleteButtons, setShowAcDeleteButtons] = useState(false);
    const [showRoDeleteButtons, setShowRoDeleteButtons] = useState(false);

  const handleAddDateField = (setter, fieldList, showDeleteSetter) => {
    setter([...fieldList, { date: '', description: '', price: '' }]);
    showDeleteSetter(true);
  };

  const handleDeleteDateField = (setter, index) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFieldChange = (setter, index, field, value) => {
    setter((prev) => {
      const updatedFields = [...prev];
      updatedFields[index][field] = value;
      return updatedFields;
    });
  };

  const handlePhoneChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    setPhone(rawValue);
  };

  const formattedPhone = phone.length > 10 ? phone.slice(0, 10) : phone;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if the name is filled
    if (!name) {
      alert('Please fill in the name.');
      return;
    }

    // Validate the dates, but allow submission if either AC or RO dates are valid
    const isAcValid = acServiceDates.every(({ date }) => validateDate(date));
    const isRoValid = roServiceDates.every(({ date }) => validateDate(date));

    if (acServiceDates.length > 0 && !isAcValid) {
      alert('Please enter valid AC service dates in dd-mm-yyyy format.');
      return;
    }
    
    if (roServiceDates.length > 0 && !isRoValid) {
      alert('Please enter valid RO service dates in dd-mm-yyyy format.');
      return;
    }

    if (acServiceDates.length === 0 && roServiceDates.length === 0) {
      alert('Please add at least one service date.');
      return;
    }

    try {
      const exists = contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());

      if (!exists) {
      
        const response = await fetch('/api/add-contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, phone: formattedPhone, acServiceDates, roServiceDates }),
        });

        if (!response.ok) throw new Error('Failed to add customer');
      
        alert('CUSTOMER added successfully');

      
        // Reset form fields
        setName('');
        setPhone('');
        setAcServiceDates([{ date: '', description: '', price: '' }]);
        setRoServiceDates([{ date: '', description: '', price: '' }]);

        window.location.href = window.location.href;
      } else {
        alert('NAME already exists')
      }

      onCancel();
      
      
    } catch (error) {
      alert('Error adding contact: ' + error.message);
    }
};


    return (
      
    <form onSubmit={handleSubmit} style={styles.form}>
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
        
        <button type="button" onClick={() => handleAddDateField(setAcServiceDates, acServiceDates, setShowAcDeleteButtons)} style={styles.addButton}>
        Add AC Service/Repair
      </button>
    <div style={styles.field}>
      {acServiceDates.map((item, index) => (
        <div key={index} style={styles.dateField}>
          <input
            type="text"
            value={item.date}
            onChange={(e) => handleFieldChange(setAcServiceDates, index, 'date', e.target.value)}
            placeholder="dd-mm-yyyy"
            style={styles.input}
          />
          <input
            type="text"
            value={item.description}
            onChange={(e) => handleFieldChange(setAcServiceDates, index, 'description', e.target.value)}
            placeholder="Description"
            style={styles.input}
          />
          <input
            value={item.price}
            onChange={(e) => handleFieldChange(setAcServiceDates, index, 'price', e.target.value)}
            placeholder="Price"
            style={styles.input}
          />
          {showAcDeleteButtons && acServiceDates.length > 1 && (
            <button type="button" onClick={() => handleDeleteDateField(setAcServiceDates, index)} style={styles.deleteButton}>
              Delete
            </button>
          )}
        </div>
      ))}
        </div>
        <hr/>
        <button type="button" onClick={() => handleAddDateField(setRoServiceDates, roServiceDates, setShowRoDeleteButtons)} style={styles.addButton}>
        Add RO Service/Repair
      </button>
    <div style={styles.field}>
      {roServiceDates.map((item, index) => (
        <div key={index} style={styles.dateField}>
          <input
            type="text"
            value={item.date}
            onChange={(e) => handleFieldChange(setRoServiceDates, index, 'date', e.target.value)}
            placeholder="dd-mm-yyyy"
            style={styles.input}
          />
          <input
            type="text"
            value={item.description}
            onChange={(e) => handleFieldChange(setRoServiceDates, index, 'description', e.target.value)}
            placeholder="Description"
            style={styles.input}
          />
          <input
            value={item.price}
            onChange={(e) => handleFieldChange(setRoServiceDates, index, 'price', e.target.value)}
            placeholder="Price"
            style={styles.input}
          />
          {showRoDeleteButtons && roServiceDates.length > 1 && (
            <button type="button" onClick={() => handleDeleteDateField(setRoServiceDates, index)} style={styles.deleteButton}>
              Delete
            </button>
          )}
        </div>
      ))}
    
    </div>
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
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      marginTop: '20px',
    width: '70%',
    margin: 'auto',
    },
    field: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '5px',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      boxShadow: 'inset 0px 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'border-color 0.2s ease',
      marginBottom: '10px',
    },
    dateField: {
      marginBottom: '10px',
      display: 'flex',
      flexDirection: 'column',
    },
    addButton: {
      marginTop: '10px',
      padding: '10px',
      fontSize: '16px',
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: '#4A90E2',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.3s ease',
    },
    deleteButton: {
        marginTop: '5px',
        padding: '8px',
        fontSize: '14px',
        color: 'white',
        backgroundColor: '#E94F4F',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease',
    },
    buttons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    button: {
      padding: '10px',
      fontSize: '16px',
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: '#4A90E2',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.3s ease',
      width: '100%',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
      gap: '10px',
        marginTop:'50px'
      },
      submitButton: {
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#28a745',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
      },
      cancelButton: {
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#6c757d',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
      },
  };

export default ContactForm;
