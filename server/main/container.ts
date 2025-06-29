import 'reflect-metadata';
import { container } from 'tsyringe';
import { UserRepository } from '../domain/repositories/UserRepository';
import { TokenService } from '../domain/repositories/TokenService';
import { PgUserRepository } from '../infrastructure/db/PgUserRepository';
import { JwtTokenService } from '../infrastructure/jwt/JwtTokenService';
import { RegisterUser } from '../application/usecases/RegisterUser';
import { LoginUser } from '../application/usecases/LoginUser';
import { PgTariffRepository } from '../infrastructure/db/PgTariffRepository';
import { TariffRepository } from '../../server/domain/repositories/TariffRepository';
import { Tariff } from '../domain/entities/Tariff';
import { CalculateQuote } from '../application/usecases/CalculateQuote';

// Controladores
import { QuoteController } from '../interfaces/controllers/QuoteController';
import { AuthController } from '../interfaces/controllers/AuthController';

// Repositorios y servicios
container.register<UserRepository>('UserRepository', { useClass: PgUserRepository });
container.register<TokenService>('TokenService', { useClass: JwtTokenService });
container.register<TariffRepository>('TariffRepository', { useClass: PgTariffRepository });

// Casos de uso
container.register('RegisterUser', { useClass: RegisterUser });
container.register('LoginUser', { useClass: LoginUser });
container.register('CalculateQuote', { useClass: CalculateQuote });

// Controlador
container.register(AuthController, { useClass: AuthController });
container.register(QuoteController, { useClass: QuoteController });

export { container };