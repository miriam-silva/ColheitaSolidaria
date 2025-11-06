import React from "react";
import styles from "./CardHistoricoDoacao.module.css";

const obterUrlImagem = (imagemUrl) => {
  if (!imagemUrl) return null;
  return imagemUrl.startsWith("http") ? imagemUrl : null;
};

const CardHistoricoDoacao = ({ index, doacao }) => {
  if (!doacao) return null;

  const imagemUrl = obterUrlImagem(doacao.imagemUrl);

  const formatarData = (data) => {
    if (!data) return "Data indisponível";
    const dt = new Date(data);
    return isNaN(dt) ? "Data inválida" : dt.toLocaleDateString("pt-BR");
  };

  return (
    <div className="col-12">
      <div className={styles.donation_box}>
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <h5 className={styles.titulo}>
              #{index + 1}° Doação - {doacao.nome}
            </h5>
            <p className={`${styles.texto}`}>
              {doacao.descricao} - {doacao.quantidade} unidades
            </p>
            <p className={`${styles.texto}`}>
              Data de registro: {formatarData(doacao.dataRegistro)} | Validade: {formatarData(doacao.validade)}
            </p>
          </div>
          <div className="col-md-4 col-sm-12 d-flex justify-content-end align-items-center">
            {imagemUrl && (
              <img src={imagemUrl} alt="Imagem da doação" className={styles.imagem} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHistoricoDoacao;
