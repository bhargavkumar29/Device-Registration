import React from 'react';
import DeviceRegistration from './components/DeviceRegistration';

function App() {
  const handleAddDevice = (device) => {
    console.log('New device added:', device);
  };

  return (
    <div className="App">
      <h1>Device Management</h1>
      <DeviceRegistration onAddDevice={handleAddDevice} />
    </div>
  );
}

export default App;
