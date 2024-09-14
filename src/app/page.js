'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Search from '../components/Search';
import Customer from '../components/Customer';
import ContactForm from '../components/ContactForm';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // Fetch contacts from the database when the component mounts
  useEffect(() => {
    const fetchContacts = async () => {
      const response = await fetch('/api/customers');
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
        return dueB - dueA;
      });

      setContacts(sortedContacts);
    };

    fetchContacts();
  }, []);

  const handleSearch = () => {
   
    if (results.length === 0) {
      setSearchResults([]);
      console.log('clearing')
      setIsSearching(false);
    } else {
      setSearchResults(results);
      setIsSearching(true);
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
      <Header onAddContact={toggleAddContact} />
      {!isAdding && (
        <>
          <Search customers={contacts} onSearch={handleSearch} />
          {!isSearching ? (
            <div style={styles.container}>
              <div style={styles.contactList}>
                {contacts.map((contact) => (
                  <Customer key={contact.id} contact={contact} />
                ))}
              </div>
            </div>
          ) : (
            <div style={styles.container}>
              <div style={styles.contactList}>
                {searchResults.map((contact) => (
                  <Customer key={contact.id} contact={contact} />
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
    padding: '10px',
  }
};
