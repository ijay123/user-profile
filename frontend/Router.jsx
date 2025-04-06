import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./src/screens/Home";
import CreateUser from "./src/screens/CreateUser";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createUser" element={<CreateUser />} />
      </Routes>
    </Router>
  );
};

export default Routers;
