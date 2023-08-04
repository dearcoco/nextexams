import jwt from 'jsonwebtoken';

export function generateToken(payload: {}): string {
    return jwt.sign(payload, process.env.TOKEN_SECRET!, {expiresIn: '1d'});
}
/**
 * @param token 
 * @returns {name, email, password, iat, exp}
 */
export function verifyToken(token: string): any {
    const res = jwt.verify(token, process.env.TOKEN_SECRET!);
    return res;
}