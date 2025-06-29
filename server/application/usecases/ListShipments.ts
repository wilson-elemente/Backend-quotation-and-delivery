import { ShipmentResponseDTO } from '../dtos/ShipmentResponseDTO';
import { ShipmentRepository } from '../../domain/repositories/ShipmentRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
export class ListShipments {
  constructor(
    @inject('ShipmentRepository')
    private readonly repo: ShipmentRepository
  ) {}

  async execute(userId: number): Promise<ShipmentResponseDTO[]> {
    const shipments = await this.repo.findByUser(userId);
    return shipments.map(s => ({
      id: s.id!,
      origin: s.origin,
      destination: s.destination,
      weightKg: s.weightKg,
      lengthCm: s.lengthCm,
      widthCm: s.widthCm,
      heightCm: s.heightCm,
      chargeableWeight: s.chargeableWeight,
      quotedPriceCents: s.quotedPriceCents,
      status: s.status,
      createdAt: s.createdAt.toISOString(),
    }));
  }
}