// ── Shared default data & localStorage helpers ──────────────
export const DEFAULT_PROVERBS = [
  { id:1, category:'ជីវិត',    text:'ដំបៅមិនឈឺ យកឈើចាក់',  translation: 'Poking a wound that does not hurt' },
  { id:2, category:'ជីវិត',    text:'តក់ៗពេញបំពង់' , translation: 'Drop by drop fills the container'},
  { id:3, category:'ការអប់រំ', text:'ផ្លូវវៀចកុំបោះបង់ ផ្លូវត្រង់កុំដើរហោង' ,translation: 'Do not abandon the winding road; do not walk carelessly on the straight road' },
  { id:4, category:'ការអប់រំ', text:'ឃើញ​ដំរី​ជុះ​ កុំ​ជុះ​តាម​ដំរី (ឬ ដំរី​ជុះ​ កុំ​ជុះ​តាម​ដំរី)' , translation: 'Seeing an elephant defecate, do not follow it'},
  { id:5, category:'មិត្តភាព', text:'គ្នាច្រើនអន្សមខ្លោច ​គ្នាដូចស្រមោចអន្សមឆៅ' , translation: 'If many want to cook the rice cake, it will be overcooked; if there is a whole ant colony, it remains uncooked'},
  { id:6, category:'មិត្តភាព', text:'ចានមួយរាវ លែងអីរណ្តំគ្នា' , translation: 'Dishes in the same place will collide'},
  { id:7, category:'ជោគជ័យ',  text:'ដើរយឺតក៏ដល់' , translation: 'Even walking slowly, you will eventually reach the destination'},
  { id:8, category:'ជោគជ័យ',  text:'ចង់ចេះឲ្យធ្វើល្ងង់' , translation: 'If you want to know, act foolish'}
]

export const DEFAULT_WISDOMS = [
  { id: 6,  category: 'ជីវិត',    text: 'ពោះឃ្លានភ្នែកឃ្លាន', translation: 'Hungry stomach, hungry eyes.' },
  { id: 7,  category: 'ការអប់រំ', text: 'ច្រៀងមិនដឹងភ្លេង',   translation: 'Singing without knowing the melody.' },
  { id: 8,  category: 'ជីវិត',    text: 'ត្រីចិញ្ចើមទឹក',      translation: "Fish living at the water's edge." },
  { id: 9,  category: 'ជោគជ័យ',  text: 'ដៃវែង ភ្នែកឃ្លាត',   translation: 'Long hands, sharp eyes.' },
  { id: 10, category: 'មិត្តភាព', text: 'ទឹកកកក្នុងពែង',      translation: 'Ice water in a cup.' },
]

export const getProverbs = () => {
  try { return JSON.parse(localStorage.getItem('bk_admin_proverbs')) || DEFAULT_PROVERBS }
  catch { return DEFAULT_PROVERBS }
}

export const getWisdoms = () => {
  try { return JSON.parse(localStorage.getItem('bk_admin_wisdoms')) || DEFAULT_WISDOMS }
  catch { return DEFAULT_WISDOMS }
}