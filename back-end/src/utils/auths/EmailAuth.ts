import nodemailer from 'nodemailer';

class EmailAuth {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    async sendVerificationCode(email: string, code: string) {
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Confirme seu email na ThisFood!",
            text: `Seu código de verificação é: ${code}`
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email enviado: ' + info.response);
        } catch (error) {
            console.error('Erro ao enviar email:', error);
            throw new Error('Erro ao enviar o código de verificação.');
        }
    }
}

export { EmailAuth };
