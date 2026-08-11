import React from "react";
import MainLayout from "../components/layout/MainLayout";

const mockGoals = [
  { id: 1, titulo: "Aprender React", descricao: "Estudar fundamentos e hooks" },
  { id: 2, titulo: "Criar API Node.js", descricao: "Desenvolver backend simples com Express" },
];

const GoalListPage = () => {
  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Minhas Metas</h1>

        {mockGoals.length === 0 ? (
          <p>Nenhuma meta cadastrada ainda.</p>
        ) : (
          <ul className="space-y-3">
            {mockGoals.map((goal) => (
              <li key={goal.id} className="border border-gray-300 rounded-md p-3 shadow-sm">
                <h2 className="text-lg font-semibold">{goal.titulo}</h2>
                <p className="text-gray-600">{goal.descricao}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MainLayout>
  );
};

export default GoalListPage;
