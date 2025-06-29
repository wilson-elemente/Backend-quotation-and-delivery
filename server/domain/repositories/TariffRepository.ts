import { Tariff } from '../../domain/entities/Tariff';

export interface TariffRepository {
  /**
   * searches for a tariff based on the origin, destination, and weight.
   */
  findByRouteAndWeight(
    origin: string,
    destination: string,
    weightKg: number
  ): Promise<Tariff | null>;
}