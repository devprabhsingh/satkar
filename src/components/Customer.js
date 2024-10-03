import Link from "next/link";
import { useEffect } from "react";
let win = "";
export default function Customer({ contact, deleteContact }) {
  useEffect(() => {
    win = window;
  });

  const findDesc = (services) => {
    if (services.length < 1) {
      return "";
    }
    const desc = services[services.length - 1].description;
    if (desc === "" || desc === undefined) {
      return "";
    }
    return desc;
  };

  const serviceDate = (services) => {
    if (services.length === 0) return "N/A"; // No service date available

    // Convert serviceDates to Date objects and find the most recent one
    const dateStr = services[services.length - 1].date;
    return dateStr;
  };

  return (
    <div key={contact._id} style={styles.contactItem}>
      <div style={styles.tileStyle1}>{contact.name}</div>

      <div style={win.innerWidth > 700 ? styles.box2 : styles.box1}>
        <div style={win.innerWidth > 700 ? styles.details : styles.details2}>
          <div style={styles.tileStyle2}>
            <span style={styles.spanStyle}>AC</span>
            <div style={styles.descDate}>
              <p>{findDesc(contact.acServiceDates)}</p>
              <p>{serviceDate(contact.acServiceDates)}</p>
            </div>
          </div>
          <div style={styles.tileStyle2}>
            <span style={styles.spanStyle}>RO</span>
            <div style={styles.descDate}>
              <p>{findDesc(contact.roServiceDates)}</p>
              <p>{serviceDate(contact.roServiceDates)}</p>
            </div>
          </div>
          <div style={styles.tileStyle2}>
            <span style={styles.spanStyle}>Fridge</span>
            <div style={styles.descDate}>
              <p>{findDesc(contact.fridgeServiceDates)}</p>
              <p>{serviceDate(contact.fridgeServiceDates)}</p>
            </div>
          </div>
          <div style={styles.tileStyle2}>
            <span style={styles.spanStyle}>W.Machine</span>
            <div style={styles.descDate}>
              <p>{findDesc(contact.wmServiceDates)}</p>
              <p>{serviceDate(contact.wmServiceDates)}</p>
            </div>
          </div>
          <div style={styles.tileStyle2}>
            <span style={styles.spanStyle}>Geyser</span>
            <div style={styles.descDate}>
              <p>{findDesc(contact.geyserServiceDates)}</p>
              <p>{serviceDate(contact.geyserServiceDates)}</p>
            </div>
          </div>
        </div>

        <div style={styles.buttons}>
          {/* Call and Message buttons */}
          <a
            href={
              contact.phone.length === 10
                ? `tel:+91${contact.phone}`
                : `tel:${contact.phone}`
            }
            style={{ ...styles.baseButton, ...styles.callButton }}
          >
            Call
          </a>
          <a
            href={
              contact.phone.length === 10
                ? `https://wa.me/+91${contact.phone}?text=Hello%2C%20I%20am%20Arvinder%20Singh%20from%20Satkar%20RO%20and%20AC%20service`
                : `https://wa.me/${contact.phone}?text=Hello%2C%20I%20am%20Arvinder%20Singh%20from%20Satkar%20RO%20and%20AC%20service`
            }
            style={{ ...styles.baseButton, ...styles.msgButton }}
          >
            Msg
          </a>

          <Link href={`/customer/${contact._id}`}>
            <button style={{ ...styles.baseButton, ...styles.detailButton }}>
              Details
            </button>
          </Link>

          <button
            onClick={() => {
              deleteContact(contact._id);
            }}
            style={{ ...styles.baseButton, ...styles.deleteButton }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  box1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "column",
  },
  box2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
  },
  tileStyle1: {
    fontSize: "1.6rem",
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  tileStyle2: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "9vh",
    fontSize: "1.1rem",
  },
  contactList: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  details: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  details2: {
    width: "100%",
    flexDirection: "column",
  },
  spanStyle: {
    backgroundColor: "orange",
    padding: "5px",
    fontWeight: "bold",
    fontSize: "1.3rem",
  },
  descDate: {
    display: "flex",
    flex: "0.9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    fontWeight: "bold",
  },
  contactItem: {
    marginBottom: "20px",
    padding: "15px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  buttons: {
    display: "flex",
    gap: "10px", // Space between buttons
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
    paddingBottom: "23px",
  },
  msgButton: {
    backgroundColor: "#fcba03", // Teal for details
  },
  deleteButton: {
    backgroundColor: "#dc3545", // Red for delete
  },
};
