import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp} from 'firebase/firestore';
import { query, where, getDocs } from 'firebase/firestore';

export const registrarDoacao = async ({ produto, descricao, quantidade, validade, colaboradorId, imagemDoacao }) => {
  try {
    await addDoc(collection(db, "doacoes"), {
      produto,
      descricao,
      quantidade: Number(quantidade),
      validade,
      colaboradorId,
      imagemDoacao,
      dataRegistro: serverTimestamp()
    });
    return { sucesso: true };
  } catch (erro) {
    console.error("Erro ao registrar doação:", erro);
    return { sucesso: false, erro };
  }
  
};

export const buscarDoacoesPorColaborador = async (colaboradorId) => {
  try {
    const doacoesRef = collection(db, "doacoes");
    const q = query(doacoesRef, where("colaboradorId", "==", colaboradorId));
    const querySnapshot = await getDocs(q);

    const doacoes = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return doacoes;
  } catch (erro) {
    console.error("Erro ao buscar doações:", erro);
    return [];
  }
};
