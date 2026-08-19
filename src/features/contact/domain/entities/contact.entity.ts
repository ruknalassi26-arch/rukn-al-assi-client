export interface ContactMessageEntity {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt?: Date;
}
