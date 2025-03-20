import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export default function LogoutButton() {
  const dispatch = useDispatch();
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
      dispatch(logout());
    },
  });

  return (
    <>
      <button
        className="bg-dark text-light2 px-6 py-3 rounded-lg   shadow-md hover:shadow-lg hover:bg-light2 cursor-pointer hover:text-dark transition-all"
        onClick={() => mutate()}
        disabled={isPending}
      >
        Log Out
      </button>
      {isError && <p>{error.message}</p>}
    </>
  );
}
