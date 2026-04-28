import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminPage.css'
import QuizAdmin from './QuizAdmin'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShield, faUsers, faBookOpen, faCommentDots,
  faTrash, faRightFromBracket, faHouse,
  faPlus, faPencil, faXmark, faCheck,
  faQuestionCircle, faTag, faSearch,
  faSun, faMoon, faChartBar
} from '@fortawesome/free-solid-svg-icons'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend, LineChart, Line, CartesianGrid
} from 'recharts'

const DEFAULT_PROVERBS = [
  { id: 1, category: 'ការអប់រំ', text: 'ចេះហើយចំណាំ បំភ្លេចចោល', translation: 'Once learned, do not forget.' },
  { id: 2, category: 'មិត្តភាព', text: 'ក្បែរអ្នកល្អ ក្លាយជាអ្នកល្អ', translation: 'Near a good person, you become good.' },
  { id: 3, category: 'ជោគជ័យ',  text: 'ទន្លេធំ ចាប់ត្រីធំ', translation: 'Big river, big fish.' },
  { id: 4, category: 'ទំនាក់ទំនង', text: 'ទឹកត្រជាក់ ត្រីក្រ ទឹកក្ដៅ ត្រីស្លាប់', translation: 'Cool water keeps fish healthy; hot water kills them.' },
  { id: 5, category: 'ជីវិត', text: 'ក្ដៅថ្ងៃមិនស្មើក្ដៅចិត្ដ', translation: 'The heat of the sun is not like the heat of the heart.' },
]
const DEFAULT_WISDOMS = [
  { id: 6,  category: 'ជីវិត',    text: 'ពោះឃ្លានភ្នែកឃ្លាន', translation: 'Hungry stomach, hungry eyes.' },
  { id: 7,  category: 'ការអប់រំ', text: 'ច្រៀងមិនដឹងភ្លេង', translation: 'Singing without knowing the melody.' },
  { id: 8,  category: 'ជីវិត',    text: 'ត្រីចិញ្ចើមទឹក', translation: "Fish living at the water's edge." },
  { id: 9,  category: 'ជោគជ័យ',  text: 'ដៃវែង ភ្នែកឃ្លាត', translation: 'Long hands, sharp eyes.' },
  { id: 10, category: 'មិត្តភាព', text: 'ទឹកកកក្នុងពែង', translation: 'Ice water in a cup.' },
]
const CATEGORIES = ['ជីវិត', 'ការអប់រំ', 'មិត្តភាព', 'ជោគជ័យ', 'ទំនាក់ទំនង', 'សុខភាព', 'ចរិតលក្ខណៈ']

const loadData = (key, def) => { try { return JSON.parse(localStorage.getItem(key)) || def } catch { return def } }
const saveData = (key, val) => localStorage.setItem(key, JSON.stringify(val))
const genId = (arr) => arr.length ? Math.max(...arr.map(x => x.id)) + 1 : 1

/* ── MODALS ── */
function ItemModal({ type, item, onSave, onClose }) {
  const [text, setText] = useState(item?.text || '')
  const [translation, setTranslation] = useState(item?.translation || '')
  const [category, setCategory] = useState(item?.category || CATEGORIES[0])
  const label = type === 'proverb' ? 'សុភាសិត' : 'ពាក្យបណ្ដៅ'
  return (
    <div className="ap-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="ap-modal">
        <div className="ap-modal-stripe"/>
        <div className="ap-modal-head">
          <div className="ap-modal-title">{item ? 'កែប្រែ' : 'បន្ថែម'} {label}</div>
          <button className="ap-modal-close" onClick={onClose}><FontAwesomeIcon icon={faXmark}/></button>
        </div>
        <div className="ap-modal-body">
          <div className="ap-fg"><label className="ap-flabel">ប្រភេទ</label>
            <select className="ap-fselect" value={category} onChange={e=>setCategory(e.target.value)}>{CATEGORIES.map(c=><option key={c}>{c}</option>)}</select></div>
          <div className="ap-fg"><label className="ap-flabel">អត្ថបទ ភាសាខ្មែរ</label>
            <textarea className="ap-ftextarea" value={text} onChange={e=>setText(e.target.value)} placeholder="សរសេរ..."/></div>
          <div className="ap-fg"><label className="ap-flabel">Translation (English)</label>
            <input className="ap-finput" type="text" value={translation} onChange={e=>setTranslation(e.target.value)} placeholder="English translation..."/></div>
        </div>
        <div className="ap-modal-foot">
          <button className="ap-btn-cancel" onClick={onClose}>បោះបង់</button>
          <button className="ap-btn-save" onClick={()=>{if(text.trim())onSave({text:text.trim(),translation:translation.trim(),category})}}>
            <FontAwesomeIcon icon={faCheck}/> {item?'រក្សាទុក':'បន្ថែម'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Confirm({ msg, onOk, onCancel }) {
  return (
    <div className="ap-overlay">
      <div className="ap-confirm">
        <div className="ap-confirm-emoji">🗑️</div>
        <div className="ap-confirm-title">តើអ្នកប្រាកដទេ?</div>
        <div className="ap-confirm-msg">{msg}</div>
        <div className="ap-confirm-btns">
          <button className="ap-btn-cancel" onClick={onCancel}>បោះបង់</button>
          <button className="ap-btn-danger" onClick={onOk}>លុបចេញ</button>
        </div>
      </div>
    </div>
  )
}

/* ── DASHBOARD ── */
function Dashboard({ dark, users, proverbs, wisdoms, quizzes }) {
  const tc  = dark ? '#C8943A' : '#8A6030'
  const tcs = dark ? 'rgba(200,150,50,0.5)' : '#B09050'
  const tooltip = {
    background: dark ? '#2A1A08' : '#FFFCF0',
    border: `1px solid ${dark ? 'rgba(200,150,50,0.25)' : '#E8D8A8'}`,
    borderRadius: 10, fontFamily: 'Battambang, serif', fontSize: 12,
    color: dark ? '#F5D878' : '#3A1E06',
  }
  const grid = dark ? 'rgba(200,150,50,0.08)' : 'rgba(200,150,50,0.12)'
  const cursor = dark ? 'rgba(200,150,50,0.06)' : 'rgba(200,150,50,0.08)'

  const barData = [
    { name: 'អ្នកប្រើ',    value: users.length,    fill: '#C89A3A' },
    { name: 'សុភាសិត',    value: proverbs.length,  fill: '#4A90C8' },
    { name: 'ពាក្យបណ្ដៅ', value: wisdoms.length,   fill: '#5AAA68' },
    { name: 'Quiz',        value: quizzes.length,   fill: '#8A60C8' },
  ]
  const catMap = {}
  ;[...proverbs,...wisdoms].forEach(p=>{ catMap[p.category]=(catMap[p.category]||0)+1 })
  const PIE_COLORS = ['#C89A3A','#4A90C8','#5AAA68','#8A60C8','#E07840','#E05080','#40B8A8']
  const pieData = Object.entries(catMap).map(([name,value])=>({name,value}))
  const lineData = [
    { month:'ម.ករា', proverbs:2, wisdoms:1, quiz:0 },
    { month:'កុម្ភ',  proverbs:3, wisdoms:2, quiz:1 },
    { month:'មិនា',  proverbs:proverbs.length, wisdoms:wisdoms.length, quiz:quizzes.length },
  ]
  const activities = [
    { color:'#4A90C8', text:`សុភាសិតសរុប ${proverbs.length} ចំណុច`, time:'ថ្មីៗ' },
    { color:'#5AAA68', text:`ពាក្យបណ្ដៅ ${wisdoms.length} ចំណុច`, time:'ថ្មីៗ' },
    { color:'#8A60C8', text:`Quiz ${quizzes.length} សំណួរ`, time:'ថ្មីៗ' },
    { color:'#C89A3A', text:`អ្នកប្រើ ${users.length} នាក់`, time:'ថ្មីៗ' },
    { color:'#E07840', text:`ចំណូលចិត្ត ${JSON.parse(localStorage.getItem('bk_favorites')||'[]').length} ចំណុច`, time:'ថ្មីៗ' },
  ]
  const legend = { fontFamily:'Battambang,serif', fontSize:11, color: dark?'rgba(200,150,50,0.7)':'#8A6030' }

  return (
    <>
      <div className="ap-charts-row">
        <div className="ap-chart-card">
          <div className="ap-chart-title"><span className="ap-chart-dot"/>ទិន្នន័យប្រព័ន្ធ · Content Overview</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData} margin={{top:4,right:8,left:-18,bottom:0}} barSize={38}>
              <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false}/>
              <XAxis dataKey="name" tick={{fontFamily:'Battambang,serif',fontSize:12,fill:tc}} axisLine={false} tickLine={false}/>
              <YAxis allowDecimals={false} tick={{fontFamily:'Battambang,serif',fontSize:11,fill:tcs}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={tooltip} cursor={{fill:cursor}}/>
              <Bar dataKey="value" radius={[7,7,0,0]}>{barData.map((d,i)=><Cell key={i} fill={d.fill}/>)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="ap-chart-card">
          <div className="ap-chart-title"><span className="ap-chart-dot"/>ការចែកចាយប្រភេទ · Category Split</div>
          {pieData.length===0
            ? <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:200,color:'var(--ap-text-empty)',fontSize:13}}>មិនទាន់មានទិន្នន័យ</div>
            : <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} cx="45%" cy="50%" innerRadius={50} outerRadius={78} paddingAngle={3} dataKey="value">
                    {pieData.map((_,i)=><Cell key={i} fill={PIE_COLORS[i%PIE_COLORS.length]}/>)}
                  </Pie>
                  <Tooltip contentStyle={tooltip}/>
                  <Legend iconType="circle" iconSize={8} wrapperStyle={legend}/>
                </PieChart>
              </ResponsiveContainer>
          }
        </div>
      </div>
      <div className="ap-charts-row">
        <div className="ap-chart-card">
          <div className="ap-chart-title"><span className="ap-chart-dot"/>កំណើនមាតិកា · Content Growth</div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={lineData} margin={{top:4,right:8,left:-18,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false}/>
              <XAxis dataKey="month" tick={{fontFamily:'Battambang,serif',fontSize:11,fill:tc}} axisLine={false} tickLine={false}/>
              <YAxis allowDecimals={false} tick={{fontFamily:'Battambang,serif',fontSize:11,fill:tcs}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={tooltip}/>
              <Legend iconType="circle" iconSize={8} wrapperStyle={legend}/>
              <Line type="monotone" dataKey="proverbs" name="សុភាសិត" stroke="#4A90C8" strokeWidth={2} dot={{r:4,fill:'#4A90C8'}}/>
              <Line type="monotone" dataKey="wisdoms"  name="ពាក្យបណ្ដៅ" stroke="#5AAA68" strokeWidth={2} dot={{r:4,fill:'#5AAA68'}}/>
              <Line type="monotone" dataKey="quiz"     name="Quiz"    stroke="#8A60C8" strokeWidth={2} dot={{r:4,fill:'#8A60C8'}}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="ap-chart-card">
          <div className="ap-chart-title"><span className="ap-chart-dot"/>សកម្មភាពចុងក្រោយ · Recent Activity</div>
          <div className="ap-activity-list">
            {activities.map((a,i)=>(
              <div key={i} className="ap-activity-item">
                <div className="ap-activity-dot" style={{background:a.color}}/>
                <div className="ap-activity-text">{a.text}</div>
                <div className="ap-activity-time">{a.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

/* ── MAIN ── */
export default function AdminPage() {
  const navigate = useNavigate()
  const [dark, setDark]           = useState(() => loadData('bk_dark', false))
  const [activeTab, setActiveTab] = useState('dashboard')
  const [search, setSearch]       = useState('')
  const [modal, setModal]         = useState(null)
  const [confirm, setConfirm]     = useState(null)
  const [toast, setToast]         = useState(null)

  const [users,    setUsers]    = useState(() => loadData('bk_users', []))
  const [proverbs, setProverbs] = useState(() => loadData('bk_admin_proverbs', DEFAULT_PROVERBS))
  const [wisdoms,  setWisdoms]  = useState(() => loadData('bk_admin_wisdoms', DEFAULT_WISDOMS))
  const [quizzes,  setQuizzes]  = useState(() => loadData('bk_quizzes', []))

  useEffect(() => saveData('bk_admin_proverbs', proverbs), [proverbs])
  useEffect(() => saveData('bk_admin_wisdoms',  wisdoms),  [wisdoms])
  useEffect(() => saveData('bk_quizzes',        quizzes),  [quizzes])
  useEffect(() => saveData('bk_dark',           dark),     [dark])

  const currentUser = loadData('bk_current_user', { username: 'Admin', role: 'admin' })
  const toast_ = (msg) => { setToast(msg); setTimeout(()=>setToast(null), 2400) }
  const logout  = () => { localStorage.removeItem('bk_current_user'); navigate('/') }

  const addItem    = (setter, data, label) => { setter(p=>[...p,{...data,id:genId(p)}]); setModal(null); toast_(`បន្ថែម${label}បានជោគជ័យ!`) }
  const editItem   = (setter, id, data)   => { setter(p=>p.map(x=>x.id===id?{...x,...data}:x)); setModal(null); toast_('កែប្រែបានជោគជ័យ!') }
  const deleteItem = (setter, id) => setConfirm({ msg:'ការលុបនេះមិនអាចត្រឡប់វិញបានទេ', ok:()=>{ setter(p=>p.filter(x=>x.id!==id)); setConfirm(null); toast_('បានលុបចេញ!') } })
  const deleteUser = (u) => setConfirm({ msg:`លុបអ្នកប្រើ "${u}"?`, ok:()=>{ const upd=users.filter(x=>x.username!==u); setUsers(upd); saveData('bk_users',upd); setConfirm(null); toast_('បានលុបចេញ!') } })

  const fp = proverbs.filter(p=>p.text.includes(search)||p.category.includes(search)||(p.translation||'').toLowerCase().includes(search.toLowerCase()))
  const fw = wisdoms.filter(w=>w.text.includes(search)||w.category.includes(search)||(w.translation||'').toLowerCase().includes(search.toLowerCase()))
  const fu = users.filter(u=>u.username.toLowerCase().includes(search.toLowerCase())||(u.email||'').toLowerCase().includes(search.toLowerCase()))

  const NAV = [
    { key:'dashboard', label:'Dashboard',       icon:faChartBar,       count:null },
    { key:'proverbs',  label:'សុភាសិត',         icon:faBookOpen,       count:proverbs.length },
    { key:'wisdoms',   label:'ពាក្យបណ្ដៅ',     icon:faCommentDots,    count:wisdoms.length },
    { key:'quiz',      label:'Quiz',             icon:faQuestionCircle, count:quizzes.length },
    { key:'users',     label:'អ្នកប្រើប្រាស់',  icon:faUsers,          count:users.length },
  ]
  const PAGE_LABELS = { dashboard:'ផ្ទាំង Dashboard', proverbs:'បញ្ជីសុភាសិតសរុប', wisdoms:'បញ្ជីពាក្យបណ្ដៅ', quiz:'បញ្ជីសំណួរ Quiz', users:'អ្នកប្រើប្រាស់ទាំងអស់' }

  return (
    <div className="ap-root" data-theme={dark ? 'dark' : 'light'}>

      {/* ══ SIDEBAR ══ */}
      <aside className="ap-sidebar">
        <div className="ap-sidebar-brand">
          <div className="ap-brand-title">មុតចុញ្ញាខ្មែរ</div>
          <div className="ap-brand-sub">Brachnha Khmer</div>
          <div className="ap-brand-pill"><FontAwesomeIcon icon={faShield} style={{fontSize:9}}/> ADMIN</div>
        </div>
        <div className="ap-nav-group">
          <div className="ap-nav-group-label">Menu</div>
          <button className="ap-nav-btn" onClick={()=>navigate('/home')}>
            <span className="ap-nav-btn-ico"><FontAwesomeIcon icon={faHouse}/></span>វិលត្រឡប់ · Home
          </button>
          <div className="ap-nav-group-label" style={{marginTop:10}}>Admin</div>
          {NAV.map(n=>(
            <button key={n.key} className={`ap-nav-btn${activeTab===n.key?' active':''}`} onClick={()=>{setActiveTab(n.key);setSearch('')}}>
              <span className="ap-nav-btn-ico"><FontAwesomeIcon icon={n.icon}/></span>
              {n.label}
              {n.count!==null && <span className="ap-nav-btn-count">{n.count}</span>}
            </button>
          ))}
        </div>
        <div className="ap-sidebar-footer">
          <div className="ap-user-row">
            <div className="ap-user-ava">{(currentUser?.username||'A')[0].toUpperCase()}</div>
            <div><div className="ap-user-name">{currentUser?.username||'Admin'}</div><div className="ap-user-role">{currentUser?.role||'admin'}</div></div>
          </div>
          <div className="ap-footer-btns">
            <button className="ap-footer-btn logout" onClick={logout}><FontAwesomeIcon icon={faRightFromBracket}/> ចាកចេញ</button>
            <button className="ap-footer-btn theme" onClick={()=>setDark(d=>!d)}><FontAwesomeIcon icon={dark?faSun:faMoon}/></button>
          </div>
        </div>
      </aside>

      {/* ══ MAIN ══ */}
      <main className="ap-main">
        <div className="ap-topbar">
          <div>
            <div className="ap-topbar-page">{PAGE_LABELS[activeTab]}</div>
            <div className="ap-topbar-sub">ADMIN</div>
          </div>
          <div className="ap-topbar-search">
            <span className="ap-topbar-search-icon"><FontAwesomeIcon icon={faSearch}/></span>
            <input placeholder="ស្វែងរក..." value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <div className="ap-guest-chip">
            <div className="ap-guest-ava">{(currentUser?.username||'A')[0].toUpperCase()}</div>
            <div><div className="ap-guest-name">{currentUser?.username||'Admin'}</div><div className="ap-guest-role">Admin</div></div>
          </div>
        </div>

        <div className="ap-body">
          {/* Stats — always visible */}
          <div className="ap-stats">
            <div className="ap-stat"><div className="ap-stat-ico gold"><FontAwesomeIcon icon={faUsers}/></div><div><div className="ap-stat-num">{users.length}</div><div className="ap-stat-label">អ្នកប្រើប្រាស់</div></div></div>
            <div className="ap-stat"><div className="ap-stat-ico blue"><FontAwesomeIcon icon={faBookOpen}/></div><div><div className="ap-stat-num">{proverbs.length}</div><div className="ap-stat-label">សុភាសិត</div></div></div>
            <div className="ap-stat"><div className="ap-stat-ico green"><FontAwesomeIcon icon={faCommentDots}/></div><div><div className="ap-stat-num">{wisdoms.length}</div><div className="ap-stat-label">ពាក្យបណ្ដៅ</div></div></div>
            <div className="ap-stat"><div className="ap-stat-ico purple"><FontAwesomeIcon icon={faQuestionCircle}/></div><div><div className="ap-stat-num">{quizzes.length}</div><div className="ap-stat-label">សំណួរ Quiz</div></div></div>
          </div>

          {activeTab==='dashboard' && <Dashboard dark={dark} users={users} proverbs={proverbs} wisdoms={wisdoms} quizzes={quizzes}/>}

          {activeTab==='proverbs' && (
            <div className="ap-card">
              <div className="ap-card-stripe"/>
              <div className="ap-card-head">
                <div className="ap-card-title"><span className="ap-card-title-ico"><FontAwesomeIcon icon={faBookOpen}/></span>សុភាសិត ({fp.length})</div>
                <button className="ap-add-btn" onClick={()=>setModal({type:'proverb'})}><FontAwesomeIcon icon={faPlus}/> បន្ថែម</button>
              </div>
              <table className="ap-table">
                <thead><tr><th>#</th><th>PROVERB</th><th>CATEGORY</th><th>TRANSLATION</th><th>ACTIONS</th></tr></thead>
                <tbody>{fp.length===0?<tr><td colSpan={5} className="ap-empty">មិនមានទិន្នន័យ 📭</td></tr>:fp.map((p,i)=>(
                  <tr key={p.id}>
                    <td style={{color:'#C0A878',width:36}}>{i+1}</td>
                    <td style={{maxWidth:200}}>{p.text}</td>
                    <td><span className="ap-cat-badge">{p.category}</span></td>
                    <td><span className="ap-translation">{p.translation||'—'}</span></td>
                    <td><div className="ap-act">
                      <button className="ap-edit-btn" onClick={()=>setModal({type:'proverb',item:p})}><FontAwesomeIcon icon={faPencil}/></button>
                      <button className="ap-del-btn" onClick={()=>deleteItem(setProverbs,p.id)}><FontAwesomeIcon icon={faTrash}/></button>
                    </div></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}

          {activeTab==='wisdoms' && (
            <div className="ap-card">
              <div className="ap-card-stripe"/>
              <div className="ap-card-head">
                <div className="ap-card-title"><span className="ap-card-title-ico"><FontAwesomeIcon icon={faCommentDots}/></span>ពាក្យបណ្ដៅ ({fw.length})</div>
                <button className="ap-add-btn" onClick={()=>setModal({type:'wisdom'})}><FontAwesomeIcon icon={faPlus}/> បន្ថែម</button>
              </div>
              <table className="ap-table">
                <thead><tr><th>#</th><th>WISDOM</th><th>CATEGORY</th><th>TRANSLATION</th><th>ACTIONS</th></tr></thead>
                <tbody>{fw.length===0?<tr><td colSpan={5} className="ap-empty">មិនមានទិន្នន័យ 📭</td></tr>:fw.map((w,i)=>(
                  <tr key={w.id}>
                    <td style={{color:'#C0A878',width:36}}>{i+1}</td>
                    <td style={{maxWidth:200}}>{w.text}</td>
                    <td><span className="ap-cat-badge">{w.category}</span></td>
                    <td><span className="ap-translation">{w.translation||'—'}</span></td>
                    <td><div className="ap-act">
                      <button className="ap-edit-btn" onClick={()=>setModal({type:'wisdom',item:w})}><FontAwesomeIcon icon={faPencil}/></button>
                      <button className="ap-del-btn" onClick={()=>deleteItem(setWisdoms,w.id)}><FontAwesomeIcon icon={faTrash}/></button>
                    </div></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}

          {activeTab==='quiz' && (
            <QuizAdmin
              quizzes={quizzes}
              setQuizzes={setQuizzes}
              proverbs={proverbs}
              wisdoms={wisdoms}
              search={search}
              onToast={toast_}
              onConfirm={(msg, ok) => setConfirm({ msg, ok: () => { ok(); setConfirm(null) } })}
            />
          )}

          {activeTab==='users' && (
            <div className="ap-card">
              <div className="ap-card-stripe"/>
              <div className="ap-card-head">
                <div className="ap-card-title"><span className="ap-card-title-ico"><FontAwesomeIcon icon={faUsers}/></span>អ្នកប្រើប្រាស់ ({fu.length})</div>
              </div>
              {fu.length===0?<div className="ap-empty" style={{padding:40}}>មិនទាន់មានអ្នកប្រើប្រាស់ 👤</div>:fu.map(u=>(
                <div key={u.username} className="ap-user-list-item">
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <div className="ap-user-ava">{u.username[0].toUpperCase()}</div>
                    <div><div className="ap-uname">{u.username}</div><div className="ap-uemail">{u.email||'មិនមានអ៊ីម៉ែល'}</div></div>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <span className={`ap-role-pill ${u.role||'user'}`}>{u.role||'user'}</span>
                    <button className="ap-del-btn" onClick={()=>deleteUser(u.username)}><FontAwesomeIcon icon={faTrash}/></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ══ MODALS ══ */}
      {modal?.type==='proverb' && <ItemModal type="proverb" item={modal.item} onClose={()=>setModal(null)} onSave={d=>modal.item?editItem(setProverbs,modal.item.id,d):addItem(setProverbs,d,'សុភាសិត')}/>}
      {modal?.type==='wisdom'  && <ItemModal type="wisdom"  item={modal.item} onClose={()=>setModal(null)} onSave={d=>modal.item?editItem(setWisdoms,modal.item.id,d):addItem(setWisdoms,d,'ពាក្យបណ្ដៅ')}/>}
      {confirm && <Confirm msg={confirm.msg} onOk={confirm.ok} onCancel={()=>setConfirm(null)}/>}
      {toast && <div className="ap-toast"><FontAwesomeIcon icon={faCheck}/> {toast}</div>}
    </div>
  )
}