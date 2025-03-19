
import { Link } from "react-router";


const Home = () => {
 
  return (
    <div className="min-h-screen  bg-light1 text-dark px-6 md:px-12 py-10">
      {/* Hero Section */}
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold font-menu">
          Missed Connections
        </h1>
        <p className="text-light3 mt-2 text-lg md:text-xl">
          Find the people you crossed paths with.
        </p>
      </header>

      {/* Bento Grid - First Row */}
      <section className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {/* Card 1 - Sign Up */}
        <div className="bg-light2 p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold font-menu">
            Join the Community
          </h2>
          <p className="text-dark mt-2">
            Sign up and start reconnecting today.
          </p>
          <div className="flex flex-row gap-x-2">
            <Link
              to="/signup"
              className="mt-4 bg-dark text-light1 px-5 py-2 rounded-lg hover:bg-light3 transition"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="mt-4 bg-dark text-light1 px-5 py-2 rounded-lg hover:bg-light3 transition"
            >
              Log in
            </Link>
          </div>
        </div>

        {/* Card 2 - Discover */}
        <div className="bg-light3 p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold font-menu">Discover Stories</h2>
          <p className="text-dark mt-2">
            Read about others' missed connections.
          </p>
          <Link to="/connections" className="mt-4 bg-dark text-light1 px-5 py-2 rounded-lg hover:bg-light2 transition">
            Explore
          </Link>
        </div>

        {/* Card 3 - Post a Connection */}
        <div className="bg-dark p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center text-light1 hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold font-menu">Post Your Story</h2>
          <p className="mt-2">Share your missed connection with the world.</p>
          <Link to="/connections/create" className="mt-4 bg-light2 text-dark px-5 py-2 rounded-lg hover:bg-light3 transition">
            Post Now
          </Link>
        </div>
      </section>

      {/* Bento Grid - Second Row (Centered) */}
      <section className="flex justify-center mt-4">
        <div className="bg-light1 border border-light3 p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center hover:shadow-lg transition max-w-lg w-full">
          <h2 className="text-2xl font-semibold font-menu">How It Works</h2>
          <p className="text-dark mt-2 max-w-md">
            Connect with people you crossed paths with but never got the chance
            to meet.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
