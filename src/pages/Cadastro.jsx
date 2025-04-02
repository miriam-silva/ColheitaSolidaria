import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Cadastro.module.css';

export default function CadastroPage() {
  const [activeTab, setActiveTab] = useState('adm');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Container fluid className={styles.login_container}>
      <Row className="justify-content-center align-items-center">
        <Col lg={10} className={styles.login_box}>
          {/* Seção Vermelha */}
          <Col md={6} className={styles.login_hero}>
            <div className={styles.hero_content}>
              <h1 className={`${styles.h1}`}>Junte-se a nós!</h1>
              <p className={`${styles.p2}`}>
                Faça o seu cadastro e ajude a contribuir para um futuro mais sustentável e solidário.
              </p>
            </div>
          </Col>

          {/* Formulários de Login */}
          <Col md={6} className={styles.login_forms}>
            {/* Abas de Login */}
            <ul className={styles.tabs_container}>
              <li className={styles.tab_item}>
                <button
                  className={`${styles.tab_button} ${activeTab === 'adm' ? styles.active : ''}`}
                  onClick={() => handleTabChange('adm')}
                >
                  Administrador
                </button>
              </li>
              <li className={styles.tab_item}>
                <button
                  className={`${styles.tab_button} ${activeTab === 'colaborador' ? styles.active : ''}`}
                  onClick={() => handleTabChange('colaborador')}
                >
                  Colaborador
                </button>
              </li>
            </ul>

            {/* Conteúdo das Abas */}
            <div className={styles.tab_content}>
              {/* Login Administrador */}
              <div className={`${styles.tab_pane} ${activeTab === 'adm' ? styles.active : ''}`}>
                <form className={styles.login_form}>
                  <h2 className={styles.h2}>Cadastro Administrador </h2>
                  <div className={`${styles.form_group}`}>
                    <input type="text" className={`${styles.form_control}`} placeholder="Nome completo" required />
                  </div>
                  <div className={`${styles.form_group}`}>
                    <input type="text" className={`${styles.form_control}`} placeholder="CNPJ" required />
                  </div>
                  <div className={`${styles.form_group}`}>
                    <input type="date" className={`${styles.form_control}`} placeholder="Data de nascimento" required />
                  </div>
                  <div className={`${styles.form_group}`}>
                    <input type="email" className={`${styles.form_control}`} placeholder="Email" required />
                  </div>
                  <div className={`${styles.form_group}`}>
                    <input type="tel" className={`${styles.form_control}`} placeholder="Telefone" required />
                  </div>
                  <div className={`${styles.form_group}`}>
                    <input type="text" className={`${styles.form_control}`} placeholder="Endereço" required />
                  </div>
                  <div className={`${styles.form_group}`}>
                    <input type="password" className={`${styles.form_control}`} placeholder="Senha" required />
                  </div>
                  <div className={`${styles.form_group}`}>
                    <input type="password" className={`${styles.form_control}`} placeholder="Confirme sua senha" required />
                  </div>
                  <button type="submit" className={styles.submit_button}>Acessar</button>
                  <div className={styles.form_links}>
                    <p className={styles.p}>Já possui uma conta? <Link to="/cadastro">Clique aqui para fazer login!</Link></p>
                    <p className={styles.p}>Deseja voltar? <Link to="/">Clique aqui!</Link></p>
                  </div>
                </form>
              </div>

              {/* Login Colaborador */}
              <div className={`${styles.tab_pane} ${activeTab === 'colaborador' ? styles.active : ''}`}>
                <form className={styles.login_form}>
                  <h2 className={`${styles.h2}`}>Cadastro Colaborador</h2>
                  <div className={`${styles.form_group}`}>
                    <input type="text" className={`${styles.form_control}`} placeholder="Nome completo" required />
                  </div>
                  <div className={`${styles.form_group}`}>
                    <input type="text" className={`${styles.form_control}`} placeholder="CPF" required />
                  </div>
                  <div className={`${styles.form_group}`}>
                    <input type="date" className={`${styles.form_control}`} placeholder="Data de nascimento" required />
                  </div>
                  <div className={`${styles.form_group}`}>
                    <input type="email" className={`${styles.form_control}`} placeholder="Email" required />
                  </div>
                  <div className={`${styles.form_group}`}>
                    <input type="tel" className={`${styles.form_control}`} placeholder="Telefone" required />
                  </div>
                  <div className={`${styles.form_group}`}>
                    <input type="password" className={`${styles.form_control}`} placeholder="Senha" required />
                  </div>

                  <div className={`${styles.form_group}`}>
                    <input type="password" className={`${styles.form_control}`} placeholder="Confirme sua senha" required />
                  </div>
                  <button type="submit" className={styles.submit_button}>Acessar</button>
                  <div className={styles.form_links}>
                    <p className={`${styles.p}`} >Já possui uma conta? <Link to="/cadastro">Clique aqui para fazer login!</Link></p>
                    <p className={`${styles.p}`} >Deseja voltar? <Link to="/">Clique aqui!</Link></p>
                  </div>
                </form>
              </div>
            </div>
          </Col>
        </Col>
      </Row>
    </Container>
  );
}