import {jsPDF} from 'jspdf'
import autoTable from 'jspdf-autotable'
import {collection, getDocs, doc, getDoc} from 'firebase/firestore'
import {db} from '../../firebase/config'

export const gerarPDFUsuarios = async () => {
    try{
        const usersRef = collection(db, 'users')
        const snapshot = await getDocs(usersRef)

        const dadosUsuarios =  snapshot.docs
        .map(doc => doc.data())
        .filter(user => user.role !== 'admin')
        .map(user => ({
            nome: user.nome || '---',
            email: user.email || '---',
            telefone: user.telefone || '---',
            role: user.role || '---',
            dataNascimento: user.dataNascimento || '---'
        }))

        const docPDF = new jsPDF()
        docPDF.text('Relatório de Usuários', 14, 20)

        const colunas = ['Nome', 'Email', 'Telefone', 'Tipo', 'Data Nasc.']
        const linhas = dadosUsuarios.map((u) => [
            u.nome,
            u.email,
            u.telefone,
            u.role,
            u.dataNascimento,
        ])

        autoTable(docPDF, {
            startY: 30,
            head: [colunas],
            body: linhas,
            styles: {fontSize: 10},
            headStyles: {fillColor: [165, 0, 0]}
        })

        docPDF.save('relatorio_usuarios.pdf')
    } catch (error) {
        console.error('Erro ao gerar PDF:', error)
    }
}

