import Home from "./pages/Home";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import Connections from "./pages/connections/Connections";
import ConnectionDetail from "./pages/connections/ConnectionDetail";
import EditConnection from "./pages/connections/EditConnection";
import CreateConnection from "./pages/connections/CreateConnection";
import ConnectionsRoot from "./pages/ConnectionsRoot";
import MyConnections from "./pages/connections/MyConnections";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import { Toaster } from "react-hot-toast";
import { getMe } from "./fetchFunctions";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useQuery } from "@tanstack/react-query";
import LoaderSpinner from "./components/connectionsUI/Skeletons/LoaderSpinner";

function App() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    staleTime: 15 * 24 * 60 * 60 * 1000,
  });
  if (isLoading) {
    return (
      <LoaderSpinner/>
    );
  }
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/profile" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/profile" /> : <SignupPage />}
        />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/edit"
          element={user ? <EditProfile /> : <Navigate to="/login" />}
        />

        {/* Connections Routes */}
        <Route path="/connections" element={<ConnectionsRoot />}>
          <Route index element={<Connections />} />
          <Route
            path="mine"
            element={user ? <MyConnections /> : <Navigate to="/connections" />}
          />
          <Route
            path="create"
            element={user ? <CreateConnection /> : <Navigate to="/signup" />}
          />
          <Route path=":id" element={<ConnectionDetail />} />
          <Route
            path=":id/edit"
            element={user ? <EditConnection /> : <Navigate to="/connections" />}
          />
        </Route>
      </Routes>
      <Footer />

      <Toaster />
    </Router>
  );
}

export default App;
