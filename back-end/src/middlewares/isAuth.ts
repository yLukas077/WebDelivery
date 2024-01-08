import prismaClient from '../prisma';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface PayLoad {
    sub: string;
}

async function isAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send('Token não fornecido');
    }

    try {
        const { sub } = verify(token, process.env.JWT_SECRET as string) as PayLoad;
        req.user_id = sub;

        const user = await prismaClient.user.findUnique({
            where: { id: sub }
        });

        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }

        if (!user.emailVerified) {
            return res.status(403).send('E-mail não verificado');
        }

        next();
    } catch (err) {
        return res.status(401).send('Token inválido ou expirado');
    }
}

export { isAuth };
