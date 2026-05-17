import { Button } from "@/components/ui/button";
import { registerUser } from "@/features/auth/apis/registerUser";
import { useAuthStore } from "@/features/auth/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { AuthPageFrame } from "../../features/auth/components/AuthPageFrame";
import { AuthTextField } from "../../features/auth/components/AuthTextField";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setAuth(data);
      navigate("/");
    },
  });

  const onClick = (e: React.SubmitEvent) => {
    try {
      e.preventDefault();

      const formData = new FormData(e.target);

      registerMutation.mutateAsync({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });
    } catch (error) {
      console.error(error);
    }
  };

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
      <form onSubmit={onClick} className="flex flex-col gap-5">
        <AuthTextField
          id="register-name"
          label="Full name"
          icon={UserRound}
          placeholder="Suresh Kumar"
          name="name"
        />
        <AuthTextField
          id="register-email"
          label="Email address"
          icon={Mail}
          type="email"
          placeholder="suresh@gmail.com"
          name="email"
        />
        <AuthTextField
          id="register-password"
          label="Password"
          icon={LockKeyhole}
          type="password"
          placeholder="Create a strong password"
          name="password"
        />

        <Button
          loading={registerMutation.isPending}
          type="submit"
          size="lg"
          className="h-11 w-full text-sm"
        >
          Create account
          <ArrowRight className="size-4" />
        </Button>
      </form>
    </AuthPageFrame>
  );
};

export default RegistrationPage;
