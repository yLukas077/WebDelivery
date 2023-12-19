import { Request, Response } from 'express';
import { LogoutService } from '../../services/any/LogoutService';

class LogoutController {
    async handle(req: Request, res: Response) {
        const logoutService = new LogoutService();
        const message = logoutService.execute(res);
        return res.json(message);
    }
}

export { LogoutController };
