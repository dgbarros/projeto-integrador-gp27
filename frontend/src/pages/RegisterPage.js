// src/pages/RegisterPage.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import AuthLayout from "../components/layout/AuthLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const RegisterPage = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true); 

    const payload = {
      nome: nome, 
      email: email,
      senha: senha,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/usuarios/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Erro:", data);
        alert(data.detail || "Erro ao cadastrar. Tente novamente."); 
        setIsLoading(false);
        return;
      }

      console.log("Usuário criado:", data);
      alert("Cadastro realizado com sucesso! Faça seu login.");
      navigate("/");
      
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
        }}
      >
        <h2 style={{ textAlign: "center", fontSize: "28px", marginBottom: "30px" }}>
          Cadastrar-se
        </h2>

        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ fontSize: "10px", textTransform: "uppercase", color: "#888" }}>
              Nome e sobrenome
            </label>
            <Input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={{ fontSize: "10px", textTransform: "uppercase", color: "#888" }}>
              Email
            </label>
            <Input
              type="text"
              placeholder="exemplo@gmail.com"
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
            {isLoading ? "Cadastrando..." : "Cadastrar"} 
          </Button>
        </form>

        <div style={{ marginTop: "20px", textAlign: "center", fontSize: "14px" }}>
          <span style={{ color: "#666" }}>Já possui conta? </span>
          <Link
            to="/"
            style={{ color: "#13111C", fontWeight: "bold", textDecoration: "none" }}
          >
            Entrar
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;