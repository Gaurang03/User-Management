// AccountCreationForm.js

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';

const AccountCreationForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/create-account', { username, password, email, phone });

      onSubmit({ username, password, email, phone });

      // Display success notification
      toast.success('Account created successfully!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Close after 3 seconds
      });

      setUsername('');
      setPassword('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Error creating account:', error);

      // Display error notification
      toast.error('Error creating account. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Close after 3 seconds
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Phone:
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <button type="submit">Create Account</button>
    </form>
  );
};

export default AccountCreationForm;
