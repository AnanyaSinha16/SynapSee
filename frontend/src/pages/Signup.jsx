import API from "../api/api";

const handleSubmit = async (ev) => {
  ev.preventDefault();
  if (!validate()) return;

  try {
    const res = await API.post("/auth/register", formData);

    alert("✅ Registration successful!");
    localStorage.setItem("user", JSON.stringify(res.data.user)); // save user info
    window.location.href = "/home"; // redirect to home
  } catch (err) {
    alert(`❌ ${err.response?.data?.message || "Something went wrong"}`);
  }
};
