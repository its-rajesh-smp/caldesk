import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

interface TextareaFieldProps {
  label?: string;
  placeholder?: string;
  fieldDescription?: string;
}

export function TextareaField(props: TextareaFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor="textarea-message">{props.label}</FieldLabel>
      <FieldDescription>{props.fieldDescription}</FieldDescription>
      <Textarea id="textarea-message" placeholder={props.placeholder} />
    </Field>
  );
}
