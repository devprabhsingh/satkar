"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import ContactForm from "../components/ContactForm";

export default function Home() {
  const [contacts, setContacts] = useState([]);

  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch contacts from the database when the component mounts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
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

  const addContact = (contact) => {
    setContacts([...contacts, contact]);
    setIsAdding(false); // Hide the form after adding a contact
  };

  const toggleAddContact = () => {
    setIsAdding(!isAdding); // Toggle between form and contact list
  };

  return (
    <div>
      {loading ? ( // Show the loader while loading is true
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <img
            style={{ margin: "auto", height: "40vh" }}
            width="80%"
            src="favicon.ico"
          />
          <h2>Loading, please wait..</h2>
        </div>
      ) : (
        <>
          {!isAdding && (
            <>
              <Header onAddContact={toggleAddContact} customers={contacts} />

              <Search customers={contacts} setContacts={setContacts} />
            </>
          )}
          {isAdding && (
            <ContactForm
              contacts={contacts}
              onAdd={addContact}
              onCancel={toggleAddContact}
            />
          )}
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "10px",
  },
};
