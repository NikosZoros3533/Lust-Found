import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import Connections from "./pages/connections/Connections";
import ConnectionDetail from "./pages/connections/ConnectionDetail";
import EditConnection from "./pages/connections/EditConnection";
import CreateConnection from "./pages/connections/CreateConnection";
import RootLayout from "./pages/RootLayout";
import ConnectionsRoot from "./pages/ConnectionsRoot";
import MyConnections from "./pages/connections/MyConnections";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setError, setLoading } from "./store/authSlice";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/edit",
        element: (
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "connections",
        element: <ConnectionsRoot />,
        children: [
          { index: true, element: <Connections /> },
          { path: ":id", element: <ConnectionDetail /> },
          {
            path: "mine",
            element: (
              <ProtectedRoute>
                <MyConnections />
              </ProtectedRoute>
            ),
          },
          {
            path: "create",
            element: (
              <ProtectedRoute>
                <CreateConnection />
              </ProtectedRoute>
            ),
          },
          {
            path: ":id/edit",
            element: (
              <ProtectedRoute>
                <EditConnection />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = res.json();
        if (data.error) {
          return null;
        }
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log(data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  useEffect(() => {
    dispatch(setLoading(isLoading));
    if (data) {
      dispatch(setUser(data));
    } else if (error) {
      dispatch(setError(error.message));
    }
  }, [data, error, isLoading]);
  console.log(data);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
