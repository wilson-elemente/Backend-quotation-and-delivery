import { ShipmentRepository }        from '../../domain/repositories/ShipmentRepository';
import { StatusHistoryRepository }   from '../../domain/repositories/StatusHistoryRepository';
import { RedisPublisher }            from '../ports/RedisPublisher';
import { injectable, inject }        from 'tsyringe';

@injectable()
export class ChangeShipmentStatus {
  constructor(
    @inject('ShipmentRepository')    private shipments: ShipmentRepository,
    @inject('StatusHistoryRepository') private history: StatusHistoryRepository,
    @inject('RedisPublisher')        private publisher: RedisPublisher
  ) {}

  async execute(shipmentId: number, newStatus: string) {
    // 1) shipmentId must exist
    const shipment = await this.shipments.findById(shipmentId);
    if (!shipment) throw new Error('Shipment not found');

    // 2) Update status in shipment
    await this.shipments.updateStatus(shipmentId, newStatus);

    // 3) history record
    const record = await this.history.record(shipmentId, newStatus);

    // 4) publish to Redis
    await this.publisher.publish(
      `shipmentStatus:${shipmentId}`,
      JSON.stringify({ shipmentId, status: newStatus, changedAt: record.changedAt })
    );

    return record;
  }
}
