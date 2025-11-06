import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import api from "../../../services/api"; //erro
import styles from "./Login.module.css";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("Administrador");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [chaveAcesso, setChaveAcesso] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError("");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const tipoUsuario =
        activeTab === "Administrador"
          ? "admin"
          : activeTab === "colaborador"
            ? "colaborador"
            : "recebedor";

      const response = await api.post("/Auth/login", {
        Email: email,
        Senha: password,
        TipoUsuario: tipoUsuario,
        Cnpj: cnpj || null,
        ChaveAcesso: chaveAcesso || null,
      });

      const token =
        response.data?.token ||
        response.data?.Token ||
        response.data?.result?.token ||
        response.data?.result?.Token;

      if (!token) {
        throw new Error("Token JWT não retornado pelo servidor.");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("tipoUsuario", tipoUsuario);

      if (tipoUsuario === "admin") navigate("/InicialAdministrador");
      else if (tipoUsuario === "colaborador") navigate("/InicialColaborador");
      else navigate("/InicialRecebedor");
    } catch (error) {
      console.error("Erro no login:", error);
      setError(
        error.response?.data?.message ||
        error.response?.data ||
        "Erro ao fazer login. Verifique as credenciais."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container fluid className={styles.login_container}>
      <Row className="justify-content-center align-items-center">
        <Col lg={10} className={styles.login_box}>
          <Col md={6} className={styles.login_hero}>
            <div className={styles.hero_content}>
              <h1 className={styles.h1}>Bem-vindo de volta à Colheita Solidária!</h1>
              <p className={styles.p2}>
                Faça o login e vamos juntos colher frutos de esperança e distribuir solidariedade.
              </p>
            </div>
          </Col>

          <Col md={6} className={styles.login_forms}>
            <ul className={styles.tabs_container}>
              {["Administrador", "colaborador", "recebedor"].map((tab) => (
                <li key={tab} className={styles.tab_item}>
                  <button
                    className={`${styles.tab_button} ${activeTab === tab ? styles.active : ""
                      }`}
                    onClick={() => handleTabChange(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                </li>
              ))}
            </ul>

            <div className={styles.tab_content}>
              <form className={styles.login_form} onSubmit={handleLogin}>
                <h2 className={styles.h2}>
                  Login {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h2>

                {error && <div className={styles.error_message}>{error}</div>}
                {loading && (
                  <div className="d-flex justify-content-center mb-4 mb-3">
                    <LoadingSpinner size={60} color="#a50000" />
                  </div>
                )}

                {activeTab === "Administrador" && (
                  <>
                    <div className={styles.form_group}>
                      <input
                        type="text"
                        placeholder="CNPJ"
                        required
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    <div className={styles.form_group}>
                      <input
                        type="text"
                        placeholder="Chave de Acesso"
                        required
                        value={chaveAcesso}
                        onChange={(e) => setChaveAcesso(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </>
                )}

                <div className={styles.form_group}>
                  <input
                    type="email"
                    placeholder="E-mail"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className={styles.form_group}>
                  <input
                    type="password"
                    placeholder="Senha"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  className={styles.submit_button}
                  disabled={loading}
                >
                  {loading ? "Carregando..." : "Acessar"}
                </button>

                <div className="text-center mt-3">
                  <p className={styles.p}>
                    Não possui um cadastro?{" "}
                    <Link to="/cadastro">Clique aqui para criar um!</Link>
                  </p>
                  <p className={styles.p}>
                    Deseja voltar para a tela anterior?{" "}
                    <Link to="/">Clique aqui!</Link>
                  </p>
                </div>
              </form>
            </div>
          </Col>
        </Col>
      </Row>
    </Container>
  );
}
