import { Request, Response, NextFunction } from 'express';
import { CreateShipment } from '../../application/usecases/CreateShipment';
import { ListShipments } from '../../application/usecases/ListShipments';
import { injectable, inject } from 'tsyringe';
import { AuthRequest } from '../middleware/middleware';
import { ShipmentRepository } from '../../domain/repositories/ShipmentRepository';

@injectable()
export class ShipmentController {
    constructor(
        @inject('CreateShipment') private create: CreateShipment,
        @inject('ListShipments') private list: ListShipments,
        @inject('ShipmentRepository') private repo: ShipmentRepository
    ) { }

    async createOne(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.userId;
            const dto = req.body;
            const result = await this.create.execute(userId, dto);
            res.status(201).json(result);
        } catch (err) { next(err); }
    }

    async listAll(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.userId;
            const results = await this.list.execute(userId);
            res.json(results);
        } catch (err) { next(err); }
    }

    async getOne(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.userId;
            const shipmentId = Number(req.params.id);
            const shipment = await this.repo.findById(shipmentId);

            if (!shipment || shipment.userId !== userId) {
                return res.status(404).json({ message: 'Shipment not found' });
            }
            
            const dto = {
                id: shipment.id!,
                origin: shipment.origin,
                destination: shipment.destination,
                weightKg: shipment.weightKg,
                lengthCm: shipment.lengthCm,
                widthCm: shipment.widthCm,
                heightCm: shipment.heightCm,
                chargeableWeight: shipment.chargeableWeight,
                quotedPriceCents: shipment.quotedPriceCents,
                status: shipment.status,
                createdAt: shipment.createdAt.toISOString(),
            };
            res.json(dto);
        } catch (err) {
            next(err);
        }
    }
}