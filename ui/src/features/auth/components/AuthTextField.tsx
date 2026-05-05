import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LucideIcon } from "lucide-react";
import type { HTMLInputTypeAttribute, ReactNode } from "react";

interface AuthTextFieldProps {
  id: string;
  label: string;
  icon: LucideIcon;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  action?: ReactNode;
  name?: string;
}

export function AuthTextField(props: AuthTextFieldProps) {
  const Icon = props.icon;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={props.id}>{props.label}</Label>
        {props.action}
      </div>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          name={props.name}
          id={props.id}
          type={props.type || "text"}
          placeholder={props.placeholder}
          className="h-10 pl-10 text-sm"
        />
      </div>
    </div>
  );
}
