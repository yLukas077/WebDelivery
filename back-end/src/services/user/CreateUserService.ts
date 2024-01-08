import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';
import { EmailAuth } from '../../utils/auths/EmailAuth';

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

function generateRandomCode() {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class CreateUserService {
    async execute({name, email, password}: UserRequest) {
        if (!email) {
            throw new Error('Email incorrect');
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (userAlreadyExists) {
            throw new Error('User already exists');
        }

        const passwordHash = await hash(password, 8);
        const verificationCode = generateRandomCode().toString();

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
                verificationCode: verificationCode,
                verificationCodeSentAt: new Date()
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        const emailService = new EmailAuth();
        await emailService.sendVerificationCode(email, verificationCode);

        return user;
    }
}

export { CreateUserService };
