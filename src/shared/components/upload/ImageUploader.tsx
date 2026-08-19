"use client";

import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import { cn } from "@core/utils/cn";

export interface ImageUploaderProps {
  onFileSelect: (file: File) => void;
  className?: string;
}

export function ImageUploader({ onFileSelect, className }: ImageUploaderProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]) {
        onFileSelect(acceptedFiles[0]);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors hover:border-primary/50 bg-muted/20",
        isDragActive && "border-primary bg-primary/5",
        className
      )}
    >
      <input {...getInputProps()} />
      <UploadCloud className="size-8 text-muted-foreground mb-2" />
      <p className="text-sm text-muted-foreground font-medium text-center">
        {isDragActive
          ? "Drop the image here..."
          : "Drag & drop image, or click to browse"}
      </p>
    </div>
  );
}
