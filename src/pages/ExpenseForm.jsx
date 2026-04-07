import { useState, useEffect } from "react";
import api from "../api/axios";
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
      api.get(`/expenses/${id}`).then((res) => setForm(res.data));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.amount) {
      alert("Title & Amount required");
      return;
    }

    if (id) {
      await api.put(`/expenses/${id}`, form);
    } else {
      await api.post("/expenses", form);
    }

    navigate("/");
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
        value={form.date?.substring(0, 10)}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default ExpenseForm;