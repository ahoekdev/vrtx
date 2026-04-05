import { actions } from "astro:actions";
import { FormProvider, useForm } from "react-hook-form";
import type { User } from "../../../types/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "astro/zod";
import { TextInput } from "../../../components/client/form/TextInput";
import { SelectInput } from "../../../components/client/form/SelectInput";
import { Form } from "../../../components/client/form/Form";

const countriesMap = [
  { code: "AT", name: "Austria" },
  { code: "CH", name: "Switzerland" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IT", name: "Italy" },
  { code: "LI", name: "Liechtenstein" },
  { code: "SI", name: "Slovenia" },
];

const formResolver = zodResolver(
  z.object({
    name: z.string().min(1, "Name is required"),
    country: z
      .string()
      .refine(
        (value) => countriesMap.some(({ code }) => code === value),
        "Country is required",
      ),
    keeperId: z.uuidv4("Keeper is required"),
  }),
);

interface CreateLodgeFormProps {
  keepers: User[];
}

export function CreateLodgeForm({ keepers }: CreateLodgeFormProps) {
  const form = useForm({
    defaultValues: { name: "", country: "", keeperId: "" },
    resolver: formResolver,
  });

  return (
    <FormProvider {...form}>
      <Form onSubmit={actions.createLodge}>
        <TextInput name="name" placeholder="Name" />

        <SelectInput
          name="country"
          placeholder="Country"
          options={countriesMap.map(({ code, name }) => ({
            value: code,
            label: name,
          }))}
        />

        <SelectInput
          name="keeperId"
          placeholder="Keeper"
          options={keepers.map(({ id, email }) => ({
            value: id,
            label: email,
          }))}
        />
      </Form>
    </FormProvider>
  );
}
