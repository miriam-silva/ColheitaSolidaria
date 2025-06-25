import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../../firebase/config";
import { Card, ListGroup } from "react-bootstrap";

const db = getFirestore(app);

export default function HistoricoDoacoes() {
  const [doacoes, setDoacoes] = useState([]);

  useEffect(() => {
    const fetchDoacoes = async () => {
      const querySnapshot = await getDocs(collection(db, "doacoes"));
      const lista = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDoacoes(lista);
    };

    fetchDoacoes();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Histórico de Doações</h2>
      {doacoes.length === 0 ? (
        <p className="text-center">Nenhuma doação registrada.</p>
      ) : (
        <ListGroup>
          {doacoes.map((doacao) => (
            <ListGroup.Item key={doacao.id}>
              <strong>Doador:</strong> {doacao.nomeDoador || "Desconhecido"} <br />
              <strong>Item:</strong> {doacao.item || "Não especificado"} <br />
              <strong>Quantidade:</strong> {doacao.quantidade || "N/A"} <br />
              <strong>Data:</strong> {doacao.data || "Sem data"}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
