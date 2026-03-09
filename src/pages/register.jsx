import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import angkorImg from '../assets/angkor.png'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Moul&family=Crimson+Pro:ital,wght@0,400;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .rp-root {
    width: 100vw; height: 100vh;
    overflow: hidden;
    font-family: 'Battambang', serif;
    display: flex; align-items: center; justify-content: center;
    position: relative;
  }

  .rp-bg-img {
    position: absolute; inset: 0; z-index: 0;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center bottom;
  }
  .rp-bg-overlay {
    position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(160deg,
      rgba(20,10,5,0.38) 0%, rgba(60,25,5,0.28) 50%, rgba(10,5,0,0.55) 100%);
  }

  /* ── CARD ── */
  .rp-card {
    position: relative; z-index: 2;
    display: flex; flex-direction: column; align-items: center;
    padding: 36px 48px 32px;
    background: rgba(255,248,225,0.18);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    border-radius: 36px;
    border: 1px solid rgba(255,210,100,0.35);
    box-shadow: 0 2px 0 rgba(255,255,255,0.12) inset, 0 16px 60px rgba(0,0,0,0.45);
    width: 460px;
  }
  .rp-card-top {
    position: absolute; top: 0; left: 40px; right: 40px; height: 3px;
    background: linear-gradient(90deg, transparent, #F5D878, #C89A3A, #F5D878, transparent);
    border-radius: 0 0 4px 4px;
  }
  .rp-card-bot {
    position: absolute; bottom: 0; left: 40px; right: 40px; height: 3px;
    background: linear-gradient(90deg, transparent, #C89A3A, #F5D878, #C89A3A, transparent);
    border-radius: 4px 4px 0 0;
  }

  /* ── NAVBAR ROW ── */
  .rp-navbar {
    width: 100%; display: flex; align-items: center;
    justify-content: space-between; margin-bottom: 20px;
  }
  .rp-back {
    width: 38px; height: 38px;
    background: rgba(255,248,220,0.15);
    border: 1.5px solid rgba(255,210,100,0.3);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 18px; color: #FFF0CC;
    transition: background 0.2s;
    flex-shrink: 0;
  }
  .rp-back:hover { background: rgba(255,248,220,0.28); }

  .rp-logo-stack {
    display: flex; flex-direction: column; align-items: flex-start; line-height: 1;
  }
  .rp-logo-top {
    font-family: 'Moul', serif; font-size: 18px; color: #F5D878;
    text-shadow: 1px 1px 0 rgba(0,0,0,0.3);
  }
  .rp-logo-sub {
    font-family: 'Battambang', serif; font-size: 10px;
    color: rgba(245,216,120,0.65); font-weight: 700;
    align-self: flex-end; letter-spacing: 0;
  }
  .rp-spacer { width: 38px; }

  /* ── HEADER ── */
  .rp-header { text-align: center; margin-bottom: 16px; }
  .rp-icon { font-size: 30px; display: block; margin-bottom: 6px; animation: rp-bob 3.5s ease-in-out infinite; }
  @keyframes rp-bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
  .rp-title { font-family: 'Moul', serif; font-size: 22px; color: #FFF0CC; text-shadow: 1px 1px 0 rgba(0,0,0,0.3); }
  .rp-subtitle { font-family: 'Crimson Pro', serif; font-style: italic; font-size: 13px; color: rgba(255,220,140,0.7); margin-top: 3px; }

  .rp-divider {
    display: flex; align-items: center; gap: 8px;
    margin-bottom: 16px; width: 100%;
    color: #F5D878; font-size: 11px; opacity: .6;
  }
  .rp-dl { flex:1; height:1px; background:linear-gradient(90deg,transparent,#F5D878); }
  .rp-dl.r { background:linear-gradient(90deg,#F5D878,transparent); }

  /* ── FIELDS ── */
  .rp-field { display:flex; flex-direction:column; gap:5px; margin-bottom:12px; width: 100%; }
  .rp-field-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px; width:100%; }
  .rp-label { font-size:11px; color:rgba(255,220,140,0.7); letter-spacing:0.08em; text-transform:uppercase; padding-left:2px; }
  .rp-wrap { position:relative; }
  .rp-input {
    width:100%; padding:12px 14px;
    background:rgba(255,248,220,0.12);
    border:1.5px solid rgba(255,210,100,0.25);
    border-radius:12px;
    font-family:'Battambang',serif; font-size:14px; color:#FFF0CC;
    outline:none; transition:border-color 0.2s, box-shadow 0.2s;
  }
  .rp-input::placeholder { color:rgba(255,200,100,0.35); }
  .rp-input:focus {
    border-color:rgba(245,216,120,0.6);
    box-shadow:0 0 0 3px rgba(245,216,120,0.1);
    background:rgba(255,248,220,0.18);
  }
  .rp-eye {
    position:absolute; right:12px; top:50%; transform:translateY(-50%);
    font-size:15px; cursor:pointer; opacity:.45; transition:opacity 0.2s;
  }
  .rp-eye:hover { opacity:.85; }

  /* ── BUTTON ── */
  .rp-btn {
    width:100%; padding:14px; margin-top:4px;
    background:linear-gradient(135deg,#C89A3A 0%,#A87820 55%,#8A6010 100%);
    border:none; border-radius:50px;
    font-family:'Battambang',serif; font-size:17px; font-weight:700;
    color:#FFF8E8; cursor:pointer;
    box-shadow:0 5px 0 #4A2E06, 0 8px 18px rgba(0,0,0,0.3);
    transition:transform 0.15s, box-shadow 0.15s;
    position:relative; overflow:hidden;
  }
  .rp-btn::before { content:''; position:absolute; top:0;left:0;right:0;height:44%; background:rgba(255,255,255,.12); border-radius:50px 50px 50% 50%; }
  .rp-btn:hover  { transform:translateY(-2px); box-shadow:0 7px 0 #3A2004,0 12px 22px rgba(0,0,0,.35); }
  .rp-btn:active { transform:translateY(3px);  box-shadow:0 2px 0 #4A2E06; }

  .rp-login-link { margin-top:12px; text-align:center; font-size:13px; color:rgba(255,220,140,0.6); }
  .rp-login-link span { color:#F5D878; font-weight:700; cursor:pointer; transition:opacity 0.2s; }
  .rp-login-link span:hover { opacity:.7; text-decoration:underline; }
`

export default function RegisterPage() {
  const navigate = useNavigate()
  const [showPw1, setShowPw1] = useState(false)
  const [showPw2, setShowPw2] = useState(false)
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleRegister = () => {
    if (!form.username || !form.email || !form.password || !form.confirm) {
      alert('Please fill in all fields!')
      return
    }
    if (form.password !== form.confirm) {
      alert('Passwords do not match!')
      return
    }
    // Save to localStorage
    const users = JSON.parse(localStorage.getItem('bk_users') || '[]')
    const exists = users.find(u => u.username === form.username)
    if (exists) { alert('Username already taken!'); return }
    users.push({ username: form.username, email: form.email, password: form.password, role: 'user' })
    localStorage.setItem('bk_users', JSON.stringify(users))
    alert('Account created! Please login.')
    navigate('/login')
  }

  return (
    <>
      <style>{styles}</style>
      <div className="rp-root">
        <img src={angkorImg} className="rp-bg-img" alt="" />
        <div className="rp-bg-overlay" />

        <div className="rp-card">
          <div className="rp-card-top" />
          <div className="rp-card-bot" />

          {/* NAVBAR */}
          <div className="rp-navbar">
            <button className="rp-back" onClick={() => navigate('/')}>←</button>
            <div className="rp-logo-stack">
              <div className="rp-logo-top">ប្រាជ្ញា</div>
              <div className="rp-logo-sub">ខ្មែរ</div>
            </div>
            <div className="rp-spacer" />
          </div>

          {/* HEADER */}
          <div className="rp-header">
            <span className="rp-icon">📝</span>
            <div className="rp-title">ចុះឈ្មោះ</div>
            <div className="rp-subtitle">Create your account</div>
          </div>

          <div className="rp-divider">
            <div className="rp-dl"/>✦<div className="rp-dl r"/>
          </div>

          {/* USERNAME */}
          <div className="rp-field">
            <div className="rp-label">Username · ឈ្មោះអ្នកប្រើ</div>
            <div className="rp-wrap">
              <input className="rp-input" type="text" name="username"
                placeholder="បញ្ចូលឈ្មោះអ្នកប្រើ..." value={form.username} onChange={handleChange}/>
            </div>
          </div>

          {/* EMAIL */}
          <div className="rp-field">
            <div className="rp-label">Email · អ៊ីមែល</div>
            <div className="rp-wrap">
              <input className="rp-input" type="email" name="email"
                placeholder="example@email.com" value={form.email} onChange={handleChange}/>
            </div>
          </div>

          {/* PASSWORD ROW */}
          <div className="rp-field-row">
            <div className="rp-field" style={{marginBottom:0}}>
              <div className="rp-label">Password</div>
              <div className="rp-wrap">
                <input className="rp-input" type={showPw1 ? 'text' : 'password'} name="password"
                  placeholder="••••••••" value={form.password} onChange={handleChange}/>
                <span className="rp-eye" onClick={() => setShowPw1(!showPw1)}>👁</span>
              </div>
            </div>
            <div className="rp-field" style={{marginBottom:0}}>
              <div className="rp-label">Confirm</div>
              <div className="rp-wrap">
                <input className="rp-input" type={showPw2 ? 'text' : 'password'} name="confirm"
                  placeholder="••••••••" value={form.confirm} onChange={handleChange}/>
                <span className="rp-eye" onClick={() => setShowPw2(!showPw2)}>👁</span>
              </div>
            </div>
          </div>

          {/* REGISTER BTN */}
          <button className="rp-btn" onClick={handleRegister}>ចុះឈ្មោះ</button>

          <div className="rp-login-link">
            មានគណនីហើយ? <span onClick={() => navigate('/login')}>ចូលគណនី</span>
          </div>
        </div>
      </div>
    </>
  )
}