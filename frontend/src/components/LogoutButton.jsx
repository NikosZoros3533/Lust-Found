import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";



export default function LogoutButton() {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("api/auth/logout", {
          method: "POST",
        });
        const data = res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Logged out");
    },
  });

  return (
    <>
      <button
        className="bg-dark text-light2 px-6 py-3 rounded-lg ml-3 mb-4  shadow-md hover:shadow-lg hover:bg-light3 hover:text-dark transition-all"
        onClick={() => mutate()}
        disabled={isPending}
      >
        Log Out
      </button>
      {isError && <p>{error.message}</p>}
    </>
  );
}
