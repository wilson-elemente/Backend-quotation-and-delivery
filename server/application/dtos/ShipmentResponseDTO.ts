export interface ShipmentResponseDTO {
  id: number;
  origin: string;
  destination: string;
  weightKg: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  chargeableWeight: number;
  quotedPriceCents: number;
  status: string;
  createdAt: string;
}