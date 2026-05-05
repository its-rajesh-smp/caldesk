import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InputField } from "@/components/ui/input-field";
import { SelectField } from "@/components/ui/select-field";
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
        <SelectField
          defaultValue={AppointmentTypes[0]}
          options={AppointmentTypes}
          label="Appointment Type"
          fieldClassName="w-1/3"
        />
        <div className="flex justify-end">
          <Button>Create</Button>
        </div>
      </form>
    </Card>
  );
};
