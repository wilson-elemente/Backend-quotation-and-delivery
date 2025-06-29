import { ShipmentRepository } from '../../domain/repositories/ShipmentRepository';
import { RegisterShipmentDTO } from '../dtos/RegisterShipmentDTO';
import { ShipmentResponseDTO } from '../dtos/ShipmentResponseDTO';
import { DomainError } from '../../domain/errors/DomainError';
import { injectable, inject } from 'tsyringe';

@injectable()
export class CreateShipment {
    constructor(
        @inject('ShipmentRepository') private repo: ShipmentRepository
    ) { }

    async execute(userId: number, dto: RegisterShipmentDTO): Promise<ShipmentResponseDTO> {
        const shipment = await this.repo.create(userId, dto);
        return {
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
    }
}