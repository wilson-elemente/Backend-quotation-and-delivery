export class ShipmentStatusHistory {
  constructor(
    public readonly id: number|null,
    public readonly shipmentId: number,
    public readonly status: string, 
    public readonly changedAt: Date
  ) {}
}
