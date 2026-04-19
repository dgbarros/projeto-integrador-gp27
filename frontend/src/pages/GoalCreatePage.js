import React from 'react';
import GoalForm from '../components/Goal/GoalForm';

// A página é simples: só exibe o título e o formulário
const GoalCreatePage = () => {
  return (
    <div>
      <h1 style={{ borderBottom: '2px solid black', paddingBottom: '10px' }}>
        Cadastrar Metas
      </h1>
      <GoalForm />
    </div>
  );
};

export default GoalCreatePage;