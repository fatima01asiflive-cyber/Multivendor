import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleToggleVisibility = () => {
    setVisible((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle standard email/password login logic here
    console.log("Email Login Submit:", { email, password, rememberMe });
  };

  // Google OAuth Login Handler
  const handleGoogleLogin = () => {
    console.log("Redirecting to Google OAuth...");
    // Example: window.location.href = "YOUR_BACKEND_URL/auth/google";
    // Or for Firebase/Supabase: signInWithRedirect(auth, googleProvider);
  };

  // GitHub OAuth Login Handler
  const handleGithubLogin = () => {
    console.log("Redirecting to GitHub OAuth...");
    // Example: window.location.href = "YOUR_BACKEND_URL/auth/github";
    // Or for Firebase/Supabase: signInWithRedirect(auth, githubProvider);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900 tracking-tight">
          Login to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-gray-100 rounded-lg sm:px-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <div className="mt-1 relative rounded-md">
                <input
                  id="password"
                  name="password"
                  type={visible ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                <button
                  type="button"
                  onClick={handleToggleVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {visible ? <AiOutlineEye size={22} /> : <AiOutlineEyeInvisible size={22} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-gray-600 select-none">
                  Remember me
                </label>
              </div>

              <div>
                <a href="#forgot" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#2563eb] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>

          {/* Social Sign-in Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-white text-gray-400 tracking-wider">Or continue with</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {/* Google Functional Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <FcGoogle size={20} className="mr-2" /> Google
              </button>
              
              {/* GitHub Functional Button */}
              <button
                type="button"
                onClick={handleGithubLogin}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <FaGithub size={20} className="mr-2 text-gray-900" /> GitHub
              </button>
            </div>
          </div>

          {/* Footer Text */}
          <div className="mt-8 text-center text-sm text-gray-600">
           <h4>Not have any account?</h4>
            <Link to="/Signup" className="text-blue-600 pl-2">
                       signup
                        </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;