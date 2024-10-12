import React, { useEffect, useState } from "react";
import { getTodayContacts, getMonthContacts } from "../../lib/helpFn";

const AdvanceFilterBtns = ({ contacts, setFilteredCustomers }) => {
  const [type, setType] = useState("all");
  const [allCt, setAllCt] = useState();
  const [todayCt, setTodayCt] = useState();
  const [monthCt, setMonthCt] = useState();

  useEffect(() => {
    if (type === "all") {
      document.getElementById("all-btn").style.backgroundColor = "skyblue";
      document.getElementById("today-btn").style.backgroundColor = "white";
      document.getElementById("month-btn").style.backgroundColor = "white";
      setFilteredCustomers(contacts);
      setAllCt(contacts.length);
    } else if (type === "today") {
      document.getElementById("all-btn").style.backgroundColor = "white";
      document.getElementById("today-btn").style.backgroundColor = "skyblue";
      document.getElementById("month-btn").style.backgroundColor = "white";
      let c = getTodayContacts(contacts);
      setFilteredCustomers(c);
      setTodayCt(c.length);
    } else if (type === "month") {
      document.getElementById("all-btn").style.backgroundColor = "white";
      document.getElementById("today-btn").style.backgroundColor = "white";
      document.getElementById("month-btn").style.backgroundColor = "skyblue";
      let c = getMonthContacts(contacts);
      setFilteredCustomers(c);
      setMonthCt(c.length);
    }
  }, [type, allCt, todayCt, monthCt]);

  return (
    <div style={styles.btnBox}>
      <button
        id="all-btn"
        onClick={() => setType("all")}
        style={{ ...styles.btn, backgroundColor: "skyblue" }}
      >
        All
        <span style={{ fontWeight: "bold", paddingLeft: "10px" }}>{allCt}</span>
      </button>
      <button
        id="today-btn"
        onClick={() => setType("today")}
        style={styles.btn}
      >
        today
        <span style={{ fontWeight: "bold", paddingLeft: "10px" }}>
          {todayCt}
        </span>
      </button>
      <button
        id="month-btn"
        onClick={() => setType("month")}
        style={styles.btn}
      >
        month
        <span style={{ fontWeight: "bold", paddingLeft: "10px" }}>
          {monthCt}
        </span>
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
    width: "30%",
    backgroundColor: "white",
    borderColor: "blue",
    padding: "12px",
    fontSize: "20px",
    borderRadius: "20px",
  },
};
export default AdvanceFilterBtns;
