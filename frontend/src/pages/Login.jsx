import api from "../api/api";

async function handleLogin(e) {
  e.preventDefault();
  
  try {
    const res = await api.post("/auth/login", { email, password });

    localStorage.setItem("synapseeUser", JSON.stringify(res.data.user));
    navigate("/");
  } catch (err) {
    alert("Login failed");
  }
}
