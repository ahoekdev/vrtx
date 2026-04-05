import { useFormContext, type FieldValues, type Path } from "react-hook-form";

type SelectInputProps<T extends FieldValues> = {
  name: Path<T>;
  placeholder?: string;
  options: { value: string; label: string }[];
};

export function SelectInput<T extends FieldValues>({
  name,
  placeholder,
  options,
}: SelectInputProps<T>) {
  const form = useFormContext<T>();

  const error = form.formState.errors[name]?.message as string | undefined;

  return (
    <>
      <select
        {...form.register(name)}
        className="border border-gray-300 px-2 rounded-md w-full h-10"
      >
        <option value="">Select a {placeholder?.toLocaleLowerCase()}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
