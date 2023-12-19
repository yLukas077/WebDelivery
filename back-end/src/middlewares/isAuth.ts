import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface PayLoad {
    sub: string;
}

export function isAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token; 

    if (!token) {
        return res.status(401).end();
    }

    try {
        const { sub } = verify(token, process.env.JWT_SECRET as string) as PayLoad;

        (req as any).user_id = sub;

        return next();
    } catch (err) {
        return res.status(401).end();
    }
}
