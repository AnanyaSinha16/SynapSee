import api from "../api/api";

async function handleSignup(e) {
  e.preventDefault();

  try {
    const res = await api.post("/auth/signup", {
      username,
      email,
      password,
    });

    alert("Signup successful");
    navigate("/login");
  } catch (err) {
    alert("Signup failed");
  }
}
