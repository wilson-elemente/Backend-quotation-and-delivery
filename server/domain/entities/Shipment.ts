export class Shipment {
  constructor(
    public readonly id: number | null,
    public readonly userId: number,
    public readonly origin: string,
    public readonly destination: string,
    public readonly weightKg: number,
    public readonly lengthCm: number,
    public readonly widthCm: number,
    public readonly heightCm: number,
    public readonly volumetricWeight: number,
    public readonly chargeableWeight: number,
    public readonly quotedPriceCents: number,
    public readonly status: string,
    public readonly createdAt: Date
  ) {}
}
