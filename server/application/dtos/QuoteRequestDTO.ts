export interface QuoteRequestDTO {
    origin: string;
    destination: string;
    weightKg: number;
    lengthCm: number;
    widthCm: number;
    heightCm: number;
}