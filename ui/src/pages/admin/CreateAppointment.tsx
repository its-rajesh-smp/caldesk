import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputField } from "@/components/ui/input-field";
import { TextareaField } from "@/components/ui/textarea-field";
import { createDoctorAppointment } from "@/features/admin/apis/createDoctorAppointment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CalendarPlus,
  Clock3,
  HeartPulse,
  Loader2,
  Plus,
  Trash2,
  Video,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

interface DraftSlot {
  id: string;
  date: string;
  startAt: string;
  endAt: string;
}

const createDraftSlot = (): DraftSlot => ({
  id: crypto.randomUUID(),
  date: new Date().toISOString().slice(0, 10),
  startAt: "10:00",
  endAt: "10:30",
});

const toDateTime = (slot: DraftSlot, time: string) =>
  new Date(`${slot.date}T${time}:00`).toISOString();

export const CreateAppointment = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [slots, setSlots] = useState<DraftSlot[]>([
    createDraftSlot(),
    { ...createDraftSlot(), id: crypto.randomUUID(), startAt: "11:00", endAt: "11:30" },
  ]);

  const mutation = useMutation({
    mutationFn: createDoctorAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      navigate("/admin/appointments");
    },
  });

  const updateSlot = (id: string, patch: Partial<DraftSlot>) => {
    setSlots((current) =>
      current.map((slot) => (slot.id === id ? { ...slot, ...patch } : slot)),
    );
  };

  const removeSlot = (id: string) => {
    setSlots((current) => current.filter((slot) => slot.id !== id));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    mutation.mutate({
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      url: formData.get("url") as string,
      slots: slots.map((slot) => ({
        startAt: toDateTime(slot, slot.startAt),
        endAt: toDateTime(slot, slot.endAt),
      })),
    });
  };

  return (
    <div className="flex min-w-0 flex-col gap-5">
      <section className="grid gap-4 border border-border bg-background p-4 shadow-sm md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            <HeartPulse className="size-4 text-emerald-700" />
            Doctor console
          </div>
          <h1 className="mt-2 text-3xl font-semibold leading-tight">
            Publish consultation slots
          </h1>
          <p className="mt-2 max-w-2xl text-sm/6 text-muted-foreground">
            Create one consultation type and add multiple available slots in one
            pass. Patients will only see open times.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs md:w-64">
          <div className="border border-border bg-muted/40 p-3">
            <p className="text-muted-foreground">Slots</p>
            <strong className="mt-1 block text-xl">{slots.length}</strong>
          </div>
          <div className="border border-border bg-muted/40 p-3">
            <p className="text-muted-foreground">Mode</p>
            <strong className="mt-1 block text-xl">Live</strong>
          </div>
        </div>
      </section>

      <form
        onSubmit={onSubmit}
        className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
      >
        <Card className="h-fit bg-background p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center border border-border bg-emerald-50 text-emerald-700">
              <Video className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Consultation details</h2>
              <p className="text-xs text-muted-foreground">
                Keep it patient-friendly and specific.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-5">
            <InputField
              name="name"
              label="Consultation name"
              placeholder="General health consultation"
            />
            <TextareaField
              name="description"
              label="Description"
              placeholder="Describe what patients can book this visit for..."
            />
            <InputField
              name="url"
              label="Meeting URL"
              placeholder="https://meet.google.com/xxxx"
            />
          </div>
        </Card>

        <Card className="bg-background p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                <CalendarPlus className="size-4" />
                Availability
              </div>
              <h2 className="mt-2 text-lg font-semibold">Add multiple slots</h2>
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Add another slot"
              title="Add another slot"
              className="transition-transform duration-300 hover:-translate-y-0.5"
              onClick={() => setSlots((current) => [...current, createDraftSlot()])}
            >
              <Plus className="size-4" />
            </Button>
          </div>

          <div className="mt-5 grid gap-3">
            {slots.map((slot, index) => (
              <div
                key={slot.id}
                className="grid gap-3 border border-border bg-muted/30 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted/50 sm:grid-cols-[1.1fr_0.8fr_0.8fr_auto]"
              >
                <label className="grid gap-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    Date
                  </span>
                  <Input
                    type="date"
                    value={slot.date}
                    onChange={(e) => updateSlot(slot.id, { date: e.target.value })}
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    Start
                  </span>
                  <Input
                    type="time"
                    value={slot.startAt}
                    onChange={(e) =>
                      updateSlot(slot.id, { startAt: e.target.value })
                    }
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    End
                  </span>
                  <Input
                    type="time"
                    value={slot.endAt}
                    onChange={(e) => updateSlot(slot.id, { endAt: e.target.value })}
                  />
                </label>
                <div className="flex items-end justify-between gap-2">
                  <span className="flex items-center gap-1.5 pb-2 text-xs text-muted-foreground sm:hidden">
                    <Clock3 className="size-3.5" />
                    Slot {index + 1}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={`Remove slot ${index + 1}`}
                    disabled={slots.length === 1}
                    onClick={() => removeSlot(slot.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {mutation.isError && (
            <p className="mt-4 border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
              Could not publish slots. Check the consultation URL and slot times.
            </p>
          )}

          <div className="mt-5 flex justify-end">
            <Button
              type="submit"
              disabled={mutation.isPending || slots.length === 0}
              className="h-10 gap-2 px-4 transition-transform duration-300 hover:-translate-y-0.5"
            >
              {mutation.isPending && <Loader2 className="size-4 animate-spin" />}
              {mutation.isPending ? "Publishing..." : "Publish slots"}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};
