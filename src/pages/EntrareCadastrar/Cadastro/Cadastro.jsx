import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Cadastro.module.css";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner.jsx";
import { validarCNPJ, validarCPF } from "../../../utils/validacao.js";
import api from "../../../services/api.js"; //arrumando erro

export default function CadastroPage() {
  const [activeTab, setActiveTab] = useState("adm");
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    cpf: "",
    dataNascimento: "",
    email: "",
    telefone: "",
    endereco: "",
    senha: "",
    confirmarSenha: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.senha !== formData.confirmarSenha) {
    alert("As senhas não coincidem!");
    return;
  }

  const tipo = activeTab === "adm" ? "admin" : "colaborador";

  if (tipo === "admin" && !validarCNPJ(formData.cnpj)) {
    alert("CNPJ inválido!");
    return;
  }
  if (tipo === "colaborador" && !validarCPF(formData.cpf)) {
    alert("CPF inválido!");
    return;
  }

  const payload =
    tipo === "admin"
      ? {
          NomeCompleto: formData.nome,
          Email: formData.email,
          Senha: formData.senha,
          ConfirmarSenha: formData.confirmarSenha,
          Telefone: formData.telefone,
          Endereco: formData.endereco,
          DataNascimento: formData.dataNascimento,
          CNPJ: formData.cnpj,
        }
      : {
          NomeCompleto: formData.nome,
          CPF: formData.cpf,
          DataNascimento: formData.dataNascimento,
          Email: formData.email,
          Telefone: formData.telefone,
          Senha: formData.senha,
          ConfirmarSenha: formData.confirmarSenha,
        };

  try {
    setLoading(true);

    const response = await api.post(`/${tipo}/register`, payload);

    if (response.status === 200 || response.status === 201) {
      alert("Cadastro realizado com sucesso!");

      localStorage.setItem("tipoUsuario", tipo);
      
      if (response.data?.Token) {
        localStorage.setItem("token", response.data.Token);
      }

      navigate(
        tipo === "admin"
          ? "/InicialAdministrador"
          : "/InicialColaborador"
      );
    }
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    if (error.response?.data) {
      alert("Erro: " + JSON.stringify(error.response.data));
    } else {
      alert("Erro inesperado. Verifique o console.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <Container fluid className={styles.login_container}>
      <Row className={styles.row_centered}>
        <Col lg={10} className={styles.login_box}>
          <Col md={6} className={styles.login_hero}>
            <div className={styles.hero_content}>
              <h1 className={styles.h1}>Junte-se a nós!</h1>
              <p className={styles.p2}>
                Faça o seu cadastro e ajude a contribuir para um futuro mais
                sustentável e solidário.
              </p>
            </div>
          </Col>

          <Col md={6} className={styles.login_forms}>
            <ul className={styles.tabs_container}>
              <li className={styles.tab_item}>
                <button
                  className={`${styles.tab_button} ${
                    activeTab === "adm" ? styles.active : ""
                  }`}
                  onClick={() => handleTabChange("adm")}
                >
                  Administrador
                </button>
              </li>
              <li className={styles.tab_item}>
                <button
                  className={`${styles.tab_button} ${
                    activeTab === "colaborador" ? styles.active : ""
                  }`}
                  onClick={() => handleTabChange("colaborador")}
                >
                  Colaborador
                </button>
              </li>
            </ul>

            {/* Aba Administrador */}
            {activeTab === "adm" && (
              <form className={styles.login_form} onSubmit={handleSubmit}>
                <h2 className={styles.h2}>Cadastro Administrador</h2>

                {loading && (
                  <div className="d-flex justify-content-center mb-4">
                    <LoadingSpinner size={60} color="#a50000" />
                  </div>
                )}

                <div className={styles.form_group}>
                  <input
                    type="text"
                    name="nome"
                    placeholder="Nome completo"
                    required
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className={styles.form_group}>
                  <input
                    type="text"
                    name="cnpj"
                    placeholder="CNPJ"
                    required
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className={styles.form_group}>
                  <input
                    type="date"
                    name="dataNascimento"
                    required
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className={styles.form_group}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className={styles.form_group}>
                  <input
                    type="tel"
                    name="telefone"
                    placeholder="Telefone"
                    required
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className={styles.form_group}>
                  <input
                    type="text"
                    name="endereco"
                    placeholder="Endereço"
                    required
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className={styles.form_group}>
                  <input
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    required
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className={styles.form_group}>
                  <input
                    type="password"
                    name="confirmarSenha"
                    placeholder="Confirme sua senha"
                    required
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  className={styles.submit_button}
                  disabled={loading}
                >
                  {loading ? "Carregando..." : "Cadastrar"}
                </button>

                <div id="itens" className="text-center mt-3">
                  <p className={styles.p}>
                    Já possui um cadastro?{" "}
                    <Link to="/login">Clique aqui para fazer login!</Link>
                  </p>
                  <p className={styles.p}>
                    Deseja voltar para a tela anterior?{" "}
                    <Link to="/">Clique aqui!</Link>
                  </p>
                </div>
              </form>
            )}

            {/* Aba Colaborador */}
            {activeTab === "colaborador" && (
              <form className={styles.login_form} onSubmit={handleSubmit}>
                <h2 className={styles.h2}>Cadastro Colaborador</h2>

                {loading && (
                  <div className="d-flex justify-content-center mb-4">
                    <LoadingSpinner size={60} color="#a50000" />
                  </div>
                )}

                <div className={styles.form_group}>
                  <input
                    type="text"
                    name="nome"
                    placeholder="Nome completo"
                    required
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className={styles.form_group}>
                  <input
                    type="text"
                    name="cpf"
                    placeholder="CPF"
                    required
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className={styles.form_group}>
                  <input
                    type="date"
                    name="dataNascimento"
                    required
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className={styles.form_group}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className={styles.form_group}>
                  <input
                    type="tel"
                    name="telefone"
                    placeholder="Telefone"
                    required
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className={styles.form_group}>
                  <input
                    type="text"
                    name="endereco"
                    placeholder="Endereço"
                    required
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className={styles.form_group}>
                  <input
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    required
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className={styles.form_group}>
                  <input
                    type="password"
                    name="confirmarSenha"
                    placeholder="Confirme sua senha"
                    required
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  className={styles.submit_button}
                  disabled={loading}
                >
                  {loading ? "Carregando..." : "Cadastrar"}
                </button>

                <div id="itens" className="text-center mt-3">
                  <p className={styles.p}>
                    Já possui um cadastro?{" "}
                    <Link to="/login">Clique aqui para fazer login!</Link>
                  </p>
                  <p className={styles.p}>
                    Deseja voltar para a tela anterior?{" "}
                    <Link to="/">Clique aqui!</Link>
                  </p>
                </div>
              </form>
            )}
          </Col>
        </Col>
      </Row>
    </Container>
  );
}
