import { RegisterUserDTO } from '../dtos/RegisterUserDTO';
import { UserRepository } from '../../domain/repositories/UserRepository';
import bcrypt from 'bcrypt';
import { DomainError } from '../../domain/errors/DomainError';
import { injectable, inject } from 'tsyringe';

@injectable()
export class RegisterUser {
    private readonly saltRounds = 10;
    constructor(
        @inject('UserRepository') private readonly userRepo: UserRepository,
    ) { }

    async execute(dto: RegisterUserDTO): Promise<void> {
        const existing = await this.userRepo.findByEmail(dto.email);
        if (existing) throw new DomainError('Email ya registrado');
        const hash = await bcrypt.hash(dto.password, this.saltRounds);
        await this.userRepo.create(dto.email, hash);
    }
}