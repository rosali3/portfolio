const publications = [
  {year:'2025', journal:'Frontiers in Bioscience', title:'3D Bioprinting of Cultivated Meat Followed by the Development of a Fine-Tuned YOLO Model for the Detection and Counting of Lipoblasts, Fibroblasts, and Myogenic Cells', url:'https://doi.org/10.31083/FBL36266', doi:'10.31083/FBL36266', image:'fbl-fig11.jpg', alt:'Микрофотографии клеточных культур с красными рамками результатов детекции YOLO', caption:'Рис. 11 · Набиуллина и соавт. · CC BY 4.0'},
  {year:'2025', journal:'International Journal of Molecular Sciences', title:'The Role of Hydrogen Sulfide in the Localization and Structural–Functional Organization of p53 Following Traumatic Brain Injury: Development of a YOLO Model for Detection and Quantification of Apoptotic Nuclei', url:'https://doi.org/10.3390/ijms26115066', doi:'10.3390/ijms26115066', image:'ijms-5066-fig8.png', alt:'Флуоресцентная микроскопия и результаты YOLO-детекции нормальных и апоптотических ядер', caption:'Рис. 8 · Кириченко и соавт. · CC BY 4.0'},
  {year:'2025', journal:'International Journal of Molecular Sciences', title:'Investigation of the Expression, Localization, and Acidosis-Associated Conformational Changes in Connexin 43 in Traumatic Brain Injury with the Development of a Neural Network Model for Assessing Systemic Inflammation', url:'https://doi.org/10.3390/ijms26188855', doi:'10.3390/ijms26188855', image:'ijms-8855-fig4.png', alt:'Микрофотографии мазков периферической крови и анализ клеточного состава', caption:'Рис. 4 · Нвосу и соавт. · CC BY 4.0'},
  {year:'2026', journal:'Molecules', title:'Mirror Effect of Parvalbumin and Connexin 43 Expression in the Acute and Subacute Phases After Penetrating Traumatic Brain Injury Reveals a Non-Canonical Interaction', url:'https://doi.org/10.3390/molecules31061018', doi:'10.3390/molecules31061018', image:'molecules-1018-fig8.png', alt:'Конфокальные изображения мозга с отмеченными регулярными и агрегированными точками Cx43', caption:'Рис. 8 · Кит и соавт. · CC BY 4.0'},
  {year:'2026', journal:'International Journal of Molecular Sciences', title:'Changes in Connexin-43 Expression and Neuropil Ultrastructure in the Cerebral Cortex of Bats During the Sleep–Wake Cycle', url:'https://doi.org/10.3390/ijms27209171', doi:'10.3390/ijms27209171', image:'ijms-9171-fig4.webp', alt:'Схема DINO-SwinL и микрофотографии с рамками детекции щелевых контактов Cx43', caption:'Рис. 4 · Родькин и соавт. · CC BY 4.0'},
  {year:'2024', journal:'Вопросы науки', title:'Автоматизация подсчета клеток на микрофотографиях с использованием методов компьютерного зрения', url:'https://www.elibrary.ru/item.asp?id=78114318', doi:'Статья в eLIBRARY'},
  {year:'2025', journal:'Молодой исследователь Дона', title:'От клеток к экосистемам: математика адаптации', url:'https://mid-journal.ru/upload/iblock/422/0x1ywu7ey7td5dwu4ue3z01i5740x1pl.pdf', doi:'Открыть статью', image:'mid-first-page.png', alt:'Первая страница статьи «От клеток к экосистемам: математика адаптации»', caption:'Первая страница · Набиуллина · CC BY'},
  {year:'2025', journal:'Естественные науки и медицина', title:'Изменения клеточного состава периферической крови при черепно-мозговой травме', url:'https://sibac.info/conf/medicine/64/386005', doi:'Открыть статью', image:'sibac-first-page.png', alt:'Первая страница статьи об изменении клеточного состава крови при ЧМТ', caption:'Первая страница · Нвосу, Набиуллина, Родькин'}
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
    const figure=document.createElement('figure'); figure.className='pub-figure';
    if(item.image){
      const image=document.createElement('img'); image.src=`./assets/publications/${item.image}`; image.alt=item.alt; image.loading='lazy'; image.decoding='async';
      const caption=document.createElement('figcaption'); caption.textContent=item.caption;
      if(item.caption.includes('CC BY')){const license=document.createElement('a');license.href='https://creativecommons.org/licenses/by/4.0/';license.target='_blank';license.rel='noopener noreferrer';license.textContent=' · лицензия';caption.append(license)}
      figure.append(image,caption);
    }else{
      const unavailable=document.createElement('div'); unavailable.className='pub-unavailable'; unavailable.textContent='Изображение статьи недоступно';
      const caption=document.createElement('figcaption'); caption.textContent='eLIBRARY · требуется оригинал статьи';
      figure.append(unavailable,caption);
    }
    const details=document.createElement('div'); details.className='pub-details';
    const meta=document.createElement('div'); meta.className='pub-meta'; meta.textContent=`${item.year} · ${item.journal}`;
    const title=document.createElement('h3'); title.textContent=item.title;
    const link=document.createElement('a'); link.href=item.url; link.target='_blank'; link.rel='noopener noreferrer'; link.textContent=item.doi+' ↗';
    details.append(meta,title,link); row.append(figure,details); return row;
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
