import { useState } from "react";
import { Link } from "react-router";

let cssInputClass =
    "mt-2 w-full p-3 rounded-lg bg-dark focus:outline-none focus:bg-light1";

export default function EditProfile() {
  

  // Initialize user data state
  const [userData, setUserData] = useState({
    nickname: "NikosZoros",
  
    gender: "male",
    city: { City: "Athens", Region: "Attica" },
    selfDescription: "psilos melaxrinos me magoula",
    targetDescription: ["Blue eyes", "Gypsy", "Blonde Dark"],
    currentPassword: "*********",
    newPassword: "",
    confirmPassword: "",
  });

  // Handle change for inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Handle target description change
  const handleTargetDescriptionChange = (index, value) => {
    const newTargetDescription = [...userData.targetDescription];
    newTargetDescription[index] = value;
    setUserData({ ...userData, targetDescription: newTargetDescription });
  };

  // Handle form submission (save changes)
  const handleSave = () => {
    console.log("Changes saved:", userData);
  };

  // Handle cancel action (discard changes)
  const handleCancel = () => {
    console.log("Changes discarded");
  };

  return (
    <div className="min-h-screen bg-light1 text-light2  px-6 md:px-12 py-10">
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-3xl font-semibold font-menu text-dark">Edit Profile</h1>
      </header>

      {/* Profile Edit Form */}
      <form className="space-y-6">
        {/* Flex container for fields */}
        <div className="flex flex-wrap gap-6">
          {/* Nickname */}
          <div className="flex-1 min-w-[250px] bg-dark p-6 rounded-xl shadow-lg">
            <label htmlFor="nickname" className="text-lg font-semibold">
              Nickname
            </label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={userData.nickname}
              onChange={handleInputChange}
              className={cssInputClass}
            />
          </div>

          {/* Email */}
          <div className="flex-1 min-w-[250px] bg-dark p-6 rounded-xl shadow-lg">
            <label htmlFor="email" className="text-lg font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className={cssInputClass}
            />
          </div>

          {/* Gender */}
          <div className="flex-1 min-w-[250px] bg-dark p-6 rounded-xl shadow-lg">
            <label htmlFor="gender" className="text-lg font-semibold">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={userData.gender}
              onChange={handleInputChange}
              className={cssInputClass}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* City */}
          <div className="flex-1 min-w-[250px] bg-dark p-6 rounded-xl shadow-lg">
            <label htmlFor="city" className="text-lg font-semibold">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={userData.city.City}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  city: { ...userData.city, City: e.target.value },
                })
              }
              className={cssInputClass}
            />
          </div>
        </div>

        {/* Self Description */}
        <div className="bg-dark p-6 rounded-xl shadow-lg">
          <label htmlFor="selfDescription" className="text-lg font-semibold">
            Self Description
          </label>
          <textarea
            id="selfDescription"
            name="selfDescription"
            value={userData.selfDescription}
            onChange={handleInputChange}
            className={cssInputClass}
            rows="4"
          />
        </div>

        {/* Target Description */}
        <div className="bg-dark p-6 rounded-xl shadow-lg">
          <label className="text-lg font-semibold">Target Description</label>
          {userData.targetDescription.map((desc, index) => (
            <div key={index} className="mt-2">
              <input
                type="text"
                value={desc}
                onChange={(e) =>
                  handleTargetDescriptionChange(index, e.target.value)
                }
                className={cssInputClass}              />
            </div>
          ))}
        </div>

        {/* Change Password Section */}
        <div className="bg-dark p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Change Password</h3>
          <div>
            <label htmlFor="currentPassword" className="text-lg font-semibold">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={userData.currentPassword}
              onChange={handleInputChange}
              className={cssInputClass}            />
          </div>
          <div className="mt-4">
            <label htmlFor="newPassword" className="text-lg font-semibold">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={userData.newPassword}
              onChange={handleInputChange}
              className={cssInputClass}            />
          </div>
          <div className="mt-4">
            <label htmlFor="confirmPassword" className="text-lg font-semibold">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleInputChange}
              className={cssInputClass}            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <button
            type="button"
            onClick={handleSave}
            className="bg-light2 text-dark px-6 py-3 rounded-lg shadow-lg"
          >
            Save Changes
          </button>
          <Link
            to="/profile"
            onClick={handleCancel}
            className="bg-dark text-light2 px-6 py-3 ml-2 rounded-lg shadow-lg"            >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
