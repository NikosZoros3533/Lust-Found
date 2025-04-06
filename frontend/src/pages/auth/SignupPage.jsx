import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient, signup } from "../../fetchFunctions";

const schema = z
  .object({
    nickname: z
      .string()
      .min(4, "Nickname must be at least 4 characters")
      .max(30, "Nickname must be at most 30 characters"),
    password: z.string().min(7, "Password must be at least 7 characters"),
    confirmPassword: z
      .string()
      .min(7, "Password must be at least 7 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SignupPage() {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Acount created succesfully");
      navigate("/profile");
    },
  });

  const onSubmit = ({ nickname, password }) => {
    const dataToSend = { nickname, password };
    mutate(dataToSend);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto bg-light3 px-18 py-10 rounded-xl shadow-lg m-6">
        <h1 className="text-2xl font-bold mb-4 flex justify-center">
          Create An Account
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block font-medium after:ml-0.5 after:text-light1 after:content-['*']">
              Nickname:
            </label>
            <input
              {...register("nickname")}
              className="w-full p-2 border rounded focus:bg-light2  focus:outline-0"
              placeholder="John Doe"
            />
            {errors.nickname && (
              <p className="text-light1">{errors.nickname.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium after:ml-0.5 after:text-light1 after:content-['*']">
              Password:
            </label>
            <input
              {...register("password")}
              type="password"
              className="w-full p-2 border rounded focus:bg-light2 focus:outline-0"
              placeholder="SHhhhh..."
            />
            {errors.password && (
              <p className="text-light1">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium after:ml-0.5 after:text-light1 after:content-['*']">
              Confirm Password:
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              className="w-full p-2 border rounded focus:bg-light2 focus:outline-0"
              placeholder="SHhhhh..."
            />
            {errors.confirmPassword && (
              <p className="text-light1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            disabled={isPending}
            type="submit"
            className="w-full bg-dark text-light1 p-2 rounded hover:bg-light2 hover:text-dark  focus:outline-0"
          >
            {isPending ? "Loading..." : "Sign up"}
          </button>
          {isError && <p className="text-light1">{error.message}</p>}
          <Link to="/login" className="flex justify-end">
            <button className="w-auto mt-6 bg-dark text-light1 p-2 rounded hover:bg-light2 hover:text-dark  focus:outline-0">
              Log In
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

/*

<div>
            <label className="block font-medium">Gender:</label>
            <select
              {...register("gender")}
              className="w-full p-2 border rounded focus:bg-light2 focus:outline-0"
              placeholder="Your gender"
            >
              <option value="">Select an option</option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">other</option>
            </select>
            {errors.gender && (
              <p className="text-light1">{errors.gender.message}</p>
            )}
          </div>
*/
