import { Link } from "react-router";

export default function LoginPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto bg-light3 px-18 py-10 rounded-xl shadow-lg m-20">
        <h1 className="text-2xl font-bold mb-4 flex justify-center">Log In</h1>
        <form className="space-y-6">
          <div>
            <label className="block font-medium">Nickname:</label>
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

          <button
            type="submit"
            className="w-full bg-dark text-light1 p-2 rounded hover:bg-light2 hover:text-dark  focus:outline-0"
          >
            Sign In
          </button>
          <Link to="/signup" className="flex justify-end">
            <button className="w-auto mt-6 bg-dark text-light1 p-2 rounded hover:bg-light2 hover:text-dark  focus:outline-0">
              Register
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
