import { CreateAppointmentCard } from "@/features/admin/components/appointment/CreateAppointmentCard";
import { getAppointments } from "@/features/appointments/apis/getAppointments";
import { useQuery } from "@tanstack/react-query";

const AllAppointments = () => {
  const { data: _data } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  return (
    <div>
      <CreateAppointmentCard />
    </div>
  );
};

export default AllAppointments;
