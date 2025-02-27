import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch } from "react-redux";
import { addPost } from "../features/postsSlice";
import { nanoid } from "nanoid";
import { Link } from "react-router";

const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  description: z.string().min(5, "Description must be at least 10 characters."),
  location: z.string().min(2, "Location is required."),
  encounteredDate: z.string().nonempty("I dont do good with dates either."),
});

export default function CreateConnectionPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = (data) => {
    const postData = {
      id: nanoid(),
      ...data,
      date: new Date().toISOString().split("T")[0],
    };
    dispatch(addPost(postData));
  };

  const dispatch = useDispatch();

  return (
    <div className="mx-auto mt-20 mb-10 bg-dark rounded-4xl max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg p-7 bg-light3 rounded-2xl">
        <h1 className="text-center text-2xl font-bold text-light2 sm:text-3xl">
          Try Again!
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-light1">
          Here you can write the incedent that you met your other half but the
          circumstances didnt let you meet.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 mb-0 border-2 border-dark space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium text-light2">
            Try to meet your other half!(Again...)
          </p>

          <div className="border-1 border-dark rounded-2xl">
            <input
              {...register("title")}
              className="w-full rounded-lg  p-4 pe-12 text-sm shadow-xs focus:outline-none"
              placeholder="Enter your (Nick)Name"
            />
            {errors.title && (
              <p className="text-light1 text-xs m-2">{errors.title.message}</p>
            )}
          </div>

          <div className="border-1 border-dark rounded-2xl">
            <input
              {...register("location")}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 focus:outline-none text-sm shadow-xs"
              placeholder="Location"
            />
            {errors.location && (
              <p className="text-light1 text-xs m-2">
                {errors.location.message}
              </p>
            )}
          </div>
          <div className="border-1 border-dark rounded-2xl">
            <textarea
              {...register("description")}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm focus:outline-none shadow-xs"
              placeholder="Describe Them"
            />
            {errors.description && (
              <p className="text-light1 text-xs m-2">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="border-1 border-dark rounded-2xl">
            <label className=" m-4 text-sm">
              When you meet Them.Sort of...
            </label>

            <input
              type="date"
              {...register("encounteredDate")}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 focus:outline-none text-sm shadow-xs"
            />
            {errors.encounteredDate && (
              <p className="text-light1 text-xs m-2">
                {errors.encounteredDate.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-dark px-5 py-3 text-sm font-medium text-light2 hover:bg-light2 hover:text-dark"
          >
            Connect
          </button>
        </form>
      </div>
    </div>
  );
}
