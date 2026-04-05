import { useFormContext, type FieldValues, type Path } from "react-hook-form";

type TextInputProps<T extends FieldValues> = {
  name: Path<T>;
  placeholder?: string;
};

export function TextInput<T extends FieldValues>({
  name,
  placeholder,
}: TextInputProps<T>) {
  const { register, formState } = useFormContext<T>();

  const error = formState.errors[name]?.message as string | undefined;

  return (
    <>
      <input
        type="text"
        className="border border-gray-300 px-2 rounded-md w-full h-10"
        placeholder={placeholder}
        {...register(name)}
      />
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
