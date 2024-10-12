import React, { useEffect, useState } from "react";
import { getTodayContacts, getMonthContacts } from "../../lib/helpFn";

const AdvanceFilterBtns = ({ contacts, setFilteredCustomers }) => {
  const [type, setType] = useState("all");

  useEffect(() => {
    if (type === "all") {
      document.getElementById("all-btn").style.backgroundColor = "skyblue";
      document.getElementById("today-btn").style.backgroundColor = "white";
      document.getElementById("month-btn").style.backgroundColor = "white";
      setFilteredCustomers(contacts);
    } else if (type === "today") {
      document.getElementById("all-btn").style.backgroundColor = "white";
      document.getElementById("today-btn").style.backgroundColor = "skyblue";
      document.getElementById("month-btn").style.backgroundColor = "white";
      setFilteredCustomers(getTodayContacts(contacts));
    } else if (type === "month") {
      document.getElementById("all-btn").style.backgroundColor = "white";
      document.getElementById("today-btn").style.backgroundColor = "white";
      document.getElementById("month-btn").style.backgroundColor = "skyblue";
      setFilteredCustomers(getMonthContacts(contacts));
    }
  }, [type]);

  return (
    <div style={styles.btnBox}>
      <button
        id="all-btn"
        onClick={() => setType("all")}
        style={{ ...styles.btn, backgroundColor: "skyblue" }}
      >
        All
      </button>
      <button
        id="today-btn"
        onClick={() => setType("today")}
        style={styles.btn}
      >
        today
      </button>
      <button
        id="month-btn"
        onClick={() => setType("month")}
        style={styles.btn}
      >
        month
      </button>
    </div>
  );
};

const styles = {
  btnBox: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  btn: {
    width: "25%",
    backgroundColor: "white",
    borderColor: "blue",
    padding: "12px",
    fontSize: "20px",
    borderRadius: "20px",
  },
};
export default AdvanceFilterBtns;
