import { Button } from "@/components/ui/button";
import { loginUser } from "@/features/auth/apis/loginUser";
import { useAuthStore } from "@/features/auth/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { AuthPageFrame } from "../../features/auth/components/AuthPageFrame";
import { AuthTextField } from "../../features/auth/components/AuthTextField";

const highlights = [
  { icon: CalendarDays, label: "Smart calendar" },
  { icon: ShieldCheck, label: "Secure access" },
];

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAuth(data);
      navigate("/");
    },
  });

  const onLoginBtnClick = (e: React.SubmitEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    loginMutation.mutateAsync({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
  };

  return (
    <AuthPageFrame
      eyebrow="Welcome back"
      title="Login"
      description="Pick up right where you left off and keep your appointment desk moving."
      highlights={highlights}
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
      <form onSubmit={onLoginBtnClick} className="flex flex-col gap-5">
        <AuthTextField
          id="email"
          name="email"
          label="Email address"
          icon={Mail}
          type="email"
          placeholder="suresh@gmail.com"
        />

        <AuthTextField
          id="password"
          name="password"
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

        <Button type="submit" size="lg" className="h-11 w-full text-sm">
          Continue
          <ArrowRight className="size-4" />
        </Button>
      </form>
    </AuthPageFrame>
  );
};

export default LoginPage;
