import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";
import {app} from "../firebase/config"

const functions = getFunctions(app)

if (window.location.hostname === "localhost"){
    connectFunctionsEmulator(functions, "localhost", 5001)
}

/**
* @param {string} email - email do destinatário
* @param {string} name - nome do destinátario
* @returns {Promise<object>} resultado da função
*/

export async function enviarEmailConfirmacao(email, name) {
    const sendConfirmationEmail = httpsCallable(functions, "sendConfirmationEmail")
    try{
        const result = await sendConfirmationEmail({email, name})
        return result.data
    } catch (error) {
        console.error("Erro ao enviar e-mail de confirmação", error)
        throw error
    }
}