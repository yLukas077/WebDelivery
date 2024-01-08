"use client"

import React, { useEffect, useState, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const RESEND_INTERVAL = 5 * 60;
const CODE_LENGTH = 6;

interface State {
    code: string;
    timer: number;
    isSubmitting: boolean;
}

type Action =
    | { type: 'SET_CODE'; value: string }
    | { type: 'TICK' }
    | { type: 'RESET_TIMER' }
    | { type: 'SET_SUBMITTING'; isSubmitting: boolean };

const initialState: State = {
    code: '',
    timer: RESEND_INTERVAL,
    isSubmitting: false,
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_CODE':
            return { ...state, code: action.value.slice(0, CODE_LENGTH) };
        case 'TICK':
            return { ...state, timer: Math.max(state.timer - 1, 0) };
        case 'RESET_TIMER':
            return { ...state, timer: RESEND_INTERVAL };
        case 'SET_SUBMITTING':
            return { ...state, isSubmitting: action.isSubmitting };
        default:
            return state;
    }
};

const EmailVerifyForm: React.FC = () => {
    const [{ code, timer, isSubmitting }, dispatch] = useReducer(reducer, initialState);
    const [email, setEmail] = useState('');
    const router = useRouter();
    const [error, setError] = useState(false);

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail') || '';
        setEmail(userEmail);

        if (!userEmail) {
            router.push('/userRegister');
        }

        const interval = setInterval(() => dispatch({ type: 'TICK' }), 1000);
        return () => clearInterval(interval);
    }, [router]);

    const handleInputChange = (value: string) => {
        setError(false);
        dispatch({ type: 'SET_CODE', value });
    };

    const formatTime = () => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleSubmit = async () => {
        if (code.length !== CODE_LENGTH) {
            setError(true);
            return;
        }
        dispatch({ type: 'SET_SUBMITTING', isSubmitting: true });
        try {
            const response = await fetch('http://localhost:3333/verifyEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code }),
            });

            if (!response.ok) {
                throw new Error('Falha na verificação do e-mail.');
            }

            toast.success("E-mail verificado com sucesso!");
            localStorage.removeItem('userEmail');
            router.push('/userLogin');
        } catch (error) {
            setError(true);
            toast.error("Falha na verificação do e-mail.");
        } finally {
            dispatch({ type: 'SET_SUBMITTING', isSubmitting: false });
        }
    };

    const handleResendCode = async () => {
        if (timer > 0) return;
        dispatch({ type: 'RESET_TIMER' });
        try {
            const response = await fetch('http://localhost:3333/resendEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Falha ao reenviar código.');
            }

            toast.success("Novo código enviado com sucesso!");
        } catch (error) {
            toast.error("Falha ao reenviar código.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-white shadow-lg rounded-lg">
            <Input
                className={`w-full h-10 text-center text-xl ${error ? 'border-red-500' : 'border-gray-300'}`}
                type="text"
                maxLength={CODE_LENGTH}
                inputMode="numeric"
                value={code}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Código de Verificação"
            />
            {error && (
                <p className="mt-2 text-red-500">
                    Por favor, insira um código válido.
                </p>
            )}
            <Button 
                onClick={handleSubmit} 
                className="mt-4"
                disabled={isSubmitting}
            >
                Verificar
            </Button>
            <Button
                onClick={handleResendCode}
                disabled={timer > 0}
                className={`mt-4 ${timer > 0 ? 'bg-gray-400' : 'bg-purple-600'}`}
            >
                {timer > 0 ? `Reenviar Código (${formatTime()})` : 'Reenviar Código'}
            </Button>
        </div>
    );
};

export default EmailVerifyForm;
