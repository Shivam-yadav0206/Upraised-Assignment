import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

//COMPONENTS
import Header from "./components/Header";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

const PrivateRoute = ({ isAuthenticated, setIsAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <>
      <Header setIsAuthenticated={setIsAuthenticated} />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <Login setUser={setUser} setIsAuthenticated={setIsAuthenticated} />
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute
              setIsAuthenticated={setIsAuthenticated}
              isAuthenticated={isAuthenticated}
            />
          }>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
