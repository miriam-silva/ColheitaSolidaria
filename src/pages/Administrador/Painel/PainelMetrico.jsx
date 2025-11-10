import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import api from "../../../services/Api";
import styles from "./PainelMetrico.module.css";

const COLORS = ["#a50000", "#f5a623", "#4caf50"];

export default function PainelMetrico({ usuarios: propsUsuarios }) {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        let usuarios = propsUsuarios;
        if (!usuarios || usuarios.length === 0) {
          const response = await api.get("/Admin/usuarios-gerais");
          usuarios = response.data;
        }

        const contagem = { Admin: 0, Colaborador: 0, Recebedor: 0 };
        usuarios.forEach(u => contagem[u.role]++);

        const grafico = Object.entries(contagem).map(([role, total]) => ({
          name: role,
          value: total
        }));

        setDados(grafico);
      } catch (error) {
        console.error("Erro ao carregar métricas:", error);
      }
    };

    carregarDados();
  }, [propsUsuarios]);

  return (
    <div className={styles.container}>
      <h4 className="text-center">Usuários separados por tipo</h4>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={dados}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {dados.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
