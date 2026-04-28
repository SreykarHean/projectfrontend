import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse, faHeart, faUser, faRightFromBracket,
  faArrowLeft, faTag, faBookOpen, faVolumeHigh
} from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons'

// Import data and styles
import { PROVERBS } from './data/proverbs'
import { styles } from './styles/styleProv'

export default function DetailProv() {
  const { id } = useParams()
  const navigate = useNavigate()
  const proverb = PROVERBS.find(p => p.id === parseInt(id))

  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem('bk_favorites') || '[]')
  )

  const handleSpeakEnglish = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }

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
            <div className="dp-notfound">រកមិនឃើញសុភាសិតនេះទេ</div>
          ) : (
            <div className="dp-card">
              <div className="dp-card-top"/>
              <div className="dp-card-body">
                <div className="dp-tag"><FontAwesomeIcon icon={faTag} /> {proverb.category}</div>
                <div className="dp-main-text">{proverb.text}</div>
                <div className="dp-main-text-en">"{proverb.textEn}"</div>
                <div className="dp-type-badge"><FontAwesomeIcon icon={faBookOpen} /> សុភាសិត / Proverb</div>
                <div className="dp-divider"/>

                <div className="dp-meaning-grid">
                  <div className="dp-meaning-box">
                    <div className="dp-meaning-box-label km">🇰🇭 អត្ថន័យ</div>
                    <div className="dp-meaning-text-km">{proverb.meaningKm}</div>
                  </div>

                  <div className="dp-meaning-box en">
                    <div className="dp-meaning-box-label en">ENG Meaning</div>
                    <div className="dp-meaning-text-en">{proverb.meaningEn}</div>
                    <button 
                      className="dp-speak-btn" 
                      title="Listen"
                      onClick={() => handleSpeakEnglish(proverb.meaningEn)}
                    >
                      <FontAwesomeIcon icon={faVolumeHigh} />
                    </button>
                  </div>
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