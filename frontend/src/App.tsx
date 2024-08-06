import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Adminhome from "./pages/admin/Adminhome";

const Signin = lazy(() => import("./pages/signin/Signin"));
const SignUp = lazy(() => import("./pages/signup/Signup"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Adminhome />} />
          
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
