import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Gera um PDF com a lista de doações (dados já carregados no front)
 * @param {Array} doacoes - Lista de doações vinda do backend
 */
export const gerarPDFDoacoes = async (doacoes = []) => {
    try {
        if (!doacoes || doacoes.length === 0) {
            alert("Nenhuma doação disponível para exportar.");
            return;
        }

        const docPDF = new jsPDF();

        // 🔹 Cabeçalho
        docPDF.setFontSize(16);
        docPDF.text("Relatório de Doações", 14, 20);

        // 🔹 Define colunas e linhas
        const colunas = ["Nome do Colaborador", "Produto", "Quantidade", "Validade"];
        const linhas = doacoes.map((d) => [
            d.nomeColaborador ?? d.colaboradorNome ?? "Desconhecido",
            d.nome ?? "---",
            d.quantidade ?? "---",
            d.validade ? new Date(d.validade).toLocaleDateString("pt-BR") : "---",
        ]);


        // 🔹 Cria tabela
        autoTable(docPDF, {
            startY: 30,
            head: [colunas],
            body: linhas,
            styles: {
                fontSize: 10,
                halign: "center",
            },
            headStyles: {
                fillColor: [165, 0, 0], // vermelho do tema Colheita Solidária 🌱
                textColor: 255,
            },
        });

        // 🔹 Salva o arquivo
        docPDF.save("relatorio_doacoes.pdf");
    } catch (error) {
        console.error("Erro ao gerar PDF:", error);
    }
};
