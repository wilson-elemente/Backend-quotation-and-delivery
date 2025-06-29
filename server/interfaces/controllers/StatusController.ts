import { Request, Response, NextFunction } from 'express';
import { ChangeShipmentStatus }           from '../../application/usecases/ChangeShipmentStatus';
import { StatusHistoryRepository }        from '../../domain/repositories/StatusHistoryRepository';
import { injectable, inject }             from 'tsyringe';
import { DomainError }                    from '../../domain/errors/DomainError';

@injectable()
export class StatusController {
  constructor(
    @inject('ChangeShipmentStatus') private changeStatus: ChangeShipmentStatus,
    @inject('StatusHistoryRepository') private historyRepo: StatusHistoryRepository
  ) {}

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id     = Number(req.params.id);
      const status = req.body.status;
      const record = await this.changeStatus.execute(id, status);
      res.json(record);
    } catch (err) {
      if (err instanceof DomainError) {
        return res.status(404).json({ message: err.message });
      }
      next(err);
    }
  }

  async history(req: Request, res: Response, next: NextFunction) {
    try {
      const id      = Number(req.params.id);
      const records = await this.historyRepo.findByShipment(id);
      res.json(records);
    } catch (err) {
      next(err);
    }
  }
}
