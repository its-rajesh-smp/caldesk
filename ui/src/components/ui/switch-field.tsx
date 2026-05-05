import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

interface SwitchFieldProps {
  label?: string;
  placeholder?: string;
  fieldDescription?: string;
  fieldClassName?: string;
  fieldOrientation?: "horizontal" | "vertical";
  defaultValue?: boolean;
}

export function SwitchField(props: SwitchFieldProps) {
  return (
    <Field
      orientation={props.fieldOrientation || "horizontal"}
      className={props.fieldClassName}
    >
      <FieldContent>
        <FieldLabel htmlFor="switch-focus-mode">{props.label}</FieldLabel>
        <FieldDescription>{props.fieldDescription}</FieldDescription>
      </FieldContent>
      <Switch checked={props.defaultValue} id="switch-focus-mode" />
    </Field>
  );
}
