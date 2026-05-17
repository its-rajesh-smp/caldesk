import AppIcon from "@/assets/app-icon.png";
import { useUser } from "@/features/auth/hooks/useUser";
import { UserRole } from "@/features/auth/types/user";
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const navItemsByRole: Record<UserRole, { name: string; href: string }[]> = {
  [UserRole.USER]: [
    {
      name: "Home",
      href: "/",
    },
  ],

  [UserRole.CLINIC]: [
    {
      name: "Home",
      href: "/clinic/dashboard",
    },
    {
      name: "Users",
      href: "/clinic/users",
    },
  ],

  [UserRole.ADMIN]: [
    {
      name: "Home",
      href: "/admin/dashboard",
    },
    {
      name: "Users",
      href: "/admin/users",
    },
    {
      name: "Doctors",
      href: "/admin/doctors",
    },
    {
      name: "Clinics",
      href: "/admin/clinics",
    },
  ],

  [UserRole.DOCTOR]: [
    {
      name: "Home",
      href: "/doctor/dashboard",
    },
  ],
};

export const Header = () => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

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

      {/* Navigation */}
      <div className="flex  gap-4">
        <nav className="flex items-center gap-4">
          {navItemsByRole[user.role].map((item) => (
            <Link key={item.href} to={item.href}>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* User Avatar */}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
