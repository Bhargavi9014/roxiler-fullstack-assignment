import { useState } from "react";
import api from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
  
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
  
      if (res.data.role === "ADMIN") window.location = "/admin";
      else if (res.data.role === "STORE_OWNER") window.location = "/store-owner";
      else window.location = "/user";
    } catch {
      alert("Invalid credentials");
    }
  };
  
  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>
  
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
  
        <button onClick={login}>Login</button>
  
        <p>
          New user? <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );  
}

export default Login;