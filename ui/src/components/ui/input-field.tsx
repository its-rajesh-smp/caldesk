import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldLabel } from "./field";

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  fieldDescription?: string;
}

export function InputField(props: InputFieldProps) {
  return (
    <Field>
      {props.label && (
        <FieldLabel htmlFor={`input-field-${props.label}`}>
          {props.label}
        </FieldLabel>
      )}

      <Input
        id={`input-field-${props.label}`}
        type="text"
        placeholder={props.placeholder}
      />
      {props.fieldDescription && (
        <FieldDescription>{props.fieldDescription}</FieldDescription>
      )}
    </Field>
  );
}
