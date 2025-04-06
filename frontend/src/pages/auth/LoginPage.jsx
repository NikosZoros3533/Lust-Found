import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { login, queryClient } from "../../fetchFunctions";

const schema = z.object({
  nickname: z
    .string()
    .min(4, "Nickname must be at least 4 characters")
    .max(15, "Nickname must be at most 15 characters"),
  password: z.string().min(7, "Password must be at least 7 characters"),
});

export default function LoginPage() {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Logged in");
      navigate("/connections");
    },
  });

  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), mode: "onBlur" });

  const onSubmit = (data) => {

    mutate(data);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto bg-light3 px-18 py-10 rounded-xl shadow-lg m-20">
        <h1 className="text-2xl font-bold mb-4 flex justify-center">Log In</h1>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block font-medium">Nickname:</label>
            <input
              {...register("nickname")}
              className="w-full p-2 border rounded focus:bg-light2 focus:outline-0"
              placeholder="John Doe"
            />
            {errors.nickname && (
              <p className="text-light1">{errors.nickname.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Password:</label>
            <input
              {...register("password")}
              className="w-full p-2 border rounded focus:bg-light2 focus:outline-0"
              placeholder="SHhhhh..."
              type="password"
            />
            {errors.password && (
              <p className="text-light1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-dark text-light1 p-2  rounded hover:bg-light2 hover:text-dark cursor-pointer focus:outline-0"
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Sign In"}
          </button>
          {isError && <p className="text-light1">{error.message}</p>}
          <Link to="/signup" className="flex justify-end">
            <button   className="w-auto mt-6 bg-dark text-light1 p-2 rounded hover:bg-light2 hover:text-dark cursor-pointer focus:outline-0">
              Register
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
