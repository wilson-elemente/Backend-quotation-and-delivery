import { LoginUserDTO } from '../dtos/LoginUserDTO';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { TokenService } from '../../domain/repositories/TokenService';
import bcrypt from 'bcrypt';
import { DomainError } from '../../domain/errors/DomainError';
import { injectable, inject } from 'tsyringe';

@injectable()
export class LoginUser {
  constructor(
    @inject('UserRepository') private readonly userRepo: UserRepository,
    @inject('TokenService') private readonly tokenService: TokenService
  ) { }

  async execute(dto: LoginUserDTO): Promise<string> {
    const user = await this.userRepo.findByEmail(dto.email);
    if (!user) throw new DomainError('Credenciales inválidas');

    const match = await bcrypt.compare(dto.password, user.passwordHash);
    if (!match) throw new DomainError('Credenciales inválidas');

    return this.tokenService.sign({ userId: user.id, email: user.email });
  }
}