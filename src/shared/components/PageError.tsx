import { CircleAlert } from "lucide-react";

interface PageErrorProps {
  message?: string;
}

export const PageError = ({ message = "Algo deu errado." }: PageErrorProps) => {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-2">
      <CircleAlert className="size-12 text-destructive" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};
