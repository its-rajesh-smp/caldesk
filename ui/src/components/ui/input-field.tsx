import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldLabel } from "./field";
import type { HTMLInputTypeAttribute } from "react";

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  fieldDescription?: string;
  fieldClassName?: string;
  defaultValue?: string;
  type?: HTMLInputTypeAttribute;
  name?: string;
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
        type={props.type || "text"}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        name={props.name}
      />
      {props.fieldDescription && (
        <FieldDescription>{props.fieldDescription}</FieldDescription>
      )}
    </Field>
  );
}
