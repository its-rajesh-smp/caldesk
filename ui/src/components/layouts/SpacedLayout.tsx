import { cn } from "@/lib/utils";
import { Outlet } from "react-router";

type SpacedLayoutProps = {
  children?: React.ReactNode;
  spacingType?: "auth" | "default";
  header?: React.ReactNode;
};

export const SpacedLayout = ({
  children,
  spacingType,
  header,
}: SpacedLayoutProps) => {
  return (
    <div className="w-screen md:justify-center flex">
      <div
        className={cn(
          "md:w-5xl w-full flex flex-col gap-5 p-3 md:py-5",
          spacingType === "auth" && "md:w-lg",
        )}
      >
        {header}
        {children && children}
        {!children && <Outlet />}
      </div>
    </div>
  );
};
