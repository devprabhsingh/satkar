import React, { useState, useEffect } from "react";
import Customer from "./Customer";

export default function SearchCustomer({ customers, setContacts }) {
  const [query, setQuery] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTriggered, setSearchTriggered] = useState(false);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredCustomers([]);
      setSearchTriggered(false);
    } else {
      handleSearch();
    }
  }, [query]);

  const deleteContact = async (id) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      await fetch(`/api/customers/${id}`, { method: "DELETE" });
      setContacts(customers.filter((contact) => contact._id !== id));
      setFilteredCustomers(customers.filter((contact) => contact._id !== id));
    }
  };

  const handleSearch = () => {
    if (query.trim() === "") {
      return;
    }
    const results = customers.filter((customer) => {
      const nameMatch = customer.name
        .toLowerCase()
        .includes(query.toLowerCase());
      const acServiceMatch = customer.acServiceDates.some((date) =>
        date.description.toLowerCase().includes(query.toLowerCase())
      );
      const roServiceMatch = customer.roServiceDates.some((date) =>
        date.description.toLowerCase().includes(query.toLowerCase())
      );
      return nameMatch || acServiceMatch || roServiceMatch;
    });

    setFilteredCustomers(results);
    setSearchTriggered(true);
  };

  // Highlight the search query in the customer data
  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by name or service description..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleSearch(); // Trigger search on each change
          }}
          style={styles.input}
        />
        <button
          onClick={handleSearch}
          className="searchButton"
          style={styles.searchButton}
        >
          Search
        </button>
      </div>

      {searchTriggered && filteredCustomers.length > 0 && (
        <ul style={styles.list}>
          {filteredCustomers.map((customer) => (
            <li key={customer._id} style={styles.listItem}>
              <Customer
                contact={{
                  ...customer,
                  name: highlightText(customer.name, query),
                  acServiceDates: customer.acServiceDates.map((date) => ({
                    ...date,
                    description: highlightText(date.description, query),
                  })),
                  roServiceDates: customer.roServiceDates.map((date) => ({
                    ...date,
                    description: highlightText(date.description, query),
                  })),
                }}
                deleteContact={deleteContact}
              />
            </li>
          ))}
        </ul>
      )}

      {searchTriggered && filteredCustomers.length === 0 && (
        <ul style={styles.list}>
          <li style={styles.listItem}>No results found</li>
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  searchContainer: {
    display: "flex",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginRight: "10px",
    border: "2px solid #4A90E2",
  },
  searchButton: {
    padding: "10px 20px",
    cursor: "pointer",
    backgroundColor: "#4A90E2",
    color: "white",
    outline: "none",
    borderColor: "#4A90E2",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    backgroundColor: "#f0f0f0", // Light gray background color
  },
  listItem: {
    padding: "10px",
    borderBottom: "1px solid #ccc",
  },
};
