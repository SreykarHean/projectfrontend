import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WelcomePage        from './pages/welcome'
import LoginPage          from './pages/LoginPage'
import RegisterPage       from './pages/RegisterPage'
import ProverbPage        from './pages/Proverb'
import WisdomPage         from './pages/Wisdom'
import ProfilePage        from './pages/ProfilePage'
import FavoritesPage      from './pages/FavoritesPage'
import AdminPage          from './pages/Admin/AdminPage'
import DetailProv         from './pages/Detail_Prov'
import DetailWis          from './pages/Detail_Wis'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import QuizePage from './pages/Admin/Quizepage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                element={<WelcomePage />} />
        <Route path="/login"           element={<LoginPage />} />
        <Route path="/register"        element={<RegisterPage />} />
        <Route path="/home"            element={<ProverbPage />} />
        <Route path="/wisdom"          element={<WisdomPage />} />
        <Route path="/detail/:id"      element={<DetailProv />} />
        <Route path="/wisdom/:id"      element={<DetailWis />} />
        <Route path="/profile"         element={<ProfilePage />} />
        <Route path="/favorites"       element={<FavoritesPage />} />
        <Route path="/admin"           element={<AdminPage />} />
        <Route path="/quiz"           element={<QuizePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </BrowserRouter>
  )
}