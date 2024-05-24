"use client";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const addUser = async (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, password }),
    })
      .then(async (data) => {
        const response = await data.json();
        if (!data.ok) {
          toast.error(response.message);
          return;
        }
        router.push("/login");
      })
      .catch((err) => {
        toast.error("Failed to signup");
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex items-center justify-center my-10 sm:my-30  ">
      <div className="bg-white drop-shadow-lg p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center ">
          Create an Account
        </h2>
        <form action="#" method="POST" className="space-y-4" onSubmit={addUser}>
          <div>
            <label htmlFor="name" className="block ">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block ">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block ">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" w-full  px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
            className="w-full py-2 bg-[var(--bg-orange)] my-3 rounded-lg hover:drop-shadow-md focus:outline-none focus:ring-1 text-white">
            Sign Up
          </button>
        </form>
        <div className="flex items-center mt-4">
          <h1 className="flex justify-center items-center gap-4">
            Already have an account?
            <Link href={"/login"} className="hover:underline text-green-600" passHref>
              Log In
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Signup;
