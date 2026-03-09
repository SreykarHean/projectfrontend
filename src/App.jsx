import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WelcomePage from './pages/welcome'
import RegisterPage from './pages/register'
<Route path="/register" element={<register />} />
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
      </Routes>
    </BrowserRouter>
  )
}