import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse, faHeart, faUser, faRightFromBracket,
  faArrowLeft, faTag, faBookOpen
} from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons'

const PROVERBS = [
  { id:1, category:'ជីវិត',    text:'ក្ដៅថ្ងៃមិនស្មើក្ដៅចិត្ដ',
    meaning:'ទោះបីការងារក្ដៅប៉ុណ្ណា ក៏មិនស្មើនឹងការឈឺចាប់ក្នុងចិត្តដែរ។',
    example:'នៅពេលដែលអ្នកខឹង ចូរគិតមុនពេលនិយាយ ព្រោះពាក្យដែលបាននិយាយហើយមិនអាចដកវិញបានទេ។' },
  { id:2, category:'ការអប់រំ', text:'ផ្លូវវៀចកុំបោះបង់ ផ្លូវត្រង់កុំដើរហោង',
    meaning:'ក្នុងការសិក្សា ទោះជាលំបាកប៉ុណ្ណា ក៏កុំបោះបង់ ហើយកាលណាមានឱកាស ត្រូវយកចិត្តទុកដាក់។',
    example:'សិស្សដែលខំប្រឹងរៀន ទោះមានបញ្ហា ក៏នៅតែបន្តការសិក្សា។' },
  { id:3, category:'មិត្តភាព', text:'ក្បែរអ្នកល្អ ក្លាយជាអ្នកល្អ',
    meaning:'បើអ្នករស់នៅជាមួយមនុស្សល្អ អ្នកក៏នឹងក្លាយជាមនុស្សល្អផងដែរ។',
    example:'ជ្រើសរើសមិត្តភក្តិដែលមានចរិតល្អ ព្រោះពួកគេនឹងជះឥទ្ធិពលល្អដល់អ្នក។' },
  { id:4, category:'ជោគជ័យ',  text:'ទន្លេធំ ចាប់ត្រីធំ',
    meaning:'គោលដៅធំ តម្រូវឱ្យមានការខិតខំប្រឹងប្រែងធំ។',
    example:'អ្នកដែលចង់ជោគជ័យ ត្រូវហ៊ានទទួលការប្រឈមមុខជាមួយបញ្ហាធំៗ។' },
  { id:5, category:'ជីវិត',    text:'ដែលខ្លួនមិនចង់ កុំធ្វើដល់គេ',
    meaning:'ចូរប្រព្រឹត្តចំពោះអ្នកដទៃ ដូចដែលអ្នកចង់ឱ្យគេប្រព្រឹត្តចំពោះអ្នក។',
    example:'បើអ្នកមិនចង់ឱ្យគេបោកប្រាស់អ្នក ចូរកុំបោកប្រាស់គេ។' },
]

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Moul&family=Crimson+Pro:ital,wght@0,400;1,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body, #root { width: 100%; min-height: 100vh; margin: 0; padding: 0; }

  .dp-root {
    width: 100vw; min-height: 100vh;
    background: #FBF5E6; font-family: 'Battambang', serif;
    display: flex; flex-direction: column;
  }

  /* NAVBAR */
  .dp-nav {
    width: 100%;
    background: linear-gradient(135deg, #5A3808 0%, #7A5020 100%);
    padding: 0 48px; height: 80px;
    display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 3px 16px rgba(0,0,0,0.22); flex-shrink: 0;
  }
  .dp-nav-logo { display: flex; flex-direction: column; align-items: flex-start; line-height: 1; cursor: pointer; }
  .dp-nav-logo-top { font-family: 'Moul', serif; font-size: 26px; color: #F5D878; text-shadow: 1px 1px 0 rgba(0,0,0,0.3); }
  .dp-nav-logo-sub { font-family: 'Battambang', serif; font-size: 12px; color: rgba(245,216,120,0.65); font-weight: 700; align-self: flex-end; letter-spacing: 0; }
  .dp-nav-icons { display: flex; gap: 8px; align-items: center; }
  .dp-nav-btn {
    background: none; border: none; cursor: pointer;
    padding: 8px 12px; border-radius: 12px;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    color: rgba(255,240,200,0.65); font-size: 10px;
    font-family: 'Battambang', serif; transition: background 0.2s, color 0.2s;
  }
  .dp-nav-btn:hover { background: rgba(255,255,255,0.1); color: #F5D878; }
  .dp-nav-btn-icon { font-size: 17px; padding: 4px 6px; }
  .dp-nav-logout {
    background: rgba(200,80,50,0.22); border: 1px solid rgba(200,80,50,0.4);
    border-radius: 12px; padding: 8px 12px; color: #F5A090; font-size: 10px;
    cursor: pointer; font-family: 'Battambang', serif;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    transition: background 0.2s;
  }
  .dp-nav-logout:hover { background: rgba(200,80,50,0.4); }
  .dp-nav-logout-icon { font-size: 16px; }

  /* BODY */
  .dp-body { flex: 1; padding: 32px 48px; max-width: 900px; width: 100%; margin: 0 auto; }

  .dp-back-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: none; border: 1.5px solid #C8A040; border-radius: 12px;
    padding: 8px 18px; cursor: pointer;
    font-family: 'Battambang', serif; font-size: 14px; color: #8A6030;
    margin-bottom: 24px; transition: background 0.2s;
  }
  .dp-back-btn:hover { background: #FFF0CC; }

  /* MAIN CARD */
  .dp-card {
    background: #FFFCF0; border-radius: 20px;
    border: 1px solid #E8D8A8;
    box-shadow: 0 4px 20px rgba(100,70,10,0.1);
    overflow: hidden; margin-bottom: 20px;
  }
  .dp-card-top { height: 6px; background: linear-gradient(90deg, #C8943A, #E8C060, #C8943A); }
  .dp-card-body { padding: 28px 32px; }

  .dp-tag {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    color: #A87828; background: #FFF0CC; border: 1px solid #E8C870;
    padding: 4px 14px; border-radius: 20px; margin-bottom: 16px;
  }
  .dp-main-text {
    font-family: 'Moul', serif;
    font-size: clamp(22px, 2.5vw, 32px);
    color: #3D2008; line-height: 1.7;
    margin-bottom: 8px;
    text-shadow: 1px 1px 0 rgba(200,150,40,.2);
  }
  .dp-type-badge {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 12px; color: #A08848;
    margin-bottom: 20px;
  }
  .dp-divider {
    height: 1px;
    background: linear-gradient(90deg, #C8943A, #E8D8A8, transparent);
    margin: 20px 0;
  }

  /* SECTIONS */
  .dp-section { margin-bottom: 20px; }
  .dp-section-title {
    font-family: 'Moul', serif; font-size: 15px; color: #7A5020;
    margin-bottom: 10px; display: flex; align-items: center; gap: 8px;
  }
  .dp-section-title::before {
    content: ''; width: 4px; height: 18px;
    background: linear-gradient(180deg, #C8943A, #E8C060);
    border-radius: 2px; flex-shrink: 0;
  }
  .dp-section-text {
    font-size: 15px; color: #5A3808; line-height: 2;
    background: #FFF8EC; border-radius: 12px;
    padding: 14px 18px; border-left: 3px solid #E8C060;
  }

  /* FAVORITE BTN */
  .dp-fav-btn {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 24px;
    background: none; border: 2px solid #E8D8A8; border-radius: 50px;
    font-family: 'Battambang', serif; font-size: 15px; color: #A08848;
    cursor: pointer; transition: all 0.2s; margin-top: 8px;
  }
  .dp-fav-btn:hover { border-color: #E05060; color: #E05060; background: #FFF0F0; }
  .dp-fav-btn.loved { border-color: #E05060; color: #E05060; background: #FFF0F0; }

  /* NOT FOUND */
  .dp-notfound { text-align: center; padding: 80px 0; color: #C0A878; font-size: 16px; }
`

export default function DetailProv() {
  const { id } = useParams()
  const navigate = useNavigate()
  const proverb = PROVERBS.find(p => p.id === parseInt(id))

  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem('bk_favorites') || '[]')
  )

  const toggleFav = () => {
    const updated = favorites.includes(proverb.id)
      ? favorites.filter(f => f !== proverb.id)
      : [...favorites, proverb.id]
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
      <div className="dp-root">

        {/* NAVBAR */}
        <nav className="dp-nav">
          <div className="dp-nav-logo" onClick={() => navigate('/home')}>
            <div className="dp-nav-logo-top">ប្រាជ្ញា</div>
            <div className="dp-nav-logo-sub">ខ្មែរ</div>
          </div>
          <div className="dp-nav-icons">
            <button className="dp-nav-btn" onClick={() => navigate('/home')}>
              <span className="dp-nav-btn-icon"><FontAwesomeIcon icon={faHouse} /></span>ទំព័រដើម
            </button>
            <button className="dp-nav-btn" onClick={() => navigate('/favorites')}>
              <span className="dp-nav-btn-icon"><FontAwesomeIcon icon={faHeart} /></span>ចូលចិត្ត
            </button>
            <button className="dp-nav-btn" onClick={() => navigate('/profile')}>
              <span className="dp-nav-btn-icon"><FontAwesomeIcon icon={faUser} /></span>គណនី
            </button>
            <button className="dp-nav-logout" onClick={handleLogout}>
              <span className="dp-nav-logout-icon"><FontAwesomeIcon icon={faRightFromBracket} /></span>ចាកចេញ
            </button>
          </div>
        </nav>

        <div className="dp-body">
          <button className="dp-back-btn" onClick={() => navigate('/home')}>
            <FontAwesomeIcon icon={faArrowLeft} /> ត្រឡប់ក្រោយ
          </button>

          {!proverb ? (
            <div className="dp-notfound">រកមិនឃើញសុភាសិតនេះទេ 😔</div>
          ) : (
            <div className="dp-card">
              <div className="dp-card-top"/>
              <div className="dp-card-body">

                <div className="dp-tag">
                  <FontAwesomeIcon icon={faTag} /> {proverb.category}
                </div>

                <div className="dp-main-text">{proverb.text}</div>

                <div className="dp-type-badge">
                  <FontAwesomeIcon icon={faBookOpen} /> សុភាសិត
                </div>

                <div className="dp-divider"/>

                <div className="dp-section">
                  <div className="dp-section-title">អត្ថន័យ</div>
                  <div className="dp-section-text">{proverb.meaning}</div>
                </div>

                <div className="dp-section">
                  <div className="dp-section-title">ឧទាហរណ៍</div>
                  <div className="dp-section-text">{proverb.example}</div>
                </div>

                <button
                  className={`dp-fav-btn ${favorites.includes(proverb.id) ? 'loved' : ''}`}
                  onClick={toggleFav}
                >
                  <FontAwesomeIcon icon={favorites.includes(proverb.id) ? faHeart : faHeartOutline} />
                  {favorites.includes(proverb.id) ? 'បានចូលចិត្តហើយ' : 'បន្ថែមទៅចូលចិត្ត'}
                </button>

              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}