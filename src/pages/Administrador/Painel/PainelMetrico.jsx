import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from "../../../firebase/config";
import styles from "./PainelMetrico.module.css";

const db = getFirestore(app);
const COLORS = ['#a50000', '#f5a623', '#4caf50'];

export default function PainelMetrico() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const buscarUsuarios = async () => {
      const snapshot = await getDocs(collection(db, 'users'));
      const contagem = { admin: 0, colaborador: 0, recebedor: 0 };

      snapshot.forEach((doc) => {
        const user = doc.data();
        contagem[user.role] = (contagem[user.role] || 0) + 1;
      });

      const grafico = Object.entries(contagem).map(([role, total]) => ({
        name: role,
        value: total
      }));

      setDados(grafico);
    };

    buscarUsuarios();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Usuários por Tipo</h2>
      <ResponsiveContainer width="100%" height="100%">
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
