import React, { useState, } from 'react';
import './Requests.css';
import Sidebar from '../Components/Sidebar';

const Requests = () => {

  return(
    <div>
      <Sidebar/>
      <div className='requests'>  
        This is the requests page.
      </div>
    </div>
    
  );
}

export default Requests;