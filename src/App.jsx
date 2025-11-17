import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import Welcome from "./pages/welcome";

export default function App() {
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSubmit = (data) => {
    if (editIndex !== null) {
      const updated = [...users];
      updated[editIndex] = data;
      setUsers(updated);
      setEditIndex(null);
      showMessage(`${data.firstName} updated successfully!`);
    } else {
      setUsers([...users, data]);
      showMessage(`${data.firstName} created successfully!`);
    }
    navigate("/users");
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    navigate("/create");
  };

  const handleDelete = (index) => {
    const removedUser = users[index];
    setUsers(users.filter((_, i) => i !== index));
    showMessage(`${removedUser.firstName} deleted successfully!`);
  };

  return (
    <>
      <Navbar />
      {message && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background: "#4caf50",
            color: "white",
            padding: "12px 18px",
            borderRadius: "6px",
            fontWeight: "bold",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
            zIndex: 9999,
          }}
        >
          {message}
        </div>
      )}

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route
          path="/create"
          element={
            <UserForm
              onSubmit={handleSubmit}
              editData={editIndex !== null ? users[editIndex] : null}
            />
          }
        />
        <Route
          path="/users"
          element={
            <UserTable
              users={users}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          }
        />
      </Routes>
    </>
  );
}
