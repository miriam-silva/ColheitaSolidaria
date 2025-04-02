import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'; 
import styles from './Login.module.css';

export default function LoginPage() {
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
              <h1 className={`${styles.h1}`}>Bem-vindo de volta à Colheita Solidária!</h1>
              <p className={`${styles.p2}`}>
                Faça o login e vamos juntos colher frutos de esperança e distribuir solidariedade.
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
              <li className={styles.tab_item}>
                <button
                  className={`${styles.tab_button} ${activeTab === 'recebedor' ? styles.active : ''}`}
                  onClick={() => handleTabChange('recebedor')}
                >
                  Recebedor
                </button>
              </li>
            </ul>

            {/* Conteúdo das Abas */}
            <div className={styles.tab_content}>
              {/* Login Administrador */}
              <div className={`${styles.tab_pane} ${activeTab === 'adm' ? styles.active : ''}`}>
                <form className={styles.login_form}>
                  <h2 className={styles.h2}>Login Administrador</h2>
                  <div className={styles.form_group}>
                    <input type="text" placeholder="Nome empresa" required />
                  </div>
                  <div className={styles.form_group}>
                    <input type="text" placeholder="CNPJ" required />
                  </div>
                  <div className={styles.form_group}>
                    <input type="password" placeholder="Código de acesso" required />
                  </div>
                  <button type="submit" className={styles.submit_button}>Acessar</button>
                  <div className={styles.form_links}>
                    <p className={styles.p}><Link to="">Esqueci minha senha</Link></p>
                    <p className={styles.p}>Não tem uma conta? <Link to="/cadastro">Clique aqui para criar uma!</Link></p>
                    <p className={styles.p}>Deseja voltar? <Link to="/">Clique aqui!</Link></p>
                  </div>
                </form>
              </div>

              {/* Login Colaborador */}
            <div className={`${styles.tab_pane} ${activeTab === 'colaborador' ? styles.active : ''}`}>
              <form className={styles.login_form}>
              <h2 className={`${styles.h2}`}>Login Colaborador</h2>
                <div className={styles.form_group}>
                  <input type="text" placeholder="CPF" required />
                </div>
                <div className={styles.form_group}>
                  <input type="password" placeholder="Senha" required />
                </div>
                <button type="submit" className={styles.submit_button}>Acessar</button>
                <div className={styles.form_links}>
                  <p className={`${styles.p}`} ><Link to="">Esqueci minha senha</Link></p>
                  <p className={`${styles.p}`} >Não tem uma conta? <Link to="/cadastro">Clique aqui para criar uma!</Link></p>
                  <p className={`${styles.p}`} >Deseja voltar? <Link to="/">Clique aqui!</Link></p>
                </div>
              </form>
            </div>

            {/* Login Recebedor */}
            <div className={`${styles.tab_pane} ${activeTab === 'recebedor' ? styles.active : ''}`}>
              <form className={styles.login_form}>
              <h2 className={`${styles.h2}`}>Login Recebedor</h2>
                <div className={styles.form_group}>
                  <input type="text" placeholder="CPF" required />
                </div>
                <div className={styles.form_group}>
                  <input type="password" placeholder="Senha" required />
                </div>
                <button type="submit" className={styles.submit_button}>Acessar</button>
                <div className={styles.form_links}>
                  <p className={`${styles.p}`} ><Link to="">Esqueci minha senha</Link></p>
                  <p className={`${styles.p}`} >Não tem uma conta? <Link to="/cadastro">Clique aqui para criar uma!</Link></p>
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