import { OverviewCardProps } from "@/types/overview-card.types";
import { Card, CardContent } from "../ui/card";

export function OverviewCard({
    title,
    value,
    trend,
    icon: Icon,
}: OverviewCardProps) {
    return (
        <Card className="rounded-sm relative space-y-3">
            <CardContent className="flex flex-col gap-3">
                <h3 className="text-base font-medium text-muted-foreground">
                    {title}
                </h3>
                <p className="text-xl font-semibold">{value}</p>
                <span>{`${trend} From Last Week`}</span>
                <Icon className="absolute right-4 top-4 h-10 w-10 rounded-md border p-2 text-muted-foreground" />
            </CardContent>
        </Card>
    );
}
