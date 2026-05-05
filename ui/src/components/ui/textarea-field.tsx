import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

interface TextareaFieldProps {
  label?: string;
  placeholder?: string;
  fieldDescription?: string;
  name?: string;
}

export function TextareaField(props: TextareaFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor="textarea-message">{props.label}</FieldLabel>
      <FieldDescription>{props.fieldDescription}</FieldDescription>
      <Textarea
        name={props.name}
        id="textarea-message"
        placeholder={props.placeholder}
      />
    </Field>
  );
}
