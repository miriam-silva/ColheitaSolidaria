import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import logotp from "../../assets/logotp.png";
import receptorImg from "../../assets/receptor.png";
import useAuthentication from "../../hooks/useAuthentication";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { supabase } from "../../supabase/supabaseClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = ({ role }) => {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(receptorImg);
  const [showPerfilModal, setShowPerfilModal] = useState(false);
  const { user, logout } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    const buscarDados = async () => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setNomeUsuario(data.nome);
            if (data.fotoPerfil) setFotoPerfil(data.fotoPerfil);
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error.message);
        }
      }
    };
    buscarDados();
  }, [user]);

  const handleClickSair = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Erro ao sair:", error.message);
      toast.error("Erro ao realizar logout. Tente novamente.");
    }
  };

  const handleUploadFotoPerfil = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.uid}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from("users")
        .upload(filePath, file, { upsert: true });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from("users")
        .getPublicUrl(filePath);

      const url = publicUrlData.publicUrl;

      await updateDoc(doc(db, "users", user.uid), {
        fotoPerfil: url,
      });

      setFotoPerfil(url);
      toast.success("Foto de perfil atualizada!");
    } catch (error) {
      console.error("Erro ao enviar foto:", error.message);
      toast.error("Erro ao atualizar foto de perfil.");
    }
  };

  const abrirPerfilModal = () => setShowPerfilModal(true);
  const fecharPerfilModal = () => setShowPerfilModal(false);

  const menus = {
    admin: [
      { to: "/InicialAdministrador", label: "Início" },
      { to: "/adm/Pedidos", label: "Pedidos" },
      { to: "/adm/Doacoes", label: "Doações" },
      { to: "/adm/cadastrar-recebedor", label: "Cadastrar recebedor" },
      { to: "/adm/usuarios", label: "Gerenciar usuários" },
      { label: "Dados do meu perfil", onClick: abrirPerfilModal },
    ],
    colaborador: [
      { to: "/InicialColaborador", label: "Minhas doações" },
      { to: "/colaborador/Registrardoacao", label: "Registrar doações" },
      { label: "Dados do meu perfil", onClick: abrirPerfilModal },
    ],
    recebedor: [
      { to: "/InicialRecebedor", label: "Doações" },
      { to: "/recebedor/Minhassolicitacoes", label: "Minhas solicitações" },
      { to: "/recebedor/favoritos", label: "Minhas doações favoritas" },
      { label: "Dados do meu perfil", onClick: abrirPerfilModal },
    ],
  };

  const links = menus[role] || [];

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-light ${styles.navbarCustom}`}>
        <div className="container-fluid">
          <Link className={styles.navbar_brand} to="/">
            <img
              src={logotp}
              className={`${styles.logocolheita}`}
              alt="Colheita Solidária"
              width="300px"
              height="130px"
            />
          </Link>

          <div className="ms-auto d-flex align-items-center">
            <button
              className="border-0 bg-transparent"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <img src={fotoPerfil} alt="Perfil" className={`rounded-circle ${styles.fotoabrirperfil}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Offcanvas do perfil */}
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Meu Perfil</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>

        <div className="offcanvas-body d-flex flex-column align-items-center gap-3">
          <img src={fotoPerfil} alt="Perfil" className={`${styles.fotoperfil} rounded-circle mb-2`} />
          <h4 className="text-center">Olá, {nomeUsuario || "usuário"}!</h4>

          <div className="w-100 d-flex flex-column gap-2 mt-3">
            {links.map((link, index) => (
              <button
                key={index}
                className={`btn btn-outline w-100 ${styles.botoes}`}
                onClick={link.onClick ? link.onClick : () => navigate(link.to)}
              >
                {link.label}
              </button>
            ))}

            <label htmlFor="fotoPerfilUpload" className={`btn btn-outline w-100 ${styles.botoes}`}>
              Alterar foto de perfil
            </label>
            <input
              type="file"
              id="fotoPerfilUpload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleUploadFotoPerfil}
            />

            <button className={`btn w-100 mt-3 ${styles.botoes2}`} onClick={handleClickSair}>
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Modal do Perfil */}
      {showPerfilModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
          onClick={fecharPerfilModal}
        >
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Dados do meu perfil</h5>
                <button type="button" className="btn-close" onClick={fecharPerfilModal}></button>
              </div>
              <div className="modal-body text-center">
                <img src={fotoPerfil} alt="Perfil" className="rounded-circle mb-2" width="200" style={{ height: 'auto' }} />
                <p className={styles.pdados}><strong>Nome:</strong> {nomeUsuario}</p>
                <p className={styles.pdados}><strong>Email:</strong> {user?.email}</p>
                <p className={styles.pdados}><strong>Tipo de Usuário:</strong> {role}</p>
              </div>
              <div className="modal-footer d-flex justify-content-between">
              <button className="btn btn-outline-primary" onClick={() => { fecharPerfilModal();
                  let rotaAtualizar = "/colaborador/AtualizarDados"; 
                  if (role === "admin") rotaAtualizar = "/adm/AtualizarDados";
                  else if (role === "recebedor") rotaAtualizar = "/recebedor/AtualizarDados";
                  navigate(rotaAtualizar);
                   }}>
                   Atualizar dados
              </button>

                <button className="btn btn-secondary" onClick={fecharPerfilModal}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Header;
