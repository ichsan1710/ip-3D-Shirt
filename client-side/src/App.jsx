import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import Customizer from "./pages/Customizer";
import Canvas from "./canvas";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./components/MainLayout";
import User from "./pages/User";
import Favorite from "./pages/Favorite";
import store from "./store.js";

const router = createBrowserRouter([
  {
    element: <Register />,
    path: "/register",
  },
  {
    element: <Login />,
    path: "/",
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/home");
      }
      return null;
    },
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/user/:id",
        element: <User />,
      },
      {
        path: "/favorites/:id",
        element: <Favorite />,
      },
    ],
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <main className="app transition-all-ease-in">
          <RouterProvider router={router} />
          <Canvas />
          <Customizer />
        </main>
      </Provider>
    </>
  );
}

export default App;
