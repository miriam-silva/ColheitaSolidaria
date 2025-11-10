import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./AtualizarDados.module.css";

const AtualizarDados = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    telefone: "",
    dataNascimento: "",
    numeroDeFamiliares: "",
    senha: "",
  });
  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    const carregarDados = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Usuário não autenticado!");
        navigate("/");
        return;
      }

      try {
        const response = await fetch("http://localhost:7100/api/Auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Erro ao carregar dados do usuário.");
        const data = await response.json();

        setRole(data.role?.toLowerCase() || "");

        setFormData({
          nomeCompleto: data.nomeCompleto || "",
          email: data.email || "",
          telefone: data.telefone || "",
          dataNascimento: data.dataNascimento
            ? new Date(data.dataNascimento).toISOString().split("T")[0]
            : "",
          numeroDeFamiliares: data.numeroDeFamiliares || "",
          senha: "",
        });

        setOriginalData({
          nomeCompleto: data.nomeCompleto || "",
          email: data.email || "",
          telefone: data.telefone || "",
          dataNascimento: data.dataNascimento
            ? new Date(data.dataNascimento).toISOString().split("T")[0]
            : "",
          numeroDeFamiliares: data.numeroDeFamiliares || "",
          senha: "",
        });
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        toast.error("Não foi possível carregar seus dados. Tente novamente.");
      }
    };

    carregarDados();
  }, [navigate]);

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
      const token = localStorage.getItem("token");

      const body = {
        nomeCompleto: formData.nomeCompleto,
        telefone: formData.telefone,
        dataNascimento: formData.dataNascimento,
        senha: formData.senha,
      };

      if (role === "recebedor") {
        body.numeroDeFamiliares = formData.numeroDeFamiliares;
      }

      const response = await fetch("http://localhost:7100/api/Auth/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Erro ao atualizar dados.");

      toast.success("Dados atualizados com sucesso!");

      let rotaInicial = "/";
      if (role === "admin") rotaInicial = "/InicialAdministrador";
      else if (role === "colaborador") rotaInicial = "/InicialColaborador";
      else if (role === "recebedor") rotaInicial = "/InicialRecebedor";

      navigate(rotaInicial, { replace: true });
      window.location.reload();
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      toast.error("Erro ao atualizar os dados. Tente novamente.");
    }
  };

  const handleCancelar = () => {
    if (window.confirm("Tem certeza que quer cancelar a atualização?")) {
      navigate(-1);
    }
  };

  return (
    <div className={styles.container}>
      <nav
        className={`navbar navbar-expand-sm navbar-toggleable-sm navbar-light box-shadow mb-1 ${styles.navbarra}`}
      >
        <div>
          <h3 className={styles.arrumar}>Atualizar Dados</h3>
        </div>
      </nav>

      <form onSubmit={handleSalvar} className="d-flex flex-column gap-3">
        {/* Nome */}
        <div className="mb-3">
          <label className={`form-label ${styles.texto}`}>Nome</label>
          <input
            type="text"
            name="nomeCompleto"
            className="form-control"
            value={formData.nomeCompleto}
            onChange={handleChange}
          />
        </div>

        {/* Email (fixo) */}
        <div className="mb-3">
          <label className={`form-label ${styles.texto}`}>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            disabled
          />
        </div>

        {/* Telefone */}
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

        {/* Data */}
        <div className="mb-3">
          <label className={`form-label ${styles.texto}`}>
            Data de Nascimento
          </label>
          <input
            type="date"
            name="dataNascimento"
            className="form-control"
            value={formData.dataNascimento}
            onChange={handleChange}
          />
        </div>

        {/* Número de familiares → só para recebedor */}
        {role === "recebedor" && (
          <div className="mb-3">
            <label className={`form-label ${styles.texto}`}>
              Número de familiares
            </label>
            <input
              type="number"
              name="numeroDeFamiliares"
              className="form-control"
              value={formData.numeroDeFamiliares}
              onChange={handleChange}
            />
          </div>
        )}

        {/* Nova senha */}
        <div className="mb-3">
          <label className={`form-label ${styles.texto}`}>Nova senha</label>
          <input
            type="password"
            name="senha"
            className="form-control"
            value={formData.senha}
            onChange={handleChange}
            placeholder="Deixe em branco para manter a atual"
          />
        </div>

        <div className="button-group">
          <button
            type="button"
            className={styles.postpone_btn}
            onClick={handleCancelar}
          >
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
