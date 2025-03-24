import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../fetchFunctions";
import { Link } from "react-router";


let cssInputClass =
  "mt-2 w-full p-3 rounded-lg bg-light1 shadow-2xl focus:outline-none focus:bg-dark focus:text-light2";
let cssBgClass = "flex-1 min-w-[250px] bg-light1 p-6 rounded-xl ";

export default function EditProfile() {
  const {data:user}=useQuery({
    queryKey: ["user"],
    queryFn: getMe,
  });
  
  return (
    <div className="min-h-screen bg-light1 text-dark  px-6 md:px-12 py-10">
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-3xl font-semibold font-menu text-dark">
          Edit Profile
        </h1>
      </header>

      {/* Profile Edit Form */}
      <form className="space-y-6">
        {/* Flex container for fields */}
        <div className="flex flex-wrap gap-6">
          {/* Nickname */}
          <div className={cssBgClass}>
            <label className="text-lg font-semibold">Nickname</label>
            <input
              type="text"
              value={user?.nickname}
              className={cssInputClass}
            />
          </div>
          {/* Gender */}
          <div className={cssBgClass}>
            <label htmlFor="gender" className="text-lg font-semibold">
              Gender
            </label>
            <select value={user?.gender} className={cssInputClass}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* City */}
          <div className={cssBgClass}>
            <label className="text-lg font-semibold">City</label>
            <input
              type="text"
              value={user.city?.City}
              className={cssInputClass}
            />
          </div>
        </div>

        {/* Self Description */}
        <div className="bg-light1 p-6 rounded-xl ">
          <label htmlFor="selfDescription" className="text-lg font-semibold">
            Self Description
          </label>
          <textarea
            value={user?.selfDescription}
            className={cssInputClass}
            rows="4"
          />
        </div>

        {/* Target Description */}
        <div className="bg-light1 p-6 rounded-xl">
          <label className="text-lg font-semibold">Target Description</label>
          {user.targetDescription?.map((desc, index) => (
            <div key={index} className="mt-2">
              <input type="text" value={desc} className={cssInputClass} />
            </div>
          ))}
          <input type="text" className={cssInputClass} />
        </div>

        {/* Change Password Section */}
        <div className="bg-light1 p-6 rounded-xl shadow-2xl">
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
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <button
            type="button"
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
