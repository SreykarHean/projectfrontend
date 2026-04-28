import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse, faHeart, faUser, faRightFromBracket,
  faShield, faQuestionCircle, faCheck, faXmark,
  faTrophy, faRotateRight, faChevronRight, faTag
} from '@fortawesome/free-solid-svg-icons'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Moul&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body, #root { width: 100%; min-height: 100vh; margin: 0; padding: 0; }

  .qp-root { width: 100vw; min-height: 100vh; background: #F0EAD8; font-family: 'Battambang', serif; display: flex; flex-direction: column; }

  /* NAV */
  .qp-nav {
    width: 100%; background: linear-gradient(135deg,#5A3808 0%,#7A5020 100%);
    padding: 0 48px; height: 80px;
    display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 3px 16px rgba(0,0,0,0.22); flex-shrink: 0;
  }
  .qp-nav-logo { display: flex; flex-direction: column; align-items: flex-start; line-height: 1; cursor: pointer; }
  .qp-nav-logo-top { font-family: 'Moul', serif; font-size: 26px; color: #F5D878; text-shadow: 1px 1px 0 rgba(0,0,0,0.3); }
  .qp-nav-logo-sub { font-family: 'Battambang', serif; font-size: 12px; color: rgba(245,216,120,0.65); font-weight: 700; align-self: flex-end; }
  .qp-nav-icons { display: flex; gap: 8px; align-items: center; }
  .qp-nav-btn {
    background: none; border: none; cursor: pointer; padding: 8px 12px; border-radius: 12px;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    color: rgba(255,240,200,0.65); font-size: 10px; font-family: 'Battambang', serif; transition: background 0.2s, color 0.2s;
  }
  .qp-nav-btn:hover { background: rgba(255,255,255,0.1); color: #F5D878; }
  .qp-nav-btn.active { color: #F5D878; }
  .qp-nav-btn-icon { font-size: 17px; padding: 4px 6px; }
  .qp-nav-admin {
    background: rgba(200,150,50,0.22); border: 1px solid rgba(200,150,50,0.4);
    border-radius: 12px; padding: 8px 12px; color: #F5D878; font-size: 10px; cursor: pointer;
    font-family: 'Battambang', serif; display: flex; flex-direction: column; align-items: center; gap: 4px; transition: background 0.2s;
  }
  .qp-nav-admin:hover { background: rgba(200,150,50,0.4); }
  .qp-nav-logout {
    background: rgba(200,80,50,0.22); border: 1px solid rgba(200,80,50,0.4);
    border-radius: 12px; padding: 8px 12px; color: #F5A090; font-size: 10px; cursor: pointer;
    font-family: 'Battambang', serif; display: flex; flex-direction: column; align-items: center; gap: 4px; transition: background 0.2s;
  }
  .qp-nav-logout:hover { background: rgba(200,80,50,0.4); }

  /* BODY */
  .qp-body { flex: 1; padding: 32px 48px; display: flex; flex-direction: column; align-items: center; }

  /* CATEGORY PICKER */
  .qp-hero { text-align: center; margin-bottom: 32px; }
  .qp-hero-icon {
    width: 72px; height: 72px; border-radius: 20px; margin: 0 auto 16px;
    background: linear-gradient(135deg,#C89A3A,#A87820);
    display: flex; align-items: center; justify-content: center;
    font-size: 30px; color: #FFF8E8;
    box-shadow: 0 8px 24px rgba(180,120,20,0.35);
  }
  .qp-hero-title { font-family: 'Moul', serif; font-size: 28px; color: #3A1E06; margin-bottom: 8px; }
  .qp-hero-sub { font-size: 14px; color: rgba(100,60,10,0.6); }

  .qp-cats { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 28px; }
  .qp-cat-btn {
    padding: 9px 18px; border-radius: 20px; cursor: pointer; font-family: 'Battambang', serif; font-size: 13px;
    border: 1.5px solid #E8D8A8; background: #FBF5E6; color: #6A4818; transition: all 0.2s;
  }
  .qp-cat-btn:hover { border-color: #C8943A; background: #FFF0CC; }
  .qp-cat-btn.active { border-color: #C8943A; background: linear-gradient(135deg,#C89A3A,#A87820); color: #FFF8E8; }

  .qp-start-btn {
    padding: 14px 40px; border-radius: 50px; border: none; cursor: pointer;
    background: linear-gradient(135deg,#C89A3A,#A87820);
    font-family: 'Battambang', serif; font-size: 18px; color: #FFF8E8; font-weight: 700;
    box-shadow: 0 5px 0 #5A3008, 0 8px 20px rgba(0,0,0,0.2);
    transition: transform 0.15s, box-shadow 0.15s; display: flex; align-items: center; gap: 10px;
  }
  .qp-start-btn:hover { transform: translateY(-2px); box-shadow: 0 7px 0 #4A2006, 0 12px 24px rgba(0,0,0,0.25); }
  .qp-start-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .qp-empty-card {
    background: #FBF5E6; border-radius: 20px; border: 1px solid #E8D8A8;
    padding: 48px 32px; text-align: center; max-width: 440px;
    box-shadow: 0 2px 12px rgba(100,70,10,0.08);
  }
  .qp-empty-icon { font-size: 40px; margin-bottom: 12px; }
  .qp-empty-title { font-family: 'Moul', serif; font-size: 18px; color: #4A2E08; margin-bottom: 8px; }
  .qp-empty-msg { font-size: 13px; color: #8A7050; }

  /* QUIZ CARD */
  .qp-quiz-wrap { width: 100%; max-width: 680px; }
  .qp-progress-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
  .qp-progress-label { font-size: 12px; color: rgba(100,60,10,0.6); }
  .qp-progress-bar { flex: 1; height: 6px; background: #E8D8A8; border-radius: 6px; margin: 0 12px; overflow: hidden; }
  .qp-progress-fill { height: 100%; background: linear-gradient(90deg,#C89A3A,#E8C060); border-radius: 6px; transition: width 0.4s ease; }
  .qp-score-badge {
    background: linear-gradient(135deg,#C89A3A,#A87820); color: #FFF8E8;
    font-size: 12px; font-weight: 700; padding: 3px 12px; border-radius: 20px;
  }

  .qp-card {
    background: #FBF5E6; border-radius: 20px; border: 1px solid #E8D8A8;
    box-shadow: 0 4px 20px rgba(100,70,10,0.1); overflow: hidden; margin-bottom: 16px;
  }
  .qp-card-stripe { height: 5px; background: linear-gradient(90deg,#C8943A,#E8C060,#C8943A); }
  .qp-card-body { padding: 28px 32px; }
  .qp-q-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
  .qp-q-num { font-size: 11px; color: #C8943A; font-weight: 700; letter-spacing: 0.08em; }
  .qp-q-cat {
    font-size: 10px; padding: 2px 10px; border-radius: 20px; font-weight: 700;
    background: #FFF0CC; color: #A87828; border: 1px solid #E8C870;
  }
  .qp-question { font-size: 18px; font-weight: 700; color: #3D2008; line-height: 1.65; margin-bottom: 24px; }

  .qp-options { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .qp-option {
    padding: 14px 18px; border-radius: 14px; cursor: pointer; font-family: 'Battambang', serif; font-size: 14px;
    border: 2px solid #E8D8A8; background: #FFFCF0; color: #3D2008;
    display: flex; align-items: center; gap: 10px; transition: all 0.18s;
    text-align: left;
  }
  .qp-option:hover:not(:disabled) { border-color: #C8943A; background: #FFF0CC; transform: translateY(-1px); }
  .qp-option:disabled { cursor: default; }
  .qp-option.correct { border-color: #5AAA68; background: #E8F5EC; color: #1A6030; }
  .qp-option.wrong   { border-color: #E05060; background: #FEF0F0; color: #A02030; }
  .qp-option.reveal  { border-color: #5AAA68; background: #E8F5EC; color: #1A6030; opacity: 0.7; }
  .qp-option-letter {
    width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;
    background: #F0E4C8; color: #8A6030; transition: all 0.18s;
  }
  .qp-option.correct .qp-option-letter { background: #5AAA68; color: #fff; }
  .qp-option.wrong   .qp-option-letter { background: #E05060; color: #fff; }
  .qp-option.reveal  .qp-option-letter { background: #5AAA68; color: #fff; }

  /* FEEDBACK */
  .qp-feedback {
    margin-top: 16px; padding: 12px 18px; border-radius: 12px; font-size: 13px;
    display: flex; align-items: center; gap: 10px; animation: fadeUp 0.25s ease;
  }
  @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  .qp-feedback.correct { background: #E8F5EC; border: 1px solid #8ACA98; color: #1A6030; }
  .qp-feedback.wrong   { background: #FEF0F0; border: 1px solid #F0A0A8; color: #A02030; }
  .qp-feedback-icon { font-size: 18px; flex-shrink: 0; }

  .qp-next-btn {
    margin-top: 18px; width: 100%; padding: 13px; border: none; border-radius: 12px; cursor: pointer;
    background: linear-gradient(135deg,#C89A3A,#A87820); color: #FFF8E8;
    font-family: 'Battambang', serif; font-size: 15px; font-weight: 700;
    display: flex; align-items: center; justify-content: center; gap: 8px; transition: opacity 0.2s;
  }
  .qp-next-btn:hover { opacity: 0.88; }

  /* RESULT */
  .qp-result {
    background: #FBF5E6; border-radius: 24px; border: 1px solid #E8D8A8;
    box-shadow: 0 4px 24px rgba(100,70,10,0.12); padding: 40px 36px; text-align: center; width: 100%; max-width: 520px;
  }
  .qp-trophy { font-size: 56px; margin-bottom: 16px; }
  .qp-result-title { font-family: 'Moul', serif; font-size: 24px; color: #3A1E06; margin-bottom: 8px; }
  .qp-result-score { font-size: 48px; font-weight: 700; color: #C8943A; line-height: 1; margin-bottom: 4px; }
  .qp-result-total { font-size: 14px; color: rgba(100,60,10,0.6); margin-bottom: 24px; }
  .qp-result-msg { font-size: 15px; color: #5A3810; margin-bottom: 28px; line-height: 1.8; }
  .qp-result-btns { display: flex; gap: 12px; justify-content: center; }
  .qp-retry-btn {
    padding: 12px 24px; border-radius: 12px; cursor: pointer; font-family: 'Battambang', serif; font-size: 14px;
    background: linear-gradient(135deg,#C89A3A,#A87820); color: #FFF8E8; border: none;
    display: flex; align-items: center; gap: 8px; transition: opacity 0.2s;
  }
  .qp-retry-btn:hover { opacity: 0.88; }
  .qp-home-btn {
    padding: 12px 24px; border-radius: 12px; cursor: pointer; font-family: 'Battambang', serif; font-size: 14px;
    background: #F5EDD8; color: #6A4818; border: 1px solid #E8D8A8; transition: background 0.2s;
  }
  .qp-home-btn:hover { background: #EFE3C0; }

  /* STARS */
  .qp-stars { font-size: 32px; margin-bottom: 12px; letter-spacing: 4px; }
`

const LABELS = ['A', 'B', 'C', 'D']

export default function QuizPage() {
  const navigate = useNavigate()
  const currentUser = JSON.parse(localStorage.getItem('bk_current_user') || 'null')
  const allQuizzes = JSON.parse(localStorage.getItem('bk_quizzes') || '[]')

  const allCategories = ['ទាំងអស់', ...new Set(allQuizzes.map(q => q.category))]

  const [phase, setPhase]         = useState('pick')   // pick | play | result
  const [selCat, setSelCat]       = useState('ទាំងអស់')
  const [questions, setQuestions] = useState([])
  const [current, setCurrent]     = useState(0)
  const [chosen, setChosen]       = useState(null)     // index chosen
  const [score, setScore]         = useState(0)
  const [answered, setAnswered]   = useState(false)

  const handleLogout = () => { localStorage.removeItem('bk_current_user'); navigate('/') }

  const startQuiz = () => {
    const pool = selCat === 'ទាំងអស់' ? allQuizzes : allQuizzes.filter(q => q.category === selCat)
    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    setQuestions(shuffled)
    setCurrent(0); setScore(0); setChosen(null); setAnswered(false)
    setPhase('play')
  }

  const handleAnswer = (idx) => {
    if (answered) return
    setChosen(idx)
    setAnswered(true)
    if (idx === questions[current].correctIdx) setScore(s => s + 1)
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setPhase('result')
    } else {
      setCurrent(c => c + 1)
      setChosen(null)
      setAnswered(false)
    }
  }

  const getResultMsg = () => {
    const pct = score / questions.length
    if (pct === 1)   return 'អស្ចារ្យណាស់! អ្នកឆ្លើយបានត្រឹមត្រូវទាំងអស់! 🎉'
    if (pct >= 0.8)  return 'ល្អណាស់! អ្នកស្ទាត់ជំនាញសុភាសិតខ្មែរ! 👏'
    if (pct >= 0.6)  return 'ល្អ! ទប់ទល់ខ្លះទៀតហើយ! 💪'
    if (pct >= 0.4)  return 'ព្យាយាមទៀត! អ្នកអាចធ្វើបានល្អជាងនេះ! 📚'
    return 'កុំបោះបង់! សាកល្បងម្ដងទៀត! 🌟'
  }

  const getStars = () => {
    const pct = score / questions.length
    if (pct === 1)  return '⭐⭐⭐'
    if (pct >= 0.6) return '⭐⭐'
    return '⭐'
  }

  const q = questions[current]
  const progress = questions.length > 0 ? ((current + (answered ? 1 : 0)) / questions.length) * 100 : 0

  return (
    <>
      <style>{styles}</style>
      <div className="qp-root">

        {/* NAV */}
        <nav className="qp-nav">
          <div className="qp-nav-logo" onClick={() => navigate('/home')}>
            <div className="qp-nav-logo-top">ប្រាជ្ញា</div>
            <div className="qp-nav-logo-sub">ខ្មែរ</div>
          </div>
          <div className="qp-nav-icons">
            <button className="qp-nav-btn" onClick={() => navigate('/home')}>
              <span className="qp-nav-btn-icon"><FontAwesomeIcon icon={faHouse}/></span>ទំព័រដើម
            </button>
            <button className="qp-nav-btn" onClick={() => navigate('/favorites')}>
              <span className="qp-nav-btn-icon"><FontAwesomeIcon icon={faHeart}/></span>ចូលចិត្ត
            </button>
            <button className="qp-nav-btn" onClick={() => navigate('/profile')}>
              <span className="qp-nav-btn-icon"><FontAwesomeIcon icon={faUser}/></span>គណនី
            </button>
            <button className="qp-nav-btn active">
              <span className="qp-nav-btn-icon"><FontAwesomeIcon icon={faQuestionCircle}/></span>Quiz
            </button>
            {currentUser?.role === 'admin' && (
              <button className="qp-nav-admin" onClick={() => navigate('/admin')}>
                <span style={{fontSize:16}}><FontAwesomeIcon icon={faShield}/></span>Admin
              </button>
            )}
            <button className="qp-nav-logout" onClick={handleLogout}>
              <span style={{fontSize:16}}><FontAwesomeIcon icon={faRightFromBracket}/></span>ចាកចេញ
            </button>
          </div>
        </nav>

        <div className="qp-body">

          {/* ── PICK PHASE ── */}
          {phase === 'pick' && (
            <>
              <div className="qp-hero">
                <div className="qp-hero-icon"><FontAwesomeIcon icon={faTrophy}/></div>
                <div className="qp-hero-title">លេងសំណួរ Quiz</div>
                <div className="qp-hero-sub">សាកល្បងចំណេះដឹងសុភាសិតខ្មែររបស់អ្នក</div>
              </div>

              {allQuizzes.length === 0 ? (
                <div className="qp-empty-card">
                  <div className="qp-empty-icon">📭</div>
                  <div className="qp-empty-title">មិនទាន់មានសំណួរ</div>
                  <div className="qp-empty-msg">Admin ត្រូវបន្ថែមសំណួរ Quiz មុនសិន</div>
                </div>
              ) : (
                <>
                  <div className="qp-cats">
                    {allCategories.map(cat => (
                      <button key={cat} className={`qp-cat-btn${selCat === cat ? ' active' : ''}`} onClick={() => setSelCat(cat)}>
                        <FontAwesomeIcon icon={faTag} style={{marginRight:6, fontSize:10}}/>
                        {cat} ({cat === 'ទាំងអស់' ? allQuizzes.length : allQuizzes.filter(q=>q.category===cat).length})
                      </button>
                    ))}
                  </div>
                  <button className="qp-start-btn" onClick={startQuiz}>
                    <FontAwesomeIcon icon={faChevronRight}/> ចាប់ផ្ដើម Quiz
                  </button>
                </>
              )}
            </>
          )}

          {/* ── PLAY PHASE ── */}
          {phase === 'play' && q && (
            <div className="qp-quiz-wrap">
              {/* Progress */}
              <div className="qp-progress-row">
                <span className="qp-progress-label">សំណួរ {current + 1} / {questions.length}</span>
                <div className="qp-progress-bar"><div className="qp-progress-fill" style={{width:`${progress}%`}}/></div>
                <span className="qp-score-badge">✓ {score}</span>
              </div>

              {/* Question card */}
              <div className="qp-card">
                <div className="qp-card-stripe"/>
                <div className="qp-card-body">
                  <div className="qp-q-meta">
                    <span className="qp-q-num">Q{current + 1}</span>
                    <span className="qp-q-cat"><FontAwesomeIcon icon={faTag} style={{marginRight:4, fontSize:9}}/>{q.category}</span>
                  </div>
                  <div className="qp-question">{q.question}</div>

                  <div className="qp-options">
                    {q.options.map((opt, i) => {
                      let cls = 'qp-option'
                      if (answered) {
                        if (i === q.correctIdx) cls += ' correct'
                        else if (i === chosen)  cls += ' wrong'
                      }
                      return (
                        <button key={i} className={cls} disabled={answered} onClick={() => handleAnswer(i)}>
                          <span className="qp-option-letter">{LABELS[i]}</span>
                          {opt}
                        </button>
                      )
                    })}
                  </div>

                  {answered && (
                    <div className={`qp-feedback ${chosen === q.correctIdx ? 'correct' : 'wrong'}`}>
                      <span className="qp-feedback-icon">
                        <FontAwesomeIcon icon={chosen === q.correctIdx ? faCheck : faXmark}/>
                      </span>
                      {chosen === q.correctIdx
                        ? 'ត្រឹមត្រូវ! ចម្លើយត្រូវ!'
                        : `ខុស! ចម្លើយត្រូវ: "${q.options[q.correctIdx]}"`
                      }
                    </div>
                  )}

                  {answered && (
                    <button className="qp-next-btn" onClick={handleNext}>
                      {current + 1 >= questions.length ? (
                        <><FontAwesomeIcon icon={faTrophy}/> មើលលទ្ធផល</>
                      ) : (
                        <><FontAwesomeIcon icon={faChevronRight}/> សំណួរបន្ទាប់</>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── RESULT PHASE ── */}
          {phase === 'result' && (
            <div className="qp-result">
              <div className="qp-trophy">🏆</div>
              <div className="qp-stars">{getStars()}</div>
              <div className="qp-result-title">លទ្ធផល Quiz</div>
              <div className="qp-result-score">{score}</div>
              <div className="qp-result-total">/ {questions.length} ចម្លើយ</div>
              <div className="qp-result-msg">{getResultMsg()}</div>
              <div className="qp-result-btns">
                <button className="qp-retry-btn" onClick={() => setPhase('pick')}>
                  <FontAwesomeIcon icon={faRotateRight}/> លេងម្ដងទៀត
                </button>
                <button className="qp-home-btn" onClick={() => navigate('/home')}>
                  <FontAwesomeIcon icon={faHouse}/> ទំព័រដើម
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}