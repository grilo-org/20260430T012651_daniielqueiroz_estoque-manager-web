import { SidebarProvider } from "@/shared/components/ui/sidebar";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider>
          {children}
          <Toaster
            richColors
            expand
          />
        </SidebarProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
