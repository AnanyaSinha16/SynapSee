import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  // ✅ Password rules
  const passwordRules = {
    length: password.length >= 8,
    number: /\d/.test(password),
    letter: /[a-zA-Z]/.test(password),
    symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    case: /(?=.*[a-z])(?=.*[A-Z])/.test(password),
  };

  const isPasswordValid = Object.values(passwordRules).every(Boolean);

  // ✅ Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!isPasswordValid) {
      setError("Please meet all password requirements.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0015] via-[#130022] to-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl border border-[#00ffff33] shadow-[0_0_25px_#00ffff22] w-[90%] max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-[#00ffff] to-[#b026ff] bg-clip-text text-transparent">
          Create Account
        </h2>

        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm mb-1 text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-transparent border border-[#00ffff44] focus:border-[#00ffff] focus:outline-none text-white"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordTouched(true)}
              required
              className="w-full p-3 rounded-md bg-transparent border border-[#00ffff44] focus:border-[#00ffff] focus:outline-none text-white"
            />

            {/* Password rules */}
            {passwordTouched && (
              <ul className="mt-2 text-xs text-gray-400 space-y-1">
                <li
                  className={`${
                    passwordRules.length ? "text-green-400" : "text-gray-400"
                  }`}
                >
                  • At least 8 characters
                </li>
                <li
                  className={`${
                    passwordRules.number ? "text-green-400" : "text-gray-400"
                  }`}
                >
                  • Contains a number
                </li>
                <li
                  className={`${
                    passwordRules.letter ? "text-green-400" : "text-gray-400"
                  }`}
                >
                  • Contains a letter
                </li>
                <li
                  className={`${
                    passwordRules.symbol ? "text-green-400" : "text-gray-400"
                  }`}
                >
                  • Contains a symbol
                </li>
                <li
                  className={`${
                    passwordRules.case ? "text-green-400" : "text-gray-400"
                  }`}
                >
                  • Uppercase and lowercase letters
                </li>
              </ul>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-transparent border border-[#00ffff44] focus:border-[#00ffff] focus:outline-none text-white"
            />
          </div>

          <button
            type="submit"
            className={`py-3 rounded-md font-semibold text-white mt-4 ${
              isPasswordValid
                ? "bg-gradient-to-r from-[#00ffff] to-[#b026ff]"
                : "bg-gray-500 cursor-not-allowed"
            }`}
            disabled={!isPasswordValid}
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#00ffff] hover:underline hover:text-[#b026ff]"
          >
            Log in
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Signup;
