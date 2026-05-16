import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout'; 

const Sidebar = () => {
  const navigate = useNavigate();

  const userName = localStorage.getItem("nome") || "Usuário";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("nome");
    
    navigate("/");
  };

  return (
    <div style={{ 
      width: '250px', 
      background: '#2c3e50', 
      color: 'white', 
      height: '100vh',
      position: 'sticky',
      top: 0, 
      padding: '20px',
      display: 'flex',        
      flexDirection: 'column' 
    }}>
      
      <h3 style={{ fontSize: '16px', marginBottom: '30px', wordBreak: 'break-all' }}>
        {userName}
      </h3> 
      
      <nav style={{ flex: 1 }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/metas/nova" style={{ color: 'white', textDecoration: 'none' }}>
              Cadastrar Metas
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/metas" style={{ color: 'white', textDecoration: 'none' }}>
              Visualizar Metas
            </Link>
          </li>
        </ul>
      </nav>

      <div 
        onClick={handleLogout}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          cursor: 'pointer', 
          paddingTop: '15px',
          borderTop: '1px solid #34495e', 
          transition: 'opacity 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = 0.7} 
        onMouseLeave={(e) => e.currentTarget.style.opacity = 1}
      >
        <LogoutIcon style={{ marginRight: '10px' }} />
        <span style={{ fontWeight: 'bold' }}>Sair da conta</span>
      </div>
      
    </div>
  );
};

export default Sidebar;