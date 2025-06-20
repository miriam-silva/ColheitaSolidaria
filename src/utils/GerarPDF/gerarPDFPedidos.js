import {jsPDF} from 'jspdf'
import autoTable from 'jspdf-autotable'
import {collection, getDocs, doc, getDoc} from 'firebase/firestore'
import {db} from '../../firebase/config'

export const gerarPDFPedidos = async () => {
    try{
        const pedidosref = collection(db, 'solicitacoes')
        const snapshot = await getDocs(pedidosref)

        const dadosPedidos =  await Promise.all(
        snapshot.docs.map(async (docPedido) => {
            const pedidoData = docPedido.data()

            let nomeUsuario = 'Usuário não encontrado'
            if (pedidoData.usuarioId){
                const userRef = doc(db, 'users', pedidoData.usuarioId)
                const userSnap = await getDoc(userRef)
                if (userSnap.exists()){
                    nomeUsuario = userSnap.data().nome
                }
            }

            let doacaoDescricao = 'Doação não encontrada'
            if (pedidoData.doacaoId) {
                const doacaoRef = doc(db, 'doacoes', pedidoData.doacaoId)
                const doacaoSnap = await getDoc(doacaoRef)
                if (doacaoSnap.exists()){
                    const doacaoData = doacaoSnap.data()
                    const nomeProduto = doacaoData.produto || 'um item disponível'
                    doacaoDescricao = `Solicitou um pouco de ${nomeProduto}`
                }
            }

        return {
            nomeUsuario,
            pedido: doacaoDescricao,
            status: pedidoData.status || 'pendente',
            familiares: pedidoData.familiares || 'não informado',
        }
    })
)

        const docPDF = new jsPDF()
        docPDF.text('Relatório de Pedidos', 14, 20)

        const colunas = ['Usuário', 'Pedido', 'Status', 'Familiares']
        const linhas = dadosPedidos.map((pedido) => [
            pedido.nomeUsuario,
            pedido.pedido,
            pedido.status,
            pedido.familiares,
        ])

        autoTable(docPDF, {
            startY: 30,
            head: [colunas],
            body: linhas,
            styles: {fontSize: 10},
            headStyles: {fillColor: [165, 0, 0]}
        })

        docPDF.save('relatorio_pedidos.pdf')
    } catch (error) {
        console.error('Erro ao gerar PDF:', error)
    }
}

