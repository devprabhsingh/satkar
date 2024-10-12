"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import Link from "next/link";

// Fetcher function for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function EditCustomer() {
  const { id } = useParams(); // Get the customer ID from URL params
  const router = useRouter();
  const { data, error } = useSWR(id ? `/api/customers/${id}` : null, fetcher);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [acServiceDates, setAcServiceDates] = useState([]);
  const [roServiceDates, setRoServiceDates] = useState([]);
  const [fridgeServiceDates, setFridgeServiceDates] = useState([]);
  const [wmServiceDates, setWmServiceDates] = useState([]);
  const [geyserServiceDates, setGeyserServiceDates] = useState([]);

  useEffect(() => {
    if (data) {
      // Set form values with existing customer data
      setName(data.name);
      setPhone(data.phone);
      setAcServiceDates(data.acServiceDates);
      setRoServiceDates(data.roServiceDates);
      setFridgeServiceDates(data.fridgeServiceDates);
      setWmServiceDates(data.wmServiceDates);
      setGeyserServiceDates(data.geyserServiceDates);
    }
  }, [data]);

  const validateDate = (date) => {
    // Replace any forward slashes with hyphens
    let formattedDate = date.replace(/\//g, "-");

    // Match the date in dd-mm-yy or dd-mm-yyyy format
    const regex = /^(\d{1,2})-(\d{1,2})-(\d{2}|\d{4})$/;
    const match = formattedDate.match(regex);

    if (!match) return false;

    let [_, day, month, year] = match.map(Number);

    // Add leading zero if day or month is a single digit
    day = day < 10 ? `0${day}` : day;
    month = month < 10 ? `0${month}` : month;

    // If the year is in 2-digit format, add '20' to make it 4 digits
    if (year < 100) {
      year = `20${year}`;
    }

    // Create a date object for the provided date
    const inputDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the start of the day for comparison

    // Create a date object for tomorrow
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Set tomorrow's date

    // Check if the date is in the future or invalid
    if (inputDate > tomorrow || isNaN(inputDate.getTime())) return false;

    // Return the formatted date
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //check phone number
    if (phone.trim()) {
      if (phone.length !== 10) {
        alert("check phone number length");
        return false;
      }
    }

    // Validate and format AC service dates
    const isAcValid = acServiceDates.every((dateObj, index) => {
      const formattedDate = validateDate(dateObj.date);
      if (formattedDate) {
        acServiceDates[index].date = formattedDate; // Save the formatted date
        return true;
      }
      return false;
    });

    // Validate and format RO service dates
    const isRoValid = roServiceDates.every((dateObj, index) => {
      const formattedDate = validateDate(dateObj.date);
      if (formattedDate) {
        roServiceDates[index].date = formattedDate;
        return true;
      }
      return false;
    });

    // Validate and format Fridge service dates
    const isFridgeValid = fridgeServiceDates.every((dateObj, index) => {
      const formattedDate = validateDate(dateObj.date);
      if (formattedDate) {
        fridgeServiceDates[index].date = formattedDate;
        return true;
      }
      return false;
    });

    // Validate and format Washing Machine service dates
    const isWmValid = wmServiceDates.every((dateObj, index) => {
      const formattedDate = validateDate(dateObj.date);
      if (formattedDate) {
        wmServiceDates[index].date = formattedDate;
        return true;
      }
      return false;
    });

    // Validate and format Geyser service dates
    const isGeyserValid = geyserServiceDates.every((dateObj, index) => {
      const formattedDate = validateDate(dateObj.date);
      if (formattedDate) {
        geyserServiceDates[index].date = formattedDate;
        return true;
      }
      return false;
    });

    if (
      !isAcValid ||
      !isRoValid ||
      !isFridgeValid ||
      !isWmValid ||
      !isGeyserValid
    ) {
      alert(
        "Please ensure all service dates are in the format dd-mm-yyyy and valid."
      );
      return;
    }

    // Submit the form if validation passes
    const response = await fetch(`/api/customers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        acServiceDates,
        roServiceDates,
        fridgeServiceDates,
        wmServiceDates,
        geyserServiceDates,
      }),
    });

    if (response.ok) {
      mutate(`/api/customers/${id}`); // Optionally update SWR cache
      router.push(`/customer/${id}`); // Redirect to the customer details page
    } else {
      alert("Error updating customer");
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
            required
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            id="phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>
            <h2>AC</h2>
          </label>
          {/* Render fields for AC service dates */}
          {acServiceDates.map((date, index) => (
            <div key={index} style={styles.dateField}>
              <input
                type="text"
                placeholder="dd-mm-yyyy"
                value={date.date}
                onChange={(e) => {
                  const newDates = [...acServiceDates];
                  newDates[index].date = e.target.value.trim();
                  setAcServiceDates(newDates);
                }}
                style={styles.input}
              />
              <input
                required
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
                  let yes = confirm("DELETE this AC entry ?");
                  if (yes) {
                    const newDates = acServiceDates.filter(
                      (_, i) => i !== index
                    );
                    setAcServiceDates(newDates);
                  }
                }}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setAcServiceDates([
                ...acServiceDates,
                { date: "", description: "", price: "" },
              ]);
            }}
            style={styles.addButton}
          >
            Add Another AC Service/Repair
          </button>
        </div>

        <div style={styles.formGroup}>
          <label>
            <h2>RO</h2>
          </label>
          {/* Render fields for RO service dates */}
          {roServiceDates.map((date, index) => (
            <div key={index} style={styles.dateField}>
              <input
                type="text"
                placeholder="dd-mm-yyyy"
                value={date.date}
                onChange={(e) => {
                  const newDates = [...roServiceDates];
                  newDates[index].date = e.target.value.trim();
                  setRoServiceDates(newDates);
                }}
                style={styles.input}
              />
              <input
                type="text"
                required
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
                  let yes = confirm("DELETE this RO entry?");
                  if (yes) {
                    const newDates = roServiceDates.filter(
                      (_, i) => i !== index
                    );
                    setRoServiceDates(newDates);
                  }
                }}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setRoServiceDates([
                ...roServiceDates,
                { date: "", description: "", price: "" },
              ]);
            }}
            style={styles.addButton}
          >
            Add RO Service/Repair
          </button>
        </div>

        <div style={styles.formGroup}>
          <label>
            <h2>Fridge</h2>
          </label>
          {/* Render fields for Fridge service dates */}
          {fridgeServiceDates.map((date, index) => (
            <div key={index} style={styles.dateField}>
              <input
                type="text"
                placeholder="dd-mm-yyyy"
                value={date.date}
                onChange={(e) => {
                  const newDates = [...fridgeServiceDates];
                  newDates[index].date = e.target.value.trim();
                  setFridgeServiceDates(newDates);
                }}
                style={styles.input}
              />
              <input
                type="text"
                required
                placeholder="Description"
                value={date.description}
                onChange={(e) => {
                  const newDates = [...fridgeServiceDates];
                  newDates[index].description = e.target.value;
                  setFridgeServiceDates(newDates);
                }}
                style={styles.input}
              />
              <input
                type="number"
                placeholder="Price"
                value={date.price}
                onChange={(e) => {
                  const newDates = [...fridgeServiceDates];
                  newDates[index].price = e.target.value;
                  setFridgeServiceDates(newDates);
                }}
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => {
                  let yes = confirm("DELETE this FRIDGE entry?");
                  if (yes) {
                    const newDates = fridgeServiceDates.filter(
                      (_, i) => i !== index
                    );
                    setFridgeServiceDates(newDates);
                  }
                }}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setFridgeServiceDates([
                ...fridgeServiceDates,
                { date: "", description: "", price: "" },
              ]);
            }}
            style={styles.addButton}
          >
            Add Fridge Service/Repair
          </button>
        </div>

        <div style={styles.formGroup}>
          <label>
            <h2>Washing Machine</h2>
          </label>
          {/* Render fields for RO service dates */}
          {wmServiceDates.map((date, index) => (
            <div key={index} style={styles.dateField}>
              <input
                type="text"
                placeholder="dd-mm-yyyy"
                value={date.date}
                onChange={(e) => {
                  const newDates = [...wmServiceDates];
                  newDates[index].date = e.target.value.trim();
                  setWmServiceDates(newDates);
                }}
                style={styles.input}
              />
              <input
                type="text"
                required
                placeholder="Description"
                value={date.description}
                onChange={(e) => {
                  const newDates = [...wmServiceDates];
                  newDates[index].description = e.target.value;
                  setWmServiceDates(newDates);
                }}
                style={styles.input}
              />
              <input
                type="number"
                placeholder="Price"
                value={date.price}
                onChange={(e) => {
                  const newDates = [...wmServiceDates];
                  newDates[index].price = e.target.value;
                  setWmServiceDates(newDates);
                }}
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => {
                  let yes = confirm("DELETE this entry?");
                  if (yes) {
                    const newDates = wmServiceDates.filter(
                      (_, i) => i !== index
                    );
                    setWmServiceDates(newDates);
                  }
                }}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setWmServiceDates([
                ...wmServiceDates,
                { date: "", description: "", price: "" },
              ]);
            }}
            style={styles.addButton}
          >
            Add W.Machine Service/Repair
          </button>
        </div>

        <div style={styles.formGroup}>
          <label>
            <h2>Geyser</h2>
          </label>
          {/* Render fields for RO service dates */}
          {geyserServiceDates.map((date, index) => (
            <div key={index} style={styles.dateField}>
              <input
                type="text"
                placeholder="dd-mm-yyyy"
                value={date.date}
                onChange={(e) => {
                  const newDates = [...geyserServiceDates];
                  newDates[index].date = e.target.value.trim();
                  setGeyserServiceDates(newDates);
                }}
                style={styles.input}
              />
              <input
                type="text"
                required
                placeholder="Description"
                value={date.description}
                onChange={(e) => {
                  const newDates = [...geyserServiceDates];
                  newDates[index].description = e.target.value;
                  setGeyserServiceDates(newDates);
                }}
                style={styles.input}
              />
              <input
                type="number"
                placeholder="Price"
                value={date.price}
                onChange={(e) => {
                  const newDates = [...geyserServiceDates];
                  newDates[index].price = e.target.value;
                  setGeyserServiceDates(newDates);
                }}
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => {
                  let yes = confirm("DELETE this GEYSER entry?");
                  if (yes) {
                    const newDates = geyserServiceDates.filter(
                      (_, i) => i !== index
                    );
                    setGeyserServiceDates(newDates);
                  }
                }}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setGeyserServiceDates([
                ...geyserServiceDates,
                { date: "", description: "", price: "" },
              ]);
            }}
            style={styles.addButton}
          >
            Add Geyser Service/Repair
          </button>
        </div>

        <button type="submit" style={styles.submitButton}>
          Update
        </button>
        <Link href={`/`}>
          <button type="button" style={styles.backButton}>
            Back to Main Page
          </button>
        </Link>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "80%",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "20px",
  },
  dateField: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px",
    fontSize: "18px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px",
    cursor: "pointer",
    fontSize: "18px",
  },
  submitButton: {
    backgroundColor: "#4d79ff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "10px",
    cursor: "pointer",
    fontSize: "18px",
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
  },
};
