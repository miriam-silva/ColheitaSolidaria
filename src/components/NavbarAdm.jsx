import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./NavbarAdm.module.css";
import receptorImg from "../assets/receptor.png";
import logotp from "../assets/logotp.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Importação correta do hook e db
import useAuthentication from "../hooks/useAuthentication";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

// toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NavbarAdm = () => {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const { user, logout } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    const buscarNome = async () => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setNomeUsuario(docSnap.data().nome);
          }
        } catch (error) {
          console.error("Erro ao buscar nome do usuário:", error.message);
        }
      }
    };

    buscarNome();
  }, [user]);

  const handleClickSair = async () => {
    try {
      await logout();
navigate("/", { state: { logoutSuccess: true } });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Erro ao sair:", error.message);
      toast.error("Erro ao realizar logout. Tente novamente.");
    }
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-light ${styles.navbarCustom}`}>
        <div className="container-fluid">
          <Link className={styles.navbar_brand} to="/">
            <img src={logotp} alt="Colheita Solidária" width="300px" height="130px" />
          </Link>

          <div className="ms-auto d-flex align-items-center">
            <button
              className="border-0 bg-transparent"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <img
                src={receptorImg}
                alt="Perfil"
                className="rounded-circle"
                style={{ width: "60px", height: "60px" }}
              />
            </button>
          </div>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Menu</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body d-flex flex-column align-items-center gap-3">
          <img
            src={receptorImg}
            alt="Perfil"
            className="rounded-circle mb-2"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
          <h5 className="text-center">Olá, {nomeUsuario || "usuário"}!</h5>

          <div className="w-100 d-flex flex-column gap-2 mt-3">
            <Link to="/inicio" className="btn btn-outline-primary w-100">Início</Link>
            <Link to="/pedidos" className="btn btn-outline-primary w-100">Pedidos</Link>
            <Link to="/doacoes" className="btn btn-outline-primary w-100">Doações</Link>
            <Link to="/cadastrar-recebedor" className="btn btn-outline-primary w-100">Cadastrar Recebedor</Link>
            <button className="btn btn-danger w-100 mt-3" onClick={handleClickSair}>Sair</button>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default NavbarAdm;

