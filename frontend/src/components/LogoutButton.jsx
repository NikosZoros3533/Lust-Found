import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { logout, queryClient } from "../fetchFunctions";
import { useNavigate } from "react-router";

export default function LogoutButton() {
  const navigate = useNavigate();
  const {mutate}=useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logged out");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/connections");
    },
  });

  function handleLogout(){
    mutate()
  }
  return (
    <>
      <button className="bg-dark text-light2 px-4 py-2 rounded-lg   shadow-md hover:shadow-lg hover:bg-light2 cursor-pointer hover:text-dark transition-all" onClick={handleLogout}>
        Log Out
      </button>
    </>
  );
}
