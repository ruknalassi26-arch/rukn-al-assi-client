import { ICareersRepository } from "../repositories/i-careers.repository";

export class UploadCvUseCase {
  constructor(private readonly repository: ICareersRepository) {}

  async execute(file: File): Promise<{ fileUrl: string; fileName: string }> {
    return this.repository.uploadCv(file);
  }
}
