import React, { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { Alert, Snackbar } from "@mui/material";

const GoalForm = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    kpi: "",
    valor_alvo: "",
    prazo: "",
  });

  const [open, setOpen] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/metas/post_cadastrar_metas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: formData.titulo,
          kpi: formData.kpi,
          valor_alvo: parseFloat(formData.valor_alvo),
          prazo: formData.prazo,
        }),
      });

      if (!response.ok) throw new Error("Erro ao enviar meta");

      setFormData({ titulo: "", kpi: "", valor_alvo: "", prazo: "" });
      setOpen(true); 
    } catch (error) {
      console.error("Erro ao cadastrar meta:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input label="Título da Meta" name="titulo" value={formData.titulo} onChange={handleChange} />
        <Input label="Métrica (KPI)" name="kpi" value={formData.kpi} onChange={handleChange} />
        <Input label="Valor-Alvo" name="valor_alvo" value={formData.valor_alvo} onChange={handleChange} />
        <Input label="Prazo" name="prazo" type="date" value={formData.prazo} onChange={handleChange} />

        <div style={{ marginTop: "20px" }}>
          <Button type="submit" styleType="primary">Enviar</Button>
        </div>
      </form>

      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert severity="success" onClose={() => setOpen(false)}>
          Meta enviada com sucesso!
        </Alert>
      </Snackbar>
    </>
  );
};

export default GoalForm;
