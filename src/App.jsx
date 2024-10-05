import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InsertMarks from "./components/InsertMarks";
import ProtectedRoute from "./components/ProtectedRoute";
import { Home } from "./components/SearchMarks";
import LoginForm from "./components/LoginForm";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<LoginForm />} />
        <Route
          path="/insert-marks"
          element={
            <ProtectedRoute>
              <InsertMarks />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
