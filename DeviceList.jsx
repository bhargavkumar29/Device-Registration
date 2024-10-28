import React, { useEffect, useState } from 'react';
import './DeviceList.css'; // Ensure to import the CSS file

function DeviceList() {
  const [devices, setDevices] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/get_devices');
        const data = await response.json();

        // Check if the response is an array
        if (Array.isArray(data)) {
          setDevices(data);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    fetchDevices();
  }, []);

  return (
    <div className="device-list">
      <h2>Device List</h2>
      {devices.length === 0 ? (
        <p>No devices found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Device Name</th>
              <th>IP Address</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device, index) => (
              <tr key={index}>
                <td>{device.deviceName}</td>
                <td>{device.ipAddress}</td>
                <td>{device.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DeviceList;
