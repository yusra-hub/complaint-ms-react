import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }


    if (
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {
      navigate("/admin");
    } else {
      setError("Invalid admin email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FEF9C3] flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-md">


        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#14532D] shadow-lg mb-4">

    
            <svg
              width="42"
              height="42"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#CA8A04"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>

          </div>

          <h1 className="text-3xl font-bold text-[#14532D]">
            Admin Portal
          </h1>

          <p className="text-gray-600 mt-2">
            Complaint Management System
          </p>

        </div>

   
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#CA8A04]/30">

          <div className="mb-7">
            <h2 className="text-2xl font-bold text-[#14532D]">
              Welcome Back!
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Sign in to access your admin account
            </p>
          </div>

          <form onSubmit={handleLogin}>

           
            <div className="mb-5">

              <label className="block text-sm font-semibold text-[#14532D] mb-2">
                Admin Email
              </label>

              <div className="relative">

            
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#14532D]"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-[#14532D] focus:ring-2 focus:ring-[#14532D]/20 transition"
                />

              </div>
            </div>

         
            <div className="mb-5">

              <label className="block text-sm font-semibold text-[#14532D] mb-2">
                Password
              </label>

              <div className="relative">

               
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#14532D]"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>

                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-16 py-3 border border-gray-300 rounded-xl outline-none focus:border-[#14532D] focus:ring-2 focus:ring-[#14532D]/20 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#14532D] text-sm font-semibold"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-5">

              
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4m0 4h.01" />
                </svg>

                {error}

              </div>
            )}

            
            <button
              type="submit"
              className="w-full bg-[#14532D] hover:bg-[#0f4223] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition duration-200 shadow-md hover:shadow-lg"
            >
              Login as Admin

   
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>

            </button>

          </form>

       
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

         
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full border border-[#CA8A04] text-[#14532D] hover:bg-[#FEF9C3] font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition"
          >

         
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m2 10 10-6 10 6-10 6-10-6Z" />
              <path d="M6 13v5c4 3 8 3 12 0v-5" />
              <path d="M22 10v6" />
            </svg>

            Student Login

          </button>

        </div>

        <p className="text-center text-sm text-[#14532D]/70 mt-6">
          © 2026 Complaint Management System
        </p>

      </div>
    </div>
  );
};

export default AdminLogin;
