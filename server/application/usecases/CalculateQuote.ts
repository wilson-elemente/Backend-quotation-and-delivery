import { QuoteRequestDTO } from '../dtos/QuoteRequestDTO';
import { QuoteResponseDTO } from '../dtos/QuoteResponseDTO';
import { TariffRepository } from '../../domain/repositories/TariffRepository';
import { Tariff } from '../../domain/entities/Tariff';
import { DomainError } from '../../domain/errors/DomainError';
import { injectable, inject } from 'tsyringe';

@injectable()
export class CalculateQuote {
  constructor(
    @inject('TariffRepository') private readonly tariffRepo: TariffRepository
  ) {}

  async execute(dto: QuoteRequestDTO): Promise<QuoteResponseDTO> {
    // 1) Calcula peso volumétrico y peso cobrable
    const volumetricWeight =
      (dto.lengthCm * dto.widthCm * dto.heightCm) / 2500;
    const chargeableWeight = Math.ceil(
      Math.max(dto.weightKg, volumetricWeight)
    );

    // 2) Busca tarifa en base a ruta y peso cobrable
    const tariff: Tariff | null = await this.tariffRepo.findByRouteAndWeight(
      dto.origin,
      dto.destination,
      chargeableWeight
    );
    if (!tariff) {
      throw new DomainError(
        `No tariff found for ${dto.origin} → ${dto.destination} at ${chargeableWeight}kg`
      );
    }

    // 3) Devuelve precio en cents
    return { priceCents: tariff.priceCents };
  }
}