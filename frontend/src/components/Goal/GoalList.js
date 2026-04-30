import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GoalList = () => {
  const [metas, setMetas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:8000/metas/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro de permissão ou rota");
        return res.json();
      })
      .then((data) => setMetas(data))
      .catch((error) => console.error("Erro ao buscar metas:", error));
  }, []); 

  const handleAprovar = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://127.0.0.1:8000/metas/aprovar/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Erro ao aprovar meta");

      setMetas((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: "Aprovada" } : m)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleRevisar = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://127.0.0.1:8000/metas/revisar/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Erro ao solicitar revisão");

      setMetas((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: "Revisão solicitada" } : m)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditar = (id) => {
    navigate(`/metas/editar/${id}`); 
  };

  return (
    <div style={{ padding: "30px" }}>
      <Typography variant="h4" gutterBottom>
        Minhas Metas
      </Typography>

      {metas.length === 0 ? (
        <Typography variant="body1">Nenhuma meta cadastrada.</Typography>
      ) : (
        metas.map((meta) => (
          <Card
            key={meta.id}
            sx={{
              marginBottom: 2,
              padding: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {meta.titulo}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                Métrica: {meta.kpi}
                <br />
                Valor-Alvo: {meta.valor_alvo}
                <br />
                Prazo: {meta.data_fim || meta.prazo}
                <br />
                <b>Status:</b> {meta.status}
              </Typography>
            </CardContent>

            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleAprovar(meta.id, "Aprovada")}
              >
                Aprovar
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleRevisar(meta.id)}
              >
                Revisão
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleEditar(meta.id)}
              >
                Editar
              </Button>
            </Stack>
          </Card>
        ))
      )}
    </div>
  );
};

export default GoalList;
