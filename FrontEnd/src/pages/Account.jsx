import React, { useState, useEffect } from 'react';
import '../index.css';
import Header from '../components/Header.jsx';

function Account() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('clientRole');
    setRole(storedRole);
  }, []);

  return (
    <>
      <Header />
      <div className="account-body">
        {role === 'client' && (
          <div className="client-dashboard">
            <h1>Welcome, [Client Name]</h1>
            <div className="client-info">
              <p>Client Information:</p>
              {/* Replace with actual client data from the backend or local storage */}
              <p>Name: John Doe</p>
              <p>Email: johndoe@example.com</p>
              <p>Phone: 123-456-7890</p>
            </div>
            <div className="client-history">
              <h2>Last 3 Rides</h2>
              {/* Replace with actual ride data */}
              <ul>
                <li>Ride 1: Date, Time, Destination</li>
                <li>Ride 2: Date, Time, Destination</li>
                <li>Ride 3: Date, Time, Destination</li>
              </ul>
              <button className="view-history-btn">View History</button>
            </div>
          </div>
        )}
        {role === 'admin' && <div>Admin Dashboard</div>}
      </div>
    </>
  );
}

export default Account;