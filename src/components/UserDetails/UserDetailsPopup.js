// UserDetailsPopup.js
import React from 'react';

const UserDetailsPopup = ({ user, onClose, onGenerateReport }) => {
  return (
    <div>
      <h2>User Details</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>ID: {user.id}</p>
      <p>Creation Date: {user.creationDate}</p>
      <button onClick={onGenerateReport}>Generate Report</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default UserDetailsPopup;
