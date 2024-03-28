import React, { useState } from 'react';
import './Dashboard.css';
import Sidebar from '../Components/Sidebar';

const Dashboard = () => {
  // Define an array of active washrooms with their information
  const activeWashrooms = [
    { id: 1, name: 'Washroom 1', location: 'Building A', isOpen: true, approved: true },
    { id: 2, name: 'Washroom 2', location: 'Building B', isOpen: false, approved: false },
    { id: 3, name: 'Washroom 3', location: 'Building C', isOpen: true, approved: true },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredWashrooms = activeWashrooms.filter((washroom) =>
    washroom.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const thStyle = {
    backgroundColor: '#000',
    color: 'white',
    fontSize: '20px',
  };

  const tdStyle = {
    padding: '5px',
    border: '1px solid #000',
  };

  const tableStyle = {
    backgroundColor: '#eee',
    borderCollapse: 'collapse',
    fontSize: '0.4em', 
    width: '80%', 
    margin: '0 auto', 
    marginTop:'20px'
  };

  return (
    <div>
      <Sidebar />
      <div className='dashboard'>
        <div style={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'column', alignItems: '', fontSize: '0.8em', marginTop:'100px'}}>
          <h3 style={{ width: '80%', margin: '0 auto', padding: '0.5em', fontSize: '0.5em', textAlign: 'center' }}>Active Washrooms</h3>
          <input style={{ width: '80%', margin: '0 auto', padding: '0.5em', fontSize: '0.4em' }}
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={handleSearch}
          />
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Address</th>
                <th style={thStyle}>Open/Closed</th>
                <th style={thStyle}>Approved</th>
              </tr>
            </thead>
            <tbody>
              {filteredWashrooms.map((washroom) => (
                <tr key={washroom.id}>
                  <td style={tdStyle}>{washroom.id}</td>
                  <td style={tdStyle}>{washroom.name}</td>
                  <td style={tdStyle}>{washroom.location}</td>
                  <td style={tdStyle}>{washroom.isOpen ? 'Open' : 'Closed'}</td>
                  <td style={tdStyle}>{washroom.isOpen ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default Dashboard;