import { useSendContactMessage } from "../mutations/contact.mutations";
import { useContactStore } from "../stores/useContactStore";
import { ContactMessageEntity } from "../../domain/entities/contact.entity";

export function useContact() {
  const { mutateAsync, isPending } = useSendContactMessage();
  const { isSubmitted, setIsSubmitted } = useContactStore();

  const submitContactForm = async (values: ContactMessageEntity) => {
    const success = await mutateAsync(values);
    if (success) {
      setIsSubmitted(true);
    }
    return success;
  };

  return {
    submitContactForm,
    isSubmitting: isPending,
    isSubmitted,
  };
}
