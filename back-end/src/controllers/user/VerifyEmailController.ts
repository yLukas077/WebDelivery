import { Request, Response } from 'express';
import { VerifyEmailService } from '../../services/user/VerifyEmailService';

class VerifyEmailController {
    async handle(req: Request, res: Response) {
        const { email, code } = req.body;

        const verifyEmailService = new VerifyEmailService();

        try {
            await verifyEmailService.execute({ email, code });
            return res.status(200).json({ message: 'E-mail verificado com sucesso!' });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { VerifyEmailController };