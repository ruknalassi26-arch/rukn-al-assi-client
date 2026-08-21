import {
  ICareersRepository,
  GetJobsParams,
  GetJobBySlugParams,
} from "../../domain/repositories/i-careers.repository";
import {
  JobListItemEntity,
  PaginatedJobsEntity,
  JobFilterOptionsEntity,
} from "../../domain/entities/job.entity";
import {
  JobApplicationInputEntity,
  JobApplicationResultEntity,
} from "../../domain/entities/job-application.entity";
import { JobMapper } from "../mappers/job.mapper";
import {
  RpcJobsResponseDto,
  RpcJobListItemDto,
  RpcSubmitApplicationResponseDto,
} from "../dto/job.dto";
import { createClient } from "@supabase/supabase-js";

export class SupabaseCareersRepository implements ICareersRepository {
  private getSupabase() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  async getJobs({
    page = 1,
    pageSize = 12,
    search = "",
    department,
    employmentType,
    language = "en",
  }: GetJobsParams): Promise<PaginatedJobsEntity> {
    const supabase = this.getSupabase();
    const langCode = language === "ckb" ? "ku" : language;

    try {
      const { data, error } = await supabase.rpc("get_public_jobs", {
        p_language_code: langCode,
        p_page: page,
        p_page_size: pageSize,
        p_search: search && search.trim() ? search.trim() : null,
        p_department: department && department.trim() ? department.trim() : null,
        p_employment_type: employmentType && employmentType.trim() ? employmentType.trim() : null,
      });

      if (error || !data) {
        console.error("[SupabaseCareersRepository] Error calling get_public_jobs:", error?.message);
        return { items: [], total: 0, page, pageSize, totalPages: 0 };
      }

      return JobMapper.toPaginatedJobsEntity(data as RpcJobsResponseDto);
    } catch (err) {
      console.error("[SupabaseCareersRepository] Exception in getJobs:", err);
      return { items: [], total: 0, page, pageSize, totalPages: 0 };
    }
  }

  async getJobBySlug({
    slug,
    language = "en",
  }: GetJobBySlugParams): Promise<JobListItemEntity | null> {
    const supabase = this.getSupabase();
    const langCode = language === "ckb" ? "ku" : language;

    try {
      const { data, error } = await supabase.rpc("get_public_job_by_slug", {
        p_language_code: langCode,
        p_slug: slug,
      });

      if (error || !data) {
        console.error("[SupabaseCareersRepository] Error calling get_public_job_by_slug:", error?.message);
        return null;
      }

      return JobMapper.toJobEntity(data as RpcJobListItemDto);
    } catch (err) {
      console.error("[SupabaseCareersRepository] Exception in getJobBySlug:", err);
      return null;
    }
  }

  async getFilterOptions(): Promise<JobFilterOptionsEntity> {
    const supabase = this.getSupabase();

    try {
      const { data, error } = await supabase
        .from("job_postings")
        .select("department, employment_type")
        .eq("status", "published")
        .is("deleted_at", null);

      if (error || !data) {
        return { departments: [], employmentTypes: [] };
      }

      const departments = Array.from(
        new Set(data.map((d) => d.department).filter(Boolean) as string[])
      );
      const employmentTypes = Array.from(
        new Set(data.map((d) => d.employment_type).filter(Boolean) as string[])
      );

      return { departments, employmentTypes };
    } catch (err) {
      console.error("[SupabaseCareersRepository] Exception in getFilterOptions:", err);
      return { departments: [], employmentTypes: [] };
    }
  }

  async uploadCv(file: File): Promise<{ fileUrl: string; fileName: string }> {
    const supabase = this.getSupabase();
    const fileExt = file.name.split(".").pop();
    const cleanFileName = `cv-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `uploads/${cleanFileName}`;

    const { data, error } = await supabase.storage
      .from("career-cvs")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("[SupabaseCareersRepository] Error uploading CV to career-cvs:", error.message);
      throw new Error(error.message || "Failed to upload CV file");
    }

    const { data: publicUrlData } = supabase.storage
      .from("career-cvs")
      .getPublicUrl(data.path);

    return {
      fileUrl: publicUrlData.publicUrl,
      fileName: file.name,
    };
  }

  async submitApplication(input: JobApplicationInputEntity): Promise<JobApplicationResultEntity> {
    const supabase = this.getSupabase();

    try {
      const { data, error } = await supabase.rpc("submit_career_application", {
        p_job_posting_id: input.jobPostingId || null,
        p_full_name: input.fullName.trim(),
        p_email: input.email.trim(),
        p_phone: input.phone && input.phone.trim() ? input.phone.trim() : null,
        p_cover_message: input.coverMessage && input.coverMessage.trim() ? input.coverMessage.trim() : null,
        p_cv_file_url: input.cvFileUrl.trim(),
        p_cv_file_name: input.cvFileName.trim(),
      });

      if (error) {
        console.error("[SupabaseCareersRepository] Error submitting application:", error.message);
        return {
          success: false,
          message: error.message || "Failed to submit application",
        };
      }

      const res = data as RpcSubmitApplicationResponseDto;
      return {
        success: res?.success ?? true,
        id: res?.id,
        message: "Application submitted successfully",
      };
    } catch (err) {
      console.error("[SupabaseCareersRepository] Exception in submitApplication:", err);
      return {
        success: false,
        message: err instanceof Error ? err.message : "Failed to submit application",
      };
    }
  }
}
