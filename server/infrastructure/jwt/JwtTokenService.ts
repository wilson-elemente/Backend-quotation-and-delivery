import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { TokenService } from '../../application/ports/TokenService';

dotenv.config();

export class JwtTokenService implements TokenService {
  private readonly secret: Secret = process.env.JWT_SECRET!;
  private readonly options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
  };

  sign(payload: object): string {
    return jwt.sign(payload, this.secret, this.options);
  }
}