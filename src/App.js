import React, { Component } from "react";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Home from "./Pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/laning-page" />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/laning-page" element={<Home />} />
        </Routes>
      </div>
    );
  }
}
