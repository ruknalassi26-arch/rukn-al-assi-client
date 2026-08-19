import { useMutation } from "@tanstack/react-query";
import { ContactRepository } from "../../data/repositories/contact.repository";
import { SendContactMessageUseCase } from "../../domain/usecases/send-contact-message.usecase";
import { ContactMessageEntity } from "../../domain/entities/contact.entity";

const contactRepository = new ContactRepository();
const sendContactMessageUseCase = new SendContactMessageUseCase(contactRepository);

export function useSendContactMessage() {
  return useMutation({
    mutationFn: (message: ContactMessageEntity) =>
      sendContactMessageUseCase.execute(message),
  });
}
