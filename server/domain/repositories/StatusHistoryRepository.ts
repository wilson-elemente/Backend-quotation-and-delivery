import { ShipmentStatusHistory } from '../entities/ShipmentStatusHistory';

export interface StatusHistoryRepository {
  record(shipmentId: number, status: string): Promise<ShipmentStatusHistory>;
  findByShipment(shipmentId: number): Promise<ShipmentStatusHistory[]>;
}