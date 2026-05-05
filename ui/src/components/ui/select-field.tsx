"use client";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectFieldProps {
  label?: string;
  placeholder?: string;
  fieldDescription?: string;
  options: string[];
  defaultValue?: string;
  fieldClassName?: string;
  name?: string;
}

export function SelectField(props: SelectFieldProps) {
  return (
    <Field className={props.fieldClassName}>
      {props.label && (
        <FieldLabel htmlFor="align-item">{props.label}</FieldLabel>
      )}
      {props.fieldDescription && (
        <FieldDescription>{props.fieldDescription}</FieldDescription>
      )}
      <Select name={props.name} defaultValue={props.defaultValue}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent position={"popper"}>
          <SelectGroup>
            {props.options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}
