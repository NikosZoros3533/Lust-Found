import { useMutation } from "@tanstack/react-query";
import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteNotifications, queryClient } from "../../fetchFunctions";

export default function ClearButton({ disabled }) {
  const { mutate } = useMutation({
    mutationFn: deleteNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Updated Succesfully");
    },
  });

  function handleClear() {
    mutate();
  }
  return (
    <button
      className="flex flex-row items-center mt-4 bg-dark text-light1 cursor-pointer px-5 py-3 rounded-lg hover:bg-light3 hover:text-dark transition disabled:opacity-30 disabled:cursor-not-allowed "
      disabled={disabled}
      onClick={handleClear}
    >
      <TrashIcon className="size-4" />
      Clear
    </button>
  );
}
