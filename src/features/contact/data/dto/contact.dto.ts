export interface RpcBranchDto {
  id: string;
  name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  whatsappNumber: string | null;
  mapLat: number | null;
  mapLng: number | null;
}

export interface RpcContactPageResponseDto {
  branches: RpcBranchDto[];
  language: string;
}

export interface RpcSubmitContactResponseDto {
  success: boolean;
  message: string;
}
