export class Tariff {
  constructor(
    public readonly id: number | null,
    public readonly origin: string,
    public readonly destination: string,
    public readonly weightMinKg: number,
    public readonly weightMaxKg: number,
    public readonly priceCents: number
  ) {}
}