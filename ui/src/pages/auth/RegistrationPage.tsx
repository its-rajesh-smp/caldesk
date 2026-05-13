import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { registerUser } from "@/features/auth/apis/registerUser";
import { useAuthStore } from "@/features/auth/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  HeartPulse,
  Loader2,
  LockKeyhole,
  Mail,
  Stethoscope,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthPageFrame } from "../../features/auth/components/AuthPageFrame";
import { AuthTextField } from "../../features/auth/components/AuthTextField";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [joinAsDoctor, setJoinAsDoctor] = useState(false);

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setAuth(data);
      navigate(joinAsDoctor ? "/admin/appointments/create" : "/admin/appointments");
    },
  });

  const onRegister = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    registerMutation.mutate({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      joinAsDoctor,
    });
  };

  return (
    <AuthPageFrame
      eyebrow="Healthcare access"
      title="Create account"
      description="Join CalDesk as a patient booking care or as a doctor opening consultation slots."
      highlights={[
        { icon: CalendarDays, label: "Book faster" },
        { icon: ShieldCheck, label: "Private by design" },
      ]}
      cardTitle="Start with CalDesk Health"
      cardDescription="Choose your care role and continue."
      cardIcon={HeartPulse}
      footer={
        <>
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-foreground underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={onRegister} className="flex flex-col gap-5">
        <AuthTextField
          id="register-name"
          name="name"
          label="Full name"
          icon={UserRound}
          placeholder="Dr. Aisha Sharma"
        />
        <AuthTextField
          id="register-email"
          name="email"
          label="Email address"
          icon={Mail}
          type="email"
          placeholder="suresh@gmail.com"
        />
        <AuthTextField
          id="register-password"
          name="password"
          label="Password"
          icon={LockKeyhole}
          type="password"
          placeholder="Create a strong password"
        />
        <AuthTextField
          id="register-confirm-password"
          name="confirmPassword"
          label="Confirm password"
          icon={CheckCircle2}
          type="password"
          placeholder="Repeat your password"
        />

        <label className="group flex cursor-pointer items-center justify-between gap-4 border border-border bg-muted/40 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted">
          <span className="flex min-w-0 items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center border border-border bg-background">
              <Stethoscope className="size-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium">Join as Doctor</span>
              <span className="mt-1 block text-xs text-muted-foreground">
                Create consultations and publish multiple slots.
              </span>
            </span>
          </span>
          <Switch checked={joinAsDoctor} onCheckedChange={setJoinAsDoctor} />
        </label>

        {registerMutation.isError && (
          <p className="border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
            Could not create account. Please check your details and try again.
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={registerMutation.isPending}
          className="h-11 w-full text-sm transition-transform duration-300 hover:-translate-y-0.5"
        >
          {registerMutation.isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <ArrowRight className="size-4" />
          )}
          {registerMutation.isPending ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </AuthPageFrame>
  );
};

export default RegistrationPage;
