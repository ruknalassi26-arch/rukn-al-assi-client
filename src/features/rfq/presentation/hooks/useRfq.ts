import { useSubmitRFQ } from "../mutations/rfq.mutations";
import { useRfqStore } from "../stores/useRfqStore";
import { RfqEntity } from "../../domain/entities/rfq.entity";

export function useRfq() {
  const { mutateAsync, isPending } = useSubmitRFQ();
  const { isSubmitted, setIsSubmitted } = useRfqStore();

  const handleRfqSubmit = async (values: RfqEntity) => {
    const success = await mutateAsync(values);
    if (success) {
      setIsSubmitted(true);
    }
    return success;
  };

  return {
    handleRfqSubmit,
    isSubmitting: isPending,
    isSubmitted,
  };
}
