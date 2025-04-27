import Register from "./pages/Register"
import Login from "./pages/Login"
import Ranking from "./pages/Ranking"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <main className="w-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Ranking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </main>
  )
}

export default App
