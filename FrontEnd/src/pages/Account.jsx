import React, { useState, useRef, useEffect } from "react";
import Header from '../components/Header.jsx';

// Simulated user data - change isAdmin to true to simulate admin access
const currentUser = {
  name: "John Doe",
  isAdmin: true, // Change this to true for admin access
};

const driversData = [
  { id: 1, name: "Driver 1", details: "Details about Driver 1", age: 35, email: "driver1@example.com", carModel: "Toyota Corolla", averageReview: 4.6, requestStatus: "accepted" },
  { id: 2, name: "Driver 2", details: "Details about Driver 2", age: 41, email: "driver2@example.com", carModel: "Honda Civic", averageReview: 4.8, requestStatus: "accepted" },
  { id: 3, name: "Passenger 1", details: "Passenger wanting to become Driver 1", age: 29, email: "passenger1@example.com", carModel: "N/A", averageReview: 0, requestStatus: "pending" },
  { id: 4, name: "Passenger 2", details: "Passenger wanting to become Driver 2", age: 30, email: "passenger2@example.com", carModel: "N/A", averageReview: 0, requestStatus: "pending" },
];

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

const AdminDashboard = () => {
  const [drivers, setDrivers] = useState(driversData);
  const [popupVisibleId, setPopupVisibleId] = useState(null);

  const handleRemoveDriver = (driverId) => {
    const updatedDrivers = drivers.filter(driver => driver.id !== driverId);
    setDrivers(updatedDrivers);
  };

  const handleDriverClick = (driver) => {
    setPopupVisibleId(prev => prev === driver.id ? null : driver.id);
  };

  const handleAcceptRequest = (driverId) => {
    const updatedDrivers = drivers.map(driver =>
      driver.id === driverId ? { ...driver, requestStatus: "accepted" } : driver
    );
    setDrivers(updatedDrivers);
  };

  const handleDeclineRequest = (driverId) => {
    const updatedDrivers = drivers.filter(driver => driver.id !== driverId);
    setDrivers(updatedDrivers);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome, admin! You can manage users and rides here.</p>

      <h2>Drivers</h2>
      <ul>
        {drivers
          .slice()
          .sort((a, b) => (a.requestStatus === "pending" && b.requestStatus !== "pending" ? -1 : b.requestStatus === "pending" && a.requestStatus !== "pending" ? 1 : 0))
          .map((driver, index) => (
          <li key={driver.id}>
            <span
              className="driver-name"
              onClick={() => handleDriverClick(driver)}
            >
              {driver.name}
            </span>
            {popupVisibleId === driver.id && (
              <div className="driver-details-inline">
                <p><strong>Email:</strong> {driver.email}</p>
                <p><strong>Age:</strong> {driver.age}</p>
                <p><strong>Car Model:</strong> {driver.carModel}</p>
                <p><strong>Avg. Review:</strong> {driver.averageReview} / 5</p>
              </div>
            )}
            {driver.requestStatus === "pending" ? (
              <>
                <button
                  className="accept-button"
                  onClick={() => handleAcceptRequest(driver.id)}>
                  Accept
                </button>
                <button
                  className="decline-button"
                  onClick={() => handleDeclineRequest(driver.id)}>
                  Decline
                </button>
              </>
            ) : (
              <button
                className="remove-button"
                onClick={() => handleRemoveDriver(driver.id)}>
                -
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Account = () => {
  const [showAdmin, setShowAdmin] = useState(false);

  const handleAdminClick = () => {
    if (!currentUser.isAdmin) return; // Do nothing if not admin
    setShowAdmin(true);
  };

  return (
    <>
    <Header />
    <div className="account-container">
      {/* Admin button will be hidden when in admin mode */}
      {!showAdmin && currentUser.isAdmin && (
        <button className="admin-button" onClick={handleAdminClick}>Admin</button>
      )}
      {showAdmin && currentUser.isAdmin ? <AdminDashboard /> : <ClientDashboard />}
    </div>
    </>
  );
};

export default Account;