import { actions } from "astro:actions";
import { useState } from "react";
import type { Lodge } from "../../../../types/Lodge";
import { TrashIcon } from "../../icons/TrashIcon";

interface LodgeListProps {
  lodges: Lodge[];
}

type DeleteState = {
  pendingId: string | null;
  errorMessage: string | null;
};

export function LodgeList({ lodges }: LodgeListProps) {
  const [items, setItems] = useState(lodges);
  const [deleteState, setDeleteState] = useState<DeleteState>({
    pendingId: null,
    errorMessage: null,
  });

  const isDeleting = deleteState.pendingId !== null;

  async function handleDelete(id: string) {
    if (isDeleting) {
      return;
    }

    setDeleteState({
      pendingId: id,
      errorMessage: null,
    });

    const result = await actions.deleteLodge({ id });

    if (result.error) {
      setDeleteState({
        pendingId: null,
        errorMessage: getDeleteErrorMessage(result.error.code),
      });
      return;
    }

    setItems((currentItems) => currentItems.filter((lodge) => lodge.id !== id));
    setDeleteState({ pendingId: null, errorMessage: null });
  }

  if (items.length === 0) {
    return <p>No lodges found.</p>;
  }

  return (
    <>
      {deleteState.errorMessage ? <p>{deleteState.errorMessage}</p> : null}

      <ul className="flex flex-col gap-3">
        {items.map((lodge) => (
          <li
            key={lodge.id}
            className="flex items-center justify-between gap-4 border border-gray-200 rounded-md p-3"
          >
            <div>
              <strong>{lodge.name}</strong> <span>{lodge.country}</span>
            </div>

            <button
              type="button"
              onClick={() => void handleDelete(lodge.id)}
              disabled={isDeleting}
              className="border bg-red-50 rounded-md px-4 py-2 text-red-800 hover:opacity-80 transition-opacity cursor-pointer disabled:text-gray-800 disabled:bg-gray-50"
            >
              <TrashIcon />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

function getDeleteErrorMessage(code: string | undefined) {
  if (code === "NOT_FOUND") {
    return "This lodge no longer exists.";
  }

  if (code === "CONFLICT") {
    return "This lodge cannot be deleted while it is still in use.";
  }

  return "Unable to delete this lodge right now.";
}
