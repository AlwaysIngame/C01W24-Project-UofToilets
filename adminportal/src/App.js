import React from 'react';
import './App.css';
import {  BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
import LoginPage from './Pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/dashboard"/>
        <Route path="/" element={<Navigate replace to="/login"/>} />
      </Routes>
    </Router>
  );
}

export default App;
