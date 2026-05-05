import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import AppIcon from "@/assets/app-icon.png";

export const Header = () => {
  return (
    <header className="flex justify-between items-center">
      {/* Brand Menu */}
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={AppIcon} />
          <AvatarFallback>CD</AvatarFallback>
        </Avatar>
        <h2 className="font-heading">CalDesk</h2>
      </div>

      {/* User Avatar */}
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  );
};
