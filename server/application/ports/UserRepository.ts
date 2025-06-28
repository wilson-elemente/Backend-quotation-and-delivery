import { User } from '../../domain/entities/User';

export interface UserRepository {
  create(email: string, passwordHash: string): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}