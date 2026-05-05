import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  KeyRound,
  Mail,
  ShieldCheck,
  TimerReset,
} from "lucide-react";
import { Link } from "react-router";
import { AuthPageFrame } from "../../features/auth/components/AuthPageFrame";
import { AuthTextField } from "../../features/auth/components/AuthTextField";

const ForgotPasswordPage = () => {
  return (
    <AuthPageFrame
      eyebrow="Recover access"
      title="Forgot password"
      description="Enter your account email and we will send the next step for resetting your password."
      highlights={[
        { icon: TimerReset, label: "Quick reset" },
        { icon: ShieldCheck, label: "Verified email" },
      ]}
      cardTitle="Reset your password"
      cardDescription="We will send a verification code to your inbox."
      cardIcon={KeyRound}
      footer={
        <>
          Remembered it?{" "}
          <Link
            to="/login"
            className="text-foreground underline-offset-4 hover:underline"
          >
            Back to login
          </Link>
        </>
      }
    >
      <form className="flex flex-col gap-5">
        <AuthTextField
          id="forgot-email"
          label="Email address"
          icon={Mail}
          type="email"
          placeholder="suresh@gmail.com"
        />

        <Button type="submit" size="lg" className="h-11 w-full text-sm">
          Send reset code
          <ArrowRight className="size-4" />
        </Button>
      </form>
    </AuthPageFrame>
  );
};

export default ForgotPasswordPage;
