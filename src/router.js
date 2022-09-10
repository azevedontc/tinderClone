import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import SignupPage from "./pages/signup";
import MainPage from "./pages/index";
import ProfilePage from "./pages/profile";
import ConfigPage from "./pages/config";
import MatchPage from "./pages/matchs";
import LoginPage from "./pages/login";
import { isAuthenticated } from "./services/auth";
import { AccountProvider } from "./services/context";

const PrivateRoute = ({ children }) => {
  let location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default function Router() {
  return (
    <BrowserRouter>
      <AccountProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/config"
            element={
              <PrivateRoute>
                <ConfigPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/match"
            element={
              <PrivateRoute>
                <MatchPage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </AccountProvider>
    </BrowserRouter>
  );
}
