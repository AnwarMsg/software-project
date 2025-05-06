import React, { useState } from "react";
import Header from '../components/Header.jsx';


// Simulated user data - replace with real database lookup
const currentUser = {
  name: "John Doe",
  isAdmin: false, // change to true to simulate admin access
};

const ClientDashboard = () => {
    const [showHistory, setShowHistory] = useState(false);
  
    const toggleHistory = () => {
      setShowHistory(!showHistory);
    };
  
    return (
      <div className="client-dashboard">
        <h1>Welcome to Your Account</h1>
        <p>This is your account, {currentUser.name}.</p>
        <p>Age: 25</p>
        <p>Email: johndoe@example.com</p>
        <h3>Ride History: <button className="history-toggle" onClick={toggleHistory}>View History</button></h3>
  
        {showHistory && (
          <div className="ride-history-modal">
            <div className="ride-history-backdrop" onClick={toggleHistory}></div>
            <div className="ride-history-popup">
              <h4>Ride History</h4>
              <ul className="ride-history-list">
                <li>Date, Destination</li>
                <li>Date, Destination</li>
                <li>Date, Destination</li>
              </ul>
              <button className="close-history" onClick={toggleHistory}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  };

const AdminDashboard = () => (
  <div>
    <h1>Admin Dashboard</h1>
    <p>Welcome, admin! You can manage users and rides here.</p>
  </div>
);

const Account = () => {
  const [showAdmin, setShowAdmin] = useState(false);

  const handleAdminClick = () => {
    if (!currentUser.isAdmin) return; // Do nothing if not admin
    setShowAdmin(true);
  };

  return (
    <>
    <Header/>
    <div className="account-container">
      <button className="admin-button" onClick={handleAdminClick}>Admin</button>
      {showAdmin && currentUser.isAdmin ? <AdminDashboard /> : <ClientDashboard />}
    </div>
    </>
  );
};

export default Account;