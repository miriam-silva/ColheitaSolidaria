import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import useAuthentication from '../../../hooks/useAuthentication.jsx';
import { validarCNPJ, validarCPF } from "../../../utils/validacao.js";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import styles from "./Cadastro.module.css";
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner.jsx';
import { enviarEmailConfirmacao } from '../../../services/emailService.js';

export default function CadastroPage() {
  const [activeTab, setActiveTab] = useState('adm');
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    cpf: '',
    dataNascimento: '',
    email: '',
    telefone: '',
    endereco: '',
    senha: '',
    confirmarSenha: ''
  });
  const navigate = useNavigate();
  const { createUser, error, loading } = useAuthentication();
  const db = getFirestore();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    let role = activeTab === 'adm' ? 'admin' : 'colaborador';

    if (role === 'admin') {
      if (!validarCNPJ(formData.cnpj)) {
        alert('CNPJ inválido!');
        return;
      }
    } else if (role === 'colaborador') {
      if (!validarCPF(formData.cpf)) {
        alert('CPF inválido!');
        return;
      }
    }

    try {
      const user = await createUser({
        displayName: formData.nome,
        email: formData.email,
        password: formData.senha,
        nome: formData.nome,
        telefone: formData.telefone,
        dataNascimento: formData.dataNascimento,
        endereco: formData.endereco
      }, role, formData.cnpj);

      if (user) {
        alert('Cadastro realizado com sucesso!');
      
      try {
        await enviarEmailConfirmacao (formData.email, formData.nome)
        alert('E-mail de confirmação enviado.')
      } catch (error) {
      console.error("Erro ao enviar e-mail de confirmação:", error)
      alert('Cadastro realizado, mas falha ao enviar e-mail de confirmação.')
      }

      navigate(role === 'admin' ? '/InicialAdministrador' : '/InicialColaborador') }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert('Erro ao cadastrar: ' + error.message);
    }  
  }

  return (
    <Container fluid className={styles.login_container}>
      <Row className={styles.row_centered}>
        <Col lg={10} className={styles.login_box}>
          <Col md={6} className={styles.login_hero}>
            <div className={styles.hero_content}>
              <h1 className={styles.h1}>Junte-se a nós!</h1>
              <p className={styles.p2}>
                Faça o seu cadastro e ajude a contribuir para um futuro mais sustentável e solidário.
              </p>
            </div>
          </Col>

          <Col md={6} className={styles.login_forms}>
            <ul className={styles.tabs_container}>
              <li className={styles.tab_item}>
                <button className={`${styles.tab_button} ${activeTab === 'adm' ? styles.active : ''}`}
                  onClick={() => handleTabChange('adm')}>
                  Administrador
                </button>
              </li>
              <li className={styles.tab_item}>
                <button className={`${styles.tab_button} ${activeTab === 'colaborador' ? styles.active : ''}`}
                  onClick={() => handleTabChange('colaborador')}>
                  Colaborador
                </button>
              </li>
            </ul>

            <div className={styles.tab_content}>
              <div className={`${styles.tab_pane} ${activeTab === 'adm' ? styles.active : ''}`}>
                <form className={styles.login_form} onSubmit={handleSubmit}>
                  <h2 className={styles.h2}>Cadastro Administrador</h2>

                  {loading && (
                    <div className="d-flex justify-content-center mb-4">
                      <LoadingSpinner size={60} color="#a50000"/>
                    </div>
                  )}

                  <div className={styles.form_group}>
                    <input type="text" name="nome" placeholder="Nome completo" required onChange={handleChange} disabled={loading}/>
                  </div>

                  <div className={styles.form_group}>
                    <input type="text" name="cnpj" placeholder="CNPJ" required onChange={handleChange} disabled={loading}/>
                  </div>

                  <div className={styles.form_group}>
                    <input type="date" name="dataNascimento" required onChange={handleChange} disabled={loading}/>
                  </div>

                  <div className={styles.form_group}>
                    <input type="email" name="email" placeholder="Email" required onChange={handleChange} disabled={loading}/>
                  </div>

                  <div className={styles.form_group}>
                    <input type="tel" name="telefone" placeholder="Telefone" required onChange={handleChange} disabled={loading}/>
                  </div>

                  <div className={styles.form_group}>
                    <input type="text" name="endereco" placeholder="Endereço" required onChange={handleChange} disabled={loading}/>
                  </div>

                  <div className={styles.form_group}>
                    <input type="password" name="senha" placeholder="Senha" required onChange={handleChange} disabled={loading}/>
                  </div>

                  <div className={styles.form_group}>
                    <input type="password" name="confirmarSenha" placeholder="Confirme sua senha" required onChange={handleChange} disabled={loading}/>
                  </div>

                  <button type="submit" className={styles.submit_button} disabled={loading}>
                    {loading ? 'Carregando...' : 'Cadastrar'}
                  </button>
                  <div id="itens" className="text-center mt-3">
                    <p className={`${styles.p}`}>
                      Já possui um cadastro?{' '}
                      <Link to="/login" >Clique aqui para fazer login!</Link>
                    </p>
                    <p className={`${styles.p}`}>
                      Deseja voltar para a tela anterior?{' '}
                      <Link to="/">Clique aqui!</Link>
                    </p>
                  </div>

                </form>
              </div>

              <div className={`${styles.tab_pane} ${activeTab === 'colaborador' ? styles.active : ''}`}>
                <form className={styles.login_form} onSubmit={handleSubmit}>
                  <h2 className={styles.h2}>Cadastro Colaborador</h2>

                  {loading && (
                    <div className="d-flex justify-content-center mb-4">
                      <LoadingSpinner size={60} color="#a50000"/>
                    </div>
                  )}

                  <div className={styles.form_group}>
                    <input type="text" name="nome" placeholder="Nome completo" required onChange={handleChange} disabled={loading}/>
                  </div>

                  <div className={styles.form_group}>
                    <input type="text" name="cpf" placeholder="CPF" required onChange={handleChange} disabled={loading}/>
                  </div>

                  <div className={styles.form_group}>
                    <input type="date" name="dataNascimento" required onChange={handleChange} disabled={loading}/>
                  </div>

                  <div className={styles.form_group}>
                    <input type="email" name="email" placeholder="Email" required onChange={handleChange} disabled={loading}/>
                  </div>

                  <div className={styles.form_group}>
                    <input type="tel" name="telefone" placeholder="Telefone" required onChange={handleChange} disabled={loading}/>
                  </div>

                  <div className={styles.form_group}>
                    <input type="text" name="endereco" placeholder="Endereço" required onChange={handleChange} disabled={loading}/>
                  </div>

                  <div className={styles.form_group}>
                    <input type="password" name="senha" placeholder="Senha" required onChange={handleChange} disabled={loading}/>
                  </div>

                  <div className={styles.form_group}>
                    <input type="password" name="confirmarSenha" placeholder="Confirme sua senha" required onChange={handleChange} disabled={loading}/>
                  </div>

                  <button type="submit" className={styles.submit_button} disabled={loading}>
                    {loading ? 'Carregando...' : 'Cadastrar'}
                  </button>

                  <div id="itens" className="text-center mt-3">
                    <p  className={`${styles.p}`}>
                      Já possui um cadastro?{' '}
                      <Link to="/login">Clique aqui para fazer login!</Link>
                    </p>
                    <p  className={`${styles.p}`}>
                      Deseja voltar para a tela anterior?{' '}
                      <Link to="/">Clique aqui!</Link>
                    </p>
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