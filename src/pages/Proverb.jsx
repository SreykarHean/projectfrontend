import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse, faHeart, faUser, faRightFromBracket,
  faBookOpen, faCommentDots, faTag, faMagnifyingGlass,faQuestionCircle
} from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Moul&family=Crimson+Pro:ital,wght@0,400;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body, #root { width: 100%; min-height: 100vh; margin: 0; padding: 0; }

  .pv-root {
    width: 100vw; min-height: 100vh;
    background: #FBF5E6;
    font-family: 'Battambang', serif;
    display: flex; flex-direction: column;
  }

  /* ── NAVBAR ── */
  .pv-nav {
    width: 100%;
    background: linear-gradient(135deg, #5A3808 0%, #7A5020 100%);
    padding: 0 48px; height: 80px;
    display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 3px 16px rgba(0,0,0,0.22); flex-shrink: 0;
  }
  .pv-nav-logo { display: flex; flex-direction: column; align-items: flex-start; line-height: 1; cursor: pointer; }
  .pv-nav-logo-top { font-family: 'Moul', serif; font-size: 26px; color: #F5D878; text-shadow: 1px 1px 0 rgba(0,0,0,0.3); }
  .pv-nav-logo-sub { font-family: 'Battambang', serif; font-size: 12px; color: rgba(245,216,120,0.65); font-weight: 700; align-self: flex-end; letter-spacing: 0; }
  .pv-nav-icons { display: flex; gap: 8px; align-items: center; }
  .pv-nav-btn {
    background: none; border: none; cursor: pointer;
    padding: 8px 12px; border-radius: 12px;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    color: rgba(255,240,200,0.65); font-size: 10px;
    font-family: 'Battambang', serif; transition: background 0.2s, color 0.2s;
  }
  .pv-nav-btn:hover { background: rgba(255,255,255,0.1); color: #F5D878; }
  .pv-nav-btn.active { color: #F5D878; }
  .pv-nav-btn-icon { font-size: 17px; padding: 4px 6px; }
  .pv-nav-logout {
    background: rgba(200,80,50,0.22); border: 1px solid rgba(200,80,50,0.4);
    border-radius: 12px; padding: 8px 12px;
    color: #F5A090; font-size: 10px; cursor: pointer;
    font-family: 'Battambang', serif;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    transition: background 0.2s;
  }
  .pv-nav-logout:hover { background: rgba(200,80,50,0.4); }
  .pv-nav-logout-icon { font-size: 16px; }

.pv-nav-quiz {
  background: rgba(100,160,80,0.22); border: 1px solid rgba(100,160,80,0.4);
  border-radius: 12px; padding: 8px 12px;
  color: #90F090; font-size: 10px; cursor: pointer;
  font-family: 'Battambang', serif;
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  transition: background 0.2s;
}
.pv-nav-quiz:hover { background: rgba(100,160,80,0.4); }
  /* ── TABS ── */
  .pv-tabs {
    width: 100%;
    background: linear-gradient(180deg, #7A5020 0%, #6A4018 100%);
    padding: 0 48px; display: flex; flex-shrink: 0;
  }
  .pv-tab {
    padding: 12px 24px; background: none; border: none; cursor: pointer;
    font-family: 'Battambang', serif; font-size: 14px;
    color: rgba(255,240,200,0.55);
    position: relative; transition: color 0.2s;
    display: flex; align-items: center; gap: 8px;
  }
  .pv-tab::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0;
    height: 2.5px; background: #F5D878; border-radius: 2px 2px 0 0;
    transform: scaleX(0); transition: transform 0.25s;
  }
  .pv-tab.active { color: #F5D878; font-weight: 700; }
  .pv-tab.active::after { transform: scaleX(1); }

  /* ── BODY ── */
  .pv-body { flex: 1; width: 100%; padding: 24px 48px; }

  /* ── SEARCH ROW ── */
  .pv-search-row { display: flex; gap: 12px; align-items: center; margin-bottom: 16px; }
  .pv-search-wrap { flex: 1; position: relative; }
  .pv-search-icon {
    position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
    color: #C0A878; font-size: 14px; pointer-events: none;
  }
  .pv-search-input {
    width: 100%; padding: 12px 16px 12px 40px;
    background: #FFF8EC; border: 1.5px solid #E8D8A8; border-radius: 12px;
    font-family: 'Battambang', serif; font-size: 15px; color: #3D2008;
    outline: none; transition: border-color 0.2s;
    box-shadow: 0 2px 6px rgba(100,70,10,0.07);
  }
  .pv-search-input::placeholder { color: #C0A878; }
  .pv-search-input:focus { border-color: #C8943A; }
  .pv-filter-select {
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
  .pv-section-label {
    padding: 4px 0 12px; font-size: 11px; color: #A08848;
    letter-spacing: 0.08em; text-transform: uppercase;
    display: flex; align-items: center; gap: 8px;
  }
  .pv-section-label::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, #E8D8A8, transparent); }

  /* ── CARDS GRID ── */
  .pv-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 14px;
  }
  .pv-card {
    background: #FFFCF0; border-radius: 16px;
    border: 1px solid #E8D8A8;
    box-shadow: 0 2px 10px rgba(100,70,10,0.08);
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer; overflow: hidden;
  }
  .pv-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(100,70,10,0.15); }
  .pv-card-ornament-top { height: 5px; background: linear-gradient(90deg, #C8943A, #E8C060, #C8943A); }
  .pv-card-body { padding: 12px 16px 14px; }
  .pv-card-tag {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    color: #A87828; background: #FFF0CC; border: 1px solid #E8C870;
    padding: 3px 10px; border-radius: 20px;
  }
  .pv-card-text {
    font-size: 16px; font-weight: 700; color: #3D2008;
    line-height: 1.65; margin: 10px 0 12px; padding-right: 32px;
  }
  .pv-card-footer {
    display: flex; align-items: center; justify-content: flex-end;
    padding-top: 8px; border-top: 1px dashed #E8D8A8;
  }
  .pv-card-heart {
    background: none; border: none; cursor: pointer;
    padding: 4px 6px; border-radius: 50%;
    font-size: 17px; color: #C0A0A0;
    transition: transform 0.2s, color 0.2s;
  }
  .pv-card-heart:hover { transform: scale(1.25); }
  .pv-card-heart.loved { color: #E05060; }
  .pv-card-ornament-bot { height: 3px; background: linear-gradient(90deg, transparent, #E8C060, #C8943A, #E8C060, transparent); }
  .pv-empty { text-align: center; padding: 60px 0; color: #A08848; font-size: 15px; grid-column: 1/-1; }
`

const PROVERBS = [
  { id:1, category:'ជីវិត',    text:'ដំបៅមិនឈឺ យកឈើចាក់' },
  { id:2, category:'ជីវិត',    text:'តក់ៗពេញបំពង់' },
  { id:3, category:'ការអប់រំ', text:'ផ្លូវវៀចកុំបោះបង់ ផ្លូវត្រង់កុំដើរហោង' },
  { id:4, category:'ការអប់រំ', text:'ឃើញ​ដំរី​ជុះ​ កុំ​ជុះ​តាម​ដំរី (ឬ ដំរី​ជុះ​ កុំ​ជុះ​តាម​ដំរី)' },
  { id:5, category:'មិត្តភាព', text:'គ្នាច្រើនអន្សមខ្លោច ​គ្នាដូចស្រមោចអន្សមឆៅ' },
  { id:6, category:'មិត្តភាព', text:'ចានមួយរាវ លែងអីរណ្តំគ្នា' },
  { id:7, category:'ជោគជ័យ',  text:'ដើរយឺតក៏ដល់' },
  { id:8, category:'ជោគជ័យ',  text:'ចង់ចេះឲ្យធ្វើល្ងង់' }
]

const CATEGORIES = ['ទាំងអស់', 'ជីវិត', 'ការអប់រំ', 'មិត្តភាព', 'ជោគជ័យ']

export default function ProverbPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('ទាំងអស់')
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem('bk_favorites') || '[]')
  )

  const filtered = PROVERBS.filter(item => {
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
      <div className="pv-root">

        {/* NAVBAR */}
        <nav className="pv-nav">
          <div className="pv-nav-logo" onClick={() => navigate('/home')}>
            <div className="pv-nav-logo-top">ប្រាជ្ញា</div>
            <div className="pv-nav-logo-sub">ខ្មែរ</div>
          </div>
          <div className="pv-nav-icons">
            <button className="pv-nav-btn active" onClick={() => navigate('/home')}>
              <span className="pv-nav-btn-icon"><FontAwesomeIcon icon={faHouse} /></span>ទំព័រដើម
            </button>
            <button className="pv-nav-btn" onClick={() => navigate('/favorites')}>
              <span className="pv-nav-btn-icon"><FontAwesomeIcon icon={faHeart} /></span>ចូលចិត្ត
            </button>
            <button className="pv-nav-btn" onClick={() => navigate('/profile')}>
              <span className="pv-nav-btn-icon"><FontAwesomeIcon icon={faUser} /></span>គណនី
            </button>
             <button className="pv-nav-quiz" onClick={() => navigate('/quiz')}>
                <span style={{fontSize:16}}><FontAwesomeIcon icon={faQuestionCircle} /></span>Quiz
            </button>
            <button className="pv-nav-logout" onClick={handleLogout}>
              <span className="pv-nav-logout-icon"><FontAwesomeIcon icon={faRightFromBracket} /></span>ចាកចេញ
            </button>
          </div>
        </nav>

        {/* TABS */}
        <div className="pv-tabs">
          <button className="pv-tab active" onClick={() => navigate('/home')}>
            <FontAwesomeIcon icon={faBookOpen} /> សុភាសិត
          </button>
          <button className="pv-tab" onClick={() => navigate('/wisdom')}>
            <FontAwesomeIcon icon={faCommentDots} /> ពាក្យបណ្ដៅ
          </button>
        </div>

        {/* BODY */}
        <div className="pv-body">
          <div className="pv-search-row">
            <div className="pv-search-wrap">
              <span className="pv-search-icon"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
              <input className="pv-search-input" type="text" placeholder="ស្វែងរក..."
                value={search} onChange={e => setSearch(e.target.value)}/>
            </div>
            <select className="pv-filter-select" value={category} onChange={e => setCategory(e.target.value)}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="pv-section-label">
            បង្ហាញ {filtered.length} សុភាសិត
          </div>

          <div className="pv-cards">
            {filtered.length === 0 && <div className="pv-empty">មិនមានលទ្ធផល 🔍</div>}
            {filtered.map(item => (
              <div key={item.id} className="pv-card" onClick={() => navigate(`/detail/${item.id}`)}>
                <div className="pv-card-ornament-top"/>
                <div className="pv-card-body">
                  <div className="pv-card-tag">
                    <FontAwesomeIcon icon={faTag} /> {item.category}
                  </div>
                  <div className="pv-card-text">{item.text}</div>
                  <div className="pv-card-footer">
                    <button
                      className={`pv-card-heart ${favorites.includes(item.id) ? 'loved' : ''}`}
                      onClick={e => toggleFav(item.id, e)}
                    >
                      <FontAwesomeIcon icon={favorites.includes(item.id) ? faHeart : faHeartOutline} />
                    </button>
                  </div>
                </div>
                <div className="pv-card-ornament-bot"/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}