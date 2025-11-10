import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const gerarPDFUsuarios = (usuarios = []) => {
  try {
    const dadosUsuarios = usuarios
      .filter((user) => user.role?.toLowerCase() !== "admin")
      .map((user) => {
        let dataFormatada = "---";
        if (user.dataNascimento) {
          try {
            const data = new Date(user.dataNascimento);
            if (!isNaN(data.getTime())) {
              const dia = String(data.getDate()).padStart(2, "0");
              const mes = String(data.getMonth() + 1).padStart(2, "0");
              const ano = data.getFullYear();
              dataFormatada = `${dia}/${mes}/${ano}`;
            }
          } catch {
            dataFormatada = "---";
          }
        }

        return {
          nome: user.nomeCompleto || user.nome || "---",
          email: user.email || "---",
          telefone: user.telefone || "---",
          role: user.role || "---",
          dataNascimento: dataFormatada,
        };
      });

    if (dadosUsuarios.length === 0) {
      alert("Nenhum usuário disponível para exportar.");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("Relatório de Usuários", 14, 20);
    doc.setFontSize(10);
    const dataAtual = new Date().toLocaleDateString("pt-BR");
    doc.text(`Gerado em: ${dataAtual}`, 14, 27);

    const colunas = ["Nome", "Email", "Telefone", "Tipo", "Data Nasc."];
    const linhas = dadosUsuarios.map((u) => [
      u.nome,
      u.email,
      u.telefone,
      u.role,
      u.dataNascimento,
    ]);

    autoTable(doc, {
      startY: 35,
      head: [colunas],
      body: linhas,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [165, 0, 0] },
    });

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(
        `Página ${i} de ${pageCount}`,
        doc.internal.pageSize.getWidth() - 40,
        doc.internal.pageSize.getHeight() - 10
      );
    }

    doc.save("relatorio_usuarios.pdf");
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    alert("Erro ao gerar o relatório de usuários.");
  }
};
