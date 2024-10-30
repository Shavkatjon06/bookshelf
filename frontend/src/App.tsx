import { Route, Routes } from "react-router-dom"
import Books from "./pages/mainPage"
import Update from "./pages/update"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Books/>} />
      <Route path="/edit/:id" element={<Update/>} />
    </Routes>
  )
}

export default App