import API from "../services/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    const res = await API.get("/");
    setExpenses(res.data);
    setLoading(false);
  };

  const deleteExpense = async (id) => {
    await API.delete(`/${id}`);
    fetchExpenses();
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="container">
      <div className="header">
        <h2>💰 Expense Tracker</h2>
        <Link to="/add" className="add-btn">+ Add Expense</Link>
      </div>

      {expenses.length === 0 ? (
        <p className="empty">No expenses found</p>
      ) : (
        expenses.map((exp) => (
          <div className="card" key={exp._id}>
            <div>
              <p className="title">{exp.title}</p>
              <p className="amount">₹{exp.amount}</p>
              <p className="meta">
                {exp.category} • {new Date(exp.date).toLocaleDateString()}
              </p>
            </div>

            <div className="actions">
              <button
                className="delete-btn"
                onClick={() => deleteExpense(exp._id)}
              >
                Delete
              </button>

              <Link to={`/edit/${exp._id}`}>
                <button className="edit-btn">Edit</button>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ExpenseList;