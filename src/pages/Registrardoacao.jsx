import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Registrardoacao.module.css';
import { registrarDoacao } from '../hooks/useDoacoes';
import { getAuth } from 'firebase/auth';
import { useDoacoes } from '../context/DoacoesContext';
import { Timestamp } from 'firebase/firestore';

const Registrardoacao = () => {
    const navigate = useNavigate();
    const { adicionarDoacao } = useDoacoes();

    const [produto, setProduto] = useState('');
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [validade, setValidade] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState('');

    const limparCampos = () => {
        setProduto('');
        setDescricao('');
        setQuantidade('');
        setValidade('');
    };

    const handleCancel = () => {
        limparCampos();
        window.location.href = '/InicialColaborador';
    };

    const handleSubmit = async () => {
        if (!produto.trim() || !descricao.trim() || !quantidade || !validade) {
            setMensagem("Preencha os dados corretamente.");
            setTipoMensagem("erro");
            return;
        }

        const hoje = new Date();
        const dataValidade = new Date(validade);
        hoje.setHours(0, 0, 0, 0);
        dataValidade.setHours(0, 0, 0, 0);

        if (dataValidade < hoje) {
            setMensagem("Não é possível registrar doação com validade passada.");
            setTipoMensagem("erro");
            return;
        }

        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            setMensagem("Usuário não autenticado.");
            setTipoMensagem("erro");
            return;
        }

        const resultado = await registrarDoacao({
            produto,
            descricao,
            quantidade,
            validade: Timestamp.fromDate(new Date(validade)),
            colaboradorId: user.uid
        });

        if (resultado.sucesso) {
            adicionarDoacao({
                produto,
                descricao,
                quantidade,
                validade,
                dataRegistro: Timestamp.now(), 
            });

            setMensagem("Doação registrada com sucesso!");
            setTipoMensagem("sucesso");
            limparCampos();
            setTimeout(() => {
                navigate('/colaborador/Doacaoregistrada');
            }, 2000);
        } else {
            setMensagem("Erro ao registrar doação. Tente novamente.");
            setTipoMensagem("erro");
        }
    };

    return (
        <div>
            <nav className={`navbar navbar-expand-sm navbar-toggleable-sm navbar-light box-shadow mb-1 ${styles.navbarra}`}>
                <div className="container-fluid">
                    <h3 className={`${styles.arrumar}`}>Registrar Doação:</h3>
                </div>
            </nav>

            {mensagem && (
                <div className={`alert ${tipoMensagem === 'sucesso' ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
                    {mensagem}
                </div>
            )}

            <br />

            <div className="mb-3">
                <label htmlFor="productName" className={`form-label ${styles.texto}`}>Nome do produto:</label>
                <input
                    type="text"
                    className="form-control"
                    id="productName"
                    placeholder="Nome"
                    value={produto}
                    onChange={(e) => setProduto(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="productDescription" className={`form-label ${styles.texto}`}>Descrição do produto:</label>
                <textarea
                    className="form-control"
                    id="productDescription"
                    rows="3"
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="productQuantity" className={`form-label ${styles.texto}`}>Quantidade:</label>
                <input
                    type="number"
                    className="form-control"
                    id="productQuantity"
                    placeholder="Quantidade"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="productExpiry" className={`form-label ${styles.texto}`}>Validade:</label>
                <input
                    type="date"
                    className="form-control"
                    id="productExpiry"
                    placeholder="Validade"
                    value={validade}
                    onChange={(e) => setValidade(e.target.value)}
                />
            </div>

            <div className="button-group">
                <button className={`${styles.postpone_btn}`} type="button" onClick={handleCancel}>Cancelar</button>
                <button className={`form-label ${styles.approve_btn}`} type="submit" onClick={handleSubmit}>Enviar</button>
            </div>

            <br />
        </div>
    );
};

export default Registrardoacao;
