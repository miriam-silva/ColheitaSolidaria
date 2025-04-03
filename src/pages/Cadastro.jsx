import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Cadastro.module.css';
import { useAuthentication } from '../hooks/useAuthentication';
import { validarCNPJ, validarCPF } from "../utils/validacao.js";
import { getFirestore, doc, setDoc } from "firebase/firestore";


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
    confirmarSenha: '',
    chaveAcesso: ''
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

    // Garantir que role sempre tenha um valor válido
    let role = activeTab === 'adm' ? 'admin' : 'colaborador';
    if (!role) {
        console.error("Erro: 'role' não foi definido corretamente.");
        return;
    }

    console.log("Valor de activeTab:", activeTab);
    console.log("Definindo role como:", role);

    if (role === 'admin') {
        if (!validarCNPJ(formData.cnpj)) {
            alert('CNPJ inválido!');
            return;
        }
        if (!formData.chaveAcesso.trim()) {
            alert('Chave de acesso obrigatória para administradores.');
            return;
        }
    } else if (role === 'colaborador') {
        if (!validarCPF(formData.cpf)) {
            alert('CPF inválido!');
            return;
        }
    }

    try {
        // Criar usuário no Firebase Authentication
        const user = await createUser({
            displayName: formData.nome,
            email: formData.email,
            password: formData.senha,
        });

        if (user) {
            console.log("Usuário criado:", user.uid);

            // Criar objeto de usuário sem valores undefined
            const userData = {
                nome: formData.nome || '',
                email: formData.email || '',
                telefone: formData.telefone || '',
                dataNascimento: formData.dataNascimento || '',
                role: role || 'colaborador', 
            };

            if (role === 'admin') {
                userData.cnpj = formData.cnpj || '';
                userData.chaveAcesso = formData.chaveAcesso || '';
            } else if (role === 'colaborador') {
                userData.cpf = formData.cpf || '';
            }

            console.log("Salvando no Firestore:", userData);

            // Salvar no Firestore
            await setDoc(doc(db, "users", user.uid), userData);

            alert('Cadastro realizado com sucesso!');
            navigate('/InicialColaborador');
        }
    } catch (error) {
        console.error("Erro no cadastro:", error);
        alert('Erro ao cadastrar: ' + error.message);
    }
};



  return (
    <Container fluid className={styles.login_container}>
      <Row className="justify-content-center align-items-center">
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
                <button className={`${styles.tab_button} ${activeTab === 'adm' ? styles.active : ''}`} onClick={() => handleTabChange('adm')}>
                  Administrador
                </button>
              </li>
              <li className={styles.tab_item}>
                <button className={`${styles.tab_button} ${activeTab === 'colaborador' ? styles.active : ''}`} onClick={() => handleTabChange('colaborador')}>
                  Colaborador
                </button>
              </li>
            </ul>

            <div className={styles.tab_content}>
              <div className={`${styles.tab_pane} ${activeTab === 'adm' ? styles.active : ''}`}>
                <form className={styles.login_form} onSubmit={handleSubmit}>
                  <h2 className={styles.h2}>Cadastro Administrador</h2>
                  <input type="text" name="nome" placeholder="Nome completo" required onChange={handleChange} />
                  <input type="text" name="cnpj" placeholder="CNPJ" required onChange={handleChange} />
                  <input type="text" name="chaveAcesso" placeholder="Chave de Acesso" required onChange={handleChange} />
                  <input type="date" name="dataNascimento" required onChange={handleChange} />
                  <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
                  <input type="tel" name="telefone" placeholder="Telefone" required onChange={handleChange} />
                  <input type="password" name="senha" placeholder="Senha" required onChange={handleChange} />
                  <input type="password" name="confirmarSenha" placeholder="Confirme sua senha" required onChange={handleChange} />
                  <button type="submit" className={styles.submit_button} disabled={loading}>Cadastrar</button>
                </form>
              </div>

              <div className={`${styles.tab_pane} ${activeTab === 'colaborador' ? styles.active : ''}`}>
                <form className={styles.login_form} onSubmit={handleSubmit}>
                  <h2 className={styles.h2}>Cadastro Colaborador</h2>
                  <input type="text" name="nome" placeholder="Nome completo" required onChange={handleChange} />
                  <input type="text" name="cpf" placeholder="CPF" required onChange={handleChange} />
                  <input type="date" name="dataNascimento" required onChange={handleChange} />
                  <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
                  <input type="tel" name="telefone" placeholder="Telefone" required onChange={handleChange} />
                  <input type="password" name="senha" placeholder="Senha" required onChange={handleChange} />
                  <input type="password" name="confirmarSenha" placeholder="Confirme sua senha" required onChange={handleChange} />
                  <button type="submit" className={styles.submit_button} disabled={loading}>Cadastrar</button>
                </form>
              </div>
            </div>
          </Col>
        </Col>
      </Row>
    </Container>
  );
}
