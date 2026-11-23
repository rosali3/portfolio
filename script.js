const publications = [
  {year:'2025', journal:'Frontiers in Bioscience', title:'3D Bioprinting of Cultivated Meat Followed by the Development of a Fine-Tuned YOLO Model for the Detection and Counting of Lipoblasts, Fibroblasts, and Myogenic Cells', url:'https://doi.org/10.31083/FBL36266', doi:'10.31083/FBL36266'},
  {year:'2025', journal:'International Journal of Molecular Sciences', title:'The Role of Hydrogen Sulfide in the Localization and Structural–Functional Organization of p53 Following Traumatic Brain Injury: Development of a YOLO Model for Detection and Quantification of Apoptotic Nuclei', url:'https://doi.org/10.3390/ijms26115066', doi:'10.3390/ijms26115066'},
  {year:'2025', journal:'International Journal of Molecular Sciences', title:'Investigation of the Expression, Localization, and Acidosis-Associated Conformational Changes in Connexin 43 in Traumatic Brain Injury with the Development of a Neural Network Model for Assessing Systemic Inflammation', url:'https://doi.org/10.3390/ijms26188855', doi:'10.3390/ijms26188855'},
  {year:'2026', journal:'Molecules', title:'Mirror Effect of Parvalbumin and Connexin 43 Expression in the Acute and Subacute Phases After Penetrating Traumatic Brain Injury Reveals a Non-Canonical Interaction', url:'https://doi.org/10.3390/molecules31061018', doi:'10.3390/molecules31061018'},
  {year:'2026', journal:'International Journal of Molecular Sciences', title:'Changes in Connexin-43 Expression and Neuropil Ultrastructure in the Cerebral Cortex of Bats During the Sleep–Wake Cycle', url:'https://doi.org/10.3390/ijms27209171', doi:'10.3390/ijms27209171'},
  {year:'2024', journal:'Вопросы науки', title:'Автоматизация подсчета клеток на микрофотографиях с использованием методов компьютерного зрения', url:'https://www.elibrary.ru/item.asp?id=78114318', doi:'Статья в eLIBRARY'},
  {year:'2025', journal:'Молодой исследователь Дона', title:'От клеток к экосистемам: математика адаптации', url:'https://mid-journal.ru/upload/iblock/422/0x1ywu7ey7td5dwu4ue3z01i5740x1pl.pdf', doi:'Открыть статью'},
  {year:'2025', journal:'Естественные науки и медицина', title:'Изменения клеточного состава периферической крови при черепно-мозговой травме', url:'https://sibac.info/conf/medicine/64/386005', doi:'Открыть статью'}
];
const rights = [
  ['2024688638','Программа подсчета эукариотических клеток при культивировании in vitro','29.11.2024'],
  ['2025664628','Программа предобработки биологических изображений и метаданных для процедур машинного обучения и постобработки инференса','05.06.2025'],
  ['2026660701','Мессенджер-бот на базе нейросетевых моделей для автоматизированного подсчета клеточных культур','14.04.2026'],
  ['2026669583','Программный модуль оценки качества аннотирования объектов на изображениях','09.07.2026']
];
const list = document.getElementById('publication-list');
const more = document.getElementById('show-more');
let expanded = false;
let mode = 'ml';
function renderPublications(){
  const count = mode === 'research' || expanded ? publications.length : 3;
  list.replaceChildren(...publications.slice(0,count).map(item=>{
    const row=document.createElement('article'); row.className='publication';
    const meta=document.createElement('div'); meta.className='pub-meta'; meta.textContent=`${item.year} · ${item.journal}`;
    const title=document.createElement('h3'); title.textContent=item.title;
    const link=document.createElement('a'); link.href=item.url; link.target='_blank'; link.rel='noopener noreferrer'; link.textContent=item.doi+' ↗';
    row.append(meta,title,link); return row;
  }));
  more.hidden=mode==='research'; more.setAttribute('aria-expanded',String(expanded)); more.textContent=expanded?'Скрыть дополнительные публикации':'Показать все публикации';
}
function setMode(next){
  mode=next; document.body.dataset.mode=next;
  document.querySelectorAll('.mode').forEach(button=>{const active=button.dataset.mode===next; button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
  document.querySelectorAll('[data-copy]').forEach(element=>element.hidden=element.dataset.copy!==next);
  document.querySelectorAll('.research-extra').forEach(element=>element.hidden=next!=='research');
  renderPublications();
  try{localStorage.setItem('portfolio-mode',next)}catch{}
}
document.querySelectorAll('.mode').forEach(button=>button.addEventListener('click',()=>setMode(button.dataset.mode)));
more.addEventListener('click',()=>{expanded=!expanded;renderPublications()});
document.getElementById('rid-list').replaceChildren(...rights.map(([number,title,date])=>{const card=document.createElement('article'); card.className='rid-card'; const label=document.createElement('span');label.textContent=`№ ${number} · ${date}`; const heading=document.createElement('h3');heading.textContent=title;card.append(label,heading);return card}));
document.getElementById('year').textContent=new Date().getFullYear();
let saved='ml';try{saved=localStorage.getItem('portfolio-mode')||'ml'}catch{}setMode(saved==='research'?'research':'ml');
const themeToggle=document.getElementById('theme-toggle');
function setTheme(next){
  const pink=next==='pink';
  document.body.dataset.theme=pink?'pink':'official';
  themeToggle.setAttribute('aria-pressed',String(pink));
  themeToggle.setAttribute('aria-label',pink?'Включить официальную белую тему':'Включить розовую тему');
  themeToggle.querySelector('.theme-label').textContent=pink?'Белая тема':'Розовая тема';
  themeToggle.querySelector('[aria-hidden]').textContent=pink?'◯':'✦';
  try{localStorage.setItem('portfolio-theme',pink?'pink':'official')}catch{}
}
themeToggle.addEventListener('click',()=>setTheme(document.body.dataset.theme==='pink'?'official':'pink'));
let savedTheme='official';try{savedTheme=localStorage.getItem('portfolio-theme')||'official'}catch{}setTheme(savedTheme);
