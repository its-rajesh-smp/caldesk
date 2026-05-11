import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { InputField } from "@/components/ui/input-field";
import { SelectField } from "@/components/ui/select-field";
import { SwitchField } from "@/components/ui/switch-field";
import { TextareaField } from "@/components/ui/textarea-field";
import { createAppointment } from "@/features/admin/apis/createAppointment";
import { AppointmentOccurrenceType } from "@/features/admin/constants/appointment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  endOfMonth,
  isBefore,
  startOfMonth,
} from "date-fns";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

type RepeatUnit = "day" | "week" | "month" | "year";

const generatePreviewDatesForMonth = ({
  selectedDates,
  visibleMonth,
  interval,
  unit,
}: {
  selectedDates: Date[];
  visibleMonth: Date;
  interval: number;
  unit: RepeatUnit;
}) => {
  const monthStart = startOfMonth(visibleMonth);
  const monthEnd = endOfMonth(visibleMonth);

  const generated: Date[] = [];

  for (const baseDate of selectedDates) {
    let current = new Date(baseDate);

    // MOVE CURRENT DATE INTO CURRENT VIEW MONTH
    while (isBefore(current, monthStart)) {
      switch (unit) {
        case "day":
          current = addDays(current, interval);
          break;

        case "week":
          current = addWeeks(current, interval);
          break;

        case "month":
          current = addMonths(current, interval);
          break;

        case "year":
          current = addYears(current, interval);
          break;
      }
    }

    // GENERATE ONLY CURRENT MONTH DATES
    while (current <= monthEnd) {
      // SKIP ORIGINAL SELECTED DATE
      if (current.toDateString() !== baseDate.toDateString()) {
        generated.push(new Date(current));
      }

      switch (unit) {
        case "day":
          current = addDays(current, interval);
          break;

        case "week":
          current = addWeeks(current, interval);
          break;

        case "month":
          current = addMonths(current, interval);
          break;

        case "year":
          current = addYears(current, interval);
          break;
      }
    }
  }

  // REMOVE DUPLICATES
  return Array.from(
    new Map(generated.map((d) => [d.toDateString(), d])).values(),
  );
};

export const CreateAppointment = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // USER SELECTED DATES
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  // CURRENT CALENDAR MONTH
  const [visibleMonth, setVisibleMonth] = useState(new Date());

  const [appointmentOccurrenceType, setAppointmentOccurrenceType] =
    useState<AppointmentOccurrenceType>(AppointmentOccurrenceType.ONE_TIME);

  const [isNeverEndingAppointment, setIsNeverEndingAppointment] =
    useState(false);

  const [repeatEvery, setRepeatEvery] = useState(1);

  const [repeatUnit, setRepeatUnit] = useState<RepeatUnit>("week");

  const mutation = useMutation({
    mutationFn: createAppointment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });

      navigate("/admin/appointments");
    },
  });

  // GENERATE PREVIEW DATES ONLY FOR CURRENT MONTH
  const previewDates = useMemo(() => {
    if (appointmentOccurrenceType !== AppointmentOccurrenceType.RECURRING) {
      return [];
    }

    if (!selectedDates.length) {
      return [];
    }

    return generatePreviewDatesForMonth({
      selectedDates,
      visibleMonth,
      interval: repeatEvery,
      unit: repeatUnit,
    }).filter(
      (generatedDate) =>
        !selectedDates.some(
          (selectedDate) =>
            selectedDate.toDateString() === generatedDate.toDateString(),
        ),
    );
  }, [
    selectedDates,
    visibleMonth,
    repeatEvery,
    repeatUnit,
    appointmentOccurrenceType,
  ]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const payload = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      url: formData.get("url") as string,

      startAt: formData.get("startAt") as string,

      endAt: formData.get("endAt") as string,

      appointmentOccurrenceType,

      // ONLY USER SELECTED DATES
      selectedDates,

      recurrence:
        appointmentOccurrenceType === AppointmentOccurrenceType.RECURRING
          ? {
              repeatEvery,
              repeatUnit,
              neverEnds: isNeverEndingAppointment,
            }
          : null,
    };

    console.log(payload);

    mutation.mutate(payload);
  };

  return (
    <Card className="bg-background p-5">
      <h1 className="text-3xl font-bold">Create Appointment</h1>

      <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-5">
        <InputField
          name="title"
          label="Title"
          placeholder="Eg. Monday Standup"
        />

        <TextareaField
          name="description"
          label="Description"
          placeholder="Add meeting description..."
        />

        <InputField
          name="url"
          label="Meeting URL"
          placeholder="Eg. https://meet.google.com/xxxx"
        />

        <div className="flex gap-5">
          {/* CALENDAR */}
          <Card className="w-fit p-3">
            <Calendar
              mode="multiple"
              month={visibleMonth}
              onMonthChange={setVisibleMonth}
              selected={selectedDates}
              onSelect={(dates) => setSelectedDates(dates || [])}
              className="w-full"
              modifiers={{
                preview: previewDates,
              }}
              modifiersClassNames={{
                preview:
                  "bg-primary/15 text-primary border border-dashed border-primary opacity-70",
              }}
            />
          </Card>

          {/* FORM */}
          <div className="flex flex-1 flex-col gap-5">
            <SelectField
              defaultValue={Object.values(AppointmentOccurrenceType)[0]}
              options={Object.values(AppointmentOccurrenceType)}
              label="Appointment Type"
              fieldClassName="w-1/3"
              name="appointmentType"
              onChange={(value) =>
                setAppointmentOccurrenceType(value as AppointmentOccurrenceType)
              }
            />

            <div className="flex gap-5">
              <InputField name="startAt" type="time" label="Start At" />

              <InputField name="endAt" type="time" label="End At" />
            </div>

            {appointmentOccurrenceType ===
              AppointmentOccurrenceType.RECURRING && (
              <div className="flex flex-col gap-4 rounded-lg border p-4">
                <h3 className="text-base font-bold">Recurrence Pattern</h3>

                <div className="flex items-center gap-2">
                  <p>Repeat every</p>

                  <InputField
                    type="number"
                    min={1}
                    placeholder="1"
                    value={repeatEvery}
                    onChange={(e: any) =>
                      setRepeatEvery(Number(e.target.value))
                    }
                    fieldClassName="w-24"
                  />

                  <SelectField
                    defaultValue="week"
                    options={["day", "week", "month", "year"]}
                    value={repeatUnit}
                    onChange={(value) => setRepeatUnit(value as RepeatUnit)}
                    fieldClassName="w-32"
                  />
                </div>

                <SwitchField
                  fieldClassName="w-40"
                  label="Never Ends"
                  onChange={setIsNeverEndingAppointment}
                  value={isNeverEndingAppointment}
                />

                {/* LEGEND */}
                <div className="mt-2 flex items-center gap-5 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="size-4 rounded bg-primary" />
                    <span>Selected Slots</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="size-4 rounded border border-dashed border-primary bg-primary/15" />
                    <span>Recurring Preview</span>
                  </div>
                </div>

                {/* DEBUG */}
                <p className="text-muted-foreground text-sm">
                  Selected: {selectedDates.length} | Current Month Preview:{" "}
                  {previewDates.length}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={mutation.isPending || !selectedDates.length}
          >
            {mutation.isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </Card>
  );
};
