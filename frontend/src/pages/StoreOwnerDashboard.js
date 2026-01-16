import { useEffect, useState } from "react";
import api from "../api/axios";

function StoreOwnerDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/store-owner/dashboard").then(res => setData(res.data));
  }, []);

  if (!data) return null;

  return (
    <div className="container">
      <button className="logout" onClick={() => {
        localStorage.clear();
        window.location = "/";
      }}>Logout</button>
  
      <div className="card">
        <h2>{data.store.name}</h2>
        <h3>Average Rating: ⭐ {data.average_rating}</h3>
      </div>
  
      {data.ratings.map((r, i) => (
        <div className="card" key={i}>
          <p><b>{r.user_name}</b> ({r.user_email})</p>
          <p>Rating: ⭐ {r.rating}</p>
        </div>
      ))}
    </div>
  );  
}

export default StoreOwnerDashboard;