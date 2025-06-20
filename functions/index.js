const functions = require("firebase-functions")
const logger = require("firebase-functions/logger");
const nodemailer = require("nodemailer");

async function createTestTransporter() {
    let testAccount = await nodemailer.createTestAccount()

    return nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        }
    })
}

const gmailEmail = functions.config().email?.user;
const gmailPassword = functions.config().email?.pass;

const gmailTransporter = gmailEmail && gmailPassword ?
    nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: gmailEmail,
        pass: gmailPassword,
    }
}) : null

exports.helloWorld = functions.https.onRequest((req, res) => {
    logger.info("Hello logs!", {structuredData: true})
    res.send("Hello from Firebase!")
})

exports.sendConfirmationEmail = functions.https.onCall(async (data, context) => {
    console.log("FUNCTIONS_EMULATOR:", process.env.FUNCTIONS_EMULATOR)
    const email = data.email
    const name = data.name || "Cliente"

    if (!email){
        return {success: false, message: "E-mail não fornecido"}
    }

    const mailOptions = {
        from: process.env.FUNCTIONS_EMULATOR ? 'test@ethereal.email' : gmailEmail,
        to: email,
        subject: "Confirmação de cadastro",
        text: `Olá ${name}, seu cadastro foi confirmado! Obrigada por se registrar.`,
    }

    try {
        let transporter

        if (process.env.FUNCTIONS_EMULATOR) {
            transporter = await createTestTransporter()
            logger.info("Usando Ethereal (teste local) para enviar email")
        } else if (gmailTransporter) {
            transporter = gmailTransporter
            logger.info("Usando Gmail para enviar email")
        } else {
            throw new Error ("Nenhum transportador de email configurado.")
        }

        let info = await transporter.sendMail(mailOptions)

        logger.info(`E-mail enviado para ${email}`)
        console.info(`E-mail enviado para ${email}`)

        if (process.env.FUNCTIONS_EMULATOR){
            const previewUrl = nodemailer.getTestMessageUrl(info)
            console.log("Preview URL:", previewUrl)
        }

        return {success: true, message: "E-mail enviado com sucesso!"}
     } catch (error) {
        logger.error("Erro ao enviar e-mail:", error)
        console.error("Erro ao enviar e-mail:", error)
        return {success: false, message: "Erro ao enviar e-mail."}
    }
})