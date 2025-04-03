import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebase/config"; // Importando o Firebase corretamente
import styles from "./Login.module.css";

const auth = getAuth(app);
const db = getFirestore(app);

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("adm");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [chaveAcesso, setChaveAcesso] = useState("");
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogin = async (event) => {
    event.preventDefault(); // ✅ Impede o reload da página

    try {
      console.log("Tentando fazer login com:", email, password);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user || !user.uid) {
        alert("Erro ao obter informações do usuário.");
        return;
      }

      console.log("Usuário autenticado:", user.uid);

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        alert("Usuário não encontrado.");
        return;
      }

      const userData = userDoc.data();
      const userRole = userData.role;

      console.log("Role do usuário no Firestore:", userRole);

      if (activeTab === "adm" && userRole !== "administrador") {
        alert("Você só pode fazer login como administrador.");
        return;
      }
      if (activeTab === "colaborador" && userRole !== "colaborador") {
        alert("Você só pode fazer login como colaborador.");
        return;
      }
      if (activeTab === "recebedor" && userRole !== "recebedor") {
        alert("Você só pode fazer login como recebedor.");
        return;
      }

      if (activeTab === "adm") {
        if (!cnpj) {
          alert("Por favor, informe o CNPJ.");
          return;
        }

        const chaveDoc = await getDoc(doc(db, "chaves_de_acesso", cnpj));

        if (!chaveDoc.exists()) {
          alert("Chave de acesso não encontrada.");
          return;
        }

        const chaveCorreta = chaveDoc.data().chave_secreta;

        if (chaveAcesso !== chaveCorreta) {
          alert("Chave de acesso incorreta.");
          return;
        }
      }

      console.log("Redirecionando usuário...");
      if (userRole === "administrador") {
        navigate("/InicialAdministrador");
      } else if (userRole === "colaborador") {
        navigate("/InicialColaborador");
      } else if (userRole === "recebedor") {
        navigate("/InicialRecebedor");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
      alert("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <Container fluid className={styles.login_container}>
      <Row className="justify-content-center align-items-center">
        <Col lg={10} className={styles.login_box}>
          <Col md={6} className={styles.login_hero}>
            <div className={styles.hero_content}>
              <h1 className={`${styles.h1}`}>Bem-vindo de volta à Colheita Solidária!</h1>
              <p className={`${styles.p2}`}>
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
                  {activeTab === "adm"
                    ? "Login Administrador"
                    : activeTab === "colaborador"
                    ? "Login Colaborador"
                    : "Login Recebedor"}
                </h2>

                {activeTab === "adm" && (
                  <>
                    <div className={styles.form_group}>
                      <input
                        type="text"
                        placeholder="CNPJ"
                        required
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                      />
                    </div>
                    <div className={styles.form_group}>
                      <input
                        type="text"
                        placeholder="Chave de Acesso"
                        required
                        value={chaveAcesso}
                        onChange={(e) => setChaveAcesso(e.target.value)}
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
                  />
                </div>
                <div className={styles.form_group}>
                  <input
                    type="password"
                    placeholder="Senha"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className={styles.submit_button}>
                  Acessar
                </button>
              </form>
            </div>
          </Col>
        </Col>
      </Row>
    </Container>
  );
}
