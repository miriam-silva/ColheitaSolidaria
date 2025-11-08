import api from "../services/Api";

const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Usuário não autenticado");
  return token;
};

export const registrarDoacao = async (dados) => {
  try {
    const token = getToken();

    const response = await api.post(
      "/Doacao",
      {
        Nome: dados.nome,
        Descricao: dados.descricao,
        Quantidade: dados.quantidade,
        Validade: dados.validade,
        ImagemUrl: dados.imagemUrl,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Erro ao registrar doação:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const buscarDoacoesPorColaborador = async (usuarioId) => {
  try {
    const token = getToken();

    const response = await api.get(`/Doacao/Colaborador/${usuarioId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data || [];
  } catch (error) {
    if (error.response?.status === 401) {
      console.warn("Token inválido ou expirado. Faça login novamente.");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    }
    console.error(
      "Erro ao buscar doações:",
      error.response?.data || error.message
    );
    return [];
  }
};

export const buscarTodasDoacoes = async () => {
  try {
    const token = getToken();

    const response = await api.get("/Doacao", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data || [];
  } catch (error) {
    console.error(
      "Erro ao buscar todas as doações:",
      error.response?.data || error.message
    );
    return [];
  }
};

export const atualizarDoacao = async (id, dados) => {
  try {
    const token = getToken();

    const response = await api.put(`/Doacao/${id}`, dados, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Erro ao atualizar doação:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deletarDoacao = async (id) => {
  try {
    const token = getToken();

    await api.delete(`/Doacao/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return true;
  } catch (error) {
    console.error(
      "Erro ao deletar doação:",
      error.response?.data || error.message
    );
    return false;
  }
};
