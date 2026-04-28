import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faQuestionCircle, faPlus, faPencil, faTrash,
  faTag, faXmark, faCheck
} from '@fortawesome/free-solid-svg-icons'

const CATEGORIES = ['ជីវិត', 'ការអប់រំ', 'មិត្តភាព', 'ជោគជ័យ', 'ទំនាក់ទំនង', 'សុខភាព', 'ចរិតលក្ខណៈ']
const LBLS = ['A', 'B', 'C', 'D']

/* ── QUIZ MODAL ── */
function QuizModal({ quiz, allProverbs, allWisdoms, onSave, onClose }) {
  const [question, setQuestion] = useState(quiz?.question || '')
  const [options,  setOptions]  = useState(quiz?.options   || ['','','',''])
  const [correctIdx, setCorrectIdx] = useState(quiz?.correctIdx ?? 0)
  const [category, setCategory] = useState(quiz?.category  || CATEGORIES[0])

  const autoFill = (id) => {
    const found = [...allProverbs,...allWisdoms].find(p => String(p.id) === id)
    if (!found || !found.translation) return
    const correct = found.translation
    const others = [...allProverbs,...allWisdoms]
      .filter(p => p.id !== found.id && p.translation)
      .sort(() => Math.random() - .5).slice(0, 3).map(p => p.translation)
    const opts = [correct, ...[...others, 'Option B','Option C','Option D'].slice(0,3)].sort(() => Math.random() - .5)
    setQuestion(`"${found.text}" — ប្រែថាអ្វី?`)
    setOptions(opts); setCorrectIdx(opts.indexOf(correct)); setCategory(found.category)
  }

  const handleSave = () => {
    if (!question.trim() || options.some(o => !o.trim())) return
    onSave({ question: question.trim(), options, correctIdx, category })
  }

  return (
    <div className="ap-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="ap-modal">
        <div className="ap-modal-stripe"/>
        <div className="ap-modal-head">
          <div className="ap-modal-title">{quiz ? 'កែប្រែ' : 'បន្ថែម'} Quiz</div>
          <button className="ap-modal-close" onClick={onClose}><FontAwesomeIcon icon={faXmark}/></button>
        </div>
        <div className="ap-modal-body">
          <div className="ap-fg">
            <label className="ap-flabel">🪄 Auto-fill ពី សុភាសិត/ពាក្យបណ្ដៅ</label>
            <select className="ap-fselect" defaultValue="" onChange={e => autoFill(e.target.value)}>
              <option value="">-- ជ្រើសរើស --</option>
              <optgroup label="សុភាសិត">{allProverbs.map(p=><option key={p.id} value={String(p.id)}>{p.text}</option>)}</optgroup>
              <optgroup label="ពាក្យបណ្ដៅ">{allWisdoms.map(w=><option key={w.id} value={String(w.id)}>{w.text}</option>)}</optgroup>
            </select>
          </div>
          <div className="ap-fg">
            <label className="ap-flabel">ប្រភេទ</label>
            <select className="ap-fselect" value={category} onChange={e=>setCategory(e.target.value)}>
              {CATEGORIES.map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="ap-fg">
            <label className="ap-flabel">សំណួរ</label>
            <textarea className="ap-ftextarea" value={question} onChange={e=>setQuestion(e.target.value)} placeholder="សរសេរសំណួរ..."/>
          </div>
          <div className="ap-fg">
            <label className="ap-flabel">ជម្រើសចម្លើយ A–D</label>
            <div className="ap-opts-grid">
              {options.map((o,i) => (
                <div key={i} className="ap-opt-wrap">
                  <span className="ap-opt-lbl">{LBLS[i]}</span>
                  <input className={`ap-opt-inp${correctIdx===i?' correct':''}`} type="text" value={o}
                    placeholder={`${LBLS[i]}...`} onChange={e=>{const a=[...options];a[i]=e.target.value;setOptions(a)}}/>
                </div>
              ))}
            </div>
          </div>
          <div className="ap-fg">
            <label className="ap-flabel">ចម្លើយត្រឹមត្រូវ</label>
            <div className="ap-correct-btns">
              {LBLS.map((l,i)=>(
                <button key={i} className={`ap-correct-btn${correctIdx===i?' active':''}`} onClick={()=>setCorrectIdx(i)}>
                  {l}: {options[i] ? options[i].slice(0,14)+(options[i].length>14?'…':'') : '—'}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="ap-modal-foot">
          <button className="ap-btn-cancel" onClick={onClose}>បោះបង់</button>
          <button className="ap-btn-save" onClick={handleSave}>
            <FontAwesomeIcon icon={faCheck}/> {quiz ? 'រក្សាទុក' : 'បន្ថែម'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── QUIZ ADMIN PANEL ── */
export default function QuizAdmin({ quizzes, setQuizzes, proverbs, wisdoms, search, onToast, onConfirm }) {
  const [modal, setModal] = useState(null)

  const genId = (arr) => arr.length ? Math.max(...arr.map(x => x.id)) + 1 : 1

  const addQuiz  = (data) => { setQuizzes(q => [...q, { ...data, id: genId(quizzes) }]); setModal(null); onToast('បន្ថែម Quiz បានជោគជ័យ!') }
  const editQuiz = (data) => { setQuizzes(q => q.map(x => x.id === modal.item.id ? {...x,...data} : x)); setModal(null); onToast('កែប្រែបានជោគជ័យ!') }
  const deleteQuiz = (id) => onConfirm('ការលុបនេះមិនអាចត្រឡប់វិញបានទេ', () => {
    setQuizzes(q => q.filter(x => x.id !== id)); onToast('បានលុបចេញ!')
  })

  const filtered = quizzes.filter(q => q.question.includes(search) || q.category.includes(search))

  return (
    <>
      <div className="ap-card">
        <div className="ap-card-stripe"/>
        <div className="ap-card-head">
          <div className="ap-card-title">
            <span className="ap-card-title-ico"><FontAwesomeIcon icon={faQuestionCircle}/></span>
            Quiz ({filtered.length})
          </div>
          <button className="ap-add-btn" onClick={() => setModal({ type:'quiz' })}>
            <FontAwesomeIcon icon={faPlus}/> បន្ថែម Quiz
          </button>
        </div>

        {filtered.length === 0
          ? <div className="ap-empty" style={{padding:40}}>មិនទាន់មានសំណួរ Quiz ទេ 🎯</div>
          : filtered.map((q,i) => (
            <div key={q.id} className="ap-quiz-item">
              <div className="ap-quiz-head">
                <div className="ap-quiz-q">
                  <span style={{color:'#C8943A', marginRight:8}}>{i+1}.</span>{q.question}
                </div>
                <div className="ap-act">
                  <button className="ap-edit-btn" onClick={() => setModal({type:'quiz', item:q})}><FontAwesomeIcon icon={faPencil}/></button>
                  <button className="ap-del-btn"  onClick={() => deleteQuiz(q.id)}><FontAwesomeIcon icon={faTrash}/></button>
                </div>
              </div>
              <div className="ap-quiz-opts">
                {q.options.map((o,oi) => (
                  <span key={oi} className={`ap-quiz-opt${oi===q.correctIdx?' correct':''}`}>
                    {['A','B','C','D'][oi]}: {o}{oi===q.correctIdx?' ✓':''}
                  </span>
                ))}
              </div>
              <div className="ap-quiz-meta"><FontAwesomeIcon icon={faTag} style={{marginRight:4}}/>{q.category}</div>
            </div>
          ))
        }
      </div>

      {modal && (
        <QuizModal
          quiz={modal.item}
          allProverbs={proverbs}
          allWisdoms={wisdoms}
          onClose={() => setModal(null)}
          onSave={d => modal.item ? editQuiz(d) : addQuiz(d)}
        />
      )}
    </>
  )
}