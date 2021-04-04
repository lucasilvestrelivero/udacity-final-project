/**
 * A payload of a JWT token
 */
export interface JwtPayload {
  id: string;
  expirationTime: number;
  creationDate: Date;
}
