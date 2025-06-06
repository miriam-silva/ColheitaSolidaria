import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import styles from './InicialColaborador.module.css';
import { useDoacoes } from '../context/DoacoesContext';
import { supabase } from '../supabase/supabaseClient';

function ImagemDoacao({ caminho }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (caminho) {
      const { data } = supabase.storage.from('doacoes').getPublicUrl(caminho);
      setUrl(data.publicUrl);
    }
  }, [caminho]);

  if (!url) return null;

  return (
    <div style={{ marginBottom: '10px' }}>
      <img
        src={url}
        alt="Imagem da doação"
        style={{
          maxWidth: '100%',
          maxHeight: '180px',
          height: 'auto',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}
      />
    </div>
  );
}

export default function InicialColaborador() {
  const { doacoes } = useDoacoes();

  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

  return (
    <div>
      <div className="container-fluid mt-1">
        <Link to="/colaborador/Registrardoacao">
          <button className={`${styles.donation_btn}`}>Realizar doação</button>
        </Link>
      </div>

      <nav className={`navbar navbar-expand-sm navbar-toggleable-sm navbar-light box-shadow mb-1 ${styles.navbarra}`}>
        <div className="container-fluid">
          <h3 id="arrumar">Minhas doações:</h3>
        </div>
      </nav>

      <br />

      {doacoes.length === 0 ? (
        <h3 className={`${styles.transparente}`}>Nenhuma doação foi feita</h3>
      ) : (
        doacoes.map((doacao, index) => (
          <div key={index} className="col-12">
            <div className={`${styles.donation_box}`}>
              <div className="row">
                <div className="col-md-8 col-sm-12">
                  <h5 className={`${styles.titulo}`}>
                    #{index + 1}° Doação - {doacao.produto}
                  </h5>

                  <p className={`${styles.texto}`}>
                    {doacao.descricao} - {doacao.quantidade} unidades
                  </p>
                  <p className={`${styles.texto}`}>
                    Data de registro: {doacao.dataRegistro?.toDate
                      ? doacao.dataRegistro.toDate().toLocaleString()
                      : isValidDate(new Date(doacao.dataRegistro))
                        ? new Date(doacao.dataRegistro).toLocaleString()
                        : 'Data inválida'} |
                    Validade: {doacao.validade?.toDate
                      ? doacao.validade.toDate().toLocaleDateString()
                      : isValidDate(new Date(doacao.validade))
                        ? new Date(doacao.validade).toLocaleDateString()
                        : 'Data inválida'}
                  </p>
                </div>

                <div className="col-md-4 col-sm-12 d-flex justify-content-end align-items-center">
                  {doacao.imagemDoacao && <ImagemDoacao caminho={doacao.imagemDoacao} />}
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      <br /><br />
    </div>
  );
}
