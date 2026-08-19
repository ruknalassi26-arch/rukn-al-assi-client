import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number must be at least 8 digits"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const rfqFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number is required"),
  companyName: z.string().optional(),
  serviceId: z.string().optional(),
  details: z.string().min(10, "Project details must be specified"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type RfqFormValues = z.infer<typeof rfqFormSchema>;
