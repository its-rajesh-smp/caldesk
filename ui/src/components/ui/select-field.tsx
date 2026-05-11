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
import _ from "lodash";

interface SelectFieldProps {
  label?: string;
  placeholder?: string;
  fieldDescription?: string;
  options: string[];
  defaultValue?: string;
  fieldClassName?: string;
  name?: string;
  onChange?: (value: string) => void;
  value?: string;
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
      <Select
        onValueChange={props.onChange}
        name={props.name}
        defaultValue={props.value || props.defaultValue}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent position={"popper"}>
          <SelectGroup>
            {props.options.map((option) => (
              <SelectItem key={option} value={option}>
                {_.capitalize(option)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}
