import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AboutEvent from "./pages/admin/events/AboutEvent";
import Members from "./pages/admin/members/Members";
import AddMembers from "./pages/admin/members/AddMembers";
import ProtectedRoute from "./components/shared/ProtectedRoute";

const Signin = lazy(() => import("./pages/signin/Signin"));
const SignUp = lazy(() => import("./pages/signup/Signup"));
const AdminEvents = lazy(() => import("./pages/admin/events/Events"));
const AdminDashboard = lazy(() => import("./pages/admin/dashboard/Dashboard"));
const StudentHome = lazy(() => import("./pages/student/home/StudentHome"));
const StudentLayout = lazy(() => import("./pages/student/StudentLayout"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const StudentEvents = lazy(() => import("./pages/student/events/Events"));
const AddEvents = lazy(() => import("./pages/admin/addEvents/AddEvents"));
const AboutEventStudent = lazy(() =>
  import("./pages/student/events/AboutEvent")
);

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<h1>Hello</h1>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<ProtectedRoute allowedRoles="ADMIN" />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="addevent" element={<AddEvents />} />
              <Route path="clubs/:clubId/events/:eventId" element={<AboutEvent />} />
              <Route path="members" element={<Members />} />
              <Route path="addMembers" element={<AddMembers />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles="STUDENT" />}>
            <Route path="/student" element={<StudentLayout />}>
              <Route index element={<StudentHome />} />
              <Route path="events" element={<StudentEvents />} />
              <Route
                path="event/:clubId/:eventId"
                element={<AboutEventStudent />}
              />
            </Route>
          </Route>

          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;