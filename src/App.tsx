import Dashboard from "./Pages/Dashboard"
import Signin from "./Pages/Signin"
import Signup from "./Pages/Signup"
import { BrowserRouter, Routes , Route } from "react-router-dom"


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
