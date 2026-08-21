export interface BranchEntity {
  id: string;
  name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  whatsappNumber: string | null;
  mapLat: number | null;
  mapLng: number | null;
}

export interface ContactPageEntity {
  branches: BranchEntity[];
  language: string;
}

export interface ContactMessageInputEntity {
  fullName: string;
  email?: string | null;
  phone?: string | null;
  subject?: string | null;
  message: string;
}

export interface ContactSubmitResultEntity {
  success: boolean;
  message: string;
}
