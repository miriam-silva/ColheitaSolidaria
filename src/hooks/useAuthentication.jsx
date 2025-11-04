import { useState } from "react";
import api from "../services/Api"; 

const useAuthentication = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // -------------------- Cadastro do Recebedor --------------------
  const registerRecebedor = async (recebedorData) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const response = await api.post("/recebedor/register", recebedorData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (err) {
      console.error("Erro ao cadastrar recebedor:", err);
      setError(err.response?.data || "Erro ao cadastrar recebedor.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Login do Recebedor --------------------
  const loginRecebedor = async ({ email, senha }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/auth/recebedor/login", { email, senha });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("tipoUsuario", "recebedor");

      return response.data;
    } catch (err) {
      console.error("Erro no login do recebedor:", err);
      setError(err.response?.data || "Credenciais inválidas.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Logout --------------------
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tipoUsuario");
    window.location.href = "/"; 
  };

  return {
    registerRecebedor,
    loginRecebedor,
    logout, 
    loading,
    error,
  };
};

export default useAuthentication;
