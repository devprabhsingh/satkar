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

  const normalizeDate = (inputDate) => {
    // Replace slashes with hyphens
    let date = inputDate.replace(/\//g, "-");

    // Split the date string
    let parts = date.split("-");

    // If the date has 2 parts (e.g., "21-3"), add 3rd part for year
    if (parts.length === 3) {
      let [day, month, year] = parts;

      // Add leading zeros if necessary
      if (day.length === 1) day = `0${day}`;
      if (month.length === 1) month = `0${month}`;

      // Handle year expansion (e.g., '24' -> '2024')
      if (year.length === 2) year = `20${year}`;

      // Return the normalized date in the format "DD-MM-YYYY"
      return `${day}-${month}-${year}`;
    }

    return inputDate; // If input doesn't match the expected format, return as is
  };

  const handleSearch = () => {
    if (query.trim() === "") {
      return;
    }

    const results = customers.filter((customer) => {
      const lowerCaseQuery = query.toLowerCase();
      const normalizedQuery = normalizeDate(query);

      const nameMatch = customer.name.toLowerCase().includes(lowerCaseQuery);

      const acServiceMatch = customer.acServiceDates.some(
        (date) =>
          date.description.toLowerCase().includes(lowerCaseQuery) ||
          date.date.includes(normalizedQuery) // match the query with the date string
      );

      const roServiceMatch = customer.roServiceDates.some(
        (date) =>
          date.description.toLowerCase().includes(lowerCaseQuery) ||
          date.date.includes(normalizedQuery)
      );

      const fridgeServiceMatch = customer.fridgeServiceDates.some(
        (date) =>
          date.description.toLowerCase().includes(lowerCaseQuery) ||
          date.date.includes(normalizedQuery)
      );

      const wmServiceMatch = customer.wmServiceDates.some(
        (date) =>
          date.description.toLowerCase().includes(lowerCaseQuery) ||
          date.date.includes(normalizedQuery)
      );

      const geyserServiceMatch = customer.geyserServiceDates.some(
        (date) =>
          date.description.toLowerCase().includes(lowerCaseQuery) ||
          date.date.includes(normalizedQuery)
      );

      return (
        nameMatch ||
        acServiceMatch ||
        roServiceMatch ||
        fridgeServiceMatch ||
        wmServiceMatch ||
        geyserServiceMatch
      );
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
          placeholder="Search by name.."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleSearch(); // Trigger search on each change
          }}
          className="search-input"
          style={styles.input}
        />
        <button
          onClick={handleSearch}
          className="searchButton"
          style={styles.searchButton}
        >
          SEARCH
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
    fontSize: "22px",
    fontWeight: "bold",
  },
  searchButton: {
    padding: "10px 20px",
    cursor: "pointer",
    backgroundColor: "#4A90E2",
    color: "white",
    outline: "none",
    borderColor: "#4A90E2",
    fontWeight: "bold",
    fontSize: "17px",
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
