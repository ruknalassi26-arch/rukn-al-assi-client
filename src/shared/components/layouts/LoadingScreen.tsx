import { Spinner } from "@shared/components/ui/spinner";

export function LoadingScreen() {
  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center">
      <Spinner size={36} />
    </div>
  );
}
