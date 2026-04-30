// src/pages/LoginPage.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import AuthLayout from "../components/layout/AuthLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); 

    const payload = {
      email: email,
      senha: senha,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Erro no login:", data);
        alert("Email ou senha inválidos");
        setIsLoading(false);
        return;
      }

      
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("email", email);
      
     
      if (data.nome) {
        localStorage.setItem("nome", data.nome);
      } else {
        localStorage.setItem("nome", "Usuário");
      }

      console.log("Login de sucesso! Token e Nome salvos.");
      navigate("/metas");
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <AuthLayout>
      <div
        style={{
          backgroundColor: "#e0e0e0",
          padding: "40px",
          borderRadius: "8px",
          width: "350px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", fontSize: "28px", marginBottom: "30px" }}>
          Login
        </h2>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ fontSize: "10px", textTransform: "uppercase", color: "#888" }}>
              Email
            </label>
            <Input
              type="text"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: "10px", textTransform: "uppercase", color: "#888" }}>
              Senha
            </label>
            <Input
              type="password"
              placeholder="****"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading} 
            style={{
              marginTop: "10px",
              backgroundColor: isLoading ? "#666" : "#13111C", 
              color: "#FFF",
              cursor: isLoading ? "not-allowed" : "pointer"
            }}
          >
            {isLoading ? "Entrando..." : "Entrar"} 
          </Button>
        </form>

        <div style={{ marginTop: "20px", textAlign: "center", fontSize: "14px" }}>
          <span style={{ color: "#666" }}>Não possui uma conta? </span>
          <Link
            to="/cadastro"
            style={{ color: "#13111C", fontWeight: "bold", textDecoration: "none" }}
          >
            Cadastre-se
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;