import { useNavigate } from 'react-router-dom'
import angkorImg from '../assets/angkor.png'
import logoImg from '../assets/logo.png'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Moul&family=Crimson+Pro:ital,wght@0,400;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .wp-root {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    font-family: 'Battambang', serif;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  /* ── FULL BG IMAGE ── */
  .wp-bg-img {
    position: absolute;
    inset: 0; z-index: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center bottom;
  }

  /* dark overlay so card is readable */
  .wp-bg-overlay {
    position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(160deg,
      rgba(20,10,5,0.38) 0%,
      rgba(60,25,5,0.28) 50%,
      rgba(10,5,0,0.55) 100%);
  }

  /* ── CENTER CARD ── */
  .wp-center {
    position: relative; z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 10px 100px;
    background: rgba(255, 248, 225, 0.18);
    -webkit-backdrop-filter: blur(22px);
    border-radius: 36px;
    border: 1px solid rgba(255, 210, 100, 0.35);
    box-shadow:
      0 2px 0 rgba(255,255,255,0.12) inset,
      0 16px 60px rgba(0,0,0,0.45),
      0 2px 12px rgba(200,140,40,0.2);
    min-width: 1520px;
    width: 32vw;
  }

  /* gold ornament bars */
  .wp-card-top {
    position: absolute;
    top: 0; left: 40px; right: 40px; height: 3px;
    border-radius: 0 0 4px 4px;
  }
  .wp-card-bot {
    position: absolute;
    bottom: 0; left: 40px; right: 40px; height: 3px;
    background: linear-gradient(90deg, transparent, #C89A3A, #F5D878, #C89A3A, transparent);
    border-radius: 4px 4px 0 0;
  }

  .wp-swagamn {
    font-size: clamp(14px, 1.4vw, 20px);
    font-weight: 700; color: #FFF0CC;
    letter-spacing: 0.08em;
    text-shadow: 0 1px 4px rgba(0,0,0,0.4);
  }

  .wp-logo {
  margin-top: 14px;
  width: 109px;       
  height: 70px;      
  border-radius: 20px; 
  background: linear-gradient(145deg, #F2CC52, #C89028);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(0,0,0,0.4), 0 2px 0 rgba(255,255,255,.35) inset;
  overflow: hidden; 
}

.wp-logo img {
  width: 100%;       
  height: 100%;
  object-fit: cover; 
  border-radius: 20px; 
}
  }
  @keyframes wp-bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }

  .wp-logo-stack {
    margin-top: 8px;
    display: flex; flex-direction: column; align-items: center;
  }
  .wp-t-km {
    font-family: 'Moul', serif;
    font-size: clamp(34px, 3.8vw, 54px);
    color: #FFF0CC; line-height: 1.45;
    text-shadow: 2px 2px 0 rgba(180,100,10,.6), 0 4px 20px rgba(0,0,0,0.4);
  }
  .wp-t-km-sub {
    font-family: 'Battambang', serif;
    font-size: clamp(14px, 1.3vw, 20px);
    color: #F5D878; font-weight: 700;
    align-self: flex-end; margin-top: -6px; letter-spacing: 0;
  }
  .wp-t-en {
    margin-top: 5px;
    font-family: 'Crimson Pro', serif;
    font-size: 12px; color: rgba(255,220,140,0.75);
    letter-spacing: .22em; text-transform: uppercase;
  }
  .wp-divrow {
    margin-top: 12px;
    display: flex; align-items: center; gap: 10px;
    color: #F5D878; font-size: 14px; opacity: .8;
  }
  .wp-divline   { width:46px; height:1px; background:linear-gradient(90deg,transparent,#F5D878); }
  .wp-divline-r { width:46px; height:1px; background:linear-gradient(90deg,#F5D878,transparent); }

  .wp-desc {
    margin-top: 14px;
    font-size: clamp(12px, 1vw, 15px);
    color: rgba(255,240,200,0.88);
    line-height: 2.1; text-align: center;
    text-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }

  .wp-btn {
    margin-top: 26px;
    width: 40%; padding: 18px 22px;
    background: linear-gradient(135deg, #C89A3A 0%, #A87820 55%, #8A6010 100%);
    border: none; border-radius: 18px; cursor: pointer;
    display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 5px 0 #4A2E06, 0 10px 28px rgba(0,0,0,0.4);
    transition: transform .15s, box-shadow .15s;
    position: relative; overflow: hidden;
  }
  .wp-btn::before {
    content:''; position:absolute; top:0; left:0; right:0; height:42%;
    background:rgba(255,255,255,.14); border-radius:18px 18px 50% 50%;
  }
  .wp-btn:hover  { transform:translateY(-2px); box-shadow:0 7px 0 #3A2004, 0 16px 32px rgba(0,0,0,0.5); }
  .wp-btn:active { transform:translateY(3px);  box-shadow:0 2px 0 #4A2E06; }
  .wp-btn-txt { display:flex; flex-direction:column; align-items:flex-start; gap:2px; position:relative; z-index:1; }
  .wp-btn-t1 { font-family:'Battambang',serif; font-size:17px; font-weight:700; color:#FFF8E8; letter-spacing:.04em; }
  .wp-btn-t2 { font-family:'Crimson Pro',serif; font-style:italic; font-size:12px; color:rgba(255,240,200,.65); }
  .wp-btn-arr {
    width:38px; height:38px; background:rgba(255,255,255,.18);
    border-radius:50%; display:flex; align-items:center; justify-content:center;
    color:#FFF8E8; font-size:15px; position:relative; z-index:1; flex-shrink:0;
  }
  .wp-copy {
    margin-top: 14px;
    font-family:'Crimson Pro',serif; font-size:11px;
    color:rgba(255,220,140,0.45); letter-spacing:.06em; text-align:center;
  }
`

export default function WelcomePage() {
  const navigate = useNavigate()

  return (
    <>
      <style>{styles}</style>
      <div className="wp-root">

        {/* BG IMAGE */}
        <img src={angkorImg} className="wp-bg-img" alt="" />
        <div className="wp-bg-overlay" />

        {/* CARD */}
        <div className="wp-center">
          <div className="wp-card-top" />
          <div className="wp-card-bot" />

          <div className="wp-swagamn">សូមស្វាគមន៍</div>
          <div className="wp-logo"><img src={logoImg} alt="logo" /></div>
          <div className="wp-logo-stack">
            <div className="wp-t-km">ប្រាជ្ញា</div>
            <div className="wp-t-km-sub">ខ្មែរ</div>
          </div>
          <div className="wp-t-en">Brachnha Khmer</div>
          <div className="wp-divrow">
            <div className="wp-divline"/>✦<div className="wp-divline-r"/>
          </div>
          <p className="wp-desc">
            រៀនសូត្រ និងស្វែងយល់ពីប្រាជ្ញា<br/>
            វប្បធម៌ខ្មែរតាមរយៈ<br/>
            សុភាសិតនិងពាក្យបណ្ដៅ
          </p>
          <button className="wp-btn" onClick={() => navigate('/register')}>
            <div className="wp-btn-txt">
              <div className="wp-btn-t1">ចូលគណនី / ចុះឈ្មោះ</div>
              <div className="wp-btn-t2">Login or create a new account</div>
            </div>
            <div className="wp-btn-arr">▶</div>
          </button>
          <div className="wp-copy">© ប្រាជ្ញាខ្មែរ · Brachnha Khmer · 2025</div>
        </div>

      </div>
    </>
  )
}