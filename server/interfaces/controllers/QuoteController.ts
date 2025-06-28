import { Request, Response, NextFunction } from 'express';
import { CalculateQuote } from '../../application/usecases/CalculateQuote';
import { QuoteRequestDTO } from '../../application/dtos/QuoteRequestDTO';
import { DomainError } from '../../domain/errors/DomainError';
import { injectable, inject } from 'tsyringe';

@injectable()
export class QuoteController {
  constructor(
    @inject('CalculateQuote') private readonly calculateQuote: CalculateQuote
  ) {}

  async quote(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto: QuoteRequestDTO = req.body;
      const result = await this.calculateQuote.execute(dto);
      res.json(result);
    } catch (err) {
      if (err instanceof DomainError) {
        res.status(400).json({ message: err.message });
      } else next(err);
    }
  }
}