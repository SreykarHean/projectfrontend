import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse, faHeart, faUser, faRightFromBracket,
  faArrowLeft, faTag, faCommentDots
} from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons'

const IDIOMS = [
  { id:6,  category:'ជីវិត',    text:'ពោះឃ្លានភ្នែកឃ្លាន',
    meaning:'នៅពេលដែលអ្នកឃ្លាន អ្នកនឹងឃើញអ្វីៗទាំងអស់ជាអាហារ។ សំដៅលើការដែលតម្រូវការជាមូលដ្ឋានប៉ះពាល់ដល់ការយល់ឃើញ។',
    example:'នៅពេលចូលហាងអាហារដោយឃ្លាន គ្រប់អ្វីៗសុទ្ធតែមើលទៅឆ្ងាញ់ណាស់។' },
  { id:7,  category:'ការអប់រំ', text:'ច្រៀងមិនដឹងភ្លេង',
    meaning:'ធ្វើការដោយមិនស្គាល់ជំនាញ ឬ ធ្វើអ្វីដោយគ្មានចំណេះដឹងត្រឹមត្រូវ។',
    example:'សិស្សដែលមិនព្រមរៀន ហើយចូលប្រឡង គឺដូចច្រៀងមិនដឹងភ្លេង។' },
  { id:8,  category:'ជីវិត',    text:'ត្រីចិញ្ចើមទឹក',
    meaning:'នៅក្នុងស្ថានភាពប្រែប្រួល ត្រូវចេះសម្រួលខ្លួន ដូចត្រីដែលអាចរស់នៅក្នុងទឹក។',
    example:'ក្នុងស្ថានភាពលំបាក ត្រូវស្ងប់ស្ងាត់ ហើយរកដំណោះស្រាយ។' },
  { id:9,  category:'ជោគជ័យ',  text:'ដៃវែង ភ្នែកឃ្លាត',
    meaning:'មនុស្សដែលមានអំណាច ឬ ឥទ្ធិពល អាចប៉ះពាល់ដល់រឿងរ៉ាវក្នុងចម្ងាយឆ្ងាយ។',
    example:'អ្នកដឹកនាំល្អ មានឥទ្ធិពលទៅដល់មនុស្សច្រើននាក់។' },
  { id:10, category:'មិត្តភាព', text:'ទឹកកកក្នុងពែង',
    meaning:'ទំនាក់ទំនងដែលត្រជាក់ ឬ ស្ពឹកស្រពន់ ដែលខ្វះភាពកក់ក្ដៅ។',
    example:'ពួកគេជាមិត្តចាស់ ប៉ុន្តែឥឡូវ ទំនាក់ទំនងរបស់ពួកគេដូចទឹកកកក្នុងពែង។' },
]

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Moul&family=Crimson+Pro:ital,wght@0,400;1,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body, #root { width: 100%; min-height: 100vh; margin: 0; padding: 0; }

  .dw-root {
    width: 100vw; min-height: 100vh;
    background: #F0F5FA; font-family: 'Battambang', serif;
    display: flex; flex-direction: column;
  }
  .dw-nav {
    width: 100%;
    background: linear-gradient(135deg, #5A3808 0%, #7A5020 100%);
    padding: 0 48px; height: 80px;
    display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 3px 16px rgba(0,0,0,0.22); flex-shrink: 0;
  }
  .dw-nav-logo { display: flex; flex-direction: column; align-items: flex-start; line-height: 1; cursor: pointer; }
  .dw-nav-logo-top { font-family: 'Moul', serif; font-size: 26px; color: #F5D878; text-shadow: 1px 1px 0 rgba(0,0,0,0.3); }
  .dw-nav-logo-sub { font-family: 'Battambang', serif; font-size: 12px; color: rgba(245,216,120,0.65); font-weight: 700; align-self: flex-end; letter-spacing: 0; }
  .dw-nav-icons { display: flex; gap: 8px; align-items: center; }
  .dw-nav-btn {
    background: none; border: none; cursor: pointer;
    padding: 8px 12px; border-radius: 12px;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    color: rgba(255,240,200,0.65); font-size: 10px;
    font-family: 'Battambang', serif; transition: background 0.2s, color 0.2s;
  }
  .dw-nav-btn:hover { background: rgba(255,255,255,0.1); color: #F5D878; }
  .dw-nav-btn-icon { font-size: 17px; padding: 4px 6px; }
  .dw-nav-logout {
    background: rgba(200,80,50,0.22); border: 1px solid rgba(200,80,50,0.4);
    border-radius: 12px; padding: 8px 12px; color: #F5A090; font-size: 10px;
    cursor: pointer; font-family: 'Battambang', serif;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    transition: background 0.2s;
  }
  .dw-nav-logout:hover { background: rgba(200,80,50,0.4); }
  .dw-nav-logout-icon { font-size: 16px; }

  .dw-body { flex: 1; padding: 32px 48px; max-width: 900px; width: 100%; margin: 0 auto; }

  .dw-back-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: none; border: 1.5px solid #8AB0C8; border-radius: 12px;
    padding: 8px 18px; cursor: pointer;
    font-family: 'Battambang', serif; font-size: 14px; color: #507090;
    margin-bottom: 24px; transition: background 0.2s;
  }
  .dw-back-btn:hover { background: #E8F0F8; }

  .dw-card {
    background: #FAFCFF; border-radius: 20px;
    border: 1px solid #C0D8E8;
    box-shadow: 0 4px 20px rgba(50,80,120,0.1);
    overflow: hidden; margin-bottom: 20px;
  }
  .dw-card-top { height: 6px; background: linear-gradient(90deg, #6A8CA8, #A0C0D8, #6A8CA8); }
  .dw-card-body { padding: 28px 32px; }

  .dw-tag {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    color: #507090; background: #E8F0F8; border: 1px solid #B8D0E8;
    padding: 4px 14px; border-radius: 20px; margin-bottom: 16px;
  }
  .dw-main-text {
    font-family: 'Moul', serif;
    font-size: clamp(22px, 2.5vw, 32px);
    color: #2A3A50; line-height: 1.7; margin-bottom: 8px;
  }
  .dw-type-badge {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 12px; color: #7090A8; margin-bottom: 20px;
  }
  .dw-divider {
    height: 1px;
    background: linear-gradient(90deg, #6A8CA8, #C0D8E8, transparent);
    margin: 20px 0;
  }
  .dw-section { margin-bottom: 20px; }
  .dw-section-title {
    font-family: 'Moul', serif; font-size: 15px; color: #4A6888;
    margin-bottom: 10px; display: flex; align-items: center; gap: 8px;
  }
  .dw-section-title::before {
    content: ''; width: 4px; height: 18px;
    background: linear-gradient(180deg, #6A8CA8, #A0C0D8);
    border-radius: 2px; flex-shrink: 0;
  }
  .dw-section-text {
    font-size: 15px; color: #3A5070; line-height: 2;
    background: #EEF4FA; border-radius: 12px;
    padding: 14px 18px; border-left: 3px solid #A0C0D8;
  }
  .dw-fav-btn {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 24px;
    background: none; border: 2px solid #C0D8E8; border-radius: 50px;
    font-family: 'Battambang', serif; font-size: 15px; color: #7090A8;
    cursor: pointer; transition: all 0.2s; margin-top: 8px;
  }
  .dw-fav-btn:hover { border-color: #E05060; color: #E05060; background: #FFF0F0; }
  .dw-fav-btn.loved { border-color: #E05060; color: #E05060; background: #FFF0F0; }
  .dw-notfound { text-align: center; padding: 80px 0; color: #7090A8; font-size: 16px; }
`

export default function DetailWis() {
  const { id } = useParams()
  const navigate = useNavigate()
  const idiom = IDIOMS.find(i => i.id === parseInt(id))

  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem('bk_favorites') || '[]')
  )

  const toggleFav = () => {
    const updated = favorites.includes(idiom.id)
      ? favorites.filter(f => f !== idiom.id)
      : [...favorites, idiom.id]
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
      <div className="dw-root">
        <nav className="dw-nav">
          <div className="dw-nav-logo" onClick={() => navigate('/home')}>
            <div className="dw-nav-logo-top">ប្រាជ្ញា</div>
            <div className="dw-nav-logo-sub">ខ្មែរ</div>
          </div>
          <div className="dw-nav-icons">
            <button className="dw-nav-btn" onClick={() => navigate('/home')}>
              <span className="dw-nav-btn-icon"><FontAwesomeIcon icon={faHouse} /></span>ទំព័រដើម
            </button>
            <button className="dw-nav-btn" onClick={() => navigate('/favorites')}>
              <span className="dw-nav-btn-icon"><FontAwesomeIcon icon={faHeart} /></span>ចូលចិត្ត
            </button>
            <button className="dw-nav-btn" onClick={() => navigate('/profile')}>
              <span className="dw-nav-btn-icon"><FontAwesomeIcon icon={faUser} /></span>គណនី
            </button>
            <button className="dw-nav-logout" onClick={handleLogout}>
              <span className="dw-nav-logout-icon"><FontAwesomeIcon icon={faRightFromBracket} /></span>ចាកចេញ
            </button>
          </div>
        </nav>

        <div className="dw-body">
          <button className="dw-back-btn" onClick={() => navigate('/wisdom')}>
            <FontAwesomeIcon icon={faArrowLeft} /> ត្រឡប់ក្រោយ
          </button>

          {!idiom ? (
            <div className="dw-notfound">រកមិនឃើញពាក្យបណ្ដៅនេះទេ 😔</div>
          ) : (
            <div className="dw-card">
              <div className="dw-card-top"/>
              <div className="dw-card-body">
                <div className="dw-tag"><FontAwesomeIcon icon={faTag} /> {idiom.category}</div>
                <div className="dw-main-text">{idiom.text}</div>
                <div className="dw-type-badge"><FontAwesomeIcon icon={faCommentDots} /> ពាក្យបណ្ដៅ</div>
                <div className="dw-divider"/>
                <div className="dw-section">
                  <div className="dw-section-title">អត្ថន័យ</div>
                  <div className="dw-section-text">{idiom.meaning}</div>
                </div>
                <div className="dw-section">
                  <div className="dw-section-title">ឧទាហរណ៍</div>
                  <div className="dw-section-text">{idiom.example}</div>
                </div>
                <button
                  className={`dw-fav-btn ${favorites.includes(idiom.id) ? 'loved' : ''}`}
                  onClick={toggleFav}
                >
                  <FontAwesomeIcon icon={favorites.includes(idiom.id) ? faHeart : faHeartOutline} />
                  {favorites.includes(idiom.id) ? 'បានចូលចិត្តហើយ' : 'បន្ថែមទៅចូលចិត្ត'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}