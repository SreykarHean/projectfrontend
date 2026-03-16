import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse, faHeart, faUser, faRightFromBracket,
  faBookOpen, faCommentDots, faTag, faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Moul&family=Crimson+Pro:ital,wght@0,400;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body, #root { width: 100%; min-height: 100vh; margin: 0; padding: 0; }

  .ws-root {
    width: 100vw; min-height: 100vh;
    background: #FBF5E6;
    font-family: 'Battambang', serif;
    display: flex; flex-direction: column;
  }

  /* ── NAVBAR ── */
  .ws-nav {
    width: 100%;
    background: linear-gradient(135deg, #5A3808 0%, #7A5020 100%);
    padding: 0 48px; height: 80px;
    display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 3px 16px rgba(0,0,0,0.22); flex-shrink: 0;
  }
  .ws-nav-logo { display: flex; flex-direction: column; align-items: flex-start; line-height: 1; cursor: pointer; }
  .ws-nav-logo-top { font-family: 'Moul', serif; font-size: 26px; color: #F5D878; text-shadow: 1px 1px 0 rgba(0,0,0,0.3); }
  .ws-nav-logo-sub { font-family: 'Battambang', serif; font-size: 12px; color: rgba(245,216,120,0.65); font-weight: 700; align-self: flex-end; letter-spacing: 0; }
  .ws-nav-icons { display: flex; gap: 8px; align-items: center; }
  .ws-nav-btn {
    background: none; border: none; cursor: pointer;
    padding: 8px 12px; border-radius: 12px;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    color: rgba(255,240,200,0.65); font-size: 10px;
    font-family: 'Battambang', serif; transition: background 0.2s, color 0.2s;
  }
  .ws-nav-btn:hover { background: rgba(255,255,255,0.1); color: #F5D878; }
  .ws-nav-btn.active { color: #F5D878; }
  .ws-nav-btn-icon { font-size: 17px; padding: 4px 6px; }
  .ws-nav-logout {
    background: rgba(200,80,50,0.22); border: 1px solid rgba(200,80,50,0.4);
    border-radius: 12px; padding: 8px 12px;
    color: #F5A090; font-size: 10px; cursor: pointer;
    font-family: 'Battambang', serif;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    transition: background 0.2s;
  }
  .ws-nav-logout:hover { background: rgba(200,80,50,0.4); }
  .ws-nav-logout-icon { font-size: 16px; }

  /* ── TABS ── */
  .ws-tabs {
    width: 100%;
    background: linear-gradient(180deg, #7A5020 0%, #6A4018 100%);
    padding: 0 48px; display: flex; flex-shrink: 0;
  }
  .ws-tab {
    padding: 12px 24px; background: none; border: none; cursor: pointer;
    font-family: 'Battambang', serif; font-size: 14px;
    color: rgba(255,240,200,0.55);
    position: relative; transition: color 0.2s;
    display: flex; align-items: center; gap: 8px;
  }
  .ws-tab::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0;
    height: 2.5px; background: #F5D878; border-radius: 2px 2px 0 0;
    transform: scaleX(0); transition: transform 0.25s;
  }
  .ws-tab.active { color: #F5D878; font-weight: 700; }
  .ws-tab.active::after { transform: scaleX(1); }

  /* ── BODY ── */
  .ws-body { flex: 1; width: 100%; padding: 24px 48px; }

  /* ── SEARCH ROW ── */
  .ws-search-row { display: flex; gap: 12px; align-items: center; margin-bottom: 16px; }
  .ws-search-wrap { flex: 1; position: relative; }
  .ws-search-icon {
    position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
    color: #C0A878; font-size: 14px; pointer-events: none;
  }
  .ws-search-input {
    width: 100%; padding: 12px 16px 12px 40px;
    background: #FFF8EC; border: 1.5px solid #E8D8A8; border-radius: 12px;
    font-family: 'Battambang', serif; font-size: 15px; color: #3D2008;
    outline: none; transition: border-color 0.2s;
    box-shadow: 0 2px 6px rgba(100,70,10,0.07);
  }
  .ws-search-input::placeholder { color: #C0A878; }
  .ws-search-input:focus { border-color: #C8943A; }
  .ws-filter-select {
    padding: 12px 36px 12px 16px; background: #FFF8EC;
    border: 1.5px solid #E8D8A8; border-radius: 12px;
    font-family: 'Battambang', serif; font-size: 14px; color: #6A4818;
    outline: none; cursor: pointer; min-width: 140px;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C8943A' stroke-width='2' fill='none'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 12px center;
    box-shadow: 0 2px 6px rgba(100,70,10,0.07);
  }

  /* ── SECTION LABEL ── */
  .ws-section-label {
    padding: 4px 0 12px; font-size: 11px; color: #A08848;
    letter-spacing: 0.08em; text-transform: uppercase;
    display: flex; align-items: center; gap: 8px;
  }
  .ws-section-label::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, #E8D8A8, transparent); }

  /* ── CARDS GRID ── */
  .ws-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 14px;
  }
  .ws-card {
    background: #FFFCF0; border-radius: 16px;
    border: 1px solid #E8D8A8;
    box-shadow: 0 2px 10px rgba(100,70,10,0.08);
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .ws-card-ornament-top { height: 5px; background: linear-gradient(90deg, #6A8CA8, #A0C0D8, #6A8CA8); }
  .ws-card-body { padding: 12px 16px 14px; }
  .ws-card-tag {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    color: #507090; background: #E8F0F8; border: 1px solid #B8D0E8;
    padding: 3px 10px; border-radius: 20px;
  }
  .ws-card-text {
    font-size: 16px; font-weight: 700; color: #3D2008;
    line-height: 1.65; margin: 10px 0 12px; padding-right: 32px;
  }
  .ws-card-footer {
    display: flex; align-items: center; justify-content: flex-end;
    padding-top: 8px; border-top: 1px dashed #E8D8A8;
  }
  .ws-card-heart {
    background: none; border: none; cursor: pointer;
    padding: 4px 6px; border-radius: 50%;
    font-size: 17px; color: #C0A0A0;
    transition: transform 0.2s, color 0.2s;
  }
  .ws-card-heart:hover { transform: scale(1.25); }
  .ws-card-heart.loved { color: #E05060; }
  .ws-card-ornament-bot { height: 3px; background: linear-gradient(90deg, transparent, #A0C0D8, #6A8CA8, #A0C0D8, transparent); }
  .ws-empty { text-align: center; padding: 60px 0; color: #A08848; font-size: 15px; grid-column: 1/-1; }
`

const IDIOMS = [
  { id:6,  category:'ជីវិត',    text:'ពោះឃ្លានភ្នែកឃ្លាន' },
  { id:7,  category:'ការអប់រំ', text:'ច្រៀងមិនដឹងភ្លេង' },
  { id:8,  category:'ជីវិត',    text:'ត្រីចិញ្ចើមទឹក' },
  { id:9,  category:'ជោគជ័យ',  text:'ដៃវែង ភ្នែកឃ្លាត' },
  { id:10, category:'មិត្តភាព', text:'ទឹកកកក្នុងពែង' },
]

const CATEGORIES = ['ទាំងអស់', 'ជីវិត', 'ការអប់រំ', 'មិត្តភាព', 'ជោគជ័យ']

export default function WisdomPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('ទាំងអស់')
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem('bk_favorites') || '[]')
  )

  const filtered = IDIOMS.filter(item => {
    const matchCat = category === 'ទាំងអស់' || item.category === category
    const matchSearch = item.text.includes(search) || item.category.includes(search)
    return matchCat && matchSearch
  })

  const toggleFav = (id, e) => {
    e.stopPropagation()
    const updated = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id]
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
      <div className="ws-root">

        {/* NAVBAR */}
        <nav className="ws-nav">
          <div className="ws-nav-logo" onClick={() => navigate('/home')}>
            <div className="ws-nav-logo-top">ប្រាជ្ញា</div>
            <div className="ws-nav-logo-sub">ខ្មែរ</div>
          </div>
          <div className="ws-nav-icons">
            <button className="ws-nav-btn active" onClick={() => navigate('/home')}>
              <span className="ws-nav-btn-icon"><FontAwesomeIcon icon={faHouse} /></span>ទំព័រដើម
            </button>
            <button className="ws-nav-btn" onClick={() => navigate('/favorites')}>
              <span className="ws-nav-btn-icon"><FontAwesomeIcon icon={faHeart} /></span>ចូលចិត្ត
            </button>
            <button className="ws-nav-btn" onClick={() => navigate('/profile')}>
              <span className="ws-nav-btn-icon"><FontAwesomeIcon icon={faUser} /></span>គណនី
            </button>
            <button className="ws-nav-logout" onClick={handleLogout}>
              <span className="ws-nav-logout-icon"><FontAwesomeIcon icon={faRightFromBracket} /></span>ចាកចេញ
            </button>
          </div>
        </nav>

        {/* TABS */}
        <div className="ws-tabs">
          <button className="ws-tab" onClick={() => navigate('/home')}>
            <FontAwesomeIcon icon={faBookOpen} /> សុភាសិត
          </button>
          <button className="ws-tab active" onClick={() => navigate('/wisdom')}>
            <FontAwesomeIcon icon={faCommentDots} /> ពាក្យបណ្ដៅ
          </button>
        </div>

        {/* BODY */}
        <div className="ws-body">
          <div className="ws-search-row">
            <div className="ws-search-wrap">
              <span className="ws-search-icon"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
              <input className="ws-search-input" type="text" placeholder="ស្វែងរក..."
                value={search} onChange={e => setSearch(e.target.value)}/>
            </div>
            <select className="ws-filter-select" value={category} onChange={e => setCategory(e.target.value)}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="ws-section-label">
            បង្ហាញ {filtered.length} ពាក្យបណ្ដៅ
          </div>

          <div className="ws-cards">
            {filtered.length === 0 && <div className="ws-empty">មិនមានលទ្ធផល 🔍</div>}
            {filtered.map(item => (
              <div key={item.id} className="ws-card"
                onClick={() => navigate(`/wisdom/${item.id}`)}>
                <div className="ws-card-ornament-top"/>
                <div className="ws-card-body">
                  <div className="ws-card-tag">
                    <FontAwesomeIcon icon={faTag} /> {item.category}
                  </div>
                  <div className="ws-card-text">{item.text}</div>
                  <div className="ws-card-footer">
                    <button
                      className={`ws-card-heart ${favorites.includes(item.id) ? 'loved' : ''}`}
                      onClick={e => toggleFav(item.id, e)}
                    >
                      <FontAwesomeIcon icon={favorites.includes(item.id) ? faHeart : faHeartOutline} />
                    </button>
                  </div>
                </div>
                <div className="ws-card-ornament-bot"/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}