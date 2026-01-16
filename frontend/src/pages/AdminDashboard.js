import { useEffect, useState } from "react";
import api from "../api/axios";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchStores();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data);
  };

  const fetchStores = async () => {
    const res = await api.get("/admin/stores");
    setStores(res.data);
  };

  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  return (
    <div className="container">
      <button className="logout" onClick={logout}>Logout</button>

      <h2>Admin Dashboard</h2>

      {/* USERS */}
      <div className="card">
        <h3>Users</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.address}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* STORES */}
      <div className="card">
        <h3>Stores</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {stores.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.address}</td>
                <td>{s.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;