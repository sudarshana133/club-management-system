import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Adminhome from "./pages/admin/home/Adminhome";
const Signin = lazy(() => import("./pages/signin/Signin"));
const SignUp = lazy(() => import("./pages/signup/Signup"));
const Events = lazy(() => import("./pages/admin/events/Events"));
const Clubs = lazy(() => import("./pages/admin/clubs/Clubs"));
const Dashboard = lazy(() => import("./pages/admin/dashboard/Dashboard"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public routes */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Admin routes */}
          <Route path="/" element={<Adminhome />}>
            <Route index element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/clubs" element={<Clubs />} />
          </Route>

          {/* Redirect to signin if route not found */}
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
