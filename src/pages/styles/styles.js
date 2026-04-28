export const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Moul&family=Crimson+Pro:ital,wght@400;700&display=swap');
  
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
  .dw-nav-logo-sub { font-family: 'Battambang', serif; font-size: 12px; color: rgba(245,216,120,0.65); font-weight: 700; align-self: flex-end; }
  
  .dw-nav-icons { display: flex; gap: 8px; align-items: center; }
  .dw-nav-btn {
    background: none; border: none; cursor: pointer;
    padding: 8px 12px; border-radius: 12px;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    color: rgba(255,240,200,0.65); font-size: 10px;
    font-family: 'Battambang', serif; transition: all 0.2s;
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
    font-size: 11px; font-weight: 700; color: #507090; 
    background: #E8F0F8; border: 1px solid #B8D0E8;
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
  .dw-section-title {
    font-family: 'Moul', serif; font-size: 15px; color: #4A6888;
    margin-bottom: 10px; display: flex; align-items: center; gap: 8px;
  }
  .dw-section-title::before {
    content: ''; width: 4px; height: 18px;
    background: linear-gradient(180deg, #6A8CA8, #A0C0D8);
    border-radius: 2px;
  }
  .dw-section-text {
    font-size: 15px; color: #3A5070; line-height: 2;
    background: #EEF4FA; border-radius: 12px;
    padding: 14px 18px; border-left: 3px solid #A0C0D8;
    margin-bottom: 20px;
  }
  .dw-fav-btn {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 24px;
    background: none; border: 2px solid #C0D8E8; border-radius: 50px;
    font-family: 'Battambang', serif; font-size: 15px; color: #7090A8;
    cursor: pointer; transition: all 0.2s;
  }
  .dw-fav-btn:hover, .dw-fav-btn.loved { border-color: #E05060; color: #E05060; background: #FFF0F0; }

  .dw-speak-btn {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 10px 20px; background: #5A3808; color: #F5D878;
    border: none; border-radius: 12px; cursor: pointer;
    font-family: 'Battambang', serif; font-size: 14px; margin-bottom: 20px;
    box-shadow: 0 4px 10px rgba(90, 56, 8, 0.2);
    transition: all 0.2s;
  }
  .dw-speak-btn:hover { background: #7A5020; transform: translateY(-2px); }
  .dw-notfound { text-align: center; padding: 80px 0; color: #7090A8; }
`;