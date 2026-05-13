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
  onChange?: (value: boolean) => void;
  value?: boolean;
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
      <Switch
        onCheckedChange={(checked) => {
          if (props.onChange) {
            props.onChange(checked);
          }
        }}
        checked={props.value}
        id="switch-focus-mode"
      />
    </Field>
  );
}
