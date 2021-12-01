import React, { useState, useRef, useEffect } from "react";
import './App.css';
import Home from './Home';
import { Route, Router, Routes, Link } from 'react-router-dom';

export default function Login() {
    const unameRef = useRef()
    const pwordRef = useRef()

    function handleLogin(e) {
        const uname = "admin"
        const pword = "abc123"
        const getUname = unameRef.current.value
        const getPword = pwordRef.current.value
        if (uname === getUname && pword === getPword){
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                </Routes>
            </Router>
        }else{
            alert('error');
        }
    }

    return (
        <>
        <h1>User Login</h1>
        <div class="holder">
            <div class ="holder">
                <input class="field" ref={unameRef} type="text" placeholder="Username" required />
                <input class="field" ref={pwordRef} type="password" placeholder="Password" required />
            </div>
            <div class ="holder">
                <button onClick={handleLogin}>Login</button>
            </div>
            <div class ="holder">
                <Link to="/">Home</Link>
            </div>
        </div>
        </>
    )
}