declare namespace Express {
    interface Request {
        uid: string;
        role: string;
        email: string;
    }
}