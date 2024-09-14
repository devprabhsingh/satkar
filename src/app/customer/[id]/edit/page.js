'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import Link from 'next/link';

// Fetcher function for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function EditCustomer() {
  const { id } = useParams(); // Get the customer ID from URL params
  const router = useRouter();
  const { data, error } = useSWR(id ? `/api/customers/${id}` : null, fetcher);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [acServiceDates, setAcServiceDates] = useState([]);
  const [roServiceDates, setRoServiceDates] = useState([]);

  useEffect(() => {
    if (data) {
      // Set form values with existing customer data
      setName(data.name);
      setPhone(data.phone);
      setAcServiceDates(data.acServiceDates);
      setRoServiceDates(data.roServiceDates);
    }
  }, [data]);

  // Validation function for dates
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate AC service dates
    for (const dateObj of acServiceDates) {
      if (!validateDate(dateObj.date) || dateObj.date.length !== 10) {
        alert('Please ensure all AC service dates are in the format dd-mm-yyyy and are 10 characters long.');
        return;
      }
    }

    // Validate RO service dates
    for (const dateObj of roServiceDates) {
      if (!validateDate(dateObj.date) || dateObj.date.length !== 10) {
        alert('Please ensure all RO service dates are in the format dd-mm-yyyy and are 10 characters long.');
        return;
      }
    }

    // Submit the form if validation passes
    const response = await fetch(`/api/customers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        phone,
        acServiceDates,
        roServiceDates,
      }),
    });

    if (response.ok) {
      // Optionally update SWR cache
      mutate(`/api/customers/${id}`);
      router.push(`/customer/${id}`); // Redirect to the customer details page
    } else {
      alert('Error updating customer');
    }
  };

  if (error) return <div>Failed to load customer data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1>Edit Customer</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label><h2>AC</h2></label>
          {/* Render fields for AC service dates */}
          {acServiceDates.map((date, index) => (
            <div key={index} style={styles.dateField}>
              <input
                type="text"
                placeholder="dd-mm-yyyy"
                value={date.date}
                onChange={(e) => {
                  const newDates = [...acServiceDates];
                  newDates[index].date = e.target.value;
                  setAcServiceDates(newDates);
                }}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Description"
                value={date.description}
                onChange={(e) => {
                  const newDates = [...acServiceDates];
                  newDates[index].description = e.target.value;
                  setAcServiceDates(newDates);
                }}
                style={styles.input}
              />
              <input
                type="number"
                placeholder="Price"
                value={date.price}
                onChange={(e) => {
                  const newDates = [...acServiceDates];
                  newDates[index].price = e.target.value;
                  setAcServiceDates(newDates);
                }}
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => {
                  const newDates = acServiceDates.filter((_, i) => i !== index);
                  setAcServiceDates(newDates);
                }}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setAcServiceDates([...acServiceDates, { date: '', description: '', price: '' }])}
            style={styles.addButton}
          >
            Add Another AC Service/Repair
          </button>
        </div>

        <div style={styles.formGroup}>
          <label><h2>RO</h2></label>
          {/* Render fields for RO service dates */}
          {roServiceDates.map((date, index) => (
            <div key={index} style={styles.dateField}>
              <input
                type="text"
                placeholder="dd-mm-yyyy"
                value={date.date}
                onChange={(e) => {
                  const newDates = [...roServiceDates];
                  newDates[index].date = e.target.value;
                  setRoServiceDates(newDates);
                }}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Description"
                value={date.description}
                onChange={(e) => {
                  const newDates = [...roServiceDates];
                  newDates[index].description = e.target.value;
                  setRoServiceDates(newDates);
                }}
                style={styles.input}
              />
              <input
                type="number"
                placeholder="Price"
                value={date.price}
                onChange={(e) => {
                  const newDates = [...roServiceDates];
                  newDates[index].price = e.target.value;
                  setRoServiceDates(newDates);
                }}
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => {
                  const newDates = roServiceDates.filter((_, i) => i !== index);
                  setRoServiceDates(newDates);
                }}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setRoServiceDates([...roServiceDates, { date: '', description: '', price: '' }])}
            style={styles.addButton}
          >
            Add RO Service/Repair
          </button>
        </div>

        <button type="submit" style={styles.submitButton}>
          Update Customer
        </button>
        <Link href={`/`}>   
        <button type="button" style={styles.backButton}>
          Back to Main Page
        </button></Link>
      </form>
    </div>
  );
}


const styles = {
  container: {
    width: '80%',
    margin:'auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '20px',
  },
  dateField: {
    display: 'flex',
    flexDirection:'column',
    gap: '10px',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '5px',
    cursor: 'pointer',
  },
  submitButton: {
    backgroundColor: '#4d79ff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px',
    cursor: 'pointer',
  },
  backButton: {
    width:'100%',
    backgroundColor: 'gray',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px',
    cursor: 'pointer',
  }
};
