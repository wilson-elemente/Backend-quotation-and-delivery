import { Shipment } from '../entities/Shipment';
import { RegisterShipmentDTO } from '../../application/dtos/RegisterShipmentDTO';

export interface ShipmentRepository {
  create(userId: number, data: RegisterShipmentDTO): Promise<Shipment>;
  findByUser(userId: number): Promise<Shipment[]>;
  findById(id: number): Promise<Shipment | null>;
}