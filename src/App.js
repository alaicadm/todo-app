import React from "react";
import Login from './Login';
import Home from './Home';
//import './Home.js';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
    </Router>
  );
}

export default App;

