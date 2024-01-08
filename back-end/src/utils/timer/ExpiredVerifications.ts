import prismaClient from '../../prisma';

async function ExpiredVerifications() {
    const codeExpiration = 5 * 60 * 1000;
    const expirationDate = new Date(new Date().getTime() - codeExpiration);
  
    await prismaClient.user.deleteMany({
      where: {
        emailVerified: false,
        verificationCodeSentAt: {
          lt: expirationDate
        }
      }
    });
}

export default ExpiredVerifications