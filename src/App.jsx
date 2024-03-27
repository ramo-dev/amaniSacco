// App.js

import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Login from "./routes/Login";
import DashRoutes from "./routes/Dashboard/routes/DashRoutes";
import { useEffect, useState } from "react";
import { account } from "./utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import ProtectedRoutes from "./ProtectedRoutes";
import NotFound from "./NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<ProtectedRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
