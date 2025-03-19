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

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "profile", element: <Profile /> },
      { path: "profile/edit", element: <EditProfile /> },
      {
        path: "connections",
        element: <ConnectionsRoot />,
        children: [
          { index: true, element: <Connections /> },
          { path: ":id", element: <ConnectionDetail /> },
          { path: "mine", element: <MyConnections /> },
          { path: "create", element: <CreateConnection /> },
          { path: ":id/edit", element: <EditConnection /> },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
