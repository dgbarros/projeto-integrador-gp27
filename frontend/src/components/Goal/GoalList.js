import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography, Stack } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const GoalList = () => {
  const [metas, setMetas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/metas/get_metas")
      .then((res) => res.json())
      .then((data) => setMetas(data))
      .catch((error) => console.error("Erro ao buscar metas:", error));
  }, []);

  const atualizarStatus = (id, novoStatus) => {
    fetch(
      `http://127.0.0.1:8000/metas/update_status/${id}?novo_status=${novoStatus}`,
      {
        method: "PUT",
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao atualizar status");
        return res.json();
      })
      .then(() => {
        setMetas((prevMetas) =>
          prevMetas.map((meta) =>
            meta.id === id ? { ...meta, status: novoStatus } : meta
          )
        );
      })
      .catch((error) => console.error(error));
  };

  const handleEditar = (id) => {
    navigate(`/editar/${id}`);
  };

  const handleAprovar = async (meta) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/metas/update_status/${meta.id}?novo_status=Aprovada`,
        {
          method: "PUT",
        }
      );
      if (!res.ok) throw new Error("Erro ao atualizar status");
      const novasMetas = metas.map((m) =>
        m.id === meta.id ? { ...m, status: "Aprovada" } : m
      );
      setMetas(novasMetas);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRevisao = async (meta) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/metas/update_status/${meta.id}?novo_status=Revisão Solicitada`,
        {
          method: "PUT",
        }
      );
      if (!res.ok) throw new Error("Erro ao atualizar status");
      const novasMetas = metas.map((m) =>
        m.id === meta.id ? { ...m, status: "Revisão Solicitada" } : m
      );
      setMetas(novasMetas);
    } catch (error) {
      console.error(error);
    }
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
                Valor-Alvo: {meta.valor_alvo}%
                <br />
                Prazo: {meta.prazo}
                <br />
                <b>Status:</b> {meta.status}
              </Typography>
            </CardContent>

            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleAprovar(meta)}
              >
                Aprovar
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleRevisao(meta)}
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
