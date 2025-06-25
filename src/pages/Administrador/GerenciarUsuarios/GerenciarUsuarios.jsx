import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { app } from "../../../firebase/config";
import styles from "./GerenciarUsuarios.module.css";

const db = getFirestore(app);

export default function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(null);
  const [novoRole, setNovoRole] = useState("");

  useEffect(() => {
    const buscarUsuarios = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsuarios(lista);
    };

    buscarUsuarios();
  }, []);

  const handleEditar = (id, roleAtual) => {
    setEditando(id);
    setNovoRole(roleAtual);
  };

  const handleSalvar = async (id) => {
    const usuarioRef = doc(db, "users", id);
    await updateDoc(usuarioRef, { role: novoRole });
    setUsuarios((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, role: novoRole } : user
      )
    );
    setEditando(null);
  };

  const handleExcluir = async (id) => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este usuário?");
    if (confirmacao) {
      await deleteDoc(doc(db, "users", id));
      setUsuarios((prev) => prev.filter((user) => user.id !== id));
    }
  };

  return (
    <div className={styles.container}>
      <h2>Gerenciar Usuários</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Email</th>
            <th>Nome</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.email}</td>
              <td>{usuario.displayName || "-"}</td>
              <td>
                {editando === usuario.id ? (
                  <select
                    value={novoRole}
                    onChange={(e) => setNovoRole(e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="colaborador">Colaborador</option>
                    <option value="recebedor">Recebedor</option>
                  </select>
                ) : (
                  usuario.role
                )}
              </td>
              <td>
                {editando === usuario.id ? (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleSalvar(usuario.id)}
                    >
                      Salvar
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditando(null)}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEditar(usuario.id, usuario.role)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleExcluir(usuario.id)}
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
  );
}
