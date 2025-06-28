import { injectable, inject } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { RegisterUser } from '../../application/usecases/RegisterUser';
import { LoginUser } from '../../application/usecases/LoginUser';
import { RegisterUserDTO } from '../../application/dtos/RegisterUserDTO';
import { LoginUserDTO } from '../../application/dtos/LoginUserDTO';
import { DomainError } from '../../domain/errors/DomainError';

@injectable()
export class AuthController {
  constructor(
    @inject('RegisterUser') private readonly registerUser: RegisterUser,
    @inject('LoginUser') private readonly loginUser: LoginUser
  ) { }

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto: RegisterUserDTO = req.body;
      await this.registerUser.execute(dto);
      res.status(201).json({ message: 'Registered user sucessfull' });
    } catch (err) {
      if (err instanceof DomainError) {
        res.status(400).json({ message: err.message });
      } else next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto: LoginUserDTO = req.body;
      const token = await this.loginUser.execute(dto);
      res.json({ token });
    } catch (err) {
      if (err instanceof DomainError) {
        res.status(401).json({ message: err.message });
      } else next(err);
    }
  }
}