import Link from 'next/link'; 

export default function Customer({contact}) {
    

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this customer?')) {
          await fetch(`/api/customers/${id}`, { method: 'DELETE' });
          setContacts(contacts.filter(contact => contact._id !== id));
        }
    };
    
  const findDesc = (services) => {
    if (services.length < 1) {
        return ""
      }
        const date = new Date(Math.max(...services.map(d => parseDateString(d.date))));
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        const readableString = `${day}-${month}-${year}`;
        
        const service = services.filter(service => service.date == readableString)
        
        return service[0].description
    }

     // Calculate the number of months until the next service is due
  const parseDateString = (dateString) => {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // Month is 0-indexed in JavaScript Date
    };
    
    const calculateMonthsUntilDue = (serviceDates) => {
        if (serviceDates.length === 0) return 'N/A'; // No service date available
    
        // Convert serviceDates to Date objects and find the most recent one
        const date = new Date(Math.max(...serviceDates.map(d => parseDateString(d.date))));
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        const readableString = `${day}-${month}-${year}`;
    
        // Return the result as a string for display
        return readableString;
    };
    
    return (
    <div key={contact._id} style={styles.contactItem}>
        <div style={styles.tileStyle1}>
            {contact.name}
        </div>

        <div style={window.innerWidth>800?styles.box2:styles.box1}>
            <div style={window.innerWidth>800?styles.details:styles.details2}>
                <div style={styles.tileStyle2}>
                    <h3>{findDesc(contact.acServiceDates) || "AC"}</h3>
                    <p style={{ marginLeft: "20px" }}>{calculateMonthsUntilDue(contact.acServiceDates)}</p>
                </div>
                <div style={styles.tileStyle2}>
                    <h3>{findDesc(contact.roServiceDates)|| "RO"}</h3>
                    <p style={{ marginLeft: "20px" }}>{calculateMonthsUntilDue(contact.roServiceDates)}</p>
                </div>
            </div>

            <div style={styles.buttons}>
                {/* Call and Message buttons */}
                <a href={`tel:${contact.phone}`} style={{ ...styles.baseButton, ...styles.callButton }}>
                    Call
                </a>

                <Link href={`/customer/${contact._id}`}>
                    <button style={{ ...styles.baseButton, ...styles.detailButton }}>
                        See Full Details
                    </button>
                </Link>

                <button onClick={() => handleDelete(contact._id)} style={{ ...styles.baseButton, ...styles.deleteButton }}>
                    Delete
                </button>
            </div>
        </div>
        </div>
    )
}

const styles = {
  box1: { display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column', },
  box2:{ display: 'flex', alignItems: 'center', justifyContent: 'space-around',flexDirection:'row', },
  tileStyle1: {
    fontSize: '2rem',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  tileStyle2: {
    margin:"0 40px",
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height:'7vh'
  },
  contactList: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  details: {
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-around'
  },
  details2:{
    flexDirection:'column'
  },
  contactItem: {
    marginBottom: '20px',
    padding: '15px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  buttons: {
    display: 'flex',
    gap: '10px', // Space between buttons
  },
  baseButton: {
    padding: '7px 15px',
    fontSize: '1rem',
    color: 'white',
    backgroundColor: '#007BFF', // Default color (blue)
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none', // For <a> tags
    display: 'inline-block', // To ensure consistent button appearance
    textAlign: 'center',
  },
  callButton: {
    paddingTop:'10px',
    backgroundColor: '#28a745', // Green for call
  },
  detailButton: {
    backgroundColor: '#17a2b8', // Teal for details
    padding:"15px 20px"
  },
  deleteButton: {
    backgroundColor: '#dc3545', // Red for delete
  }
}