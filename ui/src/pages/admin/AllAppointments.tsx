import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAppointments } from "@/features/appointments/apis/getAppointments";
import type { Appointment } from "@/features/appointments/types/appointments";
import { useQuery } from "@tanstack/react-query";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  ListFilter,
  Loader2,
  Plus,
  Search,
  UserRound,
  Video,
} from "lucide-react";
import { Link } from "react-router";

const getAppointmentTitle = (appointment: Appointment) =>
  appointment.name || appointment.title || "Untitled appointment";

const getAppointmentHost = (appointment: Appointment) =>
  appointment.hostId || appointment.ownerId || appointment.owner_id || "Owner";

const formatAppointmentDate = (value?: Date | string) => {
  if (!value) return "Not scheduled";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not scheduled";

  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatAppointmentTime = (value?: Date | string) => {
  if (!value) return "--:--";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--:--";

  return new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const getAppointmentStatus = (appointment: Appointment) => {
  if (appointment.status === "active") return "Active";
  if (appointment.status === "inactive") return "Inactive";
  if (!appointment.startDateTime) return "Draft";

  const startsAt = new Date(appointment.startDateTime).getTime();
  if (Number.isNaN(startsAt)) return "Draft";

  return startsAt > Date.now() ? "Upcoming" : "Completed";
};

const statusStyles = {
  Active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Inactive: "border-border bg-muted text-muted-foreground",
  Upcoming: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Completed: "border-border bg-muted text-muted-foreground",
  Draft: "border-amber-200 bg-amber-50 text-amber-700",
};

const AllAppointments = () => {
  const {
    data: appointments = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  const upcomingCount = appointments.filter(
    (appointment) =>
      ["Active", "Upcoming"].includes(getAppointmentStatus(appointment)),
  ).length;

  return (
    <div className="flex min-w-0 flex-col gap-5">
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

        <Button asChild className="h-10 w-fit gap-2 justify-self-start px-4 md:justify-self-end">
          <Link to="/admin/appointments/create">
            <Plus className="size-4" />
            New appointment
          </Link>
        </Button>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-3">
        <Card className="gap-2 p-4">
          <p className="text-xs text-muted-foreground">Total appointments</p>
          <div className="flex items-center justify-between">
            <strong className="text-2xl font-semibold">
              {appointments.length}
            </strong>
            <CalendarDays className="size-5 text-muted-foreground" />
          </div>
        </Card>
        <Card className="gap-2 p-4">
          <p className="text-xs text-muted-foreground">Upcoming</p>
          <div className="flex items-center justify-between">
            <strong className="text-2xl font-semibold">{upcomingCount}</strong>
            <Clock3 className="size-5 text-muted-foreground" />
          </div>
        </Card>
        <Card className="gap-2 p-4">
          <p className="text-xs text-muted-foreground">Completed</p>
          <div className="flex items-center justify-between">
            <strong className="text-2xl font-semibold">
              {Math.max(appointments.length - upcomingCount, 0)}
            </strong>
            <UserRound className="size-5 text-muted-foreground" />
          </div>
        </Card>
      </div>

      <Card className="gap-0 overflow-hidden bg-background py-0">
        <div className="grid gap-3 border-b border-border p-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="relative min-w-0">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search appointments"
              className="h-10 bg-background pl-10 text-sm"
            />
          </div>
          <Button variant="outline" className="h-10 w-fit gap-2 px-4">
            <ListFilter className="size-4" />
            Filters
          </Button>
        </div>

        {isLoading && (
          <div className="flex min-h-80 flex-col items-center justify-center gap-3 p-8 text-center">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Loading appointments...
            </p>
          </div>
        )}

        {isError && (
          <div className="flex min-h-80 flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="flex size-12 items-center justify-center border border-destructive/30 bg-destructive/10 text-destructive">
              !
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-medium">
                Could not load appointments
              </h2>
              <p className="text-sm text-muted-foreground">
                Please try again after checking the API connection.
              </p>
            </div>
          </div>
        )}

        {!isLoading && !isError && appointments.length === 0 && (
          <div className="flex min-h-80 flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="flex size-14 items-center justify-center border border-border bg-muted text-muted-foreground">
              <CalendarDays className="size-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-medium">No appointments yet</h2>
              <p className="max-w-sm text-sm/6 text-muted-foreground">
                Create your first appointment and it will appear in this list.
              </p>
            </div>
            <Button asChild className="gap-2">
              <Link to="/admin/appointments/create">
                <Plus className="size-4" />
                Create appointment
              </Link>
            </Button>
          </div>
        )}

        {!isLoading && !isError && appointments.length > 0 && (
          <div className="divide-y divide-border">
            {appointments.map((appointment) => {
              const status = getAppointmentStatus(appointment);
              const title = getAppointmentTitle(appointment);
              const host = getAppointmentHost(appointment);

              return (
                <article
                  key={appointment.id}
                  className="grid gap-4 p-4 transition-colors hover:bg-muted/40 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
                >
                  <div className="min-w-0 space-y-3">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <h2 className="min-w-0 break-words text-base font-semibold">
                        {title}
                      </h2>
                      <span
                        className={`border px-2 py-1 text-xs ${statusStyles[status]}`}
                      >
                        {status}
                      </span>
                    </div>

                    <p className="line-clamp-2 text-sm/6 text-muted-foreground">
                      {appointment.description || "No description added."}
                    </p>

                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="size-3.5 text-foreground" />
                        {formatAppointmentDate(appointment.startDateTime)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock3 className="size-3.5 text-foreground" />
                        {formatAppointmentTime(appointment.startDateTime)} -{" "}
                        {formatAppointmentTime(appointment.endDateTime)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <UserRound className="size-3.5 text-foreground" />
                        Host {host}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:justify-end">
                    {appointment.url && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={appointment.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Video className="size-4" />
                          Join
                        </a>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Open ${title}`}
                    >
                      <ExternalLink className="size-4" />
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-border p-4 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>
            Showing {appointments.length} of {appointments.length} appointments
          </span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="size-4" />
              Previous
            </Button>
            <div className="border border-border bg-muted px-3 py-2 text-foreground">
              1
            </div>
            <Button variant="outline" size="sm" disabled>
              Next
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AllAppointments;
