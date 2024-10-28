import React, { useState } from 'react';
import DeviceRegistration from './components/DeviceRegistration';
import DeviceAvailability from './components/DeviceAvailability';
import DeviceList from './components/DeviceList'; // Import the new component
import './App.css';

function App() {
  const [devices, setDevices] = useState([]);

  const handleAddDevice = (newDevice) => {
    setDevices([...devices, newDevice]);
  };

  return (
    <div className="App">
      <h1>Device Management</h1>
      <DeviceRegistration onAddDevice={handleAddDevice} />
      <DeviceAvailability devices={devices} />
      <DeviceList /> {/* Include the DeviceList component */}
    </div>
  );
}

export default App;
