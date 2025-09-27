import React from 'react'
import { Link } from 'react-router-dom'
import styles from './SobreNos.module.css'
import sacola from '../../../assets/sacola.png'
import tomatos from '../../../assets/tomatos.png'
import maos from '../../../assets/maos.png'
import doisamigos from '../../../assets/doisamigos.png'
import miriam from '../../../assets/miriam.jpg'
import isa from '../../../assets/isa.jpg'
import carol from '../../../assets/carol.jpg'
import react from '../../../assets/react.png'
import bootstrap from '../../../assets/bootstrap.png'
import firebase from '../../../assets/firebase.png'
import notion from '../../../assets/notion.png'
import github from '../../../assets/github.png'
import figma from '../../../assets/figma.png'


const SobreNos = () => {
  return (
    <div>
      <br/>
      <div className="container-fluid">
        <div className="row mb-3">
          <div className={`col-md-12 ${styles.caixa}`}>
            <div className="row align-items-center">
              <div className="col-md-6">
                <img src={sacola} className={`${styles.tamanho_imagem4}`} alt="Sacola com vários alimentos." />
              </div>
              <div className="col-md-6">
                <p className={`${styles.p} ${styles.right}`}>
                  No Colheita Solidária, somos uma equipe dedicada
                  <span className={`${styles.titulo_vermelho}`}> a reduzir o desperdício de alimentos</span> e
                  <span className={`${styles.titulo_vermelho}`}> combater a fome.</span>
                </p>
                <p className={`${styles.right} ${styles.p} `}>
                  Fundado em 2024, nosso objetivo é criar uma ponte entre agricultores com alimentos excedentes e pessoas necessitadas.
                </p>
                <p className={`${styles.right} ${styles.p} `}>
                  Acreditamos que, juntos, podemos construir uma comunidade mais solidária e sustentável!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />

      <h1 className={`${styles.titulo_vermelho}`}>Nossa Missão:</h1>

      <div className="container-fluid">
        <div className="row mb-3">
          <div className={`col-md-12 ${styles.caixa} ${styles.caixa11}`}>
            <div className="row align-items-center">
              <div className="col-md-6">
                <img src={tomatos} className={`${styles.tamanho_imagem1}`} alt="Cesta de tomates" />
              </div>
              <div className="col-md-6">
                <br />
                <h2 className={`${styles.titulo_caixa1} ${styles.right}`}>Reduzir o Desperdício</h2>
                <p className={`${styles.p} ${styles.right}`}>Minimizar a perda de alimentos por meio de doações.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className={` col-md-12 ${styles.caixa} ${styles.caixa22}`}>
            <div className="row align-items-center">
              <div className="col-md-6 order-md-2">
                <img src={maos} className={`${styles.tamanho_imagem2}`} alt="Duas mãos dadas" />
              </div>
              <div className="col-md-6 order-md-1">
                <br />
                <h2 className={`${styles.titulo_caixa2} ${styles.left}`}>Combater a Fome</h2>
                <p className={`${styles.p} ${styles.left}`}>Fornecer alimentos frescos e nutritivos para quem mais precisa.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className={`col-md-12 ${styles.caixa} ${styles.caixa33}`}>
            <div className="row align-items-center">
              <div className="col-md-6 ">
                <img src={doisamigos} className={`${styles.tamanho_imagem3}`} alt="Dois amigos se abraçando" />
              </div>
              <div className="col-md-6">
                <br />
                <h2 className={`${styles.titulo_caixa3} ${styles.right}`}>Fortalecer Comunidades</h2>
                <p className={`${styles.p} ${styles.right}`}>Conectar doadores e recebedores, promovendo a solidariedade.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
            <br/>
            <section className="p-4">
                <div className={`container-fluid ${styles.degrade_right2}`}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="p-3 mb-4">
                            <h2 className={`mb-3 ${styles.titulo_vermelho}`}>Sobre o Projeto</h2>
                            <p className={`${styles.p}`}>O <strong>Colheita Solidária</strong> é uma plataforma que conecta agricultores com comunidades em situação de vulnerabilidade, promovendo a doação de alimentos excedentes.</p>
                            </div>

                            <div className="p-3">
                                <h5 className={`mb-2 fw-bold ${styles.reflexo}`}>Reflexão Final</h5>
                                    <blockquote className={`fst-italic ${styles.p}`} style={{maxWidth:'700px', margin:'0 auto', borderLeft: '4px solid #c0392b', paddingLeft: '1rem'}}>"A principal dificuldade enfrentada pela equipe foi a de cumprir prazos, especialmente na fase de execução. Ainda assim, adquirimos muitos aprendizados valiosos sobre a organização, colaboração e uso de ferramentas modernas como AppCheck, Firebase e Supabase.</blockquote>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="ph-3 h-100">
                                <h2 className={`mb-3 ${styles.titulo_vermelho3}`}>Objetivos SMART</h2>
                                    <ul className={`text-start ${styles.p}`}>
                                        <li><strong>Específico (S):</strong> Criar uma plataforma gratuita que conecte agricultores com pessoas em situação de vulnerabilidade para doações de alimentos</li>
                                        <li><strong>Mensurável (M):</strong> Objetivo atingido ao concluir funcionalidades como login, cadastro de usuários, registro e solicitação de doações, análise e relatórios.</li>
                                        <li><strong>Atingível (A):</strong> A equipe possui o conhecimento técnico necessário e divide as tarefas de forma colaborativa.</li>
                                        <li><strong>Relevante (R):</strong> Combate o desperdício e a fome por meio de uma solução digital prática e acessível.</li>
                                        <li><strong>Temporal (T):</strong>Conclusão prevista até o fim do 1° semestre de 2025.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>

            <section className="p-4">
                <div className="container text-center">
                    <h2 className={`mb-4 ${styles.titulo_vermelho}`}>Equipe</h2>

                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-6 col-md-4 col-lg-2 mb-4">
                            <img src={miriam} className={`img-fluid rounded-circle mb-2 ${styles.img2}`} alt="Miriam Silva Corrêa"/>
                            <h6 className="fw-bold">Miriam Silva Corrêa</h6>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg-2 mb-4">
                            <img src={isa} className={`img-fluid rounded-circle mb-2 ${styles.img2}`} alt="Isadora Georgete"/>
                            <h6 className="fw-bold">Isadora Georgete</h6>
                    </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg-2 mb-4">
                            <img src={carol} className={`img-fluid rounded-circle mb-2 ${styles.img2}`}alt="Caroline Oliveira Silva"/>
                            <h6 className="fw-bold">Caroline Oliveira Silva</h6>
                    </div>
                </div>
            </div>
            </section>

            <section className="p-4">
                <div className={`container text-center ${styles.tecnologias}`}>
                    <h2 className={`mb-4 ${styles.titulo_vermelho}`}>Tecnologias Utilizadas</h2>

                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-6 col-md-4 col-lg-2 mb-4">
                            <img src={react} className={`img-fluid rounded-circle mb-2 ${styles.img3}`} alt="React"/>
                            <h6 className="fw-bold">React.js</h6>
                            <p className={styles.p2}>Frontend</p>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4 col-lg-2 mb-4">
                            <img src={bootstrap} className={`img-fluid rounded-circle mb-2 ${styles.img3}`} alt="Bootstrap"/>
                            <h6 className="fw-bold">Bootstrap</h6>
                            <p className={styles.p2}>Estilização</p>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4 col-lg-2 mb-4">
                            <img src={firebase} className={`img-fluid rounded-circle mb-2 ${styles.img3}`} alt="Firebase"/>
                            <h6 className="fw-bold">Firebase</h6>
                            <p className={styles.p2}>Banco de dados & Hosting</p>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4 col-lg-2 mb-4">
                            <img src={notion} className={`img-fluid rounded-circle mb-2 ${styles.img3}`} alt="Notion"/>
                            <h6 className="fw-bold">Notion</h6>
                            <p className={styles.p2}>Gestão e organização de tarefas</p>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4 col-lg-2 mb-4">
                            <img src={github} className={`img-fluid rounded-circle mb-2 ${styles.img3}`} alt="GitHub"/>
                            <h6 className="fw-bold">GitHub</h6>
                            <p className={styles.p2}>Versionamento de código</p>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4 col-lg-2 mb-4">
                            <img src={figma} className={`img-fluid rounded-circle mb-2 ${styles.img3}`} alt="Figma"/>
                            <h6 className="fw-bold">Figma</h6>
                            <p className={styles.p2}>Protótipos</p>
                        </div>

                    </div>
                </div>
            </section>
        </div>

      <br />
    </div>
  );
};

export default SobreNos;