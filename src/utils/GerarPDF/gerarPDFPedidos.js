import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const gerarPDFPedidos = async (pedidos) => {
  try {
    const doc = new jsPDF();
    doc.text("Relatório de Pedidos", 14, 20);

    const colunas = ["Usuário", "Produto", "Descrição", "Status"];
    const linhas = pedidos.map((p) => [
      p.recebedorNome || "Desconhecido",
      p.doacaoNome || "Item não identificado",
      p.doacaoDescricao || "Sem descrição",
      p.status || "pendente",
    ]);

    autoTable(doc, {
      startY: 30,
      head: [colunas],
      body: linhas,
      headStyles: { fillColor: [165, 0, 0] },
      styles: { fontSize: 10 },
      didParseCell: (data) => {
        if (data.section === "body" && data.column.index === 3) {
          if (data.cell.raw === "Aprovado") data.cell.styles.textColor = [0, 128, 0];
          if (data.cell.raw === "Protelado") data.cell.styles.textColor = [255, 165, 0];
          if (data.cell.raw === "pendente") data.cell.styles.textColor = [255, 0, 0];
        }
      },
    });

    doc.save("relatorio_pedidos.pdf");
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
  }
};
