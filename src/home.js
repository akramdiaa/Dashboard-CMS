import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from './pages/log/home';
import About from './pages/log/about';
import Login from './pages/log/login';
import Pricing from './pages/log/pricing';
import Tutorials from './pages/log/tutorials';
import Dash from './pages/log/dash';
import './App.css';
import Register from './pages/log/register';
import Forgot from './pages/log/forgot';

import React from 'react'

export default function Dashboard() {
 const location = useLocation();
 return (
    <Routes location={location} key={location.pathname}>
          <Route exact path="/" element={<Login />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/about" element={<About />} />
        <Route path="/price" element={<Pricing />} />
        <Route path="/tutorial" element={<Tutorials />} />
        <Route path="/dash" element={<Dash />} />
        </Routes>
  );
 }