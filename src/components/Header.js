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
    fontSize: "18px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#28A745",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  buttonHover: {
    backgroundColor: "#f0f0f0",
  },
};

export default Header;
