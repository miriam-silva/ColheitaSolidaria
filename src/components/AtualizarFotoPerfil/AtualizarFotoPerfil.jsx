import React, { useState, useRef } from "react";
import { usePerfil } from "../hooks/usePerfil";
import { toast } from "react-toastify";

const AtualizarFotoPerfil = () => {
  const { uploadFotoPerfil } = usePerfil();
  const [imagem, setImagem] = useState(null);
  const inputFileRef = useRef(null);

  const handleUpload = async () => {
    if (!imagem) {
      toast.error("Selecione uma imagem primeiro!");
      return;
    }

    const userEmail = localStorage.getItem("email");
    if (!userEmail) {
      toast.error("Usuário não autenticado.");
      return;
    }

    const resultado = await uploadFotoPerfil(imagem, userEmail);

    if (resultado.sucesso) {
      toast.success("Foto de perfil atualizada com sucesso!");
      console.log("URL da nova foto:", resultado.fotoUrl);
    } else {
      toast.error(`Erro: ${resultado.mensagem}`);
    }

    if (inputFileRef.current) inputFileRef.current.value = null;
    setImagem(null);
  };

  return (
    <div>
      <h3>Atualizar Foto de Perfil</h3>
      <input
        type="file"
        accept="image/*"
        ref={inputFileRef}
        onChange={(e) => setImagem(e.target.files[0])}
      />
      <button onClick={handleUpload}>Enviar Foto</button>
    </div>
  );
};

export default AtualizarFotoPerfil;
