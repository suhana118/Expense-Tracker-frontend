import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import ExpenseList from "./pages/ExpenseList";
import ExpenseForm from "./pages/ExpenseForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExpenseList />} />
        <Route path="/add" element={<ExpenseForm />} />
        <Route path="/edit/:id" element={<ExpenseForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;