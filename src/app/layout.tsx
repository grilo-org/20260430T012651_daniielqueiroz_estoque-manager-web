import { AppSidebar } from "@/shared/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/shared/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="mt-8 container mx-auto">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
