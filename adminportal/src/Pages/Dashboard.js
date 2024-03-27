import React, { useState, } from 'react';
import './Dashboard.css';
import Sidebar from '../Components/Sidebar';

const Dashboard = () => {

  return(
    <div>
      <Sidebar/>
      <div className='dashboard'>  
        This is the dashboard page.
      </div>
    </div>
  );
}

export default Dashboard;