import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebase/config";
import styles from "./Login.module.css";

const auth = getAuth(app);
const db = getFirestore(app);

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("adm");
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
      console.log("Tentando fazer login com:", email);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user?.uid) {
        throw new Error("Erro ao obter informações do usuário.");
      }

      console.log("Usuário autenticado:", user.uid);

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        throw new Error("Perfil de usuário não encontrado.");
      }

      const userData = userDoc.data();
      const userRole = userData.role;
      console.log("Role do usuário:", userRole);

      // Validações por aba
      if (activeTab === "adm") {
        if (userRole !== "admin") {
          throw new Error("Você não tem permissão de administrador.");
        }

        if (!cnpj) {
          throw new Error("CNPJ é obrigatório para administradores.");
        }

        const chavesDoc = await getDoc(doc(db, "config", "chaves_de_acesso"));

        if (!chavesDoc.exists()) {
          throw new Error("Configuração de chaves não encontrada.");
        }

        const chavesValidas = chavesDoc.data().chaves_de_acesso || [];

        if (!chavesValidas.includes(chaveAcesso)) {
          throw new Error("Chave de acesso inválida.");
        }
      }

      if (activeTab === "colaborador" && userRole !== "colaborador") {
        throw new Error("Você não tem permissão de colaborador.");
      }

      if (activeTab === "recebedor" && userRole !== "recebedor") {
        throw new Error("Você não tem permissão de recebedor.");
      }

      console.log("Redirecionando para:", userRole);
      switch (userRole) {
        case "admin":
          navigate("/InicialAdministrador");
          break;
        case "colaborador":
          navigate("/InicialColaborador");
          break;
        case "recebedor":
          navigate("/InicialRecebedor");
          break;
        default:
          throw new Error("Tipo de usuário não reconhecido.");
      }

    } catch (error) {
      console.error("Erro no login:", error);
      setError(error.message || "Erro ao fazer login. Verifique suas credenciais.");
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
              <li className={styles.tab_item}>
                <button
                  className={`${styles.tab_button} ${activeTab === "adm" ? styles.active : ""}`}
                  onClick={() => handleTabChange("adm")}
                >
                  Administrador
                </button>
              </li>
              <li className={styles.tab_item}>
                <button
                  className={`${styles.tab_button} ${activeTab === "colaborador" ? styles.active : ""}`}
                  onClick={() => handleTabChange("colaborador")}
                >
                  Colaborador
                </button>
              </li>
              <li className={styles.tab_item}>
                <button
                  className={`${styles.tab_button} ${activeTab === "recebedor" ? styles.active : ""}`}
                  onClick={() => handleTabChange("recebedor")}
                >
                  Recebedor
                </button>
              </li>
            </ul>

            <div className={styles.tab_content}>
              <form className={styles.login_form} onSubmit={handleLogin}>
                <h2 className={styles.h2}>
                  {activeTab === "adm" ? "Login Administrador" :
                    activeTab === "colaborador" ? "Login Colaborador" : "Login Recebedor"}
                </h2>

                {error && <div className={styles.error_message}>{error}</div>}

                {activeTab === "adm" && (
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
              </form>
            </div>
          </Col>
        </Col>
      </Row>
    </Container>
  );
}
