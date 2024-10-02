import React, { useState } from "react";
import Link from "next/link";
let typ = "RO";

const DueServices = ({ dueServicesList, ct, setLimits }) => {
  const [dueContacts, setDueContacts] = useState(dueServicesList.roDue);

  const showContacts = (type) => {
    if (type === "ac") {
      setDueContacts(dueServicesList.acDue);
      typ = "AC";
      document.getElementById("duebtn1").style.backgroundColor = "#fff";
      document.getElementById("duebtn2").style.backgroundColor = "lightgrey";
    } else if (type === "ro") {
      setDueContacts(dueServicesList.roDue);
      typ = "RO";
      document.getElementById("duebtn1").style.backgroundColor = "lightgrey";
      document.getElementById("duebtn2").style.backgroundColor = "#fff";
    }
  };

  return (
    <div style={styles.dueServicesWrapper}>
      <div>Set limits</div>

      <div style={styles.buttonsWrapper}>
        <button
          style={{ ...styles.btn, backgroundColor: "lightgrey" }}
          onClick={() => showContacts("ro")}
          id="duebtn1"
        >
          RO -
          <span
            style={{ color: "#DC3545", fontSize: "21px", marginLeft: "5px" }}
          >
            {ct.roCt}
          </span>
        </button>
        <button
          style={styles.btn}
          id="duebtn2"
          onClick={() => showContacts("ac")}
        >
          AC -
          <span
            style={{ color: "#DC3545", fontSize: "21px", marginLeft: "5px" }}
          >
            {ct.acCt}
          </span>
        </button>
      </div>
      <div>
        {dueContacts.length > 0 ? (
          <h2 style={{ textAlign: "center" }}>{typ} Dues</h2>
        ) : (
          <h2 style={{ textAlign: "center" }}>No dues</h2>
        )}
        {dueContacts.map((cont, index) => {
          return (
            <div key={index} style={styles.contactBox}>
              <p style={styles.nameField}>{cont.name}</p>
              <div style={styles.dueInfo}>
                <p style={styles.field}>{cont.latestService.description}</p>
                <p style={styles.field}>{cont.latestService.date}</p>
              </div>
              <p
                style={{
                  color: "red",
                  fontStyle: "italic",
                  fontSize: "20px",
                  textAlign: "center",
                  margin: "5px 0",
                }}
              >
                {cont.months} months ago
              </p>
              <div style={styles.buttons}>
                {/* Call and Message buttons */}
                <a
                  href={`tel:${cont.phone}`}
                  style={{ ...styles.baseButton, ...styles.callButton }}
                >
                  Call
                </a>
                <a
                  href={`https://wa.me/${cont.phone}?text=Hello%2C%20I%20am%20Arvinder%20Singh%20from%20Satkar%20RO%20and%20AC%20service`}
                  style={{ ...styles.baseButton, ...styles.msgButton }}
                >
                  Msg
                </a>

                <Link href={`/customer/${cont._id}`}>
                  <button
                    style={{ ...styles.baseButton, ...styles.detailButton }}
                  >
                    Details
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  dueServicesWrapper: {
    backgroundColor: "lightgrey",
    width: "100%",
    margin: "2vh auto",
  },
  buttonsWrapper: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  btn: {
    fontSize: "18px",
    fontWeight: "bold",
    padding: "13px",
    backgroundColor: "#fff",
    borderColor: "grey",
    width: "50%",
  },
  contactBox: {
    backgroundColor: "white",
    fontWeight: "bold",
    margin: "10px",
    padding: "14px 0",
  },
  nameField: {
    textAlign: "center",
    fontSize: "28px",
    margin: 0,
  },
  dueInfo: {
    fontSize: "23px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  field: {
    width: "50%",
    padding: "0 10px",
    margin: "5px",
  },
  buttons: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  baseButton: {
    padding: "13px",
    fontSize: "1.2rem",
    color: "white",
    backgroundColor: "#007BFF", // Default color (blue)
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none", // For <a> tags
    textAlign: "center",
  },
  callButton: {
    backgroundColor: "#28a745", // Green for call
  },
  detailButton: {
    backgroundColor: "#17a2b8", // Teal for details
    paddingBottom: "20px",
    fontWeight: "bold",
  },
  msgButton: {
    backgroundColor: "#fcba03", // Teal for details
  },
};
export default DueServices;
