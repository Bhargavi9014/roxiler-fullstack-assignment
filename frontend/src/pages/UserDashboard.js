import { useEffect, useState } from "react";
import api from "../api/axios";

function UserDashboard() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    api.get("/stores").then(res => setStores(res.data));
  }, []);

  const rateStore = (storeId, rating) => {
    api.post("/ratings", { store_id: storeId, rating })
      .then(() => alert("Rating saved"));
  };

  return (
    <div className="container">
      <button className="logout" onClick={() => {
        localStorage.clear();
        window.location = "/";
      }}>Logout</button>
  
      <h2>Stores</h2>
  
      {stores.map(s => (
        <div className="card" key={s.id}>
          <h3>{s.name}</h3>
          <p>{s.address}</p>
          <p>Overall Rating: ⭐ {s.overall_rating}</p>
  
          <input
            type="number"
            min="1"
            max="5"
            defaultValue={s.user_rating || ""}
            placeholder="Your rating (1–5)"
            onBlur={e => rateStore(s.id, e.target.value)}
          />
        </div>
      ))}
    </div>
  );  
}

export default UserDashboard;