import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

interface InfoCardsProps {
  icon?: React.ReactNode;
  title: string;
  value: string;
}

export const InfoCard = ({ icon, title, value }: InfoCardsProps) => {
  return (
    <Card className="min-w-1/6 w-full py-4">
      <div className="flex items-center">
        {icon && <div className="ms-6 p-3 bg-muted rounded-xl">{icon}</div>}
        <div className="w-full">
          <CardHeader>
            <CardTitle className="text-xs text-muted-foreground">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl">{value}</p>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};
