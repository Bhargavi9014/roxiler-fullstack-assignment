import { useState } from "react";
import api from "../api/axios";

function Signup() {
  const [form, setForm] = useState({});

  const signup = async () => {
    try {
      await api.post("/auth/signup", form);
      alert("Signup successful");
      window.location = "/";
    } catch {
      alert("Error during signup");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Signup</h2>
  
        <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Address" onChange={e => setForm({ ...form, address: e.target.value })} />
        <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
  
        <button onClick={signup}>Register</button>
      </div>
    </div>
  );  
}

export default Signup;