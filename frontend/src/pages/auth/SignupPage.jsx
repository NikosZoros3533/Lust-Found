import { Link } from "react-router";

export default function SignupPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto bg-light3 px-18 py-10 rounded-xl shadow-lg m-6">
        <h1 className="text-2xl font-bold mb-4 flex justify-center">Create An Account</h1>
        <form className="space-y-4">
          <div>
            <label className="block font-medium">Nickname:</label>
            <input
              className="w-full p-2 border rounded focus:bg-light2 focus:outline-0"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block font-medium">Email:</label>
            <input
              className="w-full p-2 border rounded focus:bg-light2 focus:outline-0"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block font-medium">Password:</label>
            <input
              className="w-full p-2 border rounded focus:bg-light2 focus:outline-0"
              placeholder="SHhhhh..."
            />
          </div>
          <div>
            <label className="block font-medium">Confirm Password:</label>
            <input
              className="w-full p-2 border rounded focus:bg-light2 focus:outline-0"
              placeholder="SHhhhh..."
            />
          </div>
          <div>
            <label className="block font-medium">
              Gender: <span className="text-gray-700">(Optional)</span>
            </label>
            <select
              className="w-full p-2 border rounded focus:bg-light2 focus:outline-0"
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
          </div>

          <button
            type="submit"
            className="w-full bg-dark text-light1 p-2 rounded hover:bg-light2 hover:text-dark  focus:outline-0"
          >
            Sign Up
          </button>
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
