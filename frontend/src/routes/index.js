import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/Mainlayout';
import GoalCreatePage from '../pages/GoalCreatePage';
import GoalList from '../components/Goal/GoalList'; 
import GoalEditPage from '../components/Goal/GoalEditPage';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route 
        path="/" 
        element={
          <MainLayout>
            <GoalList />
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
      <Route 
        path="/editar/:id"
        element={
          <MainLayout>
            <GoalEditPage/>
          </MainLayout>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
