import type { User } from "../../types/User";

const alpineCountryCodes = ["AT", "CH", "DE", "FR", "IT", "LI", "SI"] as const;

const countriesMap = [
  { code: "AT", name: "Austria" },
  { code: "CH", name: "Switzerland" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IT", name: "Italy" },
  { code: "LI", name: "Liechtenstein" },
  { code: "SI", name: "Slovenia" },
];

interface CreateLodgeFormProps {
  keepers: User[];
}

export function CreateLodgeForm({ keepers }: CreateLodgeFormProps) {
  return (
    <form className="flex flex-col gap-4">
      <input
        type="text"
        name="name"
        className="border border-gray-300 px-2 rounded-md w-full h-10"
        placeholder="name"
      />

      <select
        name="country"
        className="border border-gray-300 px-2 rounded-md w-full h-10"
      >
        {countriesMap.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>

      <select
        name="keeperId"
        className="border border-gray-300 px-2 rounded-md w-full h-10"
      >
        {keepers.map((keeper) => (
          <option key={keeper.id} value={keeper.id}>
            {keeper.email}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Lodge
      </button>
    </form>
  );
}
