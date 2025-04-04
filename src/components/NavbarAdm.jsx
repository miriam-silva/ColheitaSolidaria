import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Offcanvas } from "bootstrap";
import styles from "./NavbarAdm.module.css";
import receptorImg from "../assets/receptor.png";
import logotp from "../assets/logotp.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const NavbarAdm = () => {
  useEffect(() => {
    const offcanvasElement = document.getElementById("offcanvasWithBothOptions");
    if (offcanvasElement) {
      new Offcanvas(offcanvasElement);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbarCustom">
      <div className="container-fluid">
        {/* Logo da Navbar */}
        <Link className={styles.navbar_brand} to="/">
          <img
            src={logotp}
            alt="Colheita Solidária"
            width="300px"
            height="130px"
            className="d-inline-block align-top"
          />
        </Link>

        <div className={`ms-auto d-flex align-items-center gap-2 ${styles.botoesContainer}`}>
          {/* Ícone de Perfil com Offcanvas */}
          <div className={styles.bolinhaperfil}>
            <button
              type="button"
              className="border-0 bg-transparent p-0"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithBothOptions"
              aria-controls="offcanvasWithBothOptions"
            >
              <img
                src={receptorImg}
                alt="Abrir Offcanvas"
                className="rounded-circle"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdm;
