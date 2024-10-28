import React, { useState } from 'react';
import './DeviceRegistration.css';

function DeviceRegistration({ onAddDevice }) {
  const [deviceName, setDeviceName] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!deviceName || !ipAddress || !password) {
      alert('All fields are required!');
      return;
    }

    const newDevice = { deviceName, ipAddress, password };

    try {
      const response = await fetch('http://127.0.0.1:5000/add_device', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDevice),
      });

      const data = await response.json();

      if (response.ok) {
        onAddDevice(newDevice);
        setMessage('Device added successfully!');
      } else {
        setMessage(data.message || 'Error adding device');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error connecting to the server.');
    }

    // Clear the form fields after submission
    setDeviceName('');
    setIpAddress('');
    setPassword('');
  };

  return (
    <div className="device-registration">
      <h2>Register Device</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Device Name:</label>
          <input
            type="text"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>IP Address:</label>
          <input
            type="text"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Device</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default DeviceRegistration;
