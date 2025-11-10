import React, { useEffect, useState } from "react";
import api from "../../../services/Api";
import styles from "./GerenciarUsuarios.module.css";
import { useNavigate } from "react-router-dom";
import PainelMetrico from "../Painel/PainelMetrico";
import { gerarPDFUsuarios } from "../../../utils/GerarPDF/gerarPDFUsuarios";

export default function GerenciarUsuarios() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  useEffect(() => {
    const buscarUsuarios = async () => {
      try {
        const response = await api.get("/Admin/usuarios-gerais");
        const usuariosComIdsUnicos = response.data.map((usuario, index) => ({
          ...usuario,
          uniqueId: `${usuario.id}-${usuario.email}-${index}`,
        }));
        setUsuarios(usuariosComIdsUnicos);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    buscarUsuarios();
  }, []);

  const handleEditar = (usuario) => {
    if (usuario.role === "Admin") return;

    if (editandoId && editandoId !== usuario.uniqueId) {
      alert("Finalize a edição atual antes de editar outro usuário.");
      return;
    }

    if (editandoId === usuario.uniqueId) {
      handleCancelar(usuario.uniqueId);
      return;
    }

    setEditandoId(usuario.uniqueId);
  };

  const handleChangeRole = (uniqueId, novoValor) => {
    if (editandoId !== uniqueId) return;
    setUsuarios((prev) =>
      prev.map((user) =>
        user.uniqueId === uniqueId ? { ...user, roleTemp: novoValor } : user
      )
    );
  };

  const handleSalvar = async (uniqueId) => {
  const usuario = usuarios.find((u) => u.uniqueId === uniqueId);
  const novoRole = usuario.roleTemp || usuario.role;

  // 🔹 Se for uma mudança de Colaborador → Recebedor, pede confirmação especial
  if (
    usuario.role.toLowerCase() === "colaborador" &&
    novoRole.toLowerCase() === "recebedor"
  ) {
    const confirmacao = window.confirm(
      `⚠️ Tem certeza que deseja mudar o cargo de "${usuario.email}"?\n\n` +
        "Se confirmar, TODO o histórico de doações e as doações disponíveis para solicitação serão apagadas!"
    );
    if (!confirmacao) return; // cancela se o admin desistir
  }

  try {
    await api.put("/Admin/alterar-role", {
      IdUsuario: usuario.id,
      TipoUsuario: usuario.role.toLowerCase(),
      NovoRole: novoRole,
    });

    setUsuarios((prev) =>
      prev.map((u) =>
        u.uniqueId === uniqueId
          ? { ...u, role: novoRole, roleTemp: undefined }
          : u
      )
    );
    setEditandoId(null);

    // ✅ Mostra mensagem de sucesso
    setMensagemSucesso(
      `Cargo do usuário ${usuario.nomeCompleto} atualizado com sucesso!`
    );
    setTimeout(() => setMensagemSucesso(""), 3000);
  } catch (error) {
    console.error("Erro ao alterar cargo:", error);
    alert("Erro ao salvar alterações.");
  }
};


  const handleCancelar = (uniqueId) => {
    setUsuarios((prev) =>
      prev.map((u) => (u.uniqueId === uniqueId ? { ...u, roleTemp: undefined } : u))
    );
    setEditandoId(null);
  };

  const handleExcluir = async (uniqueId) => {
    const usuario = usuarios.find((u) => u.uniqueId === uniqueId);
    if (usuario.role === "Admin") {
      alert("Você não pode excluir outro administrador.");
      return;
    }

    if (editandoId === uniqueId) {
      setEditandoId(null);
    }

    const confirmacao = window.confirm("Deseja realmente excluir este usuário?");
    if (!confirmacao) return;

    try {
      await api.delete(`/${usuario.role.toLowerCase()}/${usuario.id}`);
      setUsuarios((prev) => prev.filter((u) => u.uniqueId !== uniqueId));
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  const handleExportarPDF = () => gerarPDFUsuarios(usuarios);

  return (
    <div>
      <nav className={`navbar navbar-expand-sm navbar-light box-shadow mb-1 ${styles.navbarra}`}>
        <div className="container-fluid">
          <h3>Gerenciar Usuários</h3>
        </div>
      </nav>

      <div className={styles.container}>
        {mensagemSucesso && (
          <div className="alert alert-success text-center" role="alert">
            {mensagemSucesso}
          </div>
        )}

        <h4 className="text-center">Lista de usuários</h4>

        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Email</th>
                <th>Nome</th>
                <th>Cargo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.uniqueId}>
                  <td>{usuario.email}</td>
                  <td>{usuario.nomeCompleto}</td>
                  <td>
                    {editandoId === usuario.uniqueId ? (
                      <select
                        className="form-select form-select-sm"
                        value={usuario.roleTemp ?? usuario.role}
                        onChange={(e) => handleChangeRole(usuario.uniqueId, e.target.value)}
                      >
                        <option value="Colaborador">Colaborador</option>
                        <option value="Recebedor">Recebedor</option>
                      </select>
                    ) : (
                      usuario.role
                    )}
                  </td>
                  <td>
                    {usuario.role === "Admin" ? (
                      <span className="text-muted">Ações não permitidas</span>
                    ) : editandoId === usuario.uniqueId ? (
                      <>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleSalvar(usuario.uniqueId)}
                        >
                          Salvar
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleCancelar(usuario.uniqueId)}
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() => handleEditar(usuario)}
                          disabled={editandoId !== null}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleExcluir(usuario.uniqueId)}
                          disabled={editandoId !== null}
                        >
                          Excluir
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`mt-5 ${styles.container}`}>
        <PainelMetrico usuarios={usuarios} />
      </div>

      <div className={`${styles.exportar_container}`}>
        <button
          className={`btn btn-primary ${styles.exportar_button}`}
          onClick={handleExportarPDF}
        >
          Exportar PDF Users
        </button>
      </div>

      <div className={styles.voltar_container}>
        <button
          className={styles.voltar_button}
          onClick={() => navigate("/InicialAdministrador")}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
