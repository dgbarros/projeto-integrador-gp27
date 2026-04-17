// src/routes/index.js (ou AppRoutes.js)
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import GoalCreatePage from '../pages/GoalCreatePage';
import MainLayout from '../components/layout/Mainlayout';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Rota principal: Quando o usuário digita só o site, cai no Login */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Rota para criar a conta */}
        <Route path="/cadastro" element={<RegisterPage />} />

        {/* Rotas Protegidas (Dentro do sistema) 
            Normalmente, você envolve essas rotas no seu MainLayout e na Sidebar
        */}
        <Route path="/metas" element={
            <MainLayout>
              {/* Aqui você chamaria seu GoalList futuramente */}
              <div>Lista de Metas</div> 
            </MainLayout>
        } />

        <Route path="/metas/nova" element={
            <MainLayout>
              <GoalCreatePage />
            </MainLayout>
        } />

        {/* Rota de fallback (se o usuário digitar um endereço que não existe) */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;