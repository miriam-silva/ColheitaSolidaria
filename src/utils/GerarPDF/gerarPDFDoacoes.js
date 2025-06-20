import {jsPDF} from 'jspdf'
import autoTable from 'jspdf-autotable'
import {collection, getDocs, doc, getDoc} from 'firebase/firestore'
import {db} from '../../firebase/config'

export const gerarPDFDoacoes = async () => {
    try{
        const doacoesRef = collection(db, 'doacoes')
        const snapshot = await getDocs(doacoesRef)

        const dadosComNomes =  await Promise.all(
        snapshot.docs.map(async (docItem) => {
            const data = docItem.data()

            let nomeColaborador = 'Usuário não encontrado'
            if (data.colaboradorId){
                const userRef = doc(db, 'users', data.colaboradorId)
                const userSnap = await getDoc(userRef)
                if (userSnap.exists()){
                    nomeColaborador = userSnap.data().nome
                }
            }

        return {
            nomeColaborador,
            produto: data.produto || '---',
            quantidade: data.quantidade || '---',
            data: data.dataRegistro?.toDate().toLocaleDateString('pt-BR') || '---',
        }
    })
)

        const docPDF = new jsPDF()
        docPDF.text('Relatório de Doações', 14, 20)

        const colunas = ['Nome do Doador', 'Produto', 'Quantidade', 'Data']
        const linhas = dadosComNomes.map((d) => [
            d.nomeColaborador,
            d.produto,
            d.quantidade,
            d.data,
        ])

        autoTable(docPDF, {
            startY: 30,
            head: [colunas],
            body: linhas,
        })

        docPDF.save('relatorio_doacoes.pdf')
    } catch (error) {
        console.error('Erro ao gerar PDF:', error)
    }
}

