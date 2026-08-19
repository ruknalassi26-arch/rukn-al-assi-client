import { cn } from "@core/utils/cn";
import { Loader2 } from "lucide-react";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export function Spinner({ className, size = 24, ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <Loader2 size={size} className="animate-spin text-primary" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
