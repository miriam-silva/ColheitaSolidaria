import api from "../services/api";
import { supabase } from "../supabase/supabaseClient";

// 🔹 Registrar doação com imagem (multipart/form-data)
// 🔹 Registrar doação com imagem (multipart/form-data)
export const registrarDoacao = async (dados) => {
  try {
    const token = localStorage.getItem("token");

    console.log("📦 Enviando ao backend:", {
      Nome: dados.nome,
      Descricao: dados.descricao,
      Quantidade: dados.quantidade,
      Validade: dados.validade,
      ImagemUrl: dados.imagemUrl,
    });

    const response = await api.post(
      "/Doacao",
      {
        Nome: dados.nome,
        Descricao: dados.descricao,
        Quantidade: dados.quantidade,
        Validade: dados.validade,
        ImagemUrl: dados.imagemUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao registrar doação:", error.response?.data || error.message);
    throw error;
  }
};




// 🔹 Buscar doações pelo ID do colaborador (se existir no backend)
export const buscarDoacoesPorColaborador = async (colaboradorId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(`/Doacao/Colaborador/${colaboradorId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data || [];
  } catch (error) {
    console.error("Erro ao buscar doações do colaborador:", error);
    return [];
  }
};

// 🔹 Atualizar doação (também com imagem caso envie outra)
export const atualizarDoacao = async (id, dados) => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("Nome", dados.nome);
    formData.append("Descricao", dados.descricao);
    formData.append("Quantidade", dados.quantidade);
    formData.append("Validade", dados.validade);

    if (dados.novaImagem) {
      formData.append("Imagem", dados.novaImagem);
    }

    const response = await api.put(`/Doacao/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar doação:", error);
    throw error;
  }
};

// 🔹 Deletar doação
export const deletarDoacao = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await api.delete(`/Doacao/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return true;
  } catch (error) {
    console.error("Erro ao deletar doação:", error);
    return false;
  }
};
