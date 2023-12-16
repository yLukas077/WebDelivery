import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';
import { ValidateEmail } from '../../utils/validators/ValidatorEmail';
import { ValidateCNPJ } from '../../utils/validators/ValidatorCnpj';
import { ValidatePhone } from '../../utils/validators/ValidatorPhone';

interface ShopRequest {
    name: string;
    email: string;
    password: string;
    description: string;
    address: string;
    cnpj: string;
    phone: string;
    type: string;
}

class CreateShopService {
    async execute({ name, email, password, description, address, cnpj, phone, type }: ShopRequest) {
        if (!ValidateEmail(email)) {
            throw new Error('Invalid email format');
        }

        if (!ValidateCNPJ(cnpj)) {
            throw new Error('Invalid CNPJ format');
        }

        if (!ValidatePhone(phone)) {
            throw new Error('Invalid phone format');
        }

        try {
            const passwordHash = await hash(password, 8);

            const shop = await prismaClient.store.create({
                data: {
                    name: name,
                    email: email,
                    password: passwordHash,
                    description: description,
                    address: address,
                    cnpj: cnpj,
                    phone: phone,
                    type: type,
                }, select: {
                    id: true,
                    name: true,
                    email: true, 
                    description: true,
                    address: true,
                    cnpj: true,
                    phone: true,
                    type: true
                }
            });

            return shop;
        } catch (error) {
            if (error.code === 'P2002') {
                if (error.meta?.target.includes('email')) {
                    throw new Error('The email provided is already in use by another store.');
                } else if (error.meta?.target.includes('cnpj')) {
                    throw new Error('The CNPJ provided is already in use by another store.');
                }
            }
            throw error;
        }
    }
}

export { CreateShopService };
