import 'reflect-metadata';
import { container } from 'tsyringe';
import { UserRepository } from '../application/ports/UserRepository';
import { TokenService } from '../application/ports/TokenService';
import { PgUserRepository } from '../infrastructure/db/PgUserRepository';
import { JwtTokenService } from '../infrastructure/jwt/JwtTokenService';
import { RegisterUser } from '../application/usecases/RegisterUser';
import { LoginUser } from '../application/usecases/LoginUser';
import { AuthController } from '../interfaces/controllers/AuthController';

// Repositorios y servicios
container.register<UserRepository>('UserRepository', { useClass: PgUserRepository });
container.register<TokenService>('TokenService', { useClass: JwtTokenService });

// Casos de uso
container.register('RegisterUser', { useClass: RegisterUser });
container.register('LoginUser', { useClass: LoginUser });

// Controlador
container.register(AuthController, { useClass: AuthController });

export { container };