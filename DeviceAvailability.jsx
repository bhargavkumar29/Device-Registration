import React, { useState, useEffect } from 'react';
import './DeviceAvailability.css';

function DeviceAvailability() {
  const [devices, setDevices] = useState([]);
  const [searchDevice, setSearchDevice] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [result, setResult] = useState('');

  // Function to fetch devices from the backend
  const fetchDevices = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get_devices');
      const data = await response.json();
      setDevices(data.devices); // Assuming the backend returns { devices: [...] }
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  // Function to check device availability
  const checkAvailability = async (e) => {
    e.preventDefault();

    if (!searchDevice || !inputPassword) {
      alert('Please enter a device name and password.');
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/check_availability?deviceName=${searchDevice}&password=${inputPassword}`
      );
      const data = await response.json();

      if (response.ok) {
        setResult(`Device is ${data.status}`);
      } else {
        setResult(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setResult('Error checking availability');
    }
  };

  useEffect(() => {
    fetchDevices(); // Fetch devices on component mount
  }, []);

  return (
    <div className="device-availability">
      <h2>Check Device Availability</h2>
      <form onSubmit={checkAvailability}>
        <div>
          <label>Device Name:</label>
          <input
            type="text"
            value={searchDevice}
            onChange={(e) => setSearchDevice(e.target.value)}
            placeholder="Enter device name"
            className="small-input" // Add a class for small input boxes
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            className="small-input" // Add a class for small input boxes
          />
        </div>
        <button type="submit">Check Availability</button>
      </form>
      {result && <p className="result">Result: {result}</p>} {/* Center result text */}
    </div>
  );
}

export default DeviceAvailability;
