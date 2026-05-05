import { Outlet } from "react-router";

export const SpacedLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="w-screen md:justify-center flex">
      <div className="md:w-lg w-full flex flex-col gap-5 p-3 md:py-5">
        {children && children}
        {!children && <Outlet />}
      </div>
    </div>
  );
};
