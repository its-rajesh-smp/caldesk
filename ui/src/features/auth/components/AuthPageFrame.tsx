import appIcon from "@/assets/app-icon.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface AuthPageFrameProps {
  eyebrow: string;
  title: string;
  description: string;
  highlights: Array<{
    icon: LucideIcon;
    label: string;
  }>;
  cardTitle: string;
  cardDescription: string;
  cardIcon: LucideIcon;
  footer: React.ReactNode;
  children: React.ReactNode;
}

export function AuthPageFrame(props: AuthPageFrameProps) {
  const CardIcon = props.cardIcon;

  return (
    <div className="flex h-full flex-col justify-center gap-6 text-foreground">
      <div className="space-y-5">
        <div className="flex items-start gap-3">
          <div className="flex size-11 min-h-11 min-w-11 shrink-0 items-center justify-center border border-border bg-background p-2 shadow-sm">
            <img src={appIcon} alt="Caldesk" className="size-full" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {props.eyebrow}
            </p>
            <h1 className="text-wrap break-words text-3xl font-semibold leading-tight text-foreground md:text-4xl">
              {props.title}
            </h1>
          </div>
        </div>

        <p className="max-w-sm text-sm md:text-sm/6 text-muted-foreground">
          {props.description}
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          {props.highlights.map((highlight) => {
            const HighlightIcon = highlight.icon;

            return (
              <div
                key={highlight.label}
                className="flex items-center gap-2 border border-border bg-background px-3 py-2"
              >
                <HighlightIcon className="size-4 text-foreground" />
                <span className="truncate">{highlight.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <Card className="border border-border bg-background text-foreground shadow-2xl shadow-black/10 ring-0">
        <CardHeader className="gap-2 border-b border-border pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold">
                {props.cardTitle}
              </CardTitle>
              <CardDescription>{props.cardDescription}</CardDescription>
            </div>
            <div className="flex size-9 shrink-0 items-center justify-center border border-emerald-200 bg-emerald-50 text-emerald-700">
              <CardIcon className="size-4" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-5">{props.children}</CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground mb-5">
        {props.footer}
      </p>
    </div>
  );
}
