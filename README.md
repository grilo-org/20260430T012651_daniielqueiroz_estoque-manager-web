# Estoque Manager — Frontend

Aplicação web que serve de interface para a [API do Estoque Manager](https://github.com/daniielqueiroz/estoque-manager-api). Permite cadastrar produtos, registrar vendas, acompanhar métricas no dashboard, gerar relatórios por período e exportar listagens em PDF.

---

## Stack utilizada

| Camada                     | Tecnologia                                                                                |
| -------------------------- | ----------------------------------------------------------------------------------------- |
| Build / Dev server         | [Vite 7](https://vitejs.dev)                                                              |
| UI                         | [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)              |
| Estilização                | [Tailwind CSS 4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) (Radix UI) |
| Roteamento                 | [React Router DOM 7](https://reactrouter.com)                                             |
| Estado de servidor         | [TanStack Query 5](https://tanstack.com/query)                                            |
| Tabelas                    | [TanStack Table 8](https://tanstack.com/table)                                            |
| Formulários + Validação    | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)                   |
| Clinte HTTP                | [Axios](https://axios-http.com)                                                           |
| Gráficos                   | [Recharts](https://recharts.org)                                                          |
| Impressão / Relatorios PDF | [react-to-print](https://github.com/MatthewHerbst/react-to-print)                         |
| Notificações               | [Sonner](https://sonner.emilkowal.ski)                                                    |
| Manipulação de Datas       | [date-fns](https://date-fns.org) + [react-day-picker](https://daypicker.dev)              |

---

## Quick start

### Pré-requisitos

- **Node.js** 20+ (recomendado 22)
- **npm** 10+ (ou `pnpm`/`yarn` equivalentes)
- [Backend do Estoque Manager](https://github.com/daniielqueiroz/estoque-manager-api) rodando e acessível

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/daniielqueiroz/estoque-manager-web.git
cd estoque-manager-web

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# edite .env e aponte VITE_API_URL para o backend

# 4. Suba o dev server
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173`.

### Variáveis de ambiente

| Nome           | Obrigatória | Descrição            | Exemplo                     |
| -------------- | ----------- | -------------------- | --------------------------- |
| `VITE_API_URL` | sim         | URL base da API REST | `http://localhost:3333/api` |

> Variáveis precisam do prefixo `VITE_` para serem expostas ao cliente (regra do Vite).

### Scripts

| Comando           | O que faz                                                         |
| ----------------- | ----------------------------------------------------------------- |
| `npm run dev`     | Sobe o Vite em modo desenvolvimento com HMR                       |
| `npm run build`   | Roda `tsc -b` (type-check) e gera o bundle de produção em `dist/` |
| `npm run preview` | Serve o build estático localmente para validar o output           |
| `npm run lint`    | Roda o ESLint em todo o projeto                                   |

---

## Funcionalidades

- **Dashboard** — métricas do dia (vendas, faturamento, ticket médio, total de produtos), últimas vendas e gráfico de vendas diárias com seletor de período.
- **Produtos** — CRUD completo, busca com debounce, ordenação por coluna, paginação e detalhes com relatório de vendas por período.
- **Vendas** — criação com múltiplos itens, cancelamento, listagem ordenável e paginada, detalhes com recibo imprimível.
- **Exportações em PDF** — relatórios de produtos, de vendas por período e do dia.

---

## Arquitetura

### Visão geral

O projeto adota **arquitetura feature-based**: cada domínio de negócio (produtos, vendas, dashboard) é uma pasta autocontida com sua API, hooks, types, schemas, components e pages. Tudo que é reutilizado entre as features fica em `src/shared`.

```
src/
├── app/                         # Bootstrap da aplicação
│   ├── App.tsx                  # Compõe Providers + Router
│   ├── providers.tsx            # QueryClient, Tooltip, Sidebar, Toaster
│   ├── router.tsx               # createBrowserRouter
│   └── layout.tsx               # AppLayout com sidebar e <Outlet />
│
├── features/                    # Domínios de negócio
│   ├── dashboard/
│   │   ├── api/                 # Funções axios (getDashboardData, ...)
│   │   ├── hooks/               # useDashboard, useSalesReport, ...
│   │   ├── components/          # DailySalesChart, LastSalesTable, ...
│   │   ├── pages/               # DashboardPage
│   │   └── types/               # DashboardMetrics
│   │
│   ├── products/
│   │   ├── api/                 # productsApi.ts
│   │   ├── hooks/               # useProducts, useCreateProduct, ...
│   │   ├── schemas/             # Zod schemas (createProductSchema, ...)
│   │   ├── components/          # CreateProductDialog, DataTable, ...
│   │   ├── pages/               # ProductsPage, ProductDetailsPage
│   │   └── types/               # Product, ProductReport, ProductSortBy
│   │
│   └── sales/                   # Mesma estrutura
│
├── shared/                      # Código reutilizavel pelas features
│   ├── components/
│   │   ├── ui/                  # Primitivos shadcn/ui (button, dialog, ...)
│   │   ├── dataTable/           # SortableHeader, DataTablePagination
│   │   ├── sidebar/             # AppSidebar
│   │   └── ...                  # InfoCard, PageError, PageLoader, etc.
│   ├── hooks/                   # useDebounce, useDateRangeParams, usePrintExport, ...
│   ├── types/                   # Paginated, SortOrder, ChartPeriod, DateRange
│   └── utils/                   # currencyFormat, dateFormater
│
├── services/
│   └── api.ts                   # Instância axios com baseURL e X-Timezone
│
├── lib/
│   └── utils.ts                 # cn() (clsx + tailwind-merge)
│
├── index.css                    # Tailwind + tokens de tema
└── main.tsx                     # Entry point
```

### Camadas dentro de uma feature

Cada feature segue um pipeline previsível:

```
page → component → hook (TanStack Query) → api (axios) → backend
                       ↑
                  schema (Zod)  ← formulários (React Hook Form)
```

- **`api/`** — funções puras que falam com o backend. Sem React, sem cache, sem estado.
- **`hooks/`** — encapsulam `useQuery` / `useMutation` / `useInfiniteQuery` e expõem uma API ergonômica para os componentes. Mutations invalidam as `queryKey` relevantes e disparam toasts.
- **`schemas/`** — Schemas do Zod que serve simultaneamente como validador dos inputs (`zodResolver`) e fonte de tipos (`z.infer<typeof ...>`).
- **`components/`** — UI da feature, incluindo dialogs e a configuração das `DataTables`.
- **`pages/`** — orquestração: lê estado de URL/local, chama hooks, monta o layout e trata loading/error com `<PageLoader />` e `<PageError />`.

### Roteamento

```tsx
// src/app/router.tsx
createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/products/:id", element: <ProductDetailsPage /> },
      { path: "/sales/", element: <SalesPage /> },
      { path: "/sales/:id", element: <SaleDetailPage /> },
    ],
  },
]);
```

### Camada HTTP

`src/services/api.ts` exporta uma única instância `axios` com `baseURL` vindo de `VITE_API_URL` e o header `X-Timezone` setado a partir de `Intl.DateTimeFormat().resolvedOptions().timeZone`. Todas as features importam **essa instância**.

### Tratamento de datas

Datas são uma armadilha conhecida no projeto e vivem em `shared/utils/dateFormater.ts`:

- `formatShortDateISO` usa `toLocaleDateString("en-CA")` em vez de `toISOString()` para evitar o bug de fuso horário (que converteria a data local para UTC).
- `buildReportParams` recebe `YYYY-MM-DD`, monta meia-noite **local** do início e meia-noite **local** do dia seguinte ao fim (intervalo exclusivo no final), e só então converte para ISO para enviar ao backend.

---

## Convenções e boas práticas aplicadas

### Tratamento de timezone

Em todas as requisições é enviado o timezone do usuário, dessa forma quando os dados são obtidos do servidor, eles sempre são convertidos corretamente para a data/hora do usuário, além de remover a necessidade de passa-lo via parâmetro a cada requisição.

### Path alias

Imports usam `@/` em vez de caminhos relativos longos. Configurado em `vite.config.ts` e `tsconfig.json`:

```ts
import { api } from "@/services/api";
import { Button } from "@/shared/components/ui/button";
```

### Validação como fonte única da verdade

Schemas Zod são definidos uma única vez e usados tanto para validar formulários quanto para gerar tipos:

```ts
// src/features/products/schemas/product.ts
export const createProductSchema = z.object({
  name: z.string().trim().min(2).max(120),
  price: z.number().positive("Preço deve ser maior que zero"),
  // ...
});
export type CreateProductSchema = z.infer<typeof createProductSchema>;
```

### Padrão de queries do TanStack Query

- **`queryKey` estruturada** — sempre um array começando pelo recurso, com um objeto de parâmetros ao final. Isso permite invalidações granulares (`["products"]` invalida tudo, `["products", { page, ... }]` é único por consulta).
- **`placeholderData: keepPreviousData`** em listas paginadas, para evitar flicker ao trocar de página.
- **`useInfiniteQuery`** para selects pesados (ex.: produtos no dialog de venda), com `getNextPageParam` baseado em `page < totalPages`.
- **Mutations invalidam queryKeys** no `onSuccess` e disparam toasts via `sonner`.

```ts
// Exemplo: src/features/products/hooks/useCreateProduct.ts
return useMutation({
  mutationFn: (product: CreateProductSchema) => createProduct(product),
  onSuccess: () => {
    toast.success("Produto criado com sucesso!");
    queryClient.invalidateQueries({ queryKey: ["products"] });
  },
});
```

### Formulários

- `react-hook-form` com `zodResolver` e `mode: "onChange"` para feedback imediato.
- `Controller` para campos que envolvem componentes Radix/shadcn (Select, etc.).
- `useFieldArray` + `useWatch` quando há lista dinâmica de itens (ver `CreateSaleDialog`).
- `disabled={!formState.isValid || isPending}` no submit para impedir envios inválidos ou duplicados.

### Padrões de UX recorrentes

- **Busca com debounce** — `useDebounce(search, 400)` antes de bater na API (`ProductsPage`), dessa forma evitando flood de requisições a cada letra digitada pelo usuário.
- **Loading e erro padronizados** — `<PageLoader />` e `<PageError message="..." />` no início das pages como early return.
- **Exportação para PDF** — hook genérico `usePrintExport` orquestra `refetch → render → window.print` via `react-to-print`. Cada feature provê seu `PrintView` dedicado.
- **Ordenação de colunas server-side** — colunas de DataTable usam `SortableHeader` que dispara um handler controlado pela page (alterna `asc → desc → none`).

## Build e deploy

```bash
npm run build      # gera dist/
npm run preview    # valida o output localmente
```

O `dist/` é estático e pode ser servido por qualquer CDN ou hospedagem (Vercel, Netlify, S3 + CloudFront, Nginx, ...). Lembre de definir `VITE_API_URL` no ambiente de build.

---
