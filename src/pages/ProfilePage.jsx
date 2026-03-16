import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse, faHeart, faUser, faRightFromBracket,
  faEnvelope, faLock, faPen, faCheck, faXmark,
  faShield, faCamera, faTrash, faUpload, faRotateLeft
} from '@fortawesome/free-solid-svg-icons'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Moul&family=Crimson+Pro:ital,wght@0,400;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body, #root { width: 100%; min-height: 100vh; margin: 0; padding: 0; }

  .pp-root {
    width: 100vw; min-height: 100vh;
    background: #FBF5E6;
    font-family: 'Battambang', serif;
    display: flex; flex-direction: column;
  }

  /* ── NAVBAR ── */
  .pp-nav {
    width: 100%;
    background: linear-gradient(135deg, #5A3808 0%, #7A5020 100%);
    padding: 0 48px; height: 80px;
    display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 3px 16px rgba(0,0,0,0.22); flex-shrink: 0;
  }
  .pp-nav-logo { display: flex; flex-direction: column; align-items: flex-start; line-height: 1; cursor: pointer; }
  .pp-nav-logo-top { font-family: 'Moul', serif; font-size: 26px; color: #F5D878; text-shadow: 1px 1px 0 rgba(0,0,0,0.3); }
  .pp-nav-logo-sub { font-family: 'Battambang', serif; font-size: 12px; color: rgba(245,216,120,0.65); font-weight: 700; align-self: flex-end; letter-spacing: 0; }
  .pp-nav-icons { display: flex; gap: 8px; align-items: center; }
  .pp-nav-btn {
    background: none; border: none; cursor: pointer;
    padding: 8px 12px; border-radius: 12px;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    color: rgba(255,240,200,0.65); font-size: 10px;
    font-family: 'Battambang', serif; transition: background 0.2s, color 0.2s;
  }
  .pp-nav-btn:hover { background: rgba(255,255,255,0.1); color: #F5D878; }
  .pp-nav-btn.active { color: #F5D878; }
  .pp-nav-btn-icon { font-size: 17px; padding: 4px 6px; }
  .pp-nav-logout {
    background: rgba(200,80,50,0.22); border: 1px solid rgba(200,80,50,0.4);
    border-radius: 12px; padding: 8px 12px;
    color: #F5A090; font-size: 10px; cursor: pointer;
    font-family: 'Battambang', serif;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    transition: background 0.2s;
  }
  .pp-nav-logout:hover { background: rgba(200,80,50,0.4); }
  .pp-nav-logout-icon { font-size: 16px; }

  /* ── BODY ── */
  .pp-body {
    flex: 1; width: 100%; padding: 32px 48px;
    display: grid;
    grid-template-columns: 360px 1fr;
    gap: 24px; align-items: start;
  }

  /* ── LEFT — PROFILE CARD ── */
  .pp-profile-card {
    background: #FFFCF0; border-radius: 24px;
    border: 1px solid #E8D8A8;
    box-shadow: 0 4px 20px rgba(100,70,10,0.1);
    overflow: hidden;
  }
  .pp-card-top { height: 5px; background: linear-gradient(90deg, #C8943A, #E8C060, #C8943A); }
  .pp-card-body { padding: 28px 24px; display: flex; flex-direction: column; align-items: center; }

  /* ── AVATAR ── */
  .pp-avatar-wrap {
    position: relative; margin-bottom: 12px; cursor: pointer;
  }
  .pp-avatar {
    width: 110px; height: 110px;
    background: linear-gradient(135deg, #C89A3A, #A87820);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 42px; color: #FFF8E8;
    box-shadow: 0 6px 20px rgba(180,120,20,0.35);
    overflow: hidden;
    border: 4px solid #E8C060;
    transition: border-color 0.2s;
  }
  .pp-avatar img { width: 100%; height: 100%; object-fit: cover; }
  .pp-avatar-overlay {
    position: absolute; inset: 0;
    background: rgba(0,0,0,0.4);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: opacity 0.2s;
    color: #fff; font-size: 22px;
  }
  .pp-avatar-wrap:hover .pp-avatar-overlay { opacity: 1; }
  .pp-avatar-wrap:hover .pp-avatar { border-color: #C89A3A; }

  /* ── PHOTO MODAL ── */
  .pp-modal-backdrop {
    position: fixed; inset: 0; z-index: 100;
    background: rgba(0,0,0,0.55);
    display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(4px);
  }
  .pp-modal {
    background: #FFFCF0; border-radius: 24px;
    border: 1px solid #E8D8A8;
    box-shadow: 0 16px 60px rgba(0,0,0,0.3);
    width: 420px; overflow: hidden;
  }
  .pp-modal-top { height: 5px; background: linear-gradient(90deg, #C8943A, #E8C060, #C8943A); }
  .pp-modal-body { padding: 28px; }
  .pp-modal-title {
    font-family: 'Moul', serif; font-size: 18px; color: #4A2E08;
    margin-bottom: 6px;
  }
  .pp-modal-sub {
    font-size: 12px; color: #A08848; margin-bottom: 20px;
    font-family: 'Crimson Pro', serif; font-style: italic;
  }

  /* preview inside modal */
  .pp-modal-preview {
    display: flex; justify-content: center; margin-bottom: 20px;
  }
  .pp-modal-avatar {
    width: 90px; height: 90px; border-radius: 50%;
    background: linear-gradient(135deg, #C89A3A, #A87820);
    display: flex; align-items: center; justify-content: center;
    font-size: 36px; color: #FFF8E8;
    border: 3px solid #E8C060; overflow: hidden;
  }
  .pp-modal-avatar img { width: 100%; height: 100%; object-fit: cover; }

  /* drop zone */
  .pp-dropzone {
    border: 2px dashed #C8A040; border-radius: 16px;
    padding: 28px 20px; text-align: center;
    background: #FFF8EC; cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
    margin-bottom: 16px;
  }
  .pp-dropzone:hover { background: #FFF0CC; border-color: #C89A3A; }
  .pp-dropzone-icon { font-size: 28px; color: #C8943A; margin-bottom: 8px; }
  .pp-dropzone-text { font-size: 14px; color: #7A5828; font-weight: 700; }
  .pp-dropzone-sub { font-size: 11px; color: #A08848; margin-top: 4px; }

  .pp-divider-row {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 16px; color: #C0A878; font-size: 12px;
    font-family: 'Crimson Pro', serif;
  }
  .pp-divider-line { flex: 1; height: 1px; background: #E8D8A8; }

  /* default avatars grid */
  .pp-defaults-label { font-size: 12px; color: #8A7050; font-weight: 700; letter-spacing: 0.06em; margin-bottom: 10px; }
  .pp-defaults-grid {
    display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px;
    margin-bottom: 20px;
  }
  .pp-default-opt {
    width: 52px; height: 52px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; cursor: pointer;
    border: 2.5px solid transparent;
    transition: border-color 0.2s, transform 0.15s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .pp-default-opt:hover { transform: scale(1.1); }
  .pp-default-opt.selected { border-color: #C89A3A; box-shadow: 0 0 0 3px rgba(200,148,58,0.25); }

  .pp-modal-actions { display: flex; gap: 10px; }
  .pp-modal-save {
    flex: 1; padding: 13px;
    background: linear-gradient(135deg, #C89A3A, #A87820);
    border: none; border-radius: 50px;
    font-family: 'Battambang', serif; font-size: 15px; font-weight: 700;
    color: #FFF8E8; cursor: pointer;
    box-shadow: 0 4px 0 #6A4808;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: transform 0.15s;
  }
  .pp-modal-save:hover { transform: translateY(-2px); }
  .pp-modal-cancel {
    padding: 13px 20px;
    background: #F5EDD8; border: 1.5px solid #E8D8A8;
    border-radius: 50px; cursor: pointer;
    font-family: 'Battambang', serif; font-size: 15px; color: #8A7050;
    display: flex; align-items: center; gap: 8px;
    transition: background 0.2s;
  }
  .pp-modal-cancel:hover { background: #EDE0C8; }
  .pp-modal-reset {
    padding: 13px 16px;
    background: rgba(200,80,50,0.08);
    border: 1.5px solid rgba(200,80,50,0.25);
    border-radius: 50px; cursor: pointer;
    font-size: 14px; color: #C05040;
    display: flex; align-items: center; gap: 6px;
    transition: background 0.2s;
  }
  .pp-modal-reset:hover { background: rgba(200,80,50,0.18); }

  .pp-file-input { display: none; }

  /* ── BOTTOM OF LEFT CARD ── */
  .pp-username { font-family: 'Moul', serif; font-size: 20px; color: #4A2E08; margin-bottom: 6px; text-align: center; }
  .pp-role {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; color: #A87828;
    background: #FFF0CC; border: 1px solid #E8C870;
    padding: 4px 14px; border-radius: 20px; margin-bottom: 20px;
  }
  .pp-stats { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
  .pp-stat { background: #FBF5E6; border-radius: 14px; border: 1px solid #E8D8A8; padding: 14px; text-align: center; }
  .pp-stat-num { font-size: 22px; font-weight: 700; color: #C8943A; }
  .pp-stat-label { font-size: 11px; color: #A08848; margin-top: 2px; }
  .pp-logout-btn {
    width: 100%; padding: 12px;
    background: rgba(200,80,50,0.1); border: 1.5px solid rgba(200,80,50,0.3);
    border-radius: 14px; cursor: pointer;
    font-family: 'Battambang', serif; font-size: 14px; color: #C05040;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background 0.2s;
  }
  .pp-logout-btn:hover { background: rgba(200,80,50,0.2); }

  /* ── RIGHT ── */
  .pp-right { display: flex; flex-direction: column; gap: 20px; }
  .pp-section { background: #FFFCF0; border-radius: 20px; border: 1px solid #E8D8A8; box-shadow: 0 2px 10px rgba(100,70,10,0.07); overflow: hidden; }
  .pp-section-top { height: 4px; background: linear-gradient(90deg, #C8943A, #E8C060, #C8943A); }
  .pp-section-body { padding: 22px 24px; }
  .pp-section-title { font-family: 'Moul', serif; font-size: 16px; color: #4A2E08; margin-bottom: 18px; display: flex; align-items: center; gap: 10px; }
  .pp-section-title-icon { color: #C8943A; }
  .pp-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
  .pp-label { font-size: 11px; color: #8A7050; letter-spacing: 0.08em; text-transform: uppercase; }
  .pp-wrap { position: relative; }
  .pp-field-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #C0A878; font-size: 14px; pointer-events: none; }
  .pp-input {
    width: 100%; padding: 12px 16px 12px 40px;
    background: #FFF8EC; border: 1.5px solid #E8D8A8; border-radius: 12px;
    font-family: 'Battambang', serif; font-size: 14px; color: #3D2008;
    outline: none; transition: border-color 0.2s;
  }
  .pp-input:focus { border-color: #C8943A; box-shadow: 0 0 0 3px rgba(200,148,58,0.12); }
  .pp-input:disabled { background: #F5EDD8; color: #A08848; cursor: not-allowed; }
  .pp-btn-row { display: flex; gap: 10px; margin-top: 4px; }
  .pp-save-btn {
    padding: 12px 28px;
    background: linear-gradient(135deg, #C89A3A, #A87820);
    border: none; border-radius: 50px;
    font-family: 'Battambang', serif; font-size: 15px; font-weight: 700;
    color: #FFF8E8; cursor: pointer; box-shadow: 0 4px 0 #6A4808;
    display: flex; align-items: center; gap: 8px; transition: transform 0.15s;
  }
  .pp-save-btn:hover { transform: translateY(-2px); }
  .pp-cancel-btn {
    padding: 12px 22px; background: #F5EDD8; border: 1.5px solid #E8D8A8;
    border-radius: 50px; cursor: pointer;
    font-family: 'Battambang', serif; font-size: 15px; color: #8A7050;
    display: flex; align-items: center; gap: 8px; transition: background 0.2s;
  }
  .pp-cancel-btn:hover { background: #EDE0C8; }
  .pp-success {
    padding: 10px 16px; background: #F0FFF0; border: 1px solid #A0D8A0;
    border-radius: 10px; font-size: 13px; color: #406040; margin-top: 10px;
    display: flex; align-items: center; gap: 8px;
  }
`

// default avatar options
const DEFAULT_AVATARS = [
  { id: 'gold',   bg: 'linear-gradient(135deg,#C89A3A,#A87820)', icon: <FontAwesomeIcon icon={faUser} />, color: '#FFF8E8' },
  { id: 'blue',   bg: 'linear-gradient(135deg,#4A90C8,#2860A8)', icon: '🧑', color: '#fff' },
  { id: 'green',  bg: 'linear-gradient(135deg,#5AAA68,#3A8048)', icon: '🌿', color: '#fff' },
  { id: 'purple', bg: 'linear-gradient(135deg,#8A60C8,#6040A8)', icon: '⭐', color: '#fff' },
  { id: 'red',    bg: 'linear-gradient(135deg,#C85A5A,#A83838)', icon: '🔥', color: '#fff' },
]

export default function ProfilePage() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const currentUser = JSON.parse(localStorage.getItem('bk_current_user') || '{"username":"Guest","role":"user"}')
  const favorites = JSON.parse(localStorage.getItem('bk_favorites') || '[]')
  const avatarKey = `bk_avatar_${currentUser.username}`

  const [avatar, setAvatar] = useState(() => localStorage.getItem(avatarKey) || null)
  const [showModal, setShowModal] = useState(false)
  const [previewAvatar, setPreviewAvatar] = useState(null)  // preview inside modal
  const [selectedDefault, setSelectedDefault] = useState(null)

  const [email, setEmail] = useState(() => {
    const users = JSON.parse(localStorage.getItem('bk_users') || '[]')
    const u = users.find(u => u.username === currentUser.username)
    return u?.email || ''
  })
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saved, setSaved] = useState(false)

  // open modal — reset preview to current avatar
  const openModal = () => {
    setPreviewAvatar(avatar)
    setSelectedDefault(null)
    setShowModal(true)
  }

  // user picks a file
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setPreviewAvatar(ev.target.result)
      setSelectedDefault(null)
    }
    reader.readAsDataURL(file)
  }

  // user clicks a default avatar
  const handleSelectDefault = (opt) => {
    setSelectedDefault(opt.id)
    setPreviewAvatar(`default:${opt.id}`)
  }

  // save button in modal
  const handleSaveAvatar = () => {
    if (!previewAvatar) return
    setAvatar(previewAvatar)
    localStorage.setItem(avatarKey, previewAvatar)
    setShowModal(false)
  }

  // reset to default (no avatar)
  const handleResetAvatar = () => {
    setPreviewAvatar(null)
    setSelectedDefault(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('bk_current_user')
    navigate('/')
  }

  const handleSave = () => {
    if (newPassword && newPassword !== confirmPassword) { alert('Passwords do not match!'); return }
    const users = JSON.parse(localStorage.getItem('bk_users') || '[]')
    const updated = users.map(u =>
      u.username === currentUser.username
        ? { ...u, email, ...(newPassword ? { password: newPassword } : {}) }
        : u
    )
    localStorage.setItem('bk_users', JSON.stringify(updated))
    setNewPassword(''); setConfirmPassword('')
    setSaved(true); setTimeout(() => setSaved(false), 3000)
  }

  // render avatar anywhere (main + modal preview)
  const renderAvatar = (src, size = 110, fontSize = 42) => {
    if (!src) {
      return <FontAwesomeIcon icon={faUser} style={{ fontSize }} />
    }
    if (src.startsWith('default:')) {
      const id = src.replace('default:', '')
      const opt = DEFAULT_AVATARS.find(o => o.id === id)
      if (!opt) return <FontAwesomeIcon icon={faUser} style={{ fontSize }} />
      return <span style={{ fontSize: fontSize * 0.7 }}>{opt.icon}</span>
    }
    return <img src={src} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  }

  const getAvatarBg = (src) => {
    if (!src) return 'linear-gradient(135deg,#C89A3A,#A87820)'
    if (src.startsWith('default:')) {
      const id = src.replace('default:', '')
      return DEFAULT_AVATARS.find(o => o.id === id)?.bg || 'linear-gradient(135deg,#C89A3A,#A87820)'
    }
    return 'linear-gradient(135deg,#C89A3A,#A87820)'
  }

  return (
    <>
      <style>{styles}</style>
      <div className="pp-root">

        {/* NAVBAR */}
        <nav className="pp-nav">
          <div className="pp-nav-logo" onClick={() => navigate('/home')}>
            <div className="pp-nav-logo-top">ប្រាជ្ញា</div>
            <div className="pp-nav-logo-sub">ខ្មែរ</div>
          </div>
          <div className="pp-nav-icons">
            <button className="pp-nav-btn" onClick={() => navigate('/home')}>
              <span className="pp-nav-btn-icon"><FontAwesomeIcon icon={faHouse} /></span>ទំព័រដើម
            </button>
            <button className="pp-nav-btn" onClick={() => navigate('/favorites')}>
              <span className="pp-nav-btn-icon"><FontAwesomeIcon icon={faHeart} /></span>ចូលចិត្ត
            </button>
            <button className="pp-nav-btn active">
              <span className="pp-nav-btn-icon"><FontAwesomeIcon icon={faUser} /></span>គណនី
            </button>
            <button className="pp-nav-logout" onClick={handleLogout}>
              <span className="pp-nav-logout-icon"><FontAwesomeIcon icon={faRightFromBracket} /></span>ចាកចេញ
            </button>
          </div>
        </nav>

        <div className="pp-body">

          {/* LEFT */}
          <div className="pp-profile-card">
            <div className="pp-card-top"/>
            <div className="pp-card-body">

              {/* AVATAR — click opens modal */}
              <div className="pp-avatar-wrap" onClick={openModal}>
                <div className="pp-avatar" style={{ background: getAvatarBg(avatar) }}>
                  {renderAvatar(avatar)}
                </div>
                <div className="pp-avatar-overlay">
                  <FontAwesomeIcon icon={faCamera} />
                </div>
              </div>

              <button className="pp-change-photo-btn" style={{
                marginBottom: 12, background: 'none',
                border: '1.5px dashed #C8A040', borderRadius: 20, padding: '5px 16px',
                fontFamily: 'Battambang,serif', fontSize: 12, color: '#C8943A',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              }} onClick={openModal}>
                <FontAwesomeIcon icon={faCamera} /> ផ្លាស់ប្ដូររូបភាព
              </button>

              <div className="pp-username">{currentUser.username}</div>
              <div className="pp-role">
                <FontAwesomeIcon icon={currentUser.role === 'admin' ? faShield : faUser} />
                {currentUser.role === 'admin' ? 'Admin' : 'អ្នកប្រើ'}
              </div>
              <div className="pp-stats">
                <div className="pp-stat">
                  <div className="pp-stat-num">{favorites.length}</div>
                  <div className="pp-stat-label">ចូលចិត្ត</div>
                </div>
                <div className="pp-stat">
                  <div className="pp-stat-num">9</div>
                  <div className="pp-stat-label">សុភាសិតទាំងអស់</div>
                </div>
              </div>
              <button className="pp-logout-btn" onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} /> ចាកចេញ
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="pp-right">
            <div className="pp-section">
              <div className="pp-section-top"/>
              <div className="pp-section-body">
                <div className="pp-section-title">
                  <span className="pp-section-title-icon"><FontAwesomeIcon icon={faPen} /></span>
                  កែប្រែព័ត៌មានគណនី
                </div>
                <div className="pp-field">
                  <div className="pp-label">Username</div>
                  <div className="pp-wrap">
                    <span className="pp-field-icon"><FontAwesomeIcon icon={faUser} /></span>
                    <input className="pp-input" value={currentUser.username} disabled/>
                  </div>
                </div>
                <div className="pp-field">
                  <div className="pp-label">Email · អ៊ីមែល</div>
                  <div className="pp-wrap">
                    <span className="pp-field-icon"><FontAwesomeIcon icon={faEnvelope} /></span>
                    <input className="pp-input" type="email" value={email}
                      onChange={e => setEmail(e.target.value)} placeholder="example@email.com"/>
                  </div>
                </div>
              </div>
            </div>

            <div className="pp-section">
              <div className="pp-section-top"/>
              <div className="pp-section-body">
                <div className="pp-section-title">
                  <span className="pp-section-title-icon"><FontAwesomeIcon icon={faLock} /></span>
                  ផ្លាស់ប្ដូរពាក្យសម្ងាត់
                </div>
                <div className="pp-field">
                  <div className="pp-label">ពាក្យសម្ងាត់ថ្មី</div>
                  <div className="pp-wrap">
                    <span className="pp-field-icon"><FontAwesomeIcon icon={faLock} /></span>
                    <input className="pp-input" type="password" value={newPassword}
                      onChange={e => setNewPassword(e.target.value)} placeholder="••••••••"/>
                  </div>
                </div>
                <div className="pp-field">
                  <div className="pp-label">បញ្ជាក់ពាក្យសម្ងាត់</div>
                  <div className="pp-wrap">
                    <span className="pp-field-icon"><FontAwesomeIcon icon={faLock} /></span>
                    <input className="pp-input" type="password" value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••"/>
                  </div>
                </div>
                <div className="pp-btn-row">
                  <button className="pp-save-btn" onClick={handleSave}>
                    <FontAwesomeIcon icon={faCheck} /> រក្សាទុក
                  </button>
                  <button className="pp-cancel-btn" onClick={() => { setNewPassword(''); setConfirmPassword('') }}>
                    <FontAwesomeIcon icon={faXmark} /> បោះបង់
                  </button>
                </div>
                {saved && (
                  <div className="pp-success">
                    <FontAwesomeIcon icon={faCheck} /> រក្សាទុករួចរាល់!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── PHOTO MODAL ── */}
        {showModal && (
          <div className="pp-modal-backdrop" onClick={() => setShowModal(false)}>
            <div className="pp-modal" onClick={e => e.stopPropagation()}>
              <div className="pp-modal-top"/>
              <div className="pp-modal-body">
                <div className="pp-modal-title">រូបភាពប្រូហ្វាល</div>
                <div className="pp-modal-sub">Upload a photo or choose a default avatar</div>

                {/* preview */}
                <div className="pp-modal-preview">
                  <div className="pp-modal-avatar" style={{ background: getAvatarBg(previewAvatar) }}>
                    {renderAvatar(previewAvatar, 90, 34)}
                  </div>
                </div>

                {/* drop zone / upload */}
                <div className="pp-dropzone" onClick={() => fileInputRef.current.click()}>
                  <div className="pp-dropzone-icon"><FontAwesomeIcon icon={faUpload} /></div>
                  <div className="pp-dropzone-text">ចុចដើម្បីជ្រើសរូបភាព</div>
                  <div className="pp-dropzone-sub">JPG, PNG, GIF — max 5MB</div>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*"
                  className="pp-file-input" onChange={handleFileChange}/>

                <div className="pp-divider-row">
                  <div className="pp-divider-line"/> ឬ រូបតំណាងលំនាំដើម <div className="pp-divider-line"/>
                </div>

                {/* default avatars */}
                <div className="pp-defaults-label">ជ្រើសរូបតំណាង</div>
                <div className="pp-defaults-grid">
                  {DEFAULT_AVATARS.map(opt => (
                    <div
                      key={opt.id}
                      className={`pp-default-opt ${selectedDefault === opt.id ? 'selected' : ''}`}
                      style={{ background: opt.bg, color: opt.color }}
                      onClick={() => handleSelectDefault(opt)}
                    >
                      {opt.icon}
                    </div>
                  ))}
                </div>

                {/* actions */}
                <div className="pp-modal-actions">
                  <button className="pp-modal-save" onClick={handleSaveAvatar}>
                    <FontAwesomeIcon icon={faCheck} /> រក្សាទុក
                  </button>
                  <button className="pp-modal-reset" onClick={handleResetAvatar} title="Reset to default">
                    <FontAwesomeIcon icon={faRotateLeft} />
                  </button>
                  <button className="pp-modal-cancel" onClick={() => setShowModal(false)}>
                    <FontAwesomeIcon icon={faXmark} /> បោះបង់
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </>
  )
}