import { ListPlusSVG } from "@/components/svg/ListPlusSvg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

export const CreateAppointmentCard = () => {
  return (
    <Card className="flex flex-col items-center justify-center gap-5 p-10 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
        <ListPlusSVG size={28} />
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-base font-medium">No appointments yet</h3>
        <p className="text-sm text-muted-foreground">
          Create your first appointment to get started.
          <br />
          It only takes a few seconds.
        </p>
      </div>
      <Button className="gap-1.5">
        <Plus size={14} strokeWidth={2.5} />
        Create appointment
      </Button>
    </Card>
  );
};
