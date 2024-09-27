"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import Customer from "../components/Customer";
import ContactForm from "../components/ContactForm";

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // Fetch contacts from the database when the component mounts
  useEffect(() => {
    const fetchContacts = async () => {
      const response = await fetch("/api/customers");
      const data = await response.json();

      // Sort contacts by the closest service due date (AC or RO)
      const sortedContacts = data.sort((a, b) => {
        const acDueA = calculateMonthsUntilDue(a.acServiceDates);
        const acDueB = calculateMonthsUntilDue(b.acServiceDates);
        const roDueA = calculateMonthsUntilDue(a.roServiceDates);
        const roDueB = calculateMonthsUntilDue(b.roServiceDates);

        // Find the maximum of AC and RO due dates for each contact
        const dueA = Math.max(acDueA, roDueA);
        const dueB = Math.max(acDueB, roDueB);

        // Sort in descending order (more months first)
        return dueA - dueB;
      });

      setContacts(sortedContacts);
    };

    fetchContacts();
  }, []);

  const calculateMonthsUntilDue = (serviceDates) => {
    if (serviceDates.length === 0) return Infinity; // No service date available
    const recentDate = new Date(
      Math.max(...serviceDates.map((d) => new Date(d.date)))
    );
    const currentDate = new Date();
    const monthsDiff =
      (currentDate.getFullYear() - recentDate.getFullYear()) * 12 +
      currentDate.getMonth() -
      recentDate.getMonth();
    return monthsDiff;
  };

  const handleSearch = () => {
    if (results.length === 0) {
      setSearchResults([]);
      console.log("clearing");
      setIsSearching(false);
    } else {
      setSearchResults(results);
      setIsSearching(true);
    }
  };

  const deleteContact = async (id) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      await fetch(`/api/customers/${id}`, { method: "DELETE" });
      setContacts(contacts.filter((contact) => contact._id !== id));
      setSearchResults([]);
    }
  };

  const addContact = (contact) => {
    setContacts([...contacts, contact]);
    setIsAdding(false); // Hide the form after adding a contact
  };

  const toggleAddContact = () => {
    setIsAdding(!isAdding); // Toggle between form and contact list
  };

  return (
    <div>
      {!isAdding && (
        <>
          <Header onAddContact={toggleAddContact} />
          <Search
            customers={contacts}
            onSearch={handleSearch}
            setContacts={setContacts}
          />
          {!isSearching ? (
            <div style={styles.container}>
              <div style={styles.contactList}>
                {contacts.map((contact, index) => (
                  <Customer
                    key={index}
                    contact={contact}
                    deleteContact={deleteContact}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div style={styles.container}>
              <div style={styles.contactList}>
                {searchResults.map((contact, index) => (
                  <Customer
                    key={index}
                    contact={contact}
                    deleteContact={deleteContact}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
      {isAdding && (
        <ContactForm
          contacts={contacts}
          onAdd={addContact}
          onCancel={toggleAddContact}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "10px",
  },
};
