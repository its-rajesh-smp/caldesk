import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { router } from "./routes";

const queryClient = new QueryClient();

{
  /* <div className="w-screen h-screen bg-accent-foreground justify-center flex">
  <div className="w-1/2 flex flex-col  gap-5 py-5 ">
    <Header />
    <CreateAppointment />
  </div>
</div> */
}

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
