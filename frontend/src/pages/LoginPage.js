// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importante para a navegação
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login:", { email, senha });
  };

  return (
    <AuthLayout>
      <div style={{ backgroundColor: '#e0e0e0', padding: '40px', borderRadius: '8px', width: '350px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '30px' }}>Login</h2>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '10px', textTransform: 'uppercase', color: '#888' }}>Email</label>
            <Input type="text" placeholder="Seu email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          
          <div>
            <label style={{ fontSize: '10px', textTransform: 'uppercase', color: '#888' }}>Senha</label>
            <Input type="password" placeholder="****" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </div>

          <Button type="submit" style={{ marginTop: '10px', backgroundColor: '#13111C', color: '#FFF' }}>
            Entrar
          </Button>
        </form>

        {/* Link para cadastro */}
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
          <span style={{ color: '#666' }}>Não possui uma conta? </span>
          <Link to="/cadastro" style={{ color: '#13111C', fontWeight: 'bold', textDecoration: 'none' }}>
            Cadastre-se
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;