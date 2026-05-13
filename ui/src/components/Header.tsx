import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import AppIcon from "@/assets/app-icon.png";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router";
import { useAuthStore } from "@/features/auth/stores/useAuthStore";
import { UserType } from "@/features/auth/types/user";
import { CalendarCheck2, HeartPulse, LogOut, Plus } from "lucide-react";

export const Header = () => {
  const location = useLocation();
  const { user, clearAuth } = useAuthStore();
  const isDoctor = user?.role === UserType.DOCTOR || user?.role === UserType.ADMIN;
  const isCreatingSlots = location.pathname === "/admin/appointments/create";

  return (
    <header className="flex flex-col gap-3 border border-border bg-background p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <Link to="/" className="flex min-w-0 items-center gap-2">
        <Avatar className="shrink-0 rounded-none after:hidden">
          <AvatarImage src={AppIcon} className="rounded-none object-contain" />
          <AvatarFallback>CD</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h2 className="font-heading text-sm font-semibold">CalDesk Health</h2>
          <p className="hidden text-xs text-muted-foreground sm:block">
            Doctor-led consultation booking
          </p>
        </div>
      </Link>

      <div className="flex flex-wrap items-center gap-2">
        {isDoctor && !isCreatingSlots && (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="gap-2"
            aria-label="Add consultation slots"
            title="Add consultation slots"
          >
            <Link to="/admin/appointments/create">
              <Plus className="size-4" />
              Add New Slot
            </Link>
          </Button>
        )}
        {user ? (
          <>
            <Button asChild variant="outline" className="gap-2">
              <Link to="/my-bookings">
                <CalendarCheck2 className="size-4" />
                My bookings
              </Link>
            </Button>
            <span className="flex min-w-0 items-center gap-2 border border-border bg-muted px-3 py-2 text-xs">
              <HeartPulse className="size-3.5 text-emerald-700" />
              <span className="truncate">{user.name || user.email}</span>
            </span>
            <Button variant="ghost" size="icon" aria-label="Logout" onClick={clearAuth}>
              <LogOut className="size-4" />
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Register</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
};
