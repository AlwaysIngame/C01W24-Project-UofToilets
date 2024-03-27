import React from 'react';
import './App.css';
import {  BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
import LoginPage from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Requests from './Pages/Requests';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/admin/dashboard" element={<Dashboard/>}/>
        <Route path="/admin/requests" element={<Requests/>}/>
        <Route path="/" element={<Navigate replace to="/login"/>} />
      </Routes>
    </Router>
  );
}

export default App;
