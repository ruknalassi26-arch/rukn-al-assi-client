import { RfqEntity } from "../entities/rfq.entity";

export interface IRfqRepository {
  submitRfq(rfq: RfqEntity): Promise<boolean>;
}
