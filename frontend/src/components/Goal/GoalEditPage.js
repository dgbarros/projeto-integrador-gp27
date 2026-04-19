import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const GoalEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meta, setMeta] = useState(null);
  const [openModal, setOpenModal] = useState(false); 

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/metas/get_meta/${id}`)
      .then((res) => res.json())
      .then((data) => setMeta(data))
      .catch((err) => console.error("Erro ao buscar meta:", err));
  }, [id]);

  const handleChange = (e) => {
    setMeta({ ...meta, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    fetch(`http://127.0.0.1:8000/metas/editar/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meta),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao atualizar meta");
        setOpenModal(true); 
      })
      .catch((err) => console.error(err));
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    navigate("/"); 
  };

  if (!meta) return <Typography>Carregando...</Typography>;

  return (
    <Box sx={{ padding: "30px" }}>
      <Typography variant="h5" gutterBottom>
        Editar Meta
      </Typography>

      <TextField
        fullWidth
        label="Título da Meta"
        name="titulo"
        value={meta.titulo}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Descrição"
        name="descricao"
        value={meta.descricao || ""}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Métrica (KPI)"
        name="kpi"
        value={meta.kpi}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Valor-Alvo (%)"
        name="valor_alvo"
        value={meta.valor_alvo}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Prazo"
        name="prazo"
        type="date"
        value={meta.prazo}
        onChange={handleChange}
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />

      <Box sx={{ marginTop: "20px" }}>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ marginRight: 2 }}
          onClick={() => navigate("/")}
        >
          Cancelar
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Salvar Alterações
        </Button>
      </Box>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Meta Atualizada!</DialogTitle>
        <DialogContent>
          <Typography>
            As alterações foram salvas com sucesso.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary" autoFocus>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GoalEditPage;
