"use client";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const loginUser =  (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password }),
    })
      .then(async (data) => {
        const response = await data.json();
        if (!data.ok) {
          toast.error(response.message);
          router.push("/login");
          return;
        }
       router.push("/home");
      })
      .catch((err) => {
        router.push("/login");
        toast.error("Failed to login");
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex items-center justify-center my-10 sm:my-30  ">
      <div className="bg-white p-8 rounded-lg drop-shadow-lg shadow-slate-500 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center ">
          Login
        </h2>
        <form
          onSubmit={loginUser}
        >
          <div>
            <label htmlFor="phone" className="block my-3">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              required
              value={phone}
              placeholder="eg. 254700000000"
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1"
            />
          </div>
          <div>
            <label htmlFor="password" className="block my-3" >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                value={password}
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
                className=" w-full  px-4 py-2 border rounded-lg focus:outline-none focus:ring-1"
              />
              {password && (
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaRegEye /> : <FaEyeSlash />}
                </span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 my-4 bg-[var(--bg-orange)]  rounded-lg hover:drop-shadow-lg focus:outline-none focus:ring-1 text-white font-bold transition-all duration-300"
          >
            Login
          </button>
        </form>
        <div className="flex items-center mt-2">
          <h1 className=" flex justify-center items-center gap-4 pt-4 mx-5">
            Don't have an account?
            <Link href={"/signup"} className="hover:underline text-orange-500">
              Sign Up
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
