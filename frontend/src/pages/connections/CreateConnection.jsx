import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  encounterDescription: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  encounterCity: z.string().min(2, "Location is required."),
  encounterPoint: z.string().min(2, "Location is required."),
  gender: z.string().min(2, "Location is required."),
  targetGender: z.string().min(2, "Location is required."),
});

const CreateConnection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  let cssInputClass =
    "w-full p-2 border rounded focus:bg-light3 focus:outline-0";
  return (
    <div className="max-w-2xl mx-auto n px-18 py-10  m-6">
      <h1 className="text-3xl font-bold mb-8">Create a Missed Connection</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            {...register("title")}
            className={cssInputClass}
            placeholder="Briefly describe the connection"
          />
          {errors.title && (
            <p className="text-light1 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register("encounterDescription")}
            className={cssInputClass}
            placeholder="Describe your encounter..."
          />
          {errors.encounterDescription && (
            <p className="text-light1 text-sm">
              {errors.encounterDescription.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium">Location</label>
          <input
            {...register("encounterCity")}
            className={cssInputClass}
            placeholder="Where did it happen?"
          />
          {errors.encounterCity && (
            <p className="text-light1 text-sm">
              {errors.encounterCity.message}
            </p>
          )}
        </div>
        <div>
          <label className="block font-medium">Point</label>
          <input
            {...register("encounterPoint")}
            className={cssInputClass}
            placeholder="Where did it happen?"
          />
          {errors.encounterPoint && (
            <p className="text-light1 text-sm">
              {errors.encounterPoint.message}
            </p>
          )}
        </div>
        <div>
          <label className="block font-medium">Gender</label>
          <select
            {...register("gender")}
            className={cssInputClass}
            placeholder="Your gender"
          >
            <option value={null} defaultValue={null}>
              Select an option
            </option>
            <option value="male" defaultValue="male">
              male
            </option>
            <option value="female">female</option>
            <option value="other">other</option>
          </select>
          {errors.gender && (
            <p className="text-light1 text-sm">{errors.gender.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Target Gender</label>
          <select
            {...register("targetGender")}
            className={cssInputClass}
            placeholder="Your gender"
          >
            <option value={null} defaultValue={null}>
              Select an option
            </option>
            <option value="male" defaultValue="male">
              male
            </option>
            <option value="female">female</option>
            <option value="other">other</option>
          </select>
          {errors.targetGender && (
            <p className="text-light1 text-sm">{errors.targetGender.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="cursor-pointer w-full transition-all bg-dark text-light1 p-2 rounded-lg
border-light3
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] hover:text-light3
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
        >
          Connect
        </button>
      </form>
    </div>
  );
};

export default CreateConnection;

// cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
// border-blue-600
// border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
// active:border-b-[2px] active:brightness-90 active:translate-y-[2px]

// w-full bg-dark text-light1 p-2 rounded hover:bg-light2 hover:text-dark focus:outline-0
