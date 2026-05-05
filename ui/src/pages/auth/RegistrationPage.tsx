import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Link } from "react-router";
import { AuthPageFrame } from "../../features/auth/components/AuthPageFrame";
import { AuthTextField } from "../../features/auth/components/AuthTextField";

const RegistrationPage = () => {
  return (
    <AuthPageFrame
      eyebrow="Start organized"
      title="Register"
      description="Create your workspace account and keep bookings, teams, and appointment flow together."
      highlights={[
        { icon: CalendarDays, label: "Fast setup" },
        { icon: ShieldCheck, label: "Private workspace" },
      ]}
      cardTitle="Create your Caldesk account"
      cardDescription="Add your details to get started."
      cardIcon={CheckCircle2}
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
      <form className="flex flex-col gap-5">
        <AuthTextField
          id="register-name"
          label="Full name"
          icon={UserRound}
          placeholder="Suresh Kumar"
        />
        <AuthTextField
          id="register-workspace"
          label="Workspace name"
          icon={Building2}
          placeholder="Caldesk Clinic"
        />
        <AuthTextField
          id="register-email"
          label="Email address"
          icon={Mail}
          type="email"
          placeholder="suresh@gmail.com"
        />
        <AuthTextField
          id="register-password"
          label="Password"
          icon={LockKeyhole}
          type="password"
          placeholder="Create a strong password"
        />

        <Button type="submit" size="lg" className="h-11 w-full text-sm">
          Create account
          <ArrowRight className="size-4" />
        </Button>
      </form>
    </AuthPageFrame>
  );
};

export default RegistrationPage;
