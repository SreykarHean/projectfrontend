import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse, faHeart, faUser, faRightFromBracket,
  faArrowLeft, faTag, faCommentDots, faVolumeHigh
} from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons'

// Import from your new files
import { IDIOMS } from './data/idioms'
import { styles } from './styles/styles'

export default function DetailWis() {
  const { id } = useParams()
  const navigate = useNavigate()
  const idiom = IDIOMS.find(i => i.id === parseInt(id))

  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem('bk_favorites') || '[]')
  )

  useEffect(() => {
    const synth = window.speechSynthesis;
    const loadVoices = () => { synth.getVoices(); };
    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const khmerVoice = voices.find(v => v.lang.toLowerCase().includes('km') || v.lang.toLowerCase().includes('kh'));

      if (khmerVoice) utterance.voice = khmerVoice;
      utterance.lang = 'km-KH';
      utterance.rate = 0.85;
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert("កម្មវិធីរុករករបស់អ្នកមិនគាំទ្រសំឡេងអានទេ។");
    }
  }

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
                
                <button className="dw-speak-btn" onClick={() => handleSpeak(idiom.text)}>
                  <FontAwesomeIcon icon={faVolumeHigh} /> ស្តាប់ការអាន
                </button>

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