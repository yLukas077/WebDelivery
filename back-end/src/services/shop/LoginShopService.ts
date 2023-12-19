import { Response } from 'express';
import prismaClient from '../../prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface LoginRequest {
    cnpj: string;
    email: string;
    password: string;
}

class LoginShopService {
    async execute({ cnpj, email, password }: LoginRequest, res: Response) {
        const shop = await prismaClient.store.findUnique({
            where: { cnpj, email }
        });

        if (!shop) {
            throw new Error('Shop, CNPJ, or password incorrect');
        }

        const passwordMatch = await compare(password, shop.password);

        if (!passwordMatch) {
            throw new Error('Shop, CNPJ, or password incorrect');
        }

        const token = sign(
            { name: shop.name, email: shop.email },
            process.env.JWT_SECRET,
            { subject: shop.id, expiresIn: '30d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development',
            sameSite: 'strict'
        });

        return { id: shop.id, name: shop.name, email: shop.email };
    }
}

export { LoginShopService };
