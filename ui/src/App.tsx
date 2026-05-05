import { Header } from "./components/Header";
import { CreateAppointment } from "./pages/admin/CreateAppointment";

export const App = () => {
  return (
    <div className="w-screen h-screen bg-accent-foreground justify-center flex">
      <div className="w-1/2 flex flex-col  gap-5 py-5 ">
        <Header />
        {/* <AllAppointments /> */}
        <CreateAppointment />
      </div>
    </div>
  );
};
