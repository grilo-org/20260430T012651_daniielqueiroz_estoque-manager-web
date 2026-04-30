import { Loader2 } from "lucide-react";

export const PageLoader = () => {
  return (
    <div className="h-full flex flex-col gap-2 justify-center items-center">
      <Loader2 className="animate-spin size-12" />
      <p>Buscando dados...</p>
    </div>
  );
};
