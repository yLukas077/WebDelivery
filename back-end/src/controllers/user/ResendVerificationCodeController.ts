import { Request, Response } from 'express';
import { ResendVerificationCodeService } from '../../services/user/ResendVerificationCodeService';

class ResendVerificationCodeController {
    async handle(req: Request, res: Response) {
        const { email } = req.body;
        const resendVerificationCodeService = new ResendVerificationCodeService();

        try {
            await resendVerificationCodeService.execute(email);
            return res.status(200).json({ message: 'Novo código de verificação enviado.' });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { ResendVerificationCodeController };