import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picket";
import { InputField } from "@/components/ui/input-field";
import { SelectField } from "@/components/ui/select-field";
import { SwitchField } from "@/components/ui/switch-field";
import { TextareaField } from "@/components/ui/textarea-field";

const AppointmentTypes = ["One Time", "Recurring"];

export const CreateAppointment = () => {
  return (
    <Card className="bg-background p-5">
      <h1 className="text-3xl font-bold">Create Appointment</h1>
      <form className=" flex flex-col gap-5">
        <InputField label="Title" placeholder="Eg. Monday Standup" />
        <TextareaField
          label="Description"
          placeholder="Add meeting description..."
        />
        <InputField
          label="Meeting URL"
          placeholder="Eg. https://meet.google.com/czm-ftxb-enb"
        />
        <div className="flex gap-5">
          <Card className="w-1/3">
            <Calendar className="w-full" mode="single" />
          </Card>
          <div className="flex-1 flex flex-col gap-5">
            <SelectField
              defaultValue={AppointmentTypes[0]}
              options={AppointmentTypes}
              label="Appointment Type"
              fieldClassName="w-1/3"
            />
            <h3 className="font-bold text-base">Recurrence Pattern</h3>
            <div className="flex flex-row items-center gap-2">
              <p>Repeat every</p>
              <InputField
                placeholder="1"
                defaultValue="1"
                fieldClassName="w-20"
              />
              <SelectField
                defaultValue="day"
                options={["day", "week", "month", "year"]}
                fieldClassName="w-32"
              />
            </div>

            <div className="flex flex-col gap-4">
              <SwitchField
                defaultValue={true}
                fieldClassName="w-32"
                label="Never Ends"
              />
              <DatePicker fieldClassName="w-fit gap-2" label="Ends After" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button>Create</Button>
        </div>
      </form>
    </Card>
  );
};
