import { Link } from "react-router";
import { user } from "./../../db";
import LogoutButton from "../../components/LogoutButton";


export default function Profile() {
  return (
    <div className="min-h-screen bg-light1 text-dark px-6 md:px-12 py-10">
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold font-menu">{user.nickname}</h1>
        <p className="text-light3 mt-2 text-lg">{user.email}</p>
      </header>

      {/* User Info Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
        {/* User Info */}
        <div className="bg-light2 p-6 rounded-xl shadow-md transition-all hover:shadow-lg">
          <h2 className="text-2xl font-semibold font-menu">User Information</h2>
          <p className="text-dark mt-2">Gender: {user.gender}</p>
          <p className="text-dark mt-2">
            City: {user.city.City}, {user.city.Region}
          </p>
        </div>

        {/* Self-Description */}
        <div className="bg-light3 p-6 rounded-xl shadow-md transition-all hover:shadow-lg">
          <h2 className="text-2xl font-semibold font-menu">Self Description</h2>
          <p className="text-dark mt-2">{user.selfDescription}</p>
        </div>
      </section>

      {/* Target Description */}
      <section className="mb-12 p-6 rounded-xl shadow-md transition-all hover:shadow-lg bg-dark">
        <h2 className="text-2xl text-light2 font-menu mb-4">
          Target Description
        </h2>
        <ul className="list-disc pl-6 text-light2">
          {user.targetDescription.map((desc, index) => (
            <li key={index} className="mb-2">
              {desc}
            </li>
          ))}
        </ul>
      </section>

      {/* Profile Actions Section */}
      <section className="text-center">
        <Link to="/profile/edit" className="bg-light2 text-dark px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-dark hover:text-light3 transition-all mb-4">
          Edit Profile
        </Link>
        <LogoutButton className="bg-dark text-light2 px-6 py-3 rounded-lg ml-3 mb-4  shadow-md hover:shadow-lg hover:bg-light3 hover:text-dark transition-all">
          Log Out
        </LogoutButton>
      </section>
    </div>
  );
}
