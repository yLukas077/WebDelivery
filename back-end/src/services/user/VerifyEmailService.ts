import prismaClient from '../../prisma';

interface VerifyEmailRequest {
    email: string;
    code: string;
}

class VerifyEmailService {
    async execute({ email, code }: VerifyEmailRequest): Promise<void> {
        const user = await prismaClient.user.findUnique({
            where: { email }
        });

        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

        if (user.verificationCode !== code) {
            throw new Error('Código de verificação inválido.');
        }

        await prismaClient.user.update({
            where: { email },
            data: { emailVerified: true }
        });
    }
}

export { VerifyEmailService };
