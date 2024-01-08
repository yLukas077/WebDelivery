import prismaClient from '../../prisma';
import { EmailAuth } from '../../utils/auths/EmailAuth';

class ResendVerificationCodeService {
    private emailAuth: EmailAuth;

    constructor() {
        this.emailAuth = new EmailAuth();
    }

    async execute(email: string): Promise<void> {
        const user = await prismaClient.user.findUnique({
            where: { email }
        });

        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

        const newCode = this.generateRandomCode();
        await prismaClient.user.update({
            where: { email },
            data: {
                verificationCode: newCode,
                verificationCodeSentAt: new Date()
            }
        });

        await this.emailAuth.sendVerificationCode(email, newCode);
    }

    private generateRandomCode(): string {
        const min = 100000;
        const max = 999999;
        return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
    }
}

export { ResendVerificationCodeService };
