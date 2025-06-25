import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  fetchSignInMethodsForEmail
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "../../../firebase/config";
import styles from "./Login.module.css";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const auth = getAuth(app);
const db = getFirestore(app);

const createUserProfileIfNotExists = async (user) => {
  const userDocRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) {
    await setDoc(userDocRef, {
      email: user.email,
      role: "recebedor",
      createdAt: new Date(),
      displayName: user.displayName || "",
      photoURL: user.photoURL || ""
    });
    return { role: "recebedor" };
  } else {
    return userDoc.data();
  }
};

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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) throw new Error("Perfil de usuário não encontrado.");

      const userData = userDoc.data();
      const userRole = userData.role;

      if (activeTab === "adm") {
        if (userRole !== "admin") throw new Error("Você não tem permissão de administrador.");
        if (!cnpj) throw new Error("CNPJ é obrigatório para administradores.");

        const chavesDocRef = doc(db, "config", "chaves_de_acesso");
        const chavesDoc = await getDoc(chavesDocRef);

        if (!chavesDoc.exists()) throw new Error("Configuração de chaves não encontrada.");

        const chavesValidas = chavesDoc.data().chaves_de_acesso || [];
        if (!chavesValidas.includes(chaveAcesso)) throw new Error("Chave de acesso inválida.");
      }

      if (activeTab === "colaborador" && userRole !== "colaborador") {
        throw new Error("Você não tem permissão de colaborador.");
      }

      if (activeTab === "recebedor" && userRole !== "recebedor") {
        throw new Error("Você não tem permissão de recebedor.");
      }

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
          throw new Error("Tipo de usuário não reconhecido. Por favor, entre em contato com o suporte.");
      }
    } catch (error) {
      console.error("Erro no login: ", error);
      setError(error.message || "Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginGoogle = async () => {
    setLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = await createUserProfileIfNotExists(user);
      const userRole = userData.role;

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
      console.error("Erro com login Google:", error);
      setError(error.message || "Erro ao fazer login com Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginGitHub = async () => {
    setLoading(true);
    setError("");
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = await createUserProfileIfNotExists(user);
      const userRole = userData.role;

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
      console.error("Erro com login GitHub:", error);
      if (error.code === "auth/account-exists-with-different-credential") {
        const email = error.customData.email;
        const methods = await fetchSignInMethodsForEmail(auth, email);
        setError(
          `Já existe uma conta com o e-mail ${email} vinculada ao provedor: ${methods.join(
            ", "
          )}. Por favor, use esse provedor para entrar.`
        );
      } else {
        setError(error.message || "Erro ao fazer login com GitHub.");
      }
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
                    className={`${styles.tab_button} ${activeTab === tab ? styles.active : ""}`}
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

                {/* Botões para login social */}
                <div className="text-center mt-3">
                  <p className={styles.p}>Ou entre com:</p>
                  <button
                    type="button"
                    onClick={handleLoginGoogle}
                    className="btn btn-danger me-2"
                    disabled={loading}
                  >
                    Google
                  </button>
                  <button
                    type="button"
                    onClick={handleLoginGitHub}
                    className="btn btn-dark"
                    disabled={loading}
                  >
                    GitHub
                  </button>
                </div>

                <div id="itens" className="text-center mt-3">
                  <p className={styles.p}>
                    Não possui um cadastro? <Link to="/cadastro">Clique aqui para criar um!</Link>
                  </p>
                  <p className={styles.p}>
                    Deseja voltar para a tela anterior? <Link to="/">Clique aqui!</Link>
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
