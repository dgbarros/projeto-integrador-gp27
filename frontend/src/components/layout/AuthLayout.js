// src/components/layout/AuthLayout.js
import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-container" style={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: '100vh', 
      backgroundColor: '#f4f4f4',
      alignItems: 'center', // Centraliza horizontalmente
      justifyContent: 'center', // Centraliza verticalmente
      position: 'relative'
    }}>
      
      {/* Logo e Subtítulo centralizados no topo ou acima do card */}
      <div style={{ 
        marginBottom: '30px', 
        borderLeft: '3px solid #13111C', 
        paddingLeft: '10px',
        width: '350px' // Mantém o alinhamento com o card
      }}>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>Gestão de Metas</h1>
        <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Um novo dia desbloqueado</p>
      </div>

      {children}
    </div>
  );
};

export default AuthLayout;