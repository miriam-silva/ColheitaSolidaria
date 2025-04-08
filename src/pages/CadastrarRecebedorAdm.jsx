import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import styles from './CadastrarRecebedorAdm.module.css';
import useAuthentication from "../hooks/useAuthentication";



const CadastrarRecebedorAdm = () => {
  const [activeTab, setActiveTab] = useState('recebedor');

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [numFamiliares, setNumFamiliares] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  const { registerRecebedor, error, loading } = useAuthentication();

  const handleTabChange = (tabId) => setActiveTab(tabId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      setMensagemErro("As senhas não coincidem.");
      return;
    }

    setMensagemErro('');
    setMensagemSucesso('');

    try {
      await registerRecebedor({
        nome,
        cpf,
        dataNascimento,
        numFamiliares,
        email,
        telefone,
        password: senha,
      });

      setMensagemSucesso("Recebedor cadastrado com sucesso!");
      setNome('');
      setCpf('');
      setDataNascimento('');
      setNumFamiliares('');
      setEmail('');
      setTelefone('');
      setSenha('');
      setConfirmarSenha('');
    } catch (err) {
      console.error(err);
      setMensagemErro(error || "Erro ao cadastrar o recebedor.");
    }
  };

  return (
    <>
    <br/>
    <div className="cadastro-recebedor-container">
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <div className={`row ${styles.main_box} d-flex`} id="main-box">
          {/* Seção Vermelha */}
          <div className={`col-md-6 ${styles.red_section} d-flex align-items-center justify-content-center`}>
            <div className="text-center text-white">
              <h1 className={`${styles.h1}`}>Cadastre um novo membro!</h1>
              <br />
              <p className={`${styles.p}`}>
                Amplie a rede de solidariedade e ajude a construir um futuro mais justo e sustentável.
              </p>
            </div>
          </div>

          {/* Formulário */}
          <div className={`col-md-6 ${styles.form_section} d-flex align-items-center justify-content-center`}>
            <div className="w-100">
              <ul className={`${styles.nav_tabs} justify-content-left`}id="myTab" role="tablist">
                <li className={`${styles.nav_item}`}>
                  <button
                    className={`nav-link ${activeTab === 'recebedor' ? 'active' : ''}`}
                    id="recebedor-tab"
                    onClick={() => handleTabChange('recebedor')}
                  >
                    Recebedor
                  </button>
                </li>
              </ul>

              <div className="tab-content mt-3" id="myTabContent">
                <div
                  className={`tab-pane fade ${activeTab === 'recebedor' ? 'show active' : ''}`}
                  id="recebedor"
                  role="tabpanel"
                  aria-labelledby="recebedor-tab"
                >
                  <form className={`${styles.login_form}`}onSubmit={handleSubmit}>
                    <h2 className={`${styles.h2} text-center`} >Cadastrar Recebedor</h2>

                    <input type="text" className={`${styles.form_control} mb-2`}  placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} required />
                    <input type="text" className={`${styles.form_control} mb-2`} placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
                    <input type="date" className={`${styles.form_control} mb-2`} value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required />
                    <input type="number" className={`${styles.form_control} mb-2`} placeholder="Número de familiares" value={numFamiliares} onChange={(e) => setNumFamiliares(e.target.value)} required />
                    <input type="email" className={`${styles.form_control} mb-2`} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="tel" className={`${styles.form_control} mb-2`} placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
                    <input type="password" className={`${styles.form_control} mb-2`} placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                    <input type="password" className={`${styles.form_control} mb-2`} placeholder="Confirme sua senha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required />

                    {mensagemErro && <p className="text-danger text-center">{mensagemErro}</p>}
                    {mensagemSucesso && <p className="text-success text-center">{mensagemSucesso}</p>}

                    <button type="submit" id="btn" className={`${styles.btn} ${styles.btn_primary} btn-block`} disabled={loading}>
                      {loading ? 'Cadastrando...' : 'Criar cadastro'}
                    </button>

                    <div className={`${styles.itens} text-center mt-3`} >
                      <p className={`${styles.p2}`}>O recebedor já possui um cadastro? <Link to="/login-cadastro">Clique aqui para ajudá-lo a fazer login!</Link></p>
                      <p className={`${styles.p2}`}> Deseja voltar para a tela anterior? <Link to="/adm/inicio">Clique aqui!</Link></p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
    </>
  );
};

export default CadastrarRecebedorAdm;
