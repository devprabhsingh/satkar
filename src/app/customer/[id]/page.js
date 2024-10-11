"use client";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";

// Fetcher function for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CustomerDetails() {
  const { id } = useParams(); // Get the customer ID from URL params
  const router = useRouter();
  const { data, error } = useSWR(id ? `/api/customers/${id}` : null, fetcher);

  if (error)
    return <div style={styles.error}>Failed to load customer data</div>;
  if (!data) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        <button
          onClick={() => router.push("/", undefined, { shallow: true })}
          style={styles.backButton}
        >
          Back to Main
        </button>

        <button
          onClick={() => router.push(`/customer/${id}/edit`)}
          style={styles.editButton}
        >
          Edit
        </button>
      </div>
      <h1 style={{ ...styles.title, marginBottom: 0 }}>{data.name}</h1>
      <p style={{ ...styles.phone, marginTop: 0 }}>
        Phone: {data.phone.slice(0, 5)}-{data.phone.slice(5, data.phone.length)}
      </p>

      <div style={styles.section}>
        <h2>AC</h2>
        {data.acServiceDates.length > 0 ? (
          data.acServiceDates.map((date, index) => (
            <div key={index} style={styles.serviceItem}>
              <p>
                <strong>Date:</strong> {date.date}
              </p>
              <p>
                <strong>Description:</strong> {date.description}
              </p>
              <p>
                <strong>Price:</strong> Rs. {date.price}
              </p>
            </div>
          ))
        ) : (
          <p>No AC service/Repair</p>
        )}
      </div>

      <div style={styles.section}>
        <h2>RO</h2>
        {data.roServiceDates.length > 0 ? (
          data.roServiceDates.map((date, index) => (
            <div key={index} style={styles.serviceItem}>
              <p>
                <strong>Date:</strong> {date.date}
              </p>
              <p>
                <strong>Description:</strong> {date.description}
              </p>
              <p>
                <strong>Price:</strong> Rs.{date.price}
              </p>
            </div>
          ))
        ) : (
          <p>No RO service/repair</p>
        )}
      </div>

      <div style={styles.section}>
        <h2>Fridge</h2>
        {data.fridgeServiceDates.length > 0 ? (
          data.fridgeServiceDates.map((date, index) => (
            <div key={index} style={styles.serviceItem}>
              <p>
                <strong>Date:</strong> {date.date}
              </p>
              <p>
                <strong>Description:</strong> {date.description}
              </p>
              <p>
                <strong>Price:</strong> Rs.{date.price}
              </p>
            </div>
          ))
        ) : (
          <p>No Fridge service/repair</p>
        )}
      </div>

      <div style={styles.section}>
        <h2>Washing Machine</h2>
        {data.wmServiceDates.length > 0 ? (
          data.wmServiceDates.map((date, index) => (
            <div key={index} style={styles.serviceItem}>
              <p>
                <strong>Date:</strong> {date.date}
              </p>
              <p>
                <strong>Description:</strong> {date.description}
              </p>
              <p>
                <strong>Price:</strong> Rs.{date.price}
              </p>
            </div>
          ))
        ) : (
          <p>No W.Machine service/repair</p>
        )}
      </div>

      <div style={styles.section}>
        <h2>Geyser</h2>
        {data.geyserServiceDates.length > 0 ? (
          data.geyserServiceDates.map((date, index) => (
            <div key={index} style={styles.serviceItem}>
              <p>
                <strong>Date:</strong> {date.date}
              </p>
              <p>
                <strong>Description:</strong> {date.description}
              </p>
              <p>
                <strong>Price:</strong> Rs.{date.price}
              </p>
            </div>
          ))
        ) : (
          <p>No Geyser service/repair</p>
        )}
      </div>

      <div style={styles.buttonContainer}>
        <button
          onClick={() => router.push("/", undefined, { shallow: true })}
          style={styles.backButton}
        >
          Back to Main
        </button>

        <button
          onClick={() => router.push(`/customer/${id}/edit`)}
          style={styles.editButton}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    maxWidth: "600px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
  },
  phone: {
    fontSize: "20px",
  },
  section: {
    borderTop: "1px solid #ddd",
    paddingTop: "10px",
  },
  serviceItem: {
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "4px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    fontSize: "18px",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  backButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "18px",
  },
  editButton: {
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "18px",
  },
  error: {
    color: "red",
    textAlign: "center",
    padding: "20px",
  },
  loading: {
    textAlign: "center",
    padding: "20px",
  },
};
