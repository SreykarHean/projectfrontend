import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse, faHeart, faUser, faRightFromBracket,
  faBookOpen, faCommentDots, faTag, faTrash
} from '@fortawesome/free-solid-svg-icons'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Moul&family=Crimson+Pro:ital,wght@0,400;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body, #root { width: 100%; min-height: 100vh; margin: 0; padding: 0; }

  .fp-root {
    width: 100vw; min-height: 100vh;
    background: #FBF5E6;
    font-family: 'Battambang', serif;
    display: flex; flex-direction: column;
  }

  /* ── NAVBAR ── */
  .fp-nav {
    width: 100%;
    background: linear-gradient(135deg, #5A3808 0%, #7A5020 100%);
    padding: 0 48px; height: 80px;
    display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 3px 16px rgba(0,0,0,0.22); flex-shrink: 0;
  }
  .fp-nav-logo { display: flex; flex-direction: column; align-items: flex-start; line-height: 1; cursor: pointer; }
  .fp-nav-logo-top { font-family: 'Moul', serif; font-size: 26px; color: #F5D878; text-shadow: 1px 1px 0 rgba(0,0,0,0.3); }
  .fp-nav-logo-sub { font-family: 'Battambang', serif; font-size: 12px; color: rgba(245,216,120,0.65); font-weight: 700; align-self: flex-end; letter-spacing: 0; }

  .fp-nav-icons { display: flex; gap: 8px; align-items: center; }
  .fp-nav-btn {
    background: none; border: none; cursor: pointer;
    padding: 8px 12px; border-radius: 12px;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    color: rgba(255,240,200,0.65); font-size: 10px;
    font-family: 'Battambang', serif; transition: background 0.2s, color 0.2s;
  }
  .fp-nav-btn:hover { background: rgba(255,255,255,0.1); color: #F5D878; }
  .fp-nav-btn.active { color: #F5D878; }
  .fp-nav-btn-icon { font-size: 17px; padding: 4px 6px; }
  .fp-nav-logout {
    background: rgba(200,80,50,0.22); border: 1px solid rgba(200,80,50,0.4);
    border-radius: 12px; padding: 8px 12px;
    color: #F5A090; font-size: 10px; cursor: pointer;
    font-family: 'Battambang', serif;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    transition: background 0.2s;
  }
  .fp-nav-logout:hover { background: rgba(200,80,50,0.4); }
  .fp-nav-logout-icon { font-size: 16px; }

  /* ── BODY ── */
  .fp-body { flex: 1; width: 100%; padding: 32px 48px; }

  /* ── PAGE HEADER ── */
  .fp-page-header {
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 2px solid #E8D8A8;
  }
  .fp-page-icon {
    width: 52px; height: 52px;
    background: linear-gradient(135deg, #C89A3A, #A87820);
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; color: #FFF8E8;
    box-shadow: 0 4px 12px rgba(180,120,20,0.35);
  }
  .fp-page-title { font-family: 'Moul', serif; font-size: 22px; color: #4A2E08; }
  .fp-page-count {
    margin-left: auto;
    font-size: 13px; color: #A08848;
    background: #FFF0CC; border: 1px solid #E8C870;
    padding: 4px 14px; border-radius: 20px;
  }

  /* ── EMPTY STATE ── */
  .fp-empty {
    display: flex; flex-direction: column; align-items: center;
    padding: 80px 0; color: #C0A878; gap: 14px;
  }
  .fp-empty-icon { font-size: 48px; color: #E8D090; }
  .fp-empty-text { font-size: 16px; }
  .fp-empty-btn {
    margin-top: 8px; padding: 12px 28px;
    background: linear-gradient(135deg, #C89A3A, #A87820);
    border: none; border-radius: 50px;
    font-family: 'Battambang', serif; font-size: 15px;
    color: #FFF8E8; cursor: pointer;
    box-shadow: 0 4px 0 #6A4808;
    transition: transform 0.15s;
  }
  .fp-empty-btn:hover { transform: translateY(-2px); }

  /* ── CARDS GRID ── */
  .fp-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 14px;
  }
  .fp-card {
    background: #FFFCF0; border-radius: 16px;
    border: 1px solid #E8D8A8;
    box-shadow: 0 2px 10px rgba(100,70,10,0.08);
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer; overflow: hidden;
  }
  .fp-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(100,70,10,0.15); }
  .fp-card-ornament-top { height: 5px; background: linear-gradient(90deg, #C8943A, #E8C060, #C8943A); }
  .fp-card-body { padding: 12px 16px 14px; }
  .fp-card-tag {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    color: #A87828; background: #FFF0CC; border: 1px solid #E8C870;
    padding: 3px 10px; border-radius: 20px;
  }
  .fp-card-text {
    font-size: 16px; font-weight: 700; color: #3D2008;
    line-height: 1.65; margin: 10px 0 12px;
  }
  .fp-card-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding-top: 8px; border-top: 1px dashed #E8D8A8;
  }
  .fp-card-type {
    font-size: 11px; color: #A08848;
    display: flex; align-items: center; gap: 5px;
  }
  .fp-card-remove {
    background: none; border: none; cursor: pointer;
    padding: 4px 8px; border-radius: 8px;
    font-size: 13px; color: #C09090;
    display: flex; align-items: center; gap: 5px;
    transition: background 0.2s, color 0.2s;
    font-family: 'Battambang', serif;
  }
  .fp-card-remove:hover { background: #FEE8E8; color: #E05060; }
  .fp-card-ornament-bot { height: 3px; background: linear-gradient(90deg, transparent, #E8C060, #C8943A, #E8C060, transparent); }
`

const ALL_DATA = [
  { id:1, type:'proverbs', category:'ជីវិត',    text:'ក្ដៅថ្ងៃមិនស្មើក្ដៅចិត្ដ' },
  { id:2, type:'proverbs', category:'ការអប់រំ', text:'ផ្លូវវៀចកុំបោះបង់ ផ្លូវត្រង់កុំដើរហោង' },
  { id:3, type:'proverbs', category:'មិត្តភាព', text:'ក្បែរអ្នកល្អ ក្លាយជាអ្នកល្អ' },
  { id:4, type:'proverbs', category:'ជោគជ័យ',  text:'ទន្លេធំ ចាប់ត្រីធំ' },
  { id:5, type:'proverbs', category:'ជីវិត',    text:'ដែលខ្លួនមិនចង់ កុំធ្វើដល់គេ' },
  { id:6, type:'idioms',   category:'ជីវិត',    text:'ពោះឃ្លានភ្នែកឃ្លាន' },
  { id:7, type:'idioms',   category:'ការអប់រំ', text:'ច្រៀងមិនដឹងភ្លេង' },
  { id:8, type:'idioms',   category:'ជីវិត',    text:'ត្រីចិញ្ចើមទឹក' },
  { id:9, type:'idioms',   category:'ជោគជ័យ',  text:'ដៃវែង ភ្នែកឃ្លាត' },
]

export default function FavoritesPage() {
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem('bk_favorites') || '[]')
  )

  const favItems = ALL_DATA.filter(d => favorites.includes(d.id))

  const removeFav = (id) => {
    const updated = favorites.filter(f => f !== id)
    setFavorites(updated)
    localStorage.setItem('bk_favorites', JSON.stringify(updated))
  }

  const handleLogout = () => {
    localStorage.removeItem('bk_current_user')
    navigate('/')
  }

  return (
    <>
      <style>{styles}</style>
      <div className="fp-root">

        {/* NAVBAR */}
        <nav className="fp-nav">
          <div className="fp-nav-logo" onClick={() => navigate('/home')}>
            <div className="fp-nav-logo-top">ប្រាជ្ញា</div>
            <div className="fp-nav-logo-sub">ខ្មែរ</div>
          </div>
          <div className="fp-nav-icons">
            <button className="fp-nav-btn" onClick={() => navigate('/home')}>
              <span className="fp-nav-btn-icon"><FontAwesomeIcon icon={faHouse} /></span>ទំព័រដើម
            </button>
            <button className="fp-nav-btn active" onClick={() => navigate('/favorites')}>
              <span className="fp-nav-btn-icon"><FontAwesomeIcon icon={faHeart} /></span>ចូលចិត្ត
            </button>
            <button className="fp-nav-btn" onClick={() => navigate('/profile')}>
              <span className="fp-nav-btn-icon"><FontAwesomeIcon icon={faUser} /></span>គណនី
            </button>
            <button className="fp-nav-logout" onClick={handleLogout}>
              <span className="fp-nav-logout-icon"><FontAwesomeIcon icon={faRightFromBracket} /></span>ចាកចេញ
            </button>
          </div>
        </nav>

        {/* BODY */}
        <div className="fp-body">

          {/* PAGE HEADER */}
          <div className="fp-page-header">
            <div className="fp-page-icon"><FontAwesomeIcon icon={faHeart} /></div>
            <div className="fp-page-title">ចូលចិត្ត</div>
            <div className="fp-page-count">{favItems.length} រួម</div>
          </div>

          {/* EMPTY */}
          {favItems.length === 0 && (
            <div className="fp-empty">
              <div className="fp-empty-icon"><FontAwesomeIcon icon={faHeart} /></div>
              <div className="fp-empty-text">មិនទាន់មានចូលចិត្តទេ</div>
              <button className="fp-empty-btn" onClick={() => navigate('/home')}>
                ត្រឡប់ទៅទំព័រដើម
              </button>
            </div>
          )}

          {/* CARDS */}
          <div className="fp-cards">
            {favItems.map(item => (
              <div key={item.id} className="fp-card"
                onClick={() => item.type === 'proverbs' && navigate(`/detail/${item.id}`)}>
                <div className="fp-card-ornament-top"/>
                <div className="fp-card-body">
                  <div className="fp-card-tag">
                    <FontAwesomeIcon icon={faTag} /> {item.category}
                  </div>
                  <div className="fp-card-text">{item.text}</div>
                  <div className="fp-card-footer">
                    <div className="fp-card-type">
                      <FontAwesomeIcon icon={item.type === 'proverbs' ? faBookOpen : faCommentDots} />
                      {item.type === 'proverbs' ? 'សុភាសិត' : 'ពាក្យបណ្ដៅ'}
                    </div>
                    <button className="fp-card-remove" onClick={e => { e.stopPropagation(); removeFav(item.id) }}>
                      <FontAwesomeIcon icon={faTrash} /> លុប
                    </button>
                  </div>
                </div>
                <div className="fp-card-ornament-bot"/>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}