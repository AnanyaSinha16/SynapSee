import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Login</h2>
        <p style={subtitle}>Welcome back to SynapSee ✨</p>

        {/* Username / Email */}
        <input
          type="text"
          placeholder="Username or Email"
          style={input}
        />

        {/* Password */}
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            style={input}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={toggle}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <div style={forgot}>Forgot password?</div>

        {/* Login Button */}
        <button style={loginBtn}>Login</button>

        <div style={divider}>OR</div>

        {/* Google Login */}
        <button style={googleBtn}>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            style={{ width: 20, marginRight: 10 }}
          />
          Continue with Google
        </button>

        <p style={signupText}>
          Don’t have an account? <span style={signup}>Sign up</span>
        </p>
      </div>
    </div>
  );
}
