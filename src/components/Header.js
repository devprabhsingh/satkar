import React from 'react';


const Header = ({ onAddContact }) => {
  return (
    <header style={window.innerWidth>700?styles.header1:styles.header2}>
      <h1 style={styles.title}>Satkar RO & AC Service</h1>
      <button onClick={onAddContact} style={window.innerWidth>700?styles.button1:styles.button2}>
        Add Customer
      </button>
    </header>
  );
};

const styles = {
  header1: {
    display: 'flex',
    backgroundColor: '#4A90E2',
    padding: "0 20px",
    justifyContent: 'space-between',
    alignItems:'center'
  },
  header2: {
    justifyContent:'space-between',
    display: 'flex',
    flexDirection:'column'
  },
  title: {
    padding:'10px 0px',
    color:'white',
    textAlign:'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    backgroundColor: '#4A90E2',
  },
  button1: {
    display:'block',
    width: '200px',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#4A90E2',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  },
  button2: {
    display:'block',
    width: '200px',
    margin: 'auto',
    padding: '10px 20px',
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
  buttonHover: {
    backgroundColor: '#f0f0f0',
  },
};

export default Header;
