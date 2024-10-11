import React, { useEffect, useState } from "react";
import DueServices from "./DueServices";
import { getServiceDueLists } from "../../lib/helpFn";

const Header = ({ onAddContact, customers }) => {
  const [dueServicesCt, setDueServicesCt] = useState(0);
  const [showDueServices, setShowDueServices] = useState(false);
  const [ct, setCt] = useState({
    acCt: 0,
    roCt: 0,
  });
  const [limits, setLimits] = useState({
    acLimit: 11,
    roLimit: 6,
  });
  const [dueServicesList, setDueServicesList] = useState({});

  useEffect(() => {
    const dueServices = getServiceDueLists(
      customers,
      limits.acLimit,
      limits.roLimit
    );
    const ac = dueServices.acDue.length;
    const ro = dueServices.roDue.length;

    setDueServicesCt(ac + ro);
    setCt({ acCt: ac, roCt: ro });
    setDueServicesList(dueServices);
  }, [customers, limits]);

  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Satkar RO & AC Service</h1>
      <div style={styles.box}>
        <button onClick={onAddContact} className="button-29">
          Add Customer
        </button>
        <button
          className="button-29"
          onClick={() => setShowDueServices(!showDueServices)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Due{" "}
          <span
            style={{
              color: "#fff",
              fontSize: "21px",
              marginLeft: "5px",
              fontStyle: "italic",
              backgroundColor: "grey",
              padding: "3px",
            }}
          >
            {dueServicesCt}
          </span>
        </button>
      </div>
      {showDueServices ? (
        <DueServices
          dueServicesList={dueServicesList}
          ct={ct}
          setLimits={setLimits}
          limits={limits}
        />
      ) : (
        ""
      )}
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
  box: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
};

export default Header;
