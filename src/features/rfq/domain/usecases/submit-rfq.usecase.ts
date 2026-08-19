import { IRfqRepository } from "../repositories/i-rfq.repository";
import { RfqEntity } from "../entities/rfq.entity";

export class SubmitRFQUseCase {
  constructor(private readonly rfqRepository: IRfqRepository) {}

  async execute(rfq: RfqEntity): Promise<boolean> {
    return this.rfqRepository.submitRfq(rfq);
  }
}
