import { useFormContext, type FieldValues } from "react-hook-form";

interface FormProps<T extends FieldValues> {
  children: React.ReactNode;
  onSubmit: (values: T) => void;
}

export function Form<T extends FieldValues>({
  children,
  onSubmit,
}: FormProps<T>) {
  const form = useFormContext<T>();
  const disabled = !form.formState.isValid || form.formState.isSubmitting;

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {children}

      <button
        type="submit"
        disabled={disabled}
        className="border border-gray-300 h-10 rounded-md disabled:text-gray-400"
      >
        {form.formState.isSubmitting ? "Saving..." : "Create Lodge"}
      </button>
    </form>
  );
}
