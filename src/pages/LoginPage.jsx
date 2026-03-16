import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import angkorImg from '../assets/angkor.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faUser, faEye, faEyeSlash, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Moul&family=Crimson+Pro:ital,wght@0,400;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lp-root {
    width: 100vw; height: 100vh;
    overflow: hidden;
    font-family: 'Battambang', serif;
    display: flex; align-items: center; justify-content: center;
    position: relative;
  }
  .lp-bg-img {
    position: absolute; inset: 0; z-index: 0;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center bottom;
  }
  .lp-bg-overlay {
    position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(160deg,
      rgba(20,10,5,0.38) 0%, rgba(60,25,5,0.28) 50%, rgba(10,5,0,0.55) 100%);
  }

  /* ── CARD ── */
  .lp-card {
    position: relative; z-index: 2;
    display: flex; flex-direction: column; align-items: center;
    padding: 36px 48px 32px;
    background: rgba(255,248,225,0.18);
    backdrop-filter: blur(22px); -webkit-backdrop-filter: blur(22px);
    border-radius: 36px;
    border: 1px solid rgba(255,210,100,0.35);
    box-shadow: 0 2px 0 rgba(255,255,255,0.12) inset, 0 16px 60px rgba(0,0,0,0.45);
    width: 460px;
  }
  .lp-card-top {
    position: absolute; top: 0; left: 40px; right: 40px; height: 3px;
    background: linear-gradient(90deg, transparent, #F5D878, #C89A3A, #F5D878, transparent);
    border-radius: 0 0 4px 4px;
  }
  .lp-card-bot {
    position: absolute; bottom: 0; left: 40px; right: 40px; height: 3px;
    background: linear-gradient(90deg, transparent, #C89A3A, #F5D878, #C89A3A, transparent);
    border-radius: 4px 4px 0 0;
  }

  /* ── NAVBAR ── */
  .lp-navbar {
    width: 100%; display: flex; align-items: center;
    justify-content: space-between; margin-bottom: 20px;
  }
  .lp-back {
    width: 38px; height: 38px;
    background: rgba(255,248,220,0.15);
    border: 1.5px solid rgba(255,210,100,0.3);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 15px; color: #FFF0CC;
    transition: background 0.2s; flex-shrink: 0;
  }
  .lp-back:hover { background: rgba(255,248,220,0.28); }
  .lp-logo-stack { display: flex; flex-direction: column; align-items: flex-start; line-height: 1; }
  .lp-logo-top { font-family: 'Moul', serif; font-size: 18px; color: #F5D878; text-shadow: 1px 1px 0 rgba(0,0,0,0.3); }
  .lp-logo-sub { font-family: 'Battambang', serif; font-size: 10px; color: rgba(245,216,120,0.65); font-weight: 700; align-self: flex-end; letter-spacing: 0; }
  .lp-spacer { width: 38px; }

  /* ── HEADER ── */
  .lp-header { text-align: center; margin-bottom: 16px; }
  .lp-icon {
    display: flex; align-items: center; justify-content: center;
    width: 64px; height: 64px; margin: 0 auto 10px;
    background: linear-gradient(145deg, #F2CC52, #C89028);
    border-radius: 18px;
    font-size: 26px; color: #5A3008;
    box-shadow: 0 6px 18px rgba(180,120,20,.42), 0 2px 0 rgba(255,255,255,.35) inset;
    animation: lp-bob 3.5s ease-in-out infinite;
  }
  @keyframes lp-bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
  .lp-title { font-family: 'Moul', serif; font-size: 22px; color: #FFF0CC; text-shadow: 1px 1px 0 rgba(0,0,0,0.3); }
  .lp-subtitle { font-family: 'Crimson Pro', serif; font-style: italic; font-size: 13px; color: rgba(255,220,140,0.7); margin-top: 3px; }

  .lp-divider {
    display: flex; align-items: center; gap: 8px;
    margin-bottom: 18px; width: 100%;
    color: #F5D878; font-size: 11px; opacity: .6;
  }
  .lp-dl { flex:1; height:1px; background:linear-gradient(90deg,transparent,#F5D878); }
  .lp-dl.r { background:linear-gradient(90deg,#F5D878,transparent); }

  /* ── FIELDS ── */
  .lp-field { display:flex; flex-direction:column; gap:5px; margin-bottom:14px; width:100%; }
  .lp-label { font-size:11px; color:rgba(255,220,140,0.7); letter-spacing:0.08em; text-transform:uppercase; padding-left:2px; }
  .lp-wrap { position:relative; }
  .lp-input-icon {
    position:absolute; left:14px; top:50%; transform:translateY(-50%);
    color:rgba(245,216,120,0.45); font-size:14px; pointer-events:none;
  }
  .lp-input {
    width:100%; padding:13px 44px 13px 40px;
    background:rgba(255,248,220,0.12);
    border:1.5px solid rgba(255,210,100,0.25);
    border-radius:12px;
    font-family:'Battambang',serif; font-size:15px; color:#FFF0CC;
    outline:none; transition:border-color 0.2s, box-shadow 0.2s;
  }
  .lp-input::placeholder { color:rgba(255,200,100,0.35); }
  .lp-input:focus {
    border-color:rgba(245,216,120,0.6);
    box-shadow:0 0 0 3px rgba(245,216,120,0.1);
    background:rgba(255,248,220,0.18);
  }
  .lp-eye {
    position:absolute; right:14px; top:50%; transform:translateY(-50%);
    font-size:14px; cursor:pointer;
    color:rgba(245,216,120,0.45); transition:color 0.2s;
    background: none; border: none; padding: 0;
  }
  .lp-eye:hover { color:rgba(245,216,120,0.9); }

  /* ── FORGOT ── */
  .lp-forgot {
    text-align:right; width:100%;
    font-family:'Crimson Pro',serif; font-style:italic;
    font-size:12.5px; color:#F5D878;
    cursor:pointer; margin-top:-6px; margin-bottom:18px;
    transition:opacity 0.2s; opacity:.7;
  }
  .lp-forgot:hover { opacity:1; text-decoration:underline; }

  /* ── BUTTON ── */
  .lp-btn {
    width:100%; padding:15px;
    background:linear-gradient(135deg,#C89A3A 0%,#A87820 55%,#8A6010 100%);
    border:none; border-radius:50px;
    font-family:'Battambang',serif; font-size:18px; font-weight:700;
    color:#FFF8E8; cursor:pointer;
    box-shadow:0 5px 0 #4A2E06, 0 8px 20px rgba(0,0,0,0.3);
    transition:transform 0.15s, box-shadow 0.15s;
    position:relative; overflow:hidden;
  }
  .lp-btn::before { content:''; position:absolute; top:0;left:0;right:0;height:45%; background:rgba(255,255,255,.12); border-radius:50px 50px 50% 50%; }
  .lp-btn:hover  { transform:translateY(-2px); box-shadow:0 7px 0 #3A2004,0 12px 24px rgba(0,0,0,.35); }
  .lp-btn:active { transform:translateY(3px);  box-shadow:0 2px 0 #4A2E06; }

  /* ── OR ROW ── */
  .lp-or {
    display:flex; align-items:center; gap:10px;
    margin:14px 0; width:100%;
    color:rgba(255,220,140,0.5); font-size:12px;
    font-family:'Crimson Pro',serif;
  }
  .lp-or-line { flex:1; height:1px; background:rgba(255,210,100,0.2); }

  /* ── REGISTER LINK ── */
  .lp-reg { text-align:center; font-size:13.5px; color:rgba(255,220,140,0.6); }
  .lp-reg span { color:#F5D878; font-weight:700; cursor:pointer; transition:opacity 0.2s; }
  .lp-reg span:hover { opacity:.7; text-decoration:underline; }
`

export default function LoginPage() {
  const navigate = useNavigate()
  const [showPw, setShowPw] = useState(false)
  const [form, setForm] = useState({ username: '', password: '' })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleLogin = () => {
    if (!form.username || !form.password) { alert('Please fill in all fields!'); return }
    if (form.username === 'admin' && form.password === 'admin123') {
      localStorage.setItem('bk_current_user', JSON.stringify({ username: 'admin', role: 'admin' }))
      navigate('/admin'); return
    }
    const users = JSON.parse(localStorage.getItem('bk_users') || '[]')
    const user = users.find(u => u.username === form.username && u.password === form.password)
    if (!user) { alert('Incorrect username or password!'); return }
    localStorage.setItem('bk_current_user', JSON.stringify({ username: user.username, role: 'user' }))
    navigate('/home')
  }

  return (
    <>
      <style>{styles}</style>
      <div className="lp-root">
        <img src={angkorImg} className="lp-bg-img" alt="" />
        <div className="lp-bg-overlay" />

        <div className="lp-card">
          <div className="lp-card-top" />
          <div className="lp-card-bot" />

          {/* NAVBAR */}
          <div className="lp-navbar">
            <button className="lp-back" onClick={() => navigate('/')}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className="lp-logo-stack">
              <div className="lp-logo-top">ប្រាជ្ញា</div>
              <div className="lp-logo-sub">ខ្មែរ</div>
            </div>
            <div className="lp-spacer" />
          </div>

          {/* HEADER */}
          <div className="lp-header">
            <div className="lp-icon">
              <FontAwesomeIcon icon={faKey} />
            </div>
            <div className="lp-title">ចូលគណនី</div>
            <div className="lp-subtitle">Login to your account</div>
          </div>

          <div className="lp-divider">
            <div className="lp-dl"/>✦<div className="lp-dl r"/>
          </div>

          {/* USERNAME */}
          <div className="lp-field">
            <div className="lp-label">Username · ឈ្មោះអ្នកប្រើ</div>
            <div className="lp-wrap">
              <span className="lp-input-icon"><FontAwesomeIcon icon={faUser} /></span>
              <input className="lp-input" type="text" name="username"
                placeholder="បញ្ចូលឈ្មោះអ្នកប្រើ..." value={form.username} onChange={handleChange}/>
            </div>
          </div>

          {/* PASSWORD */}
          <div className="lp-field">
            <div className="lp-label">Password · ពាក្យសម្ងាត់</div>
            <div className="lp-wrap">
              <span className="lp-input-icon"><FontAwesomeIcon icon={faKey} /></span>
              <input className="lp-input" type={showPw ? 'text' : 'password'} name="password"
                placeholder="បញ្ចូលពាក្យសម្ងាត់..." value={form.password} onChange={handleChange}/>
              <button className="lp-eye" onClick={() => setShowPw(!showPw)}>
                <FontAwesomeIcon icon={showPw ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          <div className="lp-forgot">Forgot password?</div>

          <button className="lp-btn" onClick={handleLogin}>ចូលគណនី</button>

          <div className="lp-or">
            <div className="lp-or-line"/>ឬ / or<div className="lp-or-line"/>
          </div>

          <div className="lp-reg">
            មិនទាន់មានគណនី? <span onClick={() => navigate('/register')}>ចុះឈ្មោះឥឡូវ</span>
          </div>
        </div>
      </div>
    </>
  )
}