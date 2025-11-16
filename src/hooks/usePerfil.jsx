import { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/Api";
import { supabase } from "../supabase/supabaseClient";

export const usePerfil = () => {
  const [loading, setLoading] = useState(false);

  const uploadFotoPerfil = async (arquivo) => {
    setLoading(true);

    try {
      // Validação: só aceita imagens
      if (!arquivo.type.startsWith("image/")) {
        setLoading(false);
        return { sucesso: false, mensagem: "Por favor, envie uma imagem válida." };
      }

      // Upload no Supabase (bucket 'users')
      const nomeArquivo = `fotoPerfil_${Date.now()}_${arquivo.name}`;
      const { data, error } = await supabase
        .storage
        .from("users")
        .upload(nomeArquivo, arquivo);

      if (error) {
        console.error("Erro Supabase:", error.message);
        toast.error("Erro ao fazer upload da imagem.");
        setLoading(false);
        return { sucesso: false, mensagem: error.message };
      }

      // Gera URL pública da imagem
      const { data: publicUrlData } = supabase
        .storage
        .from("users")
        .getPublicUrl(data.path);

      const fotoUrl = publicUrlData.publicUrl;

      // Envia a URL para o backend
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/Auth/fotoPerfil",
        { fotoUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Atualiza a URL no localStorage
      const novaFotoUrl = response.data.fotoUrl;
      localStorage.setItem("fotoPerfil", novaFotoUrl);

      setLoading(false);
      return {
        sucesso: true,
        mensagem: response.data.message,
        fotoUrl: novaFotoUrl,
      };
    } catch (err) {
      console.error("Erro upload perfil:", err.message);
      setLoading(false);
      return {
        sucesso: false,
        mensagem: "Erro no upload de imagem.",
      };
    }
  };

  return { uploadFotoPerfil, loading };
};
