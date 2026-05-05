import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router";
import { AuthPageFrame } from "../../features/auth/components/AuthPageFrame";
import { AuthTextField } from "../../features/auth/components/AuthTextField";

const LoginPage = () => {
  return (
    <AuthPageFrame
      eyebrow="Welcome back"
      title="Login"
      description="Pick up right where you left off and keep your appointment desk moving."
      highlights={[
        { icon: CalendarDays, label: "Smart calendar" },
        { icon: ShieldCheck, label: "Secure access" },
      ]}
      cardTitle="Sign in to Caldesk"
      cardDescription="Use your workspace email and password."
      cardIcon={CheckCircle2}
      footer={
        <>
          New to Caldesk?{" "}
          <Link
            to="/register"
            className="text-foreground underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form className="flex flex-col gap-5">
        <AuthTextField
          id="login-email"
          label="Email address"
          icon={Mail}
          type="email"
          placeholder="suresh@gmail.com"
        />

        <AuthTextField
          id="login-password"
          label="Password"
          icon={LockKeyhole}
          type="password"
          placeholder="Enter your password"
          action={
            <Button variant="link" size="xs" asChild className="h-auto p-0">
              <Link to="/forgot-password">Forgot password?</Link>
            </Button>
          }
        />

        <label
          htmlFor="remember-device"
          className="flex items-center gap-2 text-xs text-muted-foreground"
        >
          <input
            id="remember-device"
            type="checkbox"
            className="size-3.5 border border-input accent-foreground"
          />
          Remember this device
        </label>

        <Button type="submit" size="lg" className="h-11 w-full text-sm">
          Continue
          <ArrowRight className="size-4" />
        </Button>
      </form>
    </AuthPageFrame>
  );
};

export default LoginPage;
