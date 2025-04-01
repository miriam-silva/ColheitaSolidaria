import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'
import img2 from '../assets/img2.jpg'
import img3 from '../assets/img3.jpg'
import img4 from '../assets/img4.jpg'
import img5 from '../assets/img5.jpg'
import agricultoraicon from '../assets/agricultoraicon.png'
import receba from '../assets/receba.png'
import coracao_plantinha from '../assets/coracao_plantinha.png'
import alimentos2 from '../assets/alimentos2.png'

const Home = () => {
    return (
    <div className="home-container">
      <div className={`${styles.faixabemvindo} text-center`}>
        <h1 className={`display-4 ${styles.textofaixabemvindo}`}>Bem-Vindo a Colheita Solidária!</h1>
      </div>

      <br />

      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={img2} className={`d-block w-100 ${styles.carrosselimagens}`} alt="imagem de uma lavoura no campo" />
          </div>
          <div className="carousel-item">
            <img src={img3} className={`d-block w-100 ${styles.carrosselimagens}`} alt="imagem de uma lavoura maior" />
          </div>
          <div className="carousel-item">
            <img src={img4} className={`d-block w-100 ${styles.carrosselimagens}`} alt="imagem de uma mulher com um chapeu de palha colhendo na lavoura" />
          </div>
          <div className="carousel-item">
            <img src={img5} className={`d-block w-100 ${styles.carrosselimagens}`} alt="imagem de dois tipos de plantação" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <br />

      <div className={`container-fluid ${styles.degrade_right2}`}>
        <div className="row mb-3">
          <div className={`col-12 ${styles.caixa}`}>
            <div className="row align-items-center">
              <div className="col-md-6">
                <img src={agricultoraicon} className={`${styles.tamanho_imagem4}`} alt="Sacola com vários alimentos." />
              </div>
              <div className="col-md-6">
                <p className={`text-break ${styles.right} ${styles.p}`}>
                  No Colheita Solidária, acreditamos que todos merecem acesso a alimentos frescos e nutritivos.
                  Nossa missão é conectar agricultores com excedentes de produção a pessoas e famílias que necessitam, reduzindo o desperdício de alimentos e ajudando a combater a fome.
                  Junte-se a nós nesta causa e faça a diferença na vida de alguém hoje mesmo!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />

      <div className="container">
        <h1 className={`text-center my-4 ${styles.titulo_vermelho}`}>Como Funciona?</h1>
        <div className="row"> 
          <div className="col-md-4">
            <div className={`${styles.box} ${styles.caixa1}`}> 
              <h2 className={`${styles.titulo_caixa}`}>Doe alimentos</h2>
              <img src={alimentos2} className={`box ${styles.img1e2}`} alt="Doe alimentos" />
              <p>Agricultores cadastrados podem listar os alimentos disponíveis para <Link to="/" className={`${styles.titulo_vermelho}`}>doação</Link>.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className={`${styles.box} ${styles.caixa2}`}>
              <h2 className={`${styles.titulo_caixa}`}>Receba alimentos</h2>
              <img src={receba} className={`box ${styles.img1e2}`} alt="Receba alimentos" />
              <p>Pessoas carentes se cadastram para <Link to="/" className={`${styles.titulo_vermelho}`}>alimentos doados</Link>.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className={`${styles.box} text-black ${styles.caixa3}`}>
              <h2 className={`${styles.titulo_caixa}`}>Conecte-se</h2>
              <img src={coracao_plantinha} className={`box ${styles.img3}`} alt="Conecte-se" />
              <p>Nossa plataforma facilita a conexão entre doadores e recebedores, garantindo que os alimentos cheguem a quem mais precisa. <Link to="/" className={`${styles.titulo_vermelho}`}>adm</Link></p>  
            </div>
          </div>
        </div>
      </div>
      {/* 
      <div className="none">
        <br />
        <br />
      </div> */}
    </div>
  )
}

export default Home;
