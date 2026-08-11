import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import GoalCreatePage from "../pages/GoalCreatePage";
import GoalListPage from "../pages/GoalListPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <GoalListPage />
            </MainLayout>
          }
        />
        <Route
          path="/cadastrar"
          element={
            <MainLayout>
              <GoalCreatePage />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
