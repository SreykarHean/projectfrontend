import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShield, faUsers, faBookOpen, faCommentDots,
  faTrash, faRightFromBracket, faChartBar
} from '@fortawesome/free-solid-svg-icons'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Moul&family=Crimson+Pro:ital,wght@0,400;1,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body, #root { width: 100%; min-height: 100vh; margin: 0; padding: 0; }

  .ap-root {
    width: 100vw; min-height: 100vh;
    background: #F5F0E8; font-family: 'Battambang', serif;
    display: flex; flex-direction: column;
  }
  .ap-nav {
    width: 100%;
    background: linear-gradient(135deg, #3A2008 0%, #5A3818 100%);
    padding: 0 48px; height: 80px;
    display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 3px 16px rgba(0,0,0,0.3); flex-shrink: 0;
  }
  .ap-nav-logo { display: flex; align-items: center; gap: 12px; }
  .ap-nav-logo-icon {
    width: 42px; height: 42px;
    background: linear-gradient(135deg, #C89A3A, #A87820);
    border-radius: 12px; display: flex; align-items: center; justify-content: center;
    font-size: 18px; color: #FFF8E8;
  }
  .ap-nav-logo-text { font-family: 'Moul', serif; font-size: 20px; color: #F5D878; }
  .ap-nav-logout {
    background: rgba(200,80,50,0.22); border: 1px solid rgba(200,80,50,0.4);
    border-radius: 12px; padding: 10px 16px; color: #F5A090; font-size: 13px;
    cursor: pointer; font-family: 'Battambang', serif;
    display: flex; align-items: center; gap: 8px; transition: background 0.2s;
  }
  .ap-nav-logout:hover { background: rgba(200,80,50,0.4); }

  .ap-body { flex: 1; padding: 32px 48px; }
  .ap-title {
    font-family: 'Moul', serif; font-size: 24px; color: #4A2E08;
    margin-bottom: 24px; display: flex; align-items: center; gap: 12px;
  }
  .ap-title-icon { color: #C8943A; }

  /* STATS */
  .ap-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
  .ap-stat {
    background: #FFFCF0; border-radius: 16px; border: 1px solid #E8D8A8;
    padding: 20px; display: flex; align-items: center; gap: 16px;
    box-shadow: 0 2px 10px rgba(100,70,10,0.07);
  }
  .ap-stat-icon {
    width: 48px; height: 48px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; flex-shrink: 0;
  }
  .ap-stat-icon.gold { background: linear-gradient(135deg, #C89A3A, #A87820); color: #FFF8E8; }
  .ap-stat-icon.blue { background: linear-gradient(135deg, #4A90C8, #2860A8); color: #fff; }
  .ap-stat-icon.green { background: linear-gradient(135deg, #5AAA68, #3A8048); color: #fff; }
  .ap-stat-icon.purple { background: linear-gradient(135deg, #8A60C8, #6040A8); color: #fff; }
  .ap-stat-num { font-size: 26px; font-weight: 700; color: #C8943A; line-height: 1; }
  .ap-stat-label { font-size: 12px; color: #A08848; margin-top: 2px; }

  /* SECTIONS */
  .ap-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .ap-section {
    background: #FFFCF0; border-radius: 20px; border: 1px solid #E8D8A8;
    box-shadow: 0 2px 10px rgba(100,70,10,0.07); overflow: hidden;
  }
  .ap-section-top { height: 5px; background: linear-gradient(90deg, #C8943A, #E8C060, #C8943A); }
  .ap-section-body { padding: 20px; }
  .ap-section-title {
    font-family: 'Moul', serif; font-size: 16px; color: #4A2E08;
    margin-bottom: 16px; display: flex; align-items: center; gap: 8px;
  }
  .ap-section-icon { color: #C8943A; }

  /* USER LIST */
  .ap-user-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 14px; border-radius: 12px; margin-bottom: 8px;
    background: #FBF5E6; border: 1px solid #E8D8A8;
  }
  .ap-user-info { display: flex; flex-direction: column; gap: 2px; }
  .ap-user-name { font-size: 14px; font-weight: 700; color: #3D2008; }
  .ap-user-email { font-size: 11px; color: #A08848; }
  .ap-user-role {
    font-size: 10px; padding: 2px 10px; border-radius: 20px;
    font-weight: 700; letter-spacing: 0.06em;
  }
  .ap-user-role.admin { background: #FFF0CC; color: #A87828; border: 1px solid #E8C870; }
  .ap-user-role.user  { background: #E8F0F8; color: #507090; border: 1px solid #B8D0E8; }
  .ap-del-btn {
    background: none; border: none; cursor: pointer;
    color: #C09090; font-size: 14px; padding: 4px 8px;
    border-radius: 8px; transition: background 0.2s, color 0.2s;
  }
  .ap-del-btn:hover { background: #FEE8E8; color: #E05060; }
  .ap-empty-users { text-align: center; padding: 20px; color: #C0A878; font-size: 13px; }
`

export default function AdminPage() {
  const navigate = useNavigate()
  const [users, setUsers] = useState(() =>
    JSON.parse(localStorage.getItem('bk_users') || '[]')
  )
  const favorites = JSON.parse(localStorage.getItem('bk_favorites') || '[]')

  const deleteUser = (username) => {
    if (!confirm(`Delete user "${username}"?`)) return
    const updated = users.filter(u => u.username !== username)
    setUsers(updated)
    localStorage.setItem('bk_users', JSON.stringify(updated))
  }

  const handleLogout = () => {
    localStorage.removeItem('bk_current_user')
    navigate('/')
  }

  return (
    <>
      <style>{styles}</style>
      <div className="ap-root">

        <nav className="ap-nav">
          <div className="ap-nav-logo">
            <div className="ap-nav-logo-icon"><FontAwesomeIcon icon={faShield} /></div>
            <div className="ap-nav-logo-text">Admin Panel</div>
          </div>
          <button className="ap-nav-logout" onClick={handleLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} /> ចាកចេញ
          </button>
        </nav>

        <div className="ap-body">
          <div className="ap-title">
            <span className="ap-title-icon"><FontAwesomeIcon icon={faChartBar} /></span>
            Dashboard
          </div>

          {/* STATS */}
          <div className="ap-stats">
            <div className="ap-stat">
              <div className="ap-stat-icon gold"><FontAwesomeIcon icon={faUsers} /></div>
              <div>
                <div className="ap-stat-num">{users.length}</div>
                <div className="ap-stat-label">អ្នកប្រើប្រាស់</div>
              </div>
            </div>
            <div className="ap-stat">
              <div className="ap-stat-icon blue"><FontAwesomeIcon icon={faBookOpen} /></div>
              <div>
                <div className="ap-stat-num">5</div>
                <div className="ap-stat-label">សុភាសិត</div>
              </div>
            </div>
            <div className="ap-stat">
              <div className="ap-stat-icon green"><FontAwesomeIcon icon={faCommentDots} /></div>
              <div>
                <div className="ap-stat-num">5</div>
                <div className="ap-stat-label">ពាក្យបណ្ដៅ</div>
              </div>
            </div>
            <div className="ap-stat">
              <div className="ap-stat-icon purple"><FontAwesomeIcon icon={faChartBar} /></div>
              <div>
                <div className="ap-stat-num">{favorites.length}</div>
                <div className="ap-stat-label">ចូលចិត្តសរុប</div>
              </div>
            </div>
          </div>

          {/* USER LIST */}
          <div className="ap-grid">
            <div className="ap-section">
              <div className="ap-section-top"/>
              <div className="ap-section-body">
                <div className="ap-section-title">
                  <span className="ap-section-icon"><FontAwesomeIcon icon={faUsers} /></span>
                  អ្នកប្រើប្រាស់ទាំងអស់
                </div>
                {users.length === 0 ? (
                  <div className="ap-empty-users">មិនទាន់មានអ្នកប្រើប្រាស់ទេ</div>
                ) : (
                  users.map(u => (
                    <div key={u.username} className="ap-user-row">
                      <div className="ap-user-info">
                        <div className="ap-user-name">{u.username}</div>
                        <div className="ap-user-email">{u.email}</div>
                      </div>
                      <div style={{display:'flex', alignItems:'center', gap:8}}>
                        <span className={`ap-user-role ${u.role}`}>{u.role}</span>
                        <button className="ap-del-btn" onClick={() => deleteUser(u.username)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="ap-section">
              <div className="ap-section-top"/>
              <div className="ap-section-body">
                <div className="ap-section-title">
                  <span className="ap-section-icon"><FontAwesomeIcon icon={faBookOpen} /></span>
                  ព័ត៌មានប្រព័ន្ធ
                </div>
                <div style={{fontSize:13, color:'#8A7050', lineHeight:2.2}}>
                  <div>📦 Version: 1.0.0</div>
                  <div>🗄️ Storage: localStorage</div>
                  <div>⚛️ Framework: ReactJS + Vite</div>
                  <div>🎨 UI: Font Awesome + Custom CSS</div>
                  <div>🌐 Language: Khmer + English</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}