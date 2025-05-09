import React, { useState, useContext, useEffect } from "react";
import Header from '../components/Header.jsx';
import AdminDashboard from '../components/AdminDashboard'; 
import ClientDashboard from '../components/ClientDashboard'; 
import { UserContext } from '../components/UserContext';

const Account = () => {
  const { user } = useContext(UserContext);
  const [profileInitials, setProfileInitials] = useState('');

  // Show loading message until user is set
  if (!user) {
    return (
      <>
        <Header profileInitials={profileInitials} />
        <div className="account-container">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header profileInitials={profileInitials} />
      <div className="account-container">
        {/* Conditionally render the dashboard based on admin status */}
        {user.isAdmin ? <AdminDashboard /> : <ClientDashboard />}
      </div>
    </>
  );
}

export default Account;