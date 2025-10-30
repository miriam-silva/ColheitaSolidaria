import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthentication from "../../hooks/useAuthentication";

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
  
    // Verifica se houve alguma alteração
    const houveMudanca = Object.keys(formData).some(
      (key) => formData[key] !== originalData[key]
    );
  
    if (!houveMudanca) {
      toast.warning("Nenhum dado foi alterado!");
      return;
    }
  
    try {
      await updateDoc(doc(db, "users", user.uid), formData);
      setOriginalData(formData); // atualiza estado local
      toast.success("Dados atualizados com sucesso!");
  
      // Define rota inicial conforme role
      let rotaInicial = "/";
      if (role === "admin") rotaInicial = "/InicialAdministrador";
      else if (role === "colaborador") rotaInicial = "/InicialColaborador";
      else if (role === "recebedor") rotaInicial = "/InicialRecebedor";
  
      // Redireciona e atualiza a página
      navigate(rotaInicial, { replace: true }); // navega para a página inicial
      window.location.reload(); // força reload para pegar os dados atualizados
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
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4">Atualizar Dados</h2>
      <form onSubmit={handleSalvar} className="d-flex flex-column gap-3">
        <div>
          <label className="form-label">Nome</label>
          <input
            type="text"
            name="nome"
            className="form-control"
            value={formData.nome}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="form-label">Telefone</label>
          <input
            type="tel"
            name="telefone"
            className="form-control"
            value={formData.telefone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="form-label">Data de Nascimento</label>
          <input
            type="date"
            name="dataNascimento"
            className="form-control"
            value={formData.dataNascimento}
            onChange={handleChange}
          />
        </div>

        {/* Campo CNPJ apenas para admin */}
        {role === "admin" && (
          <div>
            <label className="form-label">CNPJ</label>
            <input
              type="text"
              name="cnpj"
              className="form-control"
              value={formData.cnpj}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="d-flex justify-content-between mt-4">
          <button type="button" className="btn btn-secondary" onClick={handleCancelar}>
            Cancelar
          </button>

          <button type="submit" className="btn btn-success">
            Salvar alterações
          </button>
        </div>
      </form>
    </div>
  );
};

export default AtualizarDados;
