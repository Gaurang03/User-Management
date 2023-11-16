// App.js

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserDetailsTable from './components/UserDetails/UserDetailsTable';
import UserDetailsPopup from './components/UserDetails/UserDetailsPopup';
import AccountCreationForm from './components/AccountCreation/AccountCreationForm';
import api from './services/api';
import './styles.css'

const App = () => {
  const [activeTab, setActiveTab] = useState('accountCreation');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    api.get('/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleClosePopup = () => {
    setSelectedUser(null);
  };

  const handleGenerateReport = () => {
    console.log('Generating report for user:', selectedUser);
    handleClosePopup();
  };

  const handleAccountCreation = async (formData) => {
    try {
      await api.post('/create-account', formData);
      fetchUsers();

      // Display success notification
      toast.success('Account created successfully!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Close after 3 seconds
      });
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  return (
    <div>
      <h1>User Management Dashboard</h1>
      <div>
        <button
          onClick={() => {
            setActiveTab('userDetails');
            fetchUsers();
          }}
          className={activeTab === 'userDetails' ? 'active' : ''}
        >
          User Details
        </button>
        <button
          onClick={() => setActiveTab('accountCreation')}
          className={activeTab === 'accountCreation' ? 'active' : ''}
        >
          Account Creation
        </button>
      </div>
      {activeTab === 'userDetails' && users.length > 0 && (
        <UserDetailsTable users={users} onUserClick={handleUserClick} />
      )}
      {activeTab === 'userDetails' && selectedUser && (
        <UserDetailsPopup
          user={selectedUser}
          onClose={handleClosePopup}
          onGenerateReport={handleGenerateReport}
        />
      )}
      {activeTab === 'accountCreation' && (
        <div>
          <AccountCreationForm onSubmit={handleAccountCreation} />
          {/* Toast container for notifications */}
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default App;
