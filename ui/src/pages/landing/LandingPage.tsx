import appIcon from "@/assets/app-icon.png";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Globe2,
  LockKeyhole,
  Mail,
  MonitorPlay,
  Route,
  ShieldCheck,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const eventTypes = ["15m", "30m", "45m", "1h"];
const calendarDates = Array.from({ length: 31 }, (_, index) => index + 1);

const featureSections = [
  {
    icon: CalendarDays,
    title: "Connect your calendar",
    description: "CalDesk checks availability before anyone can book.",
    rows: ["Google Calendar", "Outlook Calendar", "No double bookings"],
  },
  {
    icon: Route,
    title: "Route every booking",
    description: "Send leads, interviews, demos, or support calls to the right host.",
    rows: ["Round robin", "Team events", "Qualification forms"],
  },
  {
    icon: Bell,
    title: "Automate follow-ups",
    description: "Confirmations, reminders, and reschedule flows stay handled.",
    rows: ["Email reminders", "Cancel links", "Reschedule links"],
  },
];

const moreFeatures: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Payments",
    description: "Charge for paid sessions and deposits.",
    icon: CreditCard,
  },
  {
    title: "Video calls",
    description: "Attach meeting links automatically.",
    icon: Video,
  },
  {
    title: "Embeds",
    description: "Put booking pages inside any website.",
    icon: MonitorPlay,
  },
  {
    title: "Privacy",
    description: "Keep account and booking data protected.",
    icon: ShieldCheck,
  },
];

const LandingPage = () => {
  return (
    <main className="flex min-w-0 flex-col gap-8 pb-10">
      <nav className="flex items-center justify-between border border-border bg-background p-3 shadow-sm">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <img src={appIcon} alt="CalDesk" className="size-8 shrink-0" />
          <span className="font-heading text-sm font-semibold">CalDesk</span>
        </Link>

        <div className="hidden items-center gap-5 text-xs text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground">
            Features
          </a>
          <a href="#workflows" className="hover:text-foreground">
            Workflows
          </a>
          <a href="#apps" className="hover:text-foreground">
            Apps
          </a>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/register">Get started</Link>
          </Button>
        </div>
      </nav>

      <section className="grid gap-6 border border-border bg-background p-4 shadow-sm md:grid-cols-[0.86fr_1.14fr] md:p-6">
        <div className="flex min-w-0 flex-col justify-center gap-7 py-4 md:py-10">
          <div className="w-fit border border-border bg-muted px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Scheduling infrastructure
          </div>
          <div>
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight md:text-6xl">
              The better way to schedule meetings.
            </h1>
            <p className="mt-5 max-w-lg text-sm/7 text-muted-foreground md:text-base/7">
              Create booking links, manage availability, route team calls, and
              collect payments from one clean scheduling platform.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild className="h-11 gap-2">
              <Link to="/register">
                Sign up with email
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="h-11">
              <Link to="/login">Book a demo</Link>
            </Button>
          </div>

          <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-3">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-700" />
              No credit card
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-700" />
              Free to start
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-700" />
              Team-ready
            </span>
          </div>
        </div>

        <Card className="overflow-hidden py-0">
          <div className="grid border-b border-border md:grid-cols-[0.78fr_1fr]">
            <div className="border-b border-border p-4 md:border-b-0 md:border-r">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center border border-border bg-muted">
                  CD
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Riya Sharma</p>
                  <h2 className="text-lg font-semibold">Product Demo</h2>
                </div>
              </div>
              <p className="text-xs/6 text-muted-foreground">
                A quick walkthrough of CalDesk for teams, founders, and service
                operators.
              </p>
              <div className="mt-4 grid gap-2 text-xs">
                <span className="flex items-center gap-2">
                  <Video className="size-4 text-muted-foreground" />
                  CalDesk Video
                </span>
                <span className="flex items-center gap-2">
                  <Globe2 className="size-4 text-muted-foreground" />
                  Asia/Kolkata
                </span>
                <span className="flex items-center gap-2">
                  <CreditCard className="size-4 text-muted-foreground" />
                  $29 deposit
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {eventTypes.map((type) => (
                  <span key={type} className="border border-border px-3 py-2 text-xs">
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    May
                  </p>
                  <h3 className="text-xl font-semibold">2026</h3>
                </div>
                <span className="border border-border bg-muted px-2 py-1 text-xs">
                  Overlay calendar
                </span>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {days.map((day) => (
                  <span key={day} className="py-1 text-muted-foreground">
                    {day}
                  </span>
                ))}
                {calendarDates.map((date) => {
                  const available = [6, 7, 13, 14, 20, 21, 27, 28].includes(date);
                  const selected = date === 14;
                  return (
                    <span
                      key={date}
                      className={`border py-2 ${
                        selected
                          ? "border-foreground bg-foreground text-background"
                          : available
                            ? "border-border bg-muted text-foreground"
                            : "border-transparent text-muted-foreground"
                      }`}
                    >
                      {date}
                    </span>
                  );
                })}
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {["10:00 AM", "10:30 AM", "11:00 AM", "2:30 PM"].map((time) => (
                  <button
                    key={time}
                    className="border border-border bg-background px-3 py-2 text-left text-xs hover:bg-muted"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3 bg-muted/40 p-4 sm:grid-cols-3">
            <div className="border border-border bg-background p-3">
              <p className="text-xs text-muted-foreground">Bookings</p>
              <strong className="mt-1 block text-2xl">2,430</strong>
            </div>
            <div className="border border-border bg-background p-3">
              <p className="text-xs text-muted-foreground">Revenue</p>
              <strong className="mt-1 block text-2xl">$18k</strong>
            </div>
            <div className="border border-border bg-background p-3">
              <p className="text-xs text-muted-foreground">Show rate</p>
              <strong className="mt-1 block text-2xl">94%</strong>
            </div>
          </div>
        </Card>
      </section>

      <section className="border-y border-border py-4">
        <p className="text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Scheduling for sales, recruiting, support, education, healthcare, and creators
        </p>
      </section>

      <section id="features" className="grid gap-5 md:grid-cols-[0.85fr_1.15fr]">
        <div className="border border-border bg-background p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold">
            Setup once. Let people book the right time.
          </h2>
          <p className="mt-3 text-sm/7 text-muted-foreground">
            CalDesk handles the boring parts: calendar checks, booking links,
            reminders, payments, and team routing.
          </p>
        </div>

        <div className="grid gap-3">
          {featureSections.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="gap-4 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center border border-border bg-muted">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">0{index + 1}</p>
                      <h3 className="mt-1 text-lg font-semibold">{feature.title}</h3>
                      <p className="mt-1 text-sm/6 text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  {feature.rows.map((row) => (
                    <span key={row} className="border border-border px-3 py-2 text-xs">
                      {row}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section
        id="workflows"
        className="grid gap-4 border border-border bg-background p-4 md:grid-cols-[1fr_1fr]"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Workflows
          </p>
          <h2 className="mt-3 text-3xl font-semibold">Bookings should run themselves.</h2>
          <p className="mt-3 max-w-md text-sm/7 text-muted-foreground">
            Send confirmations, collect intake details, remind attendees, and
            let them reschedule without messaging you.
          </p>
        </div>
        <div className="grid gap-2">
          {[
            {
              title: "New booking confirmed",
              detail: "Send email + calendar invite",
              icon: Mail,
            },
            {
              title: "Meeting starts in 15 mins",
              detail: "Send reminder",
              icon: Bell,
            },
            {
              title: "Paid consultation booked",
              detail: "Capture payment receipt",
              icon: CreditCard,
            },
          ].map(({ title, detail, icon: Icon }) => (
            <div
              key={title}
              className="grid grid-cols-[auto_1fr] gap-3 border border-border bg-muted/40 p-3"
            >
              <div className="flex size-8 items-center justify-center border border-border bg-background">
                <Icon className="size-4" />
              </div>
              <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="apps" className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        {moreFeatures.map(({ title, description, icon: Icon }) => (
          <div key={title} className="border border-border bg-background p-4">
            <Icon className="mb-3 size-5" />
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="mt-1 text-xs/6 text-muted-foreground">{description}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 border border-border bg-foreground p-5 text-background md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="text-2xl font-semibold">Start scheduling with CalDesk.</h2>
          <p className="mt-2 text-sm/6 text-background/70">
            Create event types, share your booking page, and manage meetings in
            one place.
          </p>
        </div>
        <Button variant="secondary" asChild className="h-10 w-fit gap-2">
          <Link to="/register">
            Get started
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </section>

      <footer className="grid gap-5 border border-border bg-background p-4 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <img src={appIcon} alt="CalDesk" className="size-7" />
            <span className="text-sm font-semibold">CalDesk</span>
          </div>
          <p className="max-w-md text-xs/6 text-muted-foreground">
            Scheduling links, event types, calendar availability, payments,
            routing, and reminders for modern teams.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <Link to="/login" className="hover:text-foreground">
              Login
            </Link>
            <Link to="/register" className="hover:text-foreground">
              Register
            </Link>
            <Link to="/admin/appointments" className="hover:text-foreground">
              Dashboard
            </Link>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <LockKeyhole className="size-3.5" />
            Secure scheduling workspace
          </div>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
