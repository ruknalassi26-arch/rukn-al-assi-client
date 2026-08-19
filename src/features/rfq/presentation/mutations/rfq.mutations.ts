import { useMutation } from "@tanstack/react-query";
import { RfqRepository } from "../../data/repositories/rfq.repository";
import { SubmitRFQUseCase } from "../../domain/usecases/submit-rfq.usecase";
import { RfqEntity } from "../../domain/entities/rfq.entity";

const rfqRepository = new RfqRepository();
const submitRFQUseCase = new SubmitRFQUseCase(rfqRepository);

export function useSubmitRFQ() {
  return useMutation({
    mutationFn: (rfq: RfqEntity) => submitRFQUseCase.execute(rfq),
  });
}
