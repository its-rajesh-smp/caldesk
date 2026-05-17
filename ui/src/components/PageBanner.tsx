import { CalendarDays, Plus } from "lucide-react";
import { Link } from "react-router";
import { Button } from "./ui/button";

interface PageBannerProps {
  title: string;
  description: string;
}

export const PageBanner = () => {
  return (
    <div className="grid gap-4 border border-border bg-background p-4 shadow-sm md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
      <div className="min-w-0 space-y-2">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          <CalendarDays className="size-4 text-foreground" />
          Appointment desk
        </div>
        <div>
          <h1 className="text-3xl font-semibold leading-tight">
            All appointments
          </h1>
          <p className="mt-1 max-w-xl text-sm/6 text-muted-foreground">
            Review, manage, and open every appointment created for this
            workspace.
          </p>
        </div>
      </div>

      <Button
        asChild
        className="h-10 w-fit gap-2 justify-self-start px-4 md:justify-self-end"
      >
        <Link to="/admin/appointments/create">
          <Plus className="size-4" />
          New appointment
        </Link>
      </Button>
    </div>
  );
};
