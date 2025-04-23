import Register from "./pages/Register"
import Login from "./pages/Login"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <main className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-[#f5f5f5] to-[#e0e0e0]">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </main>
  )
}

export default App
