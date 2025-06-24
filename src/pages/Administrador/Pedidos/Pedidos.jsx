import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../../firebase/config';
import styles from './Pedidos.module.css';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import { gerarPDFDoacoes } from '../../../utils/GerarPDF/gerarPDFDoacoes';
import { gerarPDFPedidos } from '../../../utils/GerarPDF/gerarPDFPedidos';
import { gerarPDFUsuarios } from '../../../utils/GerarPDF/gerarPDFUsuarios';

const Pedidos = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [temPermissao, setTemPermissao] = useState(false); 
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => {
    const carregarDados = async () => {
      try{
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const dados = userSnap.data();
          setTemPermissao(dados.role === 'admin');
      }
    }

      const querySnapshot = await getDocs(collection(db, 'solicitacoes'));
      const listaPedidos = await Promise.all(
        querySnapshot.docs.map(async (docPedido) => {
          const pedidoData = docPedido.data();

          const userRef = doc(db, 'users', pedidoData.usuarioId);
          const userSnap = await getDoc(userRef);
          const nomeUsuario = userSnap.exists() ? userSnap.data().nome : 'Usuário desconhecido';

          let doacaoDescricao = 'Doação não encontrada';
          if (pedidoData.doacaoId) {
            const doacaoRef = doc(db, 'doacoes', pedidoData.doacaoId);
            const doacaoSnap = await getDoc(doacaoRef);
            if (doacaoSnap.exists()) {
              const doacaoData = doacaoSnap.data();
              const nomeProduto = doacaoData.produto || 'um item disponível';
              doacaoDescricao = `Eu gostaria de solicitar um pouco de ${nomeProduto}`;
            }
          }

          return {
            id: docPedido.id,
            usuario: nomeUsuario,
            pedido: doacaoDescricao,
            status: pedidoData.status || 'pendente',
            familiares: pedidoData.familiares || '',
          };
        })
      );

      setPedidos(listaPedidos);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error)
    } finally {
      setLoading(false)
    }
  }
    
    carregarDados();
  }, []);

  const handleStatusChange = async (id, novoStatus) => {
    try {
      if (!temPermissao) {
        console.error('Usuário não tem permissão de admin!');
        return;
      }

      setUpdatingId(id)

      const pedidoRef = doc(db, 'solicitacoes', id);
      await updateDoc(pedidoRef, { status: novoStatus });

      setPedidos((prevPedidos) =>
        prevPedidos.map((pedido) =>
          pedido.id === id ? { ...pedido, status: novoStatus } : pedido
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
    } finally {
      setUpdatingId(null)
    }
  };

  const hanldeExportarPDF = () =>{
      gerarPDFPedidos()
    }

  const hanldeExportarPDFUsers = () =>{
      gerarPDFUsuarios()
    }

  return (
    <div>
      <nav className={`navbar navbar-expand-sm navbar-toggleable-sm navbar-light box-shadow mb-1 ${styles.navbarra}`}>
        <div className="container-fluid">
          <h3 id="arrumar">Pedidos:</h3>
        </div>
      </nav>

      <br />

      {loading ? (
        <div className="d-flex justify-content-center my-4">
          <LoadingSpinner size={60} color="#a50000"/>
        </div>
      ) : (
      <div className="container-fluid">
        <div className="row justify-content-center mb-4">
          {pedidos.map((pedido, index) => (
            <div className="col-12" key={pedido.id}>
              <div className={`${styles.donation_box}`}>
                <p className={styles.tituloo}>
                  <strong>#{String(index + 1).padStart(3, '0')} - {pedido.usuario}: {pedido.familiares || 'sem familiares'}</strong>
                </p>
                <p className={styles.textoo}>
                  {pedido.pedido}
                </p>

                <div className={`${styles.button_group}`}>
                  <button
                    className={`${styles.approve_btn}`}
                    onClick={() => handleStatusChange(pedido.id, 'Aprovado')}
                    disabled={pedido.status !== 'pendente'}
                  > {updatingId === pedido.id ? (
                    <LoadingSpinner size={20} color="#fff"/>
                  ) : (
                    "Aprovar"
                  )}
                    </button>
                  <button
                    className={`${styles.postpone_btn}`}
                    onClick={() => handleStatusChange(pedido.id, 'Protelado')}
                    disabled={pedido.status !== 'pendente'}
                  > {updatingId === pedido.id ? (
                    <LoadingSpinner size={20} color="#fff"/>
                  ) : (
                    "Protelar"
                  )} </button>
                </div>

                {pedido.status && (
                  <p
                    className={`${styles.status} ${pedido.status === 'Aprovado'
                      ? styles.approved
                      : pedido.status === 'Protelado'
                        ? styles.postponed
                        : styles.pending
                      }`}
                  >
                    Status: {pedido.status}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className={`${styles.exportar_container}`}>
          <button className={`btn btn-primary ${styles.exportar_button}`} onClick={hanldeExportarPDF}>Exportar PDF Pedidos</button>
          
          <button className={`btn btn-primary ${styles.exportar_button}`} onClick={hanldeExportarPDFUsers}>Exportar PDF Users</button>
        </div>

        <div className={styles.voltar_container}>
          <button
            className={styles.voltar_button}
            onClick={() => navigate('/InicialAdministrador')}
          >
            Voltar
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default Pedidos;
