interface Response {
    clearCookie: (name: string) => void;
}

class LogoutService {
    execute(res: Response) {
        res.clearCookie('token');
        return { message: 'Logout completed successfully' };
    }
}

export { LogoutService };
