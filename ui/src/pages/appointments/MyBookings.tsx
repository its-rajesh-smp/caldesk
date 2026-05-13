import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getMyAppointments } from "@/features/appointments/apis/getMyAppointments";
import { useQuery } from "@tanstack/react-query";
import {
  CalendarDays,
  Clock3,
  Loader2,
  Stethoscope,
  Video,
} from "lucide-react";
import { Link } from "react-router";

const formatDate = (value?: Date | string) => {
  if (!value) return "Not scheduled";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not scheduled";

  return new Intl.DateTimeFormat("en", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatTime = (value?: Date | string) => {
  if (!value) return "--:--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--:--";

  return new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const MyBookings = () => {
  const {
    data: bookings = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["my-appointments"],
    queryFn: getMyAppointments,
  });

  return (
    <div className="flex min-w-0 flex-col gap-5">
      <section className="border border-border bg-background p-4 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          <CalendarDays className="size-4 text-emerald-700" />
          Patient desk
        </div>
        <h1 className="mt-2 text-3xl font-semibold leading-tight">
          My bookings
        </h1>
        <p className="mt-2 max-w-2xl text-sm/6 text-muted-foreground">
          See your upcoming healthcare consultations, doctor details, time, and
          joining link in one place.
        </p>
      </section>

      <Card className="gap-0 overflow-hidden bg-background py-0">
        {isLoading && (
          <div className="flex min-h-72 flex-col items-center justify-center gap-3 p-8 text-center">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Loading your bookings...
            </p>
          </div>
        )}

        {isError && (
          <div className="flex min-h-72 flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="flex size-12 items-center justify-center border border-destructive/30 bg-destructive/10 text-destructive">
              !
            </div>
            <h2 className="text-base font-medium">Could not load bookings</h2>
            <p className="text-sm text-muted-foreground">
              Please login again and try once more.
            </p>
          </div>
        )}

        {!isLoading && !isError && bookings.length === 0 && (
          <div className="flex min-h-72 flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="flex size-14 items-center justify-center border border-border bg-muted text-muted-foreground">
              <CalendarDays className="size-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-medium">No bookings yet</h2>
              <p className="max-w-sm text-sm/6 text-muted-foreground">
                Book your first consultation from the doctor marketplace.
              </p>
            </div>
            <Button asChild>
              <Link to="/">Find doctors</Link>
            </Button>
          </div>
        )}

        {!isLoading && !isError && bookings.length > 0 && (
          <div className="divide-y divide-border">
            {bookings.map((booking) => (
              <article
                key={booking.id}
                className="grid gap-4 p-4 transition-colors hover:bg-muted/40 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
              >
                <div className="min-w-0 space-y-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center border border-border bg-emerald-50 text-emerald-700">
                      <Stethoscope className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="break-words text-xs text-muted-foreground">
                        {booking.doctor.name}
                      </p>
                      <h2 className="mt-1 break-words text-lg font-semibold">
                        {booking.consultation.name}
                      </h2>
                    </div>
                  </div>

                  <p className="line-clamp-2 text-sm/6 text-muted-foreground">
                    {booking.consultation.description ||
                      "Your consultation is confirmed."}
                  </p>

                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="size-3.5 text-foreground" />
                      {formatDate(booking.slot.startAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock3 className="size-3.5 text-foreground" />
                      {formatTime(booking.slot.startAt)} -{" "}
                      {formatTime(booking.slot.endAt)}
                    </span>
                  </div>
                </div>

                <Button asChild className="h-10 w-fit gap-2">
                  <a href={booking.slot.url} target="_blank" rel="noreferrer">
                    <Video className="size-4" />
                    Join visit
                  </a>
                </Button>
              </article>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default MyBookings;
