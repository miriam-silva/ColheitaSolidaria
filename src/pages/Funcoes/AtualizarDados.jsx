import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthentication from "../../hooks/useAuthentication";
import styles from "./AtualizarDados.module.css"; 

const AtualizarDados = () => {
  const { user } = useAuthentication();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    dataNascimento: "",
    cnpj: "",
  });
  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    const carregarDados = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData(data);
          setOriginalData(data);
          setRole(data.role); 
        }
      }
    };
    carregarDados();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSalvar = async (e) => {
    e.preventDefault();

    const houveMudanca = Object.keys(formData).some(
      (key) => formData[key] !== originalData[key]
    );

    if (!houveMudanca) {
      toast.warning("Nenhum dado foi alterado!");
      return;
    }

    try {
      await updateDoc(doc(db, "users", user.uid), formData);
      setOriginalData(formData);
      toast.success("Dados atualizados com sucesso!");

      let rotaInicial = "/";
      if (role === "admin") rotaInicial = "/InicialAdministrador";
      else if (role === "colaborador") rotaInicial = "/InicialColaborador";
      else if (role === "recebedor") rotaInicial = "/InicialRecebedor";

      navigate(rotaInicial, { replace: true });
      window.location.reload();
    } catch (error) {
      console.error("Erro ao atualizar dados:", error.message);
      toast.error("Erro ao atualizar os dados. Tente novamente.");
    }
  };

  const handleCancelar = () => {
    const confirmacao = window.confirm(
      "Tem certeza que quer cancelar a sua atualização de dados?"
    );
    if (confirmacao) {
      navigate(-1);
    }
  };

  return (
    <div className={styles.container}>
      <nav className={`navbar navbar-expand-sm navbar-toggleable-sm navbar-light box-shadow mb-1 ${styles.navbarra}`}>
        <div>
          <h3 className={styles.arrumar}>Atualizar Dados</h3>
        </div>
      </nav>

      <form onSubmit={handleSalvar} className="d-flex flex-column gap-3">
        <div className="mb-3">
          <label className={`form-label ${styles.texto} ${styles.arrumando}`}>Nome</label>
          <input
            type="text"
            name="nome"
            className="form-control"
            value={formData.nome}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className={`form-label ${styles.texto} ${styles.arrumaremail}`}>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className={`form-label ${styles.texto}`}>Telefone</label>
          <input
            type="tel"
            name="telefone"
            className="form-control"
            value={formData.telefone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className={`form-label ${styles.texto}`}>Data de Nascimento</label>
          <input
            type="date"
            name="dataNascimento"
            className="form-control"
            value={formData.dataNascimento}
            onChange={handleChange}
          />
        </div>

        {role === "admin" && (
          <div className="mb-3">
            <label className={`form-label ${styles.texto}`}>CNPJ</label>
            <input
              type="text"
              name="cnpj"
              className="form-control"
              value={formData.cnpj}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="button-group">
          <button type="button" className={styles.postpone_btn} onClick={handleCancelar}>
            Cancelar
          </button>
          <button type="submit" className={styles.approve_btn}>
            Salvar alterações
          </button>
        </div>
      </form>
    </div>
  );
};

export default AtualizarDados;
