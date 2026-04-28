export const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Moul&family=Crimson+Pro:ital,wght@0,400;1,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body, #root { width: 100%; min-height: 100vh; margin: 0; padding: 0; }

  .dp-root {
    width: 100vw; min-height: 100vh;
    background: #FBF5E6; font-family: 'Battambang', serif;
    display: flex; flex-direction: column;
  }

  .dp-nav {
    width: 100%;
    background: linear-gradient(135deg, #5A3808 0%, #7A5020 100%);
    padding: 0 48px; height: 80px;
    display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 3px 16px rgba(0,0,0,0.22); flex-shrink: 0;
  }
  .dp-nav-logo { display: flex; flex-direction: column; align-items: flex-start; line-height: 1; cursor: pointer; }
  .dp-nav-logo-top { font-family: 'Moul', serif; font-size: 26px; color: #F5D878; text-shadow: 1px 1px 0 rgba(0,0,0,0.3); }
  .dp-nav-logo-sub { font-family: 'Battambang', serif; font-size: 12px; color: rgba(245,216,120,0.65); font-weight: 700; align-self: flex-end; }
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

  .dp-body { flex: 1; padding: 32px 48px; max-width: 960px; width: 100%; margin: 0 auto; }

  .dp-back-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: none; border: 1.5px solid #C8A040; border-radius: 12px;
    padding: 8px 18px; cursor: pointer;
    font-family: 'Battambang', serif; font-size: 14px; color: #8A6030;
    margin-bottom: 24px; transition: background 0.2s;
  }
  .dp-back-btn:hover { background: #FFF0CC; }

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
    font-size: clamp(20px, 2.5vw, 30px);
    color: #3D2008; line-height: 1.7; margin-bottom: 4px;
    text-shadow: 1px 1px 0 rgba(200,150,40,.2);
  }
  .dp-main-text-en {
    font-family: 'Crimson Pro', serif; font-style: italic;
    font-size: clamp(15px, 1.4vw, 20px);
    color: #7A5828; line-height: 1.6; margin-bottom: 8px;
  }
  .dp-type-badge {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 12px; color: #A08848; margin-bottom: 20px;
  }
  .dp-divider {
    height: 1px;
    background: linear-gradient(90deg, #C8943A, #E8D8A8, transparent);
    margin: 20px 0;
  }

  .dp-meaning-grid { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
  .dp-meaning-box {
    background: #FFF8EC; border-radius: 14px;
    padding: 18px 20px; border-left: 4px solid #E8C060;
    position: relative;
  }
  .dp-meaning-box.en { border-left-color: #6A90B8; background: #F5F8FF; }

  .dp-meaning-box-label {
    font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; margin-bottom: 10px;
    display: flex; align-items: center; gap: 6px;
  }
  .dp-meaning-box-label.km { color: #C8943A; }
  .dp-meaning-box-label.en { color: #6A90B8; }

  .dp-meaning-text-km { font-family: 'Battambang', serif; font-size: 14px; color: #5A3808; line-height: 2; }
  .dp-meaning-text-en {
    font-family: 'Crimson Pro', serif; font-size: 15px; color: #3A5070; line-height: 1.9;
    padding-right: 40px;
  }

  .dp-speak-btn {
    position: absolute; top: 18px; right: 18px;
    background: #6A90B8; color: white;
    border: none; border-radius: 8px; width: 34px; height: 34px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: 0.2s;
  }
  .dp-speak-btn:hover { background: #3A5070; transform: scale(1.1); }

  .dp-fav-btn {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 24px;
    background: none; border: 2px solid #E8D8A8; border-radius: 50px;
    font-family: 'Battambang', serif; font-size: 15px; color: #A08848;
    cursor: pointer; transition: all 0.2s;
  }
  .dp-fav-btn:hover, .dp-fav-btn.loved { border-color: #E05060; color: #E05060; background: #FFF0F0; }

  .dp-notfound { text-align: center; padding: 80px 0; color: #C0A878; }
`;