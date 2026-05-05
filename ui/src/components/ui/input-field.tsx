import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldLabel } from "./field";

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  fieldDescription?: string;
  fieldClassName?: string;
  defaultValue?: string;
}

export function InputField(props: InputFieldProps) {
  return (
    <Field className={props.fieldClassName}>
      {props.label && (
        <FieldLabel htmlFor={`input-field-${props.label}`}>
          {props.label}
        </FieldLabel>
      )}

      <Input
        id={`input-field-${props.label}`}
        type="text"
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
      />
      {props.fieldDescription && (
        <FieldDescription>{props.fieldDescription}</FieldDescription>
      )}
    </Field>
  );
}
