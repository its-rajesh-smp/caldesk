import { Outlet } from "react-router";

export const SpacedLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen bg-accent-foreground justify-center flex">
      <div className="w-1/4 flex flex-col gap-5 py-5 ">
        {children && children}
        {!children && <Outlet />}
      </div>
    </div>
  );
};
