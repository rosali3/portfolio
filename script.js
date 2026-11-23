const publications = [
  {year:'2025', journal:'Frontiers in Bioscience', title:'3D Bioprinting of Cultivated Meat Followed by the Development of a Fine-Tuned YOLO Model for the Detection and Counting of Lipoblasts, Fibroblasts, and Myogenic Cells', url:'https://doi.org/10.31083/FBL36266', label:'DOI 10.31083/FBL36266', image:'fbl-fig11.jpg', alt:'Microscopy images of cell cultures with YOLO detection boxes', caption:'Figure 11 · Nabiullina et al. · CC BY 4.0'},
  {year:'2025', journal:'International Journal of Molecular Sciences', title:'The Role of Hydrogen Sulfide in the Localization and Structural–Functional Organization of p53 Following Traumatic Brain Injury: Development of a YOLO Model for Detection and Quantification of Apoptotic Nuclei', url:'https://doi.org/10.3390/ijms26115066', label:'DOI 10.3390/ijms26115066', image:'ijms-5066-fig8.png', alt:'Fluorescence microscopy and YOLO detection of normal and apoptotic nuclei', caption:'Figure 8 · Kirichenko et al. · CC BY 4.0'},
  {year:'2025', journal:'International Journal of Molecular Sciences', title:'Investigation of the Expression, Localization, and Acidosis-Associated Conformational Changes in Connexin 43 in Traumatic Brain Injury with the Development of a Neural Network Model for Assessing Systemic Inflammation', url:'https://doi.org/10.3390/ijms26188855', label:'DOI 10.3390/ijms26188855', image:'ijms-8855-fig4.png', alt:'Blood smear microscopy and leukocyte population analysis', caption:'Figure 4 · Nwosu et al. · CC BY 4.0'},
  {year:'2026', journal:'Molecules', title:'Mirror Effect of Parvalbumin and Connexin 43 Expression in the Acute and Subacute Phases After Penetrating Traumatic Brain Injury Reveals a Non-Canonical Interaction', url:'https://doi.org/10.3390/molecules31061018', label:'DOI 10.3390/molecules31061018', image:'molecules-1018-fig8.png', alt:'Confocal brain images showing regular and aggregated Cx43 puncta', caption:'Figure 8 · Kit et al. · CC BY 4.0'},
  {year:'2026', journal:'International Journal of Molecular Sciences', title:'Changes in Connexin-43 Expression and Neuropil Ultrastructure in the Cerebral Cortex of Bats During the Sleep–Wake Cycle', url:'https://doi.org/10.3390/ijms27209171', label:'DOI 10.3390/ijms27209171', image:'ijms-9171-fig4.webp', alt:'DINO-SwinL workflow and microscopy with bounding-box detections of Cx43 gap junctions', caption:'Figure 4 · Rodkin et al. · CC BY 4.0'},
  {year:'2024', journal:'Voprosy Nauki', title:'Automating Cell Counting in Microphotographs with Computer Vision Methods', url:'https://www.elibrary.ru/item.asp?id=78114318', label:'eLIBRARY record', image:'elibrary-cell-counter-figure2.png', alt:'Telegram bot showing cell microphotographs and segmentation results', caption:'Figure 2 · Nabiullina et al. · user-provided paper'},
  {year:'2025', journal:'Young Researcher of Don', title:'From Cells to Ecosystems: Mathematics of Adaptation', url:'https://mid-journal.ru/upload/iblock/422/0x1ywu7ey7td5dwu4ue3z01i5740x1pl.pdf', label:'Read the paper', image:'mid-first-page.png', alt:'First page of From Cells to Ecosystems: Mathematics of Adaptation', caption:'First page · Nabiullina · CC BY'},
  {year:'2025', journal:'Natural Sciences and Medicine', title:'Changes in the Cellular Composition of Peripheral Blood Following Traumatic Brain Injury', url:'https://sibac.info/conf/medicine/64/386005', label:'Read the paper', image:'sibac-first-page.png', alt:'First page of the paper on peripheral blood composition after traumatic brain injury', caption:'First page · Nwosu, Nabiullina and Rodkin'}
];
const rights = [
  ['2026660701','Neural-network messenger bot for automated cell culture counting','Apr 2026'],
  ['2025664628','Software for biological image and metadata preprocessing and inference post-processing','2025'],
  ['2024688638','Software for counting eukaryotic cells during in vitro cultivation','Nov 2024']
];
const list = document.getElementById('publication-list');
const viewport = document.getElementById('publication-viewport');
const prev = document.getElementById('publication-prev');
const next = document.getElementById('publication-next');
const count = document.getElementById('publication-count');
let publicationIndex = 0;
let trackPosition = 1;
let mode = 'ml';
function renderPublications(){
  list.replaceChildren(...publications.map(item=>{
    const row=document.createElement('article'); row.className='publication';
    const figure=document.createElement('figure'); figure.className='pub-figure';
    if(item.image){
      const image=document.createElement('img'); image.src=`./assets/publications/${item.image}`; image.alt=item.alt; image.loading='eager'; image.decoding='async';
      const caption=document.createElement('figcaption'); caption.textContent=item.caption;
      if(item.caption.includes('CC BY')){const license=document.createElement('a');license.href='https://creativecommons.org/licenses/by/4.0/';license.target='_blank';license.rel='noopener noreferrer';license.textContent=' · license';caption.append(license)}
      figure.append(image,caption);
    }
    const details=document.createElement('div'); details.className='pub-details';
    const meta=document.createElement('div'); meta.className='pub-meta'; meta.textContent=`${item.year} · ${item.journal}`;
    const title=document.createElement('h3'); title.textContent=item.title;
    const link=document.createElement('a'); link.href=item.url; link.target='_blank'; link.rel='noopener noreferrer'; link.textContent=item.label;
    details.append(meta,title,link); row.append(figure,details); return row;
  }));
  const first=list.firstElementChild.cloneNode(true);
  const last=list.lastElementChild.cloneNode(true);
  for(const clone of [first,last]){clone.classList.add('publication-clone');clone.setAttribute('aria-hidden','true');clone.inert=true}
  list.prepend(last);
  list.append(first);
  updateCarousel(true);
}
function updateCarousel(instant=false){
  const visual=document.body.dataset.layout==='visual';
  const slides=[...list.querySelectorAll('.publication:not(.publication-clone)')];
  list.style.transition=instant?'none':'';
  list.style.transform=visual?`translateX(-${trackPosition*100}%)`:'';
  slides.forEach((slide,index)=>{
    if(visual){slide.setAttribute('aria-hidden',String(index!==publicationIndex));slide.inert=index!==publicationIndex}
    else{slide.removeAttribute('aria-hidden');slide.inert=false}
  });
  count.textContent=`${publicationIndex+1} / ${slides.length}`;
  if(instant)requestAnimationFrame(()=>{list.style.transition=''});
}
function movePublication(direction){
  if(trackPosition===0)trackPosition=publications.length;
  if(trackPosition===publications.length+1)trackPosition=1;
  publicationIndex=(publicationIndex+direction+publications.length)%publications.length;
  trackPosition+=direction;
  updateCarousel();
}
function setMode(next){
  mode=next; document.body.dataset.mode=next;
  document.querySelectorAll('.mode').forEach(button=>{const active=button.dataset.mode===next;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active))});
  document.querySelectorAll('[data-copy]').forEach(element=>element.hidden=element.dataset.copy!==next);
  document.querySelectorAll('[data-mode-only]').forEach(element=>element.hidden=element.dataset.modeOnly!==next);
  try{localStorage.setItem('portfolio-mode',next)}catch{}
}
function setLayout(next){
  document.body.dataset.layout=next;
  publicationIndex=0;
  trackPosition=1;
  viewport.tabIndex=next==='visual'?0:-1;
  updateCarousel(true);
  document.querySelectorAll('.layout-button').forEach(button=>{const active=button.dataset.layout===next;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active))});
  try{localStorage.setItem('portfolio-layout',next)}catch{}
}
document.querySelectorAll('.mode').forEach(button=>button.addEventListener('click',()=>setMode(button.dataset.mode)));
document.querySelectorAll('.layout-button').forEach(button=>button.addEventListener('click',()=>setLayout(button.dataset.layout)));
prev.addEventListener('click',()=>movePublication(-1));
next.addEventListener('click',()=>movePublication(1));
list.addEventListener('transitionend',event=>{
  if(event.target!==list||event.propertyName!=='transform')return;
  if(trackPosition===0){trackPosition=publications.length;updateCarousel(true)}
  if(trackPosition===publications.length+1){trackPosition=1;updateCarousel(true)}
});
viewport.addEventListener('keydown',event=>{
  if(document.body.dataset.layout!=='visual')return;
  if(event.key==='ArrowRight'){event.preventDefault();next.click()}
  if(event.key==='ArrowLeft'){event.preventDefault();prev.click()}
});
let touchStart=0;
viewport.addEventListener('touchstart',event=>{touchStart=event.changedTouches[0].screenX},{passive:true});
viewport.addEventListener('touchend',event=>{
  if(document.body.dataset.layout!=='visual')return;
  const delta=event.changedTouches[0].screenX-touchStart;
  if(Math.abs(delta)>45)(delta<0?next:prev).click();
},{passive:true});
document.getElementById('rid-list').replaceChildren(...rights.map(([number,title,date])=>{const card=document.createElement('article');card.className='rid-card';const label=document.createElement('span');label.textContent=`No. ${number} · ${date}`;const heading=document.createElement('h3');heading.textContent=title;card.append(label,heading);return card}));
document.getElementById('year').textContent=new Date().getFullYear();
let savedMode='ml';let savedLayout='plain';try{savedMode=localStorage.getItem('portfolio-mode')||'ml';savedLayout=localStorage.getItem('portfolio-layout')||'plain'}catch{}
renderPublications();
setMode(savedMode==='research'?'research':'ml');setLayout(savedLayout==='visual'?'visual':'plain');
