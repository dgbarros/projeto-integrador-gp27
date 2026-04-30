// src/routes/index.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import GoalCreatePage from "../pages/GoalCreatePage";
import MainLayout from "../components/layout/MainLayout";
import GoalList from "../components/Goal/GoalList";
import GoalEditPage from "../components/Goal/GoalEditPage";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/" />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route
          path="/metas"
          element={
            <PrivateRoute>
              <MainLayout>
                <GoalList />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/metas/nova"
          element={
            <PrivateRoute>
              <MainLayout>
                <GoalCreatePage />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/metas/editar/:id"
          element={
            <PrivateRoute>
              <MainLayout>
                <GoalEditPage />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
