import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import angkorImg from '../assets/angkor.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faUser, faEnvelope, faMagnifyingGlass, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Moul&family=Crimson+Pro:ital,wght@0,400;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .fp-root {
    width: 100vw; height: 100vh;
    overflow: hidden;
    font-family: 'Battambang', serif;
    display: flex; align-items: center; justify-content: center;
    position: relative;
  }
  .fp-bg-img {
    position: absolute; inset: 0; z-index: 0;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center bottom;
  }
  .fp-bg-overlay {
    position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(160deg,
      rgba(20,10,5,0.38) 0%, rgba(60,25,5,0.28) 50%, rgba(10,5,0,0.55) 100%);
  }

  /* ── CARD ── */
  .fp-card {
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
  .fp-card-top {
    position: absolute; top: 0; left: 40px; right: 40px; height: 3px;
    background: linear-gradient(90deg, transparent, #F5D878, #C89A3A, #F5D878, transparent);
    border-radius: 0 0 4px 4px;
  }
  .fp-card-bot {
    position: absolute; bottom: 0; left: 40px; right: 40px; height: 3px;
    background: linear-gradient(90deg, transparent, #C89A3A, #F5D878, #C89A3A, transparent);
    border-radius: 4px 4px 0 0;
  }

  /* ── NAVBAR ── */
  .fp-navbar {
    width: 100%; display: flex; align-items: center;
    justify-content: space-between; margin-bottom: 20px;
  }
  .fp-back {
    width: 38px; height: 38px;
    background: rgba(255,248,220,0.15);
    border: 1.5px solid rgba(255,210,100,0.3);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 15px; color: #FFF0CC;
    transition: background 0.2s; flex-shrink: 0;
  }
  .fp-back:hover { background: rgba(255,248,220,0.28); }
  .fp-logo-stack { display: flex; flex-direction: column; align-items: flex-start; line-height: 1; }
  .fp-logo-top { font-family: 'Moul', serif; font-size: 18px; color: #F5D878; text-shadow: 1px 1px 0 rgba(0,0,0,0.3); }
  .fp-logo-sub { font-family: 'Battambang', serif; font-size: 10px; color: rgba(245,216,120,0.65); font-weight: 700; align-self: flex-end; letter-spacing: 0; }
  .fp-spacer { width: 38px; }

  /* ── HEADER ── */
  .fp-header { text-align: center; margin-bottom: 16px; }
  .fp-icon {
    display: flex; align-items: center; justify-content: center;
    width: 64px; height: 64px; margin: 0 auto 10px;
    background: linear-gradient(145deg, #F2CC52, #C89028);
    border-radius: 18px;
    font-size: 26px; color: #5A3008;
    box-shadow: 0 6px 18px rgba(180,120,20,.42), 0 2px 0 rgba(255,255,255,.35) inset;
    animation: fp-bob 3.5s ease-in-out infinite;
  }
  @keyframes fp-bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
  .fp-title { font-family: 'Moul', serif; font-size: 20px; color: #FFF0CC; text-shadow: 1px 1px 0 rgba(0,0,0,0.3); }
  .fp-subtitle { font-family: 'Crimson Pro', serif; font-style: italic; font-size: 13px; color: rgba(255,220,140,0.7); margin-top: 3px; }

  .fp-divider {
    display: flex; align-items: center; gap: 8px;
    margin-bottom: 18px; width: 100%;
    color: #F5D878; font-size: 11px; opacity: .6;
  }
  .fp-dl { flex:1; height:1px; background:linear-gradient(90deg,transparent,#F5D878); }
  .fp-dl.r { background:linear-gradient(90deg,#F5D878,transparent); }

  /* ── FIELDS ── */
  .fp-field { display:flex; flex-direction:column; gap:5px; margin-bottom:14px; width:100%; }
  .fp-label { font-size:11px; color:rgba(255,220,140,0.7); letter-spacing:0.08em; text-transform:uppercase; padding-left:2px; }
  .fp-wrap { position:relative; }
  .fp-input-icon {
    position:absolute; left:14px; top:50%; transform:translateY(-50%);
    color:rgba(245,216,120,0.45); font-size:14px; pointer-events:none;
  }
  .fp-input {
    width:100%; padding:13px 16px 13px 40px;
    background:rgba(255,248,220,0.12);
    border:1.5px solid rgba(255,210,100,0.25);
    border-radius:12px;
    font-family:'Battambang',serif; font-size:15px; color:#FFF0CC;
    outline:none; transition:border-color 0.2s, box-shadow 0.2s;
  }
  .fp-input::placeholder { color:rgba(255,200,100,0.35); }
  .fp-input:focus {
    border-color:rgba(245,216,120,0.6);
    box-shadow:0 0 0 3px rgba(245,216,120,0.1);
    background:rgba(255,248,220,0.18);
  }

  /* ── BUTTON ── */
  .fp-btn {
    width:100%; padding:15px;
    background:linear-gradient(135deg,#C89A3A 0%,#A87820 55%,#8A6010 100%);
    border:none; border-radius:50px;
    font-family:'Battambang',serif; font-size:17px; font-weight:700;
    color:#FFF8E8; cursor:pointer;
    box-shadow:0 5px 0 #4A2E06, 0 8px 20px rgba(0,0,0,0.3);
    transition:transform 0.15s, box-shadow 0.15s;
    position:relative; overflow:hidden;
  }
  .fp-btn::before { content:''; position:absolute; top:0;left:0;right:0;height:45%; background:rgba(255,255,255,.12); border-radius:50px 50px 50% 50%; }
  .fp-btn:hover  { transform:translateY(-2px); box-shadow:0 7px 0 #3A2004,0 12px 24px rgba(0,0,0,.35); }
  .fp-btn:active { transform:translateY(3px);  box-shadow:0 2px 0 #4A2E06; }

  /* ── ERROR ── */
  .fp-error {
    width: 100%; padding: 12px 16px;
    background: rgba(200,60,40,0.18);
    border: 1px solid rgba(200,80,60,0.35);
    border-radius: 12px; margin-bottom: 14px;
    font-size: 13px; color: #FFBB99;
    text-align: center;
  }

  /* ── RESULT BOX ── */
  .fp-result {
    width: 100%;
    background: rgba(200,160,40,0.15);
    border: 1.5px solid rgba(245,216,120,0.4);
    border-radius: 16px; padding: 20px;
    margin-bottom: 16px; text-align: center;
  }
  .fp-result-label {
    font-size: 11px; color: rgba(255,220,140,0.6);
    letter-spacing: 0.08em; text-transform: uppercase;
    margin-bottom: 10px;
  }
  .fp-result-pw-wrap {
    display: flex; align-items: center; justify-content: center; gap: 10px;
  }
  .fp-result-pw {
    font-family: 'Crimson Pro', serif; font-size: 20px;
    color: #F5D878; letter-spacing: 0.1em; font-weight: 700;
  }
  .fp-result-pw.hidden { letter-spacing: 0.2em; }
  .fp-toggle-eye {
    background: none; border: none; cursor: pointer;
    color: rgba(245,216,120,0.55); font-size: 16px;
    transition: color 0.2s; padding: 0;
  }
  .fp-toggle-eye:hover { color: #F5D878; }
  .fp-result-hint {
    font-size: 12px; color: rgba(255,220,140,0.5);
    margin-top: 10px; font-family: 'Crimson Pro', serif; font-style: italic;
  }

  /* ── LOGIN LINK ── */
  .fp-login-link { margin-top: 4px; text-align: center; font-size: 13px; color: rgba(255,220,140,0.6); }
  .fp-login-link span { color: #F5D878; font-weight: 700; cursor: pointer; transition: opacity 0.2s; }
  .fp-login-link span:hover { opacity: .7; text-decoration: underline; }
`

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '' })
  const [error, setError] = useState('')
  const [foundPassword, setFoundPassword] = useState(null)
  const [showPw, setShowPw] = useState(false)

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
    setFoundPassword(null)
  }

  const handleFind = () => {
    if (!form.username || !form.email) {
      setError('សូមបំពេញព័ត៌មានទាំងអស់!'); return
    }
    const users = JSON.parse(localStorage.getItem('bk_users') || '[]')
    const user = users.find(
      u => u.username === form.username && u.email === form.email
    )
    if (!user) {
      setError('រកមិនឃើញគណនីដែលត្រូវគ្នានឹង Username និង Email នេះទេ!')
      return
    }
    setFoundPassword(user.password)
  }

  return (
    <>
      <style>{styles}</style>
      <div className="fp-root">
        <img src={angkorImg} className="fp-bg-img" alt="" />
        <div className="fp-bg-overlay" />

        <div className="fp-card">
          <div className="fp-card-top" />
          <div className="fp-card-bot" />

          {/* NAVBAR */}
          <div className="fp-navbar">
            <button className="fp-back" onClick={() => navigate('/login')}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className="fp-logo-stack">
              <div className="fp-logo-top">ប្រាជ្ញា</div>
              <div className="fp-logo-sub">ខ្មែរ</div>
            </div>
            <div className="fp-spacer" />
          </div>

          {/* HEADER */}
          <div className="fp-header">
            <div className="fp-icon">
              <FontAwesomeIcon icon={faKey} />
            </div>
            <div className="fp-title">ភ្លេចពាក្យសម្ងាត់?</div>
            <div className="fp-subtitle">Enter your username and email to find your password</div>
          </div>

          <div className="fp-divider">
            <div className="fp-dl"/>✦<div className="fp-dl r"/>
          </div>

          {/* ERROR */}
          {error && <div className="fp-error">{error}</div>}

          {/* RESULT — show password */}
          {foundPassword && (
            <div className="fp-result">
              <div className="fp-result-label">ពាក្យសម្ងាត់របស់អ្នក</div>
              <div className="fp-result-pw-wrap">
                <div className={`fp-result-pw ${!showPw ? 'hidden' : ''}`}>
                  {showPw ? foundPassword : '•'.repeat(foundPassword.length)}
                </div>
                <button className="fp-toggle-eye" onClick={() => setShowPw(!showPw)}>
                  <FontAwesomeIcon icon={showPw ? faEyeSlash : faEye} />
                </button>
              </div>
              <div className="fp-result-hint">ចូរចងចាំពាក្យសម្ងាត់របស់អ្នក </div>
            </div>
          )}

          {/* USERNAME */}
          {!foundPassword && (
            <>
              <div className="fp-field">
                <div className="fp-label">Username · ឈ្មោះអ្នកប្រើ</div>
                <div className="fp-wrap">
                  <span className="fp-input-icon"><FontAwesomeIcon icon={faUser} /></span>
                  <input className="fp-input" type="text" name="username"
                    placeholder="បញ្ចូលឈ្មោះអ្នកប្រើ..." value={form.username} onChange={handleChange}/>
                </div>
              </div>

              <div className="fp-field">
                <div className="fp-label">Email · អ៊ីមែល</div>
                <div className="fp-wrap">
                  <span className="fp-input-icon"><FontAwesomeIcon icon={faEnvelope} /></span>
                  <input className="fp-input" type="email" name="email"
                    placeholder="example@email.com" value={form.email} onChange={handleChange}/>
                </div>
              </div>

              <button className="fp-btn" onClick={handleFind}>
                <FontAwesomeIcon icon={faMagnifyingGlass} /> &nbsp; រកពាក្យសម្ងាត់
              </button>
            </>
          )}

          {/* GO BACK TO LOGIN */}
          {foundPassword && (
            <button className="fp-btn" onClick={() => navigate('/login')}>
              ចូលគណនីឥឡូវ
            </button>
          )}

          <div className="fp-login-link" style={{ marginTop: 14 }}>
            ចាំពាក្យសម្ងាត់ហើយ? <span onClick={() => navigate('/login')}>ចូលគណនី</span>
          </div>
        </div>
      </div>
    </>
  )
}