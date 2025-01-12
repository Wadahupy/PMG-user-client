import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./shared/components/Layouts/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Schedule from "./pages/Schedule";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { login } from "./components/SignIn/SignInForm";
import { register } from "./components/SignUp/SignUpForm";
import ProtectedLayout from "./shared/components/Layouts/ProtectedLayout";
import AuthLayout from "./shared/components/Layouts/AuthLayout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        
        {/* Protected Layout */}
        <Route element={<ProtectedLayout/>}>
          <Route path="schedule" element={<Schedule />}/>
        </Route>

        {/* Auth Layout */}
        <Route element={<AuthLayout/>}>
          <Route path="sign-up" element={<SignUp />} action={register}/>
          <Route path="sign-in" element={<SignIn />} action={login}/>
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
