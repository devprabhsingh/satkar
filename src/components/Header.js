import React from "react";

const Header = ({ onAddContact }) => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Satkar RO & AC Service</h1>
      <button onClick={onAddContact} style={styles.button}>
        Add Customer
      </button>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
  title: {
    padding: "10px 0px",
    width: "100%",
    color: "white",
    textAlign: "center",
    fontSize: "1.5rem",
    fontWeight: "bold",
    backgroundColor: "#4A90E2",
  },
  button: {
    display: "block",
    width: "200px",
    margin: "10px auto",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#28A745",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#f0f0f0",
  },
};

export default Header;
