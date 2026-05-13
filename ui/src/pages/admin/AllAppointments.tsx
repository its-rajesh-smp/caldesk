import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { bookAppointment } from "@/features/appointments/apis/bookAppointment";
import { getAppointments } from "@/features/appointments/apis/getAppointments";
import type {
  Appointment,
  AppointmentSlot,
} from "@/features/appointments/types/appointments";
import { UserType } from "@/features/auth/types/user";
import { useAuthStore } from "@/features/auth/stores/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  HeartPulse,
  Loader2,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Stethoscope,
  Video,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";

const formatDate = (value?: Date | string) => {
  if (!value) return "Not scheduled";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not scheduled";

  return new Intl.DateTimeFormat("en", {
    weekday: "short",
    day: "2-digit",
    month: "short",
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

const getOpenSlots = (appointment: Appointment) =>
  (appointment.slots || []).filter((slot) => !slot.isBooked);

const getNextSlot = (appointment: Appointment) =>
  getOpenSlots(appointment).sort(
    (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
  )[0];

const matchesDateFilter = (
  slot: AppointmentSlot | undefined,
  filter: "all" | "today" | "week",
) => {
  if (filter === "all") return true;
  if (!slot) return false;

  const slotTime = new Date(slot.startAt).getTime();
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).getTime();
  const endOfToday = startOfToday + 24 * 60 * 60 * 1000;
  const endOfWeek = startOfToday + 7 * 24 * 60 * 60 * 1000;

  if (filter === "today") return slotTime >= startOfToday && slotTime < endOfToday;
  return slotTime >= startOfToday && slotTime < endOfWeek;
};

const AllAppointments = () => {
  const queryClient = useQueryClient();
  const { user, isAuthenticated } = useAuthStore();
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "week">("all");
  const [selectedSlotByAppointment, setSelectedSlotByAppointment] = useState<
    Record<string, string>
  >({});
  const [page, setPage] = useState(1);

  const {
    data: appointments = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  const bookMutation = useMutation({
    mutationFn: bookAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });

  const filteredAppointments = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return appointments.filter((appointment) => {
      const nextSlot = getNextSlot(appointment);
      const text = [
        appointment.name,
        appointment.description,
        appointment.doctor?.name,
        appointment.doctor?.email,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        (!normalizedSearch || text.includes(normalizedSearch)) &&
        matchesDateFilter(nextSlot, dateFilter)
      );
    });
  }, [appointments, dateFilter, search]);

  const pageSize = 4;
  const totalPages = Math.max(Math.ceil(filteredAppointments.length / pageSize), 1);
  const paginatedAppointments = filteredAppointments.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const totalOpenSlots = appointments.reduce(
    (count, appointment) => count + getOpenSlots(appointment).length,
    0,
  );

  return (
    <div className="flex min-w-0 flex-col gap-5">
      <section className="grid gap-4 border border-border bg-background p-4 shadow-sm md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
        <div className="min-w-0 space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            <HeartPulse className="size-4 text-emerald-700" />
            CalDesk Health
          </div>
          <div>
            <h1 className="text-3xl font-semibold leading-tight">
              Book trusted care faster
            </h1>
            <p className="mt-1 max-w-2xl text-sm/6 text-muted-foreground">
              Browse doctors, compare consultation types, and reserve an open
              slot without back-and-forth messages.
            </p>
          </div>
        </div>
      </section>

      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-3">
        <Card className="gap-2 p-4 transition-transform duration-300 hover:-translate-y-0.5">
          <p className="text-xs text-muted-foreground">Doctors live</p>
          <div className="flex items-center justify-between">
            <strong className="text-2xl font-semibold">
              {new Set(appointments.map((appointment) => appointment.doctor?.id)).size}
            </strong>
            <Stethoscope className="size-5 text-emerald-700" />
          </div>
        </Card>
        <Card className="gap-2 p-4 transition-transform duration-300 hover:-translate-y-0.5">
          <p className="text-xs text-muted-foreground">Open slots</p>
          <div className="flex items-center justify-between">
            <strong className="text-2xl font-semibold">{totalOpenSlots}</strong>
            <Clock3 className="size-5 text-muted-foreground" />
          </div>
        </Card>
        <Card className="gap-2 p-4 transition-transform duration-300 hover:-translate-y-0.5">
          <p className="text-xs text-muted-foreground">Secure booking</p>
          <div className="flex items-center justify-between">
            <strong className="text-2xl font-semibold">1 click</strong>
            <ShieldCheck className="size-5 text-muted-foreground" />
          </div>
        </Card>
      </div>

      <Card className="gap-0 overflow-hidden bg-background py-0">
        <div className="grid gap-3 border-b border-border p-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="relative min-w-0">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by doctor, care type, or symptom"
              className="h-10 bg-background pl-10 text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ["all", "All"],
              ["today", "Today"],
              ["week", "This week"],
            ].map(([value, label]) => (
              <Button
                key={value}
                type="button"
                variant={dateFilter === value ? "default" : "outline"}
                className="gap-2"
                onClick={() => {
                  setDateFilter(value as typeof dateFilter);
                  setPage(1);
                }}
              >
                <SlidersHorizontal className="size-4" />
                {label}
              </Button>
            ))}
          </div>
        </div>

        {isLoading && (
          <div className="flex min-h-80 flex-col items-center justify-center gap-3 p-8 text-center">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Loading available doctors...
            </p>
          </div>
        )}

        {isError && (
          <div className="flex min-h-80 flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="flex size-12 items-center justify-center border border-destructive/30 bg-destructive/10 text-destructive">
              !
            </div>
            <h2 className="text-base font-medium">Could not load appointments</h2>
            <p className="text-sm text-muted-foreground">
              Please try again after checking the API connection.
            </p>
          </div>
        )}

        {!isLoading && !isError && filteredAppointments.length === 0 && (
          <div className="flex min-h-80 flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="flex size-14 items-center justify-center border border-border bg-muted text-muted-foreground">
              <CalendarDays className="size-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-medium">No slots match yet</h2>
              <p className="max-w-sm text-sm/6 text-muted-foreground">
                Try a broader search or another date filter.
              </p>
            </div>
          </div>
        )}

        {!isLoading && !isError && filteredAppointments.length > 0 && (
          <div className="grid gap-4 p-4 md:grid-cols-2">
            {paginatedAppointments.map((appointment) => {
              const openSlots = getOpenSlots(appointment);
              const selectedSlotId = selectedSlotByAppointment[appointment.id];
              const selectedSlot = openSlots.find(
                (slot) => slot.id === selectedSlotId,
              );

              const isBookingThisSlot =
                bookMutation.isPending &&
                bookMutation.variables?.slotId === selectedSlot?.id;

              return (
                <article
                  key={appointment.id}
                  className="flex min-w-0 flex-col gap-4 border border-border bg-background p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center border border-border bg-emerald-50 text-emerald-700">
                      <Stethoscope className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="break-words text-xs text-muted-foreground">
                        {appointment.doctor?.name || "Verified doctor"}
                      </p>
                      <h2 className="mt-1 break-words text-lg font-semibold">
                        {appointment.name}
                      </h2>
                    </div>
                  </div>

                  <p className="line-clamp-3 text-sm/6 text-muted-foreground">
                    {appointment.description ||
                      "Consult with a healthcare professional for guidance and next steps."}
                  </p>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {openSlots.slice(0, 6).map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() =>
                          setSelectedSlotByAppointment((current) => ({
                            ...current,
                            [appointment.id]: slot.id,
                          }))
                        }
                        className={`border p-3 text-left text-xs transition-all duration-300 hover:-translate-y-0.5 ${
                          selectedSlotId === slot.id
                            ? "border-foreground bg-foreground text-background"
                            : "border-border bg-background hover:bg-muted"
                        }`}
                      >
                        <span className="block font-medium">
                          {formatDate(slot.startAt)}
                        </span>
                        <span className="mt-1 block opacity-80">
                          {formatTime(slot.startAt)} - {formatTime(slot.endAt)}
                        </span>
                      </button>
                    ))}
                  </div>

                  {openSlots.length === 0 && (
                    <div className="border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
                      All slots are booked for this consultation.
                    </div>
                  )}

                  <div className="mt-auto flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <span className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Video className="size-4" />
                      Online consultation
                    </span>
                    {isAuthenticated() ? (
                      <Button
                        disabled={
                          !selectedSlot ||
                          isBookingThisSlot ||
                          user?.role === UserType.DOCTOR
                        }
                        className="h-10 gap-2"
                        onClick={() =>
                          selectedSlot &&
                          bookMutation.mutate({
                            appointmentId: appointment.id,
                            slotId: selectedSlot.id,
                          })
                        }
                      >
                        {isBookingThisSlot ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <CheckCircle2 className="size-4" />
                        )}
                        {isBookingThisSlot
                          ? "Booking..."
                          : selectedSlot
                            ? "Book slot"
                            : "Select slot"}
                      </Button>
                    ) : (
                      <Button asChild className="h-10 gap-2">
                        <Link to="/login">Login to book</Link>
                      </Button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {!isLoading && !isError && filteredAppointments.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-border p-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing {(page - 1) * pageSize + 1}-
              {Math.min(page * pageSize, filteredAppointments.length)} of{" "}
              {filteredAppointments.length} consultations
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((current) => Math.max(current - 1, 1))}
              >
                <ChevronLeft className="size-4" />
                Previous
              </Button>
              <span className="border border-border bg-muted px-3 py-2 text-foreground">
                {page} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() =>
                  setPage((current) => Math.min(current + 1, totalPages))
                }
              >
                Next
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      <section className="grid gap-4 border border-border bg-foreground p-5 text-background md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-background/60">
            <Sparkles className="size-4" />
            For doctors
          </div>
          <h2 className="mt-2 text-2xl font-semibold">
            Open your clinic calendar in minutes.
          </h2>
          <p className="mt-2 max-w-2xl text-sm/6 text-background/70">
            Create a doctor account, publish available consultation slots, and
            let patients reserve care without back-and-forth calls.
          </p>
        </div>
        <Button variant="secondary" asChild className="h-10 w-fit gap-2">
          <Link to="/register">
            Join as doctor
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </section>

      <footer className="grid gap-5 border border-border bg-background p-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <HeartPulse className="size-4 text-emerald-700" />
            CalDesk Health
          </div>
          <p className="mt-2 max-w-xl text-xs/6 text-muted-foreground">
            Healthcare-first appointment booking for doctors and patients.
            Showcase-ready with seeded doctors, bookable slots, patient
            bookings, and responsive care flows.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground md:justify-end">
          <Link to="/" className="hover:text-foreground">
            Find doctors
          </Link>
          <Link to="/my-bookings" className="hover:text-foreground">
            My bookings
          </Link>
          <Link to="/register" className="hover:text-foreground">
            Register
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default AllAppointments;
