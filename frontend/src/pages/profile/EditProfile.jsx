import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe, updateProfile, queryClient } from "../../fetchFunctions";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useState } from "react";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import SearchCityInput from "../../components/SearchCityInput";

let cssInputClass =
  "mt-2 w-full p-3 rounded-lg bg-light1 shadow-2xl focus:outline-none focus:bg-dark focus:text-light2";
let cssBgClass = "flex-1 min-w-[250px] bg-light1 p-6 rounded-xl ";

const profileSchema = z.object({
  nickname: z.string().min(6, "Nickname must be at least 6 characters"),
  gender: z.string(), // No validation since it's a select
  selfDescription: z.string(),
});

export default function EditProfile() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
  });

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Updated Succesfully");
      navigate("/profile");
    },
  });

  const [targetDescriptions, setTargetDescriptions] = useState(
    user?.targetDescriptions || []
  );
  const [city, setCity] = useState(user?.city || null);

  const [showInput, setShowInput] = useState(false);
  const [newDescription, setNewDescription] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    let updatedFields = {};
    console.log(data);
    
    if (data.nickname !== user?.nickname)
      updatedFields.nickname = data.nickname;
    if (data.gender !== user?.gender) updatedFields.gender = data.gender;
    if (JSON.stringify(city?._id) !== JSON.stringify(user?.city?._id)) updatedFields.city = city?._id;
    if (data.selfDescription !== user?.selfDescription)
      updatedFields.selfDescription = data.selfDescription;
    if (
      JSON.stringify(targetDescriptions) !==
      JSON.stringify(user?.targetDescriptions)
    )
      updatedFields.targetDescriptions = targetDescriptions;

    console.log("Updated fields:", updatedFields);
    mutate(updatedFields);
  };

  const handleAddNewDescription = () => {
    if (newDescription.trim().length >= 5) {
      setTargetDescriptions([...targetDescriptions, newDescription]);
      setNewDescription("");
      setShowInput(false);
    } else {
      toast.error("New description must be at least 5 characters");
    }
  };

  const handleDeleteDescription = (descForDel) => {
    const newDescriptions = targetDescriptions.filter(
      (desc) => desc !== descForDel
    );
    setTargetDescriptions([...newDescriptions]);
  };

  const handleCitySelection = (selectedCity) => {
    
    setCity(selectedCity);
    console.log(selectedCity);
  };

  let navigate = useNavigate();
  return (
    <div className="min-h-screen bg-light1 text-dark  px-6 md:px-12 py-10">
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-3xl font-semibold font-menu text-dark">
          Edit Profile
        </h1>
      </header>

      {/* Profile Edit Form */}
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap gap-6">
          <div className={cssBgClass}>
            <label className="text-lg font-semibold">Nickname</label>
            <input
              type="text"
              {...register("nickname")}
              defaultValue={user?.nickname || ""}
              className={cssInputClass}
            />
            {errors.nickname && (
              <p className="text-red-500">{errors.nickname.message}</p>
            )}
          </div>
          <div className={cssBgClass}>
            <label htmlFor="gender" className="text-lg font-semibold">
              Gender
            </label>
            <select
              defaultValue={user?.gender || ""}
              className={cssInputClass}
              {...register("gender")}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className={cssBgClass}>
            <label className="text-lg font-semibold">City</label>
            <SearchCityInput onSelect={handleCitySelection} userCity={user.city?.City} className="mt-2 w-full p-3 rounded-lg bg-light1 shadow-2xl focus:outline-none focus:bg-dark focus:text-light2"/>
          </div>
        </div>
        <div className="bg-light1 p-6 rounded-xl">
          <label htmlFor="selfDescription" className="text-lg font-semibold">
            Self Description
          </label>
          <textarea
            defaultValue={user?.selfDescription || ""}
            className={cssInputClass}
            {...register("selfDescription")}
            rows="4"
          />
          {errors.selfDescription && (
            <p className="text-red-500">{errors.selfDescription.message}</p>
          )}
        </div>
        <div className="bg-light1 p-6 rounded-xl">
          <label className="text-lg font-semibold">Target Descriptions</label>
          {(targetDescriptions || [""]).map((desc, index) => (
            <div key={index} className="mt-2 flex items-center gap-2">
              <input
                type="text"
                value={desc}
                className={cssInputClass}
                onChange={(e) => {
                  const updatedDesc = [...targetDescriptions];
                  updatedDesc[index] = e.target.value;
                  setTargetDescriptions(updatedDesc);
                }}
              />
              <button
                type="button"
                onClick={() => handleDeleteDescription(desc)}
              >
                <XCircleIcon className="w-10 h-10" />
              </button>
            </div>
          ))}
          {showInput ? (
            <div className="mt-3 flex items-center gap-2">
              <input
                type="text"
                className={cssInputClass}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <button
                type="button"
                onClick={handleAddNewDescription}
                className="text-green-500 hover:text-green-700"
              >
                <PlusCircleIcon className="w-10 h-10" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setNewDescription(null);
                  setShowInput(false);
                }}
                className="text-red-500 hover:text-red-700"
              >
                <XCircleIcon className="w-10 h-10" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowInput(true)}
              className="mt-3 flex items-center gap-2 text-dark hover:text-light2"
            >
              <PlusCircleIcon className="w-10 h-10" />
              Add Description
            </button>
          )}
        </div>
        <div className="text-center space-y-4">
          <button
            type="submit"
            className="bg-light2 text-dark px-6 py-3 rounded-lg shadow-lg cursor-pointer hover:bg-dark hover:text-light3"
          >
            Save Changes
          </button>
          <Link
            to="/profile"
            className="bg-dark text-light2 px-6 py-3 ml-2 rounded-lg shadow-lg"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

/* Change Password Section */
/* <div className="bg-light1 p-6 rounded-xl shadow-2xl">
          <h3 className="text-xl font-semibold mb-4">Change Password</h3>
          <div>
            <label className="text-lg font-semibold">Current Password</label>
            <input type="password" className={cssInputClass} />
          </div>
          <div className="mt-4">
            <label htmlFor="newPassword" className="text-lg font-semibold">
              New Password
            </label>
            <input type="password" className={cssInputClass} />
          </div>
          <div className="mt-4">
            <label className="text-lg font-semibold">
              Confirm New Password
            </label>
            <input type="password" className={cssInputClass} />
          </div>
        </div> */
