import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  //Link
} from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const { isAuthenticated } = useSelector(state => state.auth)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}>
          </Route>
          <Route path="/register" element={<Register />}>
          </Route>

          <Route element={<PrivateRoutes />} >
            <Route path="/" element={<Dashboard />}>
            </Route>
            <Route path="/:conversationId" element={<Dashboard />}>
            </Route>
          </Route>
        </Routes>
        {/* </div> */}
      </BrowserRouter>
    </div>
  );
}


export default App;
