import { Response } from 'express';
import prismaClient from '../../prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface LoginRequest {
    email: string;
    password: string;
}

class LoginUserService {
    async execute({ email, password }: LoginRequest, res: Response) {
        const user = await prismaClient.user.findFirst({
            where: { email }
        });

        if (!user) {
            throw new Error('User or password incorrect');
        }

        if (!user.emailVerified) {
            throw new Error('E-mail not verified');
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('User or password incorrect');
        }

        const token = sign(
            { name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { subject: user.id, expiresIn: '30d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict'
        });

        return { id: user.id, name: user.name, email: user.email };
    }
}

export { LoginUserService };
