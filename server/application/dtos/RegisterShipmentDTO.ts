export interface RegisterShipmentDTO {
  origin: string;
  destination: string;
  weightKg: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  quotedPriceCents: number;
}