// src/pages/RegisterPage.js
import React, { useState } from "react";
import AuthLayout from "../components/layout/AuthLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const payload = {
      email: email,
      senha: senha,
    };

    console.log("Enviando dados de registro para a API Python:", payload);
    // Lógica do fetch aqui...
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
        <h2
          style={{
            textAlign: "center",
            fontSize: "28px",
            marginBottom: "30px",
          }}
        >
          Cadastrar-se
        </h2>

        <form
          onSubmit={handleRegister}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div>
            <label
              style={{
                fontSize: "10px",
                textTransform: "uppercase",
                color: "#888",
              }}
            >
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
            <label
              style={{
                fontSize: "10px",
                textTransform: "uppercase",
                color: "#888",
              }}
            >
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
            style={{
              marginTop: "10px",
              backgroundColor: "#13111C",
              color: "#FFF",
            }}
          >
            Cadastrar
          </Button>
        </form>

        <div
          style={{ marginTop: "20px", textAlign: "center", fontSize: "14px" }}
        >
          <span style={{ color: "#666" }}>Já possui conta? </span>
          <Link
            to="/"
            style={{
              color: "#13111C",
              fontWeight: "bold",
              textDecoration: "none",

            }}
          >
            Entrar
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
