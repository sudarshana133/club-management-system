import { Button } from "../../components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../../utils/auth";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendDetails = async () => {
    event?.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/user/signin",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if(response.status===200) {
        const user = verifyToken();

        if(user?.role==='STUDENT') {
          navigate("/student");
        } else {
          navigate("/admin");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className=" border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="name@company.com"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <a
                        href="#"
                        className="text-sm font-medium hover:underline hover:underline-offset-2 text-white"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  onClick={() => {
                    sendDetails();
                  }}
                >
                  Submit
                </Button>
                <p className="text-sm font-light text-gray-400">
                  Don't have an account yet?{" "}
                  <a
                    href="/signup"
                    className="font-medium text-primary-600 hover:underline text-primary-500"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signin;
