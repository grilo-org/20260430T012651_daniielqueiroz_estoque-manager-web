import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import { LayoutDashboard, Package, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/products", label: "Produtos", icon: Package },
  { to: "/sales", label: "Vendas", icon: ShoppingCart },
];

const activeClass =
  "hover:bg-muted transition-all border-l-6 border-primary font-bold text-primary";
const inactiveClass = "hover:bg-muted transition-all";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="mt-8">
        <div className="flex justify-around items-center">
          <div className="bg-slate-900 p-2 rounded-md">
            <Package className="size-6! text-white" />
          </div>
          <p className="text-xl font-bold">Estoque Manager</p>
        </div>
      </SidebarHeader>
      <SidebarContent className="mt-4">
        <SidebarGroup className="p-0">
          <SidebarMenu>
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  isActive ? activeClass : inactiveClass
                }
              >
                <SidebarMenuItem className="pl-4">
                  <SidebarMenuButton
                    size={"lg"}
                    className="text-base gap-5 hover:bg-transparent"
                  >
                    <Icon className="size-5!" /> {label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </NavLink>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
