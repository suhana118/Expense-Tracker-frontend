import { useState, useEffect } from "react";
import API from "../services/api"; // ✅ FIXED IMPORT
import { useNavigate, useParams } from "react-router-dom";

const ExpenseForm = () => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      API.get(`/${id}`).then((res) => setForm(res.data)); // ✅ FIXED URL
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.amount) {
      alert("Title & Amount required");
      return;
    }

    try {
      if (id) {
        await API.put(`/${id}`, form); // ✅ FIXED
      } else {
        await API.post("/", form); // ✅ FIXED
      }

      navigate("/");
    } catch (error) {
      console.error("Error saving expense:", error); // ✅ ADDED ERROR LOG
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Amount"
        type="number"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <input
        type="date"
        value={form.date ? form.date.substring(0, 10) : ""}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      <button type="submit">Save</button>
    </form>
  );
};

export default ExpenseForm;