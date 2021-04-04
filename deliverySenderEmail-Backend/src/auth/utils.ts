import { decode, sign } from 'jsonwebtoken'

import { JwtPayload } from './JwtPayload'

export function parseUserId(jwtToken: string): string {
  const decodedJwt = decode(jwtToken) as JwtPayload
  return decodedJwt.id
}

export function generateToken(userId: string): string {
    const secretKey = process.env.JWT_SECRET_KEY;
    const expirationInSeconds =  60 * 120 //minutes you want
    const payload: JwtPayload = {
        id: userId,
        expirationTime: expirationInSeconds,
        creationDate: new Date()
    }
    return sign(payload, secretKey, {
        expiresIn: expirationInSeconds,
        algorithm: 'HS512'
    });
}
