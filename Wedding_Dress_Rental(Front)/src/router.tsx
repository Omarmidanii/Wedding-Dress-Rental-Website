import { createBrowserRouter } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import DressDetailPage from "./pages/DressDetailPage";
import { ErrorPage } from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import { Layout } from "./pages/Layout";
import { UserAccountPage } from "./pages/UserAccountPage";
import EmailResetPassword from "./components/Auth/EmailResetPassword";
import ResetPasswordForm from "./components/Auth/ResetPasswordForm";


const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: isAuthenticated() ? <Layout /> : <AuthPage Login={true} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path : "",
        element : isAuthenticated() ? <HomePage /> : <AuthPage Login={true} />,
      },
      {
        path: "weddingDresses",
        element:  isAuthenticated() ? <HomePage /> : <AuthPage Login={true} />,
      },
      {
        path: "weddingDress/info",
        element:  isAuthenticated() ? <DressDetailPage /> : <AuthPage Login={true} />,
      },
      {
        path: "useraccount",
        element:  isAuthenticated() ? <UserAccountPage /> : <AuthPage Login={true} />
      }
    ],
  },
  {
    path: "/login",
    element: <AuthPage Login={true} />,
  },
  {
    path: "/register",
    element: <AuthPage Login={false} />,
  },
  {
    path: "login/forget-password",
    element : <EmailResetPassword />
  },
  {
    path: "/reset-password/:token/:email",
    element: <ResetPasswordForm />
  }
]);

export default router;
