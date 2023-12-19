import { Request, Response } from 'express';
import { LoginUserService } from '../../services/user/LoginUserService';

class LoginUserController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        const loginUserService = new LoginUserService();

        try {
            await loginUserService.execute({ email, password }, res);
            return res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { LoginUserController };
