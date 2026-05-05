import { getAppointments } from "@/features/appointments/apis/getAppointments";
import { useQuery } from "@tanstack/react-query";

const LandingPage = () => {
  const { data: _data } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
};

export default LandingPage;
