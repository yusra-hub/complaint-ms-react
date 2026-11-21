
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Please enter email and password.");
      return;
    }

    
    localStorage.setItem("studentEmail", email.trim());

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#FEF9C3] flex items-center justify-center p-5">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="bg-[#14532D] text-white p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute w-72 h-72 rounded-full border border-white/10 -top-20 -right-20" />
          <div className="absolute w-60 h-60 rounded-full border border-[#CA8A04]/30 bottom-10 -left-28" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="bg-[#CA8A04] p-3 rounded-xl text-[#14532D]">
                <svg viewBox="0 0 24 24" width="32" height="32"
                  fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 10 12 4l10 6-10 6L2 10Z" />
                  <path d="M6 13v5c4 3 8 3 12 0v-5" />
                  <path d="M22 10v6" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Educare</h1>
                <p className="text-xs tracking-[3px] text-[#FEF9C3]">
                  STUDENT PORTAL
                </p>
              </div>
            </div>
          </div>

          <div className="relative my-16">
            <span className="text-[#CA8A04] font-semibold tracking-widest text-sm uppercase">
              Welcome to Educare
            </span>

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mt-5">
              Your Journey
              <br />
              to a Better
              <br />
              <span className="text-[#CA8A04]">Campus Starts Here.</span>
            </h2>

            <p className="text-green-100 mt-6 leading-7">
              Empowering students with a smarter way to connect,
              communicate and make their campus experience better.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Submit Your Complaints Easily",
                "Track Your Complaint Status",
                "Stay Connected With Campus",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="bg-[#CA8A04] text-[#14532D] rounded-full p-1">
                    <svg width="16" height="16" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  </span>
                  <span className="text-sm text-green-50">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="relative text-xs text-green-100/60">
            © 2026 Educare. All Rights Reserved.
          </p>
        </div>

       
        <div className="p-8 sm:p-12 md:p-14 flex flex-col justify-center">
          <div className="mb-9">
            <span className="text-[#CA8A04] text-sm font-bold tracking-widest uppercase">
              Student Account
            </span>
            <h2 className="text-4xl font-bold text-[#14532D] mt-3">
              Welcome Back!
            </h2>
            <p className="text-gray-500 mt-3">
              Please sign in to access your student portal.
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Student Email Address
              </label>
              <div className="relative">
                <svg className="absolute left-4 top-4 text-gray-400"
                  width="20" height="20" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@educare.com"
                  className="w-full border border-gray-200 bg-[#FAFAF9] rounded-xl py-4 pl-12 pr-4 outline-none focus:border-[#CA8A04] focus:ring-2 focus:ring-yellow-100"
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <svg className="absolute left-4 top-4 text-gray-400"
                  width="20" height="20" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border border-gray-200 bg-[#FAFAF9] rounded-xl py-4 pl-12 pr-20 outline-none focus:border-[#CA8A04] focus:ring-2 focus:ring-yellow-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-sm font-semibold text-[#14532D]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-8 text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="accent-[#14532D] w-4 h-4" />
                Remember me
              </label>
              <a href="#" className="font-semibold text-[#14532D] hover:text-[#CA8A04]">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#14532D] hover:bg-[#0F4225] text-white font-bold py-4 rounded-xl shadow-lg transition duration-300 flex justify-center items-center gap-3"
            >
              Sign In to Educare
              <svg width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => navigate("/adminlogin")}
              className="w-full border border-[#CA8A04] text-[#14532D] hover:bg-[#FEF9C3] font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition mt-10"
            >
              Admin Login
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-10">
            Secure Student Access | Educare Portal
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
