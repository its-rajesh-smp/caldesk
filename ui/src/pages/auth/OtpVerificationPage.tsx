import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Clock3,
  KeyRound,
  MailCheck,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router";
import { AuthPageFrame } from "../../features/auth/components/AuthPageFrame";

const otpInputIds = [
  "otp-code-1",
  "otp-code-2",
  "otp-code-3",
  "otp-code-4",
  "otp-code-5",
  "otp-code-6",
];

const OtpVerificationPage = () => {
  return (
    <AuthPageFrame
      eyebrow="Check your inbox"
      title="OTP verification"
      description="Enter the six digit code sent to your email to finish securing your account."
      highlights={[
        { icon: Clock3, label: "Expires soon" },
        { icon: ShieldCheck, label: "One-time code" },
      ]}
      cardTitle="Verify your email"
      cardDescription="Use the OTP code sent to your registered email."
      cardIcon={MailCheck}
      footer={
        <>
          Wrong email?{" "}
          <Link
            to="/forgot-password"
            className="text-foreground underline-offset-4 hover:underline"
          >
            Change address
          </Link>
        </>
      }
    >
      <form className="flex flex-col gap-5">
        <div className="space-y-2">
          <label className="text-xs font-medium" htmlFor={otpInputIds[0]}>
            Verification code
          </label>
          <div className="grid grid-cols-6 gap-2">
            {otpInputIds.map((id) => (
              <Input
                key={id}
                id={id}
                inputMode="numeric"
                maxLength={1}
                className="h-11 px-0 text-center text-base font-semibold"
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <KeyRound className="size-4 text-foreground" />
            Code not received?
          </span>
          <Button variant="link" size="xs" type="button" className="h-auto p-0">
            Resend
          </Button>
        </div>

        <Button type="submit" size="lg" className="h-11 w-full text-sm">
          Verify code
          <ArrowRight className="size-4" />
        </Button>
      </form>
    </AuthPageFrame>
  );
};

export default OtpVerificationPage;
