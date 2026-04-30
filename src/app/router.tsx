import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { ProductDetailsPage } from "@/features/products/pages/ProductDetailsPage";
import { ProductsPage } from "@/features/products/pages/ProductsPage";
import { SalesPage } from "@/features/sales/pages/SalesPage";
import { SaleDetailPage } from "@/features/sales/pages/SaleDetailsPage";
import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./layout";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/products/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "/sales/",
        element: <SalesPage />,
      },
      {
        path: "/sales/:id",
        element: <SaleDetailPage />,
      },
    ],
  },
]);
