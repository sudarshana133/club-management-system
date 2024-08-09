import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const Signin = lazy(() => import("./pages/signin/Signin"));
const SignUp = lazy(() => import("./pages/signup/Signup"));
const AdminEvents = lazy(() => import("./pages/admin/events/Events"));
const AdminDashboard = lazy(() => import("./pages/admin/dashboard/Dashboard"));
const StudentHome = lazy(() => import("./pages/student/home/StudentHome"));
const StudentLayout = lazy(() => import("./pages/student/StudentLayout"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const StudentEvents = lazy(() => import("./pages/student/events/Events"));
const AddEvents = lazy(()=> import("./pages/admin/addEvents/AddEvents"));
const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<h1>Hello</h1>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="addevent" element={<AddEvents />} />
          </Route>

          {/* Student routes */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<StudentHome />} />
            <Route path="events" element={<StudentEvents />} />
          </Route>

          {/* Redirect to signin if route not found */}
          {/* <Route path="*" element={<Navigate to="/signin" />} /> */}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
