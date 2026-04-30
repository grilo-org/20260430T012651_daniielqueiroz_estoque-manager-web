import { Button } from "../ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

interface SortableHeaderProps {
  label: string;
  isSorted: "asc" | "desc" | false;
  onSort: () => void;
}

export function SortableHeader({ label, isSorted, onSort }: SortableHeaderProps) {
  return (
    <div className="flex items-center">
      {label}
      <Button
        variant="ghost"
        size="icon"
        onClick={onSort}
      >
        {isSorted === "desc" ? (
          <ArrowDown />
        ) : isSorted === "asc" ? (
          <ArrowUp />
        ) : (
          <ArrowUpDown />
        )}
      </Button>
    </div>
  );
}
