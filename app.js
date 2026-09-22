const eras=[
  {tab:'Cosmos',kicker:'Avant l’histoire mortelle',title:'L’ordonnancement d’Azeroth',text:'Les Titans découvrent Azeroth, un monde abritant une âme-monde exceptionnelle. Leurs gardiens affrontent les Dieux très anciens et façonnent les structures qui stabilisent la planète.',facts:[['Acteurs','Titans · Gardiens'],['Menace','Dieux très anciens'],['Héritage','Forges titanesques']],img:'assets/azeroth-cosmique.png',alt:'Monde fantastique entouré de gardiens cosmiques'},
  {tab:'Kaldorei',kicker:'Il y a plus de 10 000 ans',title:'L’Empire et le Puits d’éternité',text:'La civilisation kaldorei s’élève autour du Puits d’éternité. L’usage démesuré de sa magie attire la Légion ardente et déclenche la Guerre des Anciens.',facts:[['Capitale','Zin-Azshari'],['Souveraine','Reine Azshara'],['Rupture','Grande Fracture']],img:'assets/azeroth-cosmique.png',alt:'Azeroth vue depuis le cosmos'},
  {tab:'Première Guerre',kicker:'An 0 du calendrier moderne',title:'L’ouverture de la Porte des ténèbres',text:'Manipulés par la Légion ardente, les clans orcs passent de Draenor à Azeroth. Hurlevent tombe : le conflit entre la Horde et l’Alliance commence.',facts:[['Passage','Porte des ténèbres'],['Envahisseurs','Clans orcs'],['Conséquence','Chute de Hurlevent']],img:'assets/azeroth-cosmique.png',alt:'Un monde traversé de lignes de puissance'},
  {tab:'Troisième Guerre',kicker:'La peste de Lordaeron',title:'La chute d’Arthas',text:'Le prince Arthas poursuit la peste de non-mort jusqu’en Norfendre. En saisissant Deuillegivre pour sauver son peuple, il perd son âme et devient l’instrument du Roi-liche.',facts:[['Départ','Stratholme'],['Arme','Deuillegivre'],['Point de non-retour','Norfendre']],img:'assets/citadelle-glace.png',alt:'Citadelle gelée dominant le Norfendre'},
  {tab:'Nouveau monde',kicker:'Après le mont Hyjal',title:'Horde et Alliance se reforment',text:'La Légion est repoussée au mont Hyjal, mais la paix ne dure pas. La nouvelle Horde s’établit en Kalimdor tandis que les survivants de l’Alliance reconstruisent leurs royaumes.',facts:[['Horde','Orgrimmar'],['Alliance','Hurlevent'],['Tension','Ressources et frontières']],img:'assets/azeroth-cosmique.png',alt:'Azeroth après les grands conflits'},
  {tab:'Norfendre',kicker:'La guerre contre le Fléau',title:'La fin du règne du Roi-liche',text:'Les armées d’Azeroth assiègent la Couronne de glace. Arthas est vaincu, mais le Fléau ne peut rester sans maître : Bolvar Fordragon accepte la couronne et devient son geôlier.',facts:[['Forteresse','Citadelle de la Couronne de glace'],['Champion','Tirion Fordring'],['Successeur','Bolvar Fordragon']],img:'assets/citadelle-glace.png',alt:'Forteresse sombre prise dans une tempête de glace'}
];

const figures=[
  {sigil:'A',name:'Arthas Menethil',role:'Prince de Lordaeron · Roi-liche',body:'Convaincu que toute limite morale pouvait être franchie pour sauver son royaume, Arthas devient précisément la menace qu’il combattait. Sa chute est une tragédie de l’obsession et du libre arbitre.',note:'Héritage : la destruction de Lordaeron et l’ascension du Fléau.'},
  {sigil:'T',name:'Thrall',role:'Chef de guerre · Chaman',body:'Né esclave, Thrall libère les orcs des camps, redonne à la Horde une identité qui ne repose plus sur le sang démoniaque et conduit son peuple vers Kalimdor.',note:'Héritage : une nouvelle Horde fondée sur la survie, l’honneur et des alliances fragiles.'},
  {sigil:'J',name:'Jaina Portvaillant',role:'Archimage · Dirigeante de Kul Tiras',body:'Idéaliste puis profondément marquée par Theramore, Jaina incarne le coût humain des guerres répétées entre factions. Son rapport à la paix évolue sans jamais devenir simple.',note:'Héritage : un pont difficile entre diplomatie, mémoire et puissance.'},
  {sigil:'S',name:'Sylvanas Coursevent',role:'Reine banshee · Réprouvée',body:'Tuée puis relevée par Arthas, Sylvanas construit sa liberté autour du refus de toute domination. Cette quête la conduit pourtant à imposer aux autres des choix aussi radicaux que ceux qu’elle a subis.',note:'Héritage : l’émancipation des Réprouvés, puis une fracture majeure au sein de la Horde.'}
];

const quiz=[
  {q:'Quel événement a attiré la Légion ardente sur Azeroth durant l’ère des Kaldorei ?',a:['La création d’Orgrimmar','L’usage du Puits d’éternité','L’ouverture de la Porte des ténèbres'],ok:1,why:'La magie du Puits, exploitée sans mesure par les Bien-nés, a permis à la Légion de repérer Azeroth et de préparer son invasion.'},
  {q:'Pourquoi Arthas se rend-il d’abord en Norfendre ?',a:['Poursuivre Mal’Ganis','Trouver les Titans','Négocier avec les dragons'],ok:0,why:'Arthas poursuit le nathrezim Mal’Ganis, qu’il tient pour responsable de la peste. Cette traque le mène jusqu’à Deuillegivre.'},
  {q:'Qui guide les orcs vers Kalimdor avant la Troisième Guerre ?',a:['Gul’dan','Thrall','Garrosh Hurlenfer'],ok:1,why:'Averti par Medivh, Thrall conduit la nouvelle Horde vers Kalimdor, où elle finira par participer à la bataille du mont Hyjal.'},
  {q:'Que provoque l’effondrement du Puits d’éternité ?',a:['La Grande Fracture','La naissance du Fléau','La destruction de Draenor'],ok:0,why:'L’implosion du Puits disloque l’ancien continent unique de Kalimdor : c’est la Grande Fracture.'},
  {q:'Qui porte la couronne après la défaite d’Arthas ?',a:['Tirion Fordring','Bolvar Fordragon','Darion Mograine'],ok:1,why:'Bolvar Fordragon devient le nouveau Roi-liche afin de contenir le Fléau, tandis que le monde le croit mort.'}
];

let era=0,qIndex=0,score=0,locked=false;
const controls=document.querySelector('.era-controls');
const stage=document.querySelector('.era-stage');

eras.forEach((item,index)=>{
  const button=document.createElement('button');
  button.textContent=item.tab;
  button.role='tab';
  button.onclick=()=>renderEra(index);
  controls.appendChild(button);
});

function renderEra(index){
  era=index;
  const item=eras[index];
  [...controls.children].forEach((button,buttonIndex)=>{
    button.classList.toggle('active',buttonIndex===index);
    button.setAttribute('aria-selected',buttonIndex===index);
  });
  stage.classList.remove('fade');
  void stage.offsetWidth;
  stage.classList.add('fade');
  stage.querySelector('.era-number').textContent=String(index+1).padStart(2,'0');
  const image=stage.querySelector('img');
  image.src=item.img;
  image.alt=item.alt;
  stage.querySelector('.era-kicker').textContent=item.kicker;
  stage.querySelector('h3').textContent=item.title;
  stage.querySelector('.era-text').textContent=item.text;
  stage.querySelector('.keyfacts').innerHTML=item.facts.map(fact=>`<div><strong>${fact[0]}</strong><span>${fact[1]}</span></div>`).join('');
}

stage.querySelector('.next-era').onclick=()=>renderEra((era+1)%eras.length);
renderEra(0);

const cardWrap=document.querySelector('.cards');
const dialog=document.querySelector('#lore-dialog');
figures.forEach(figure=>{
  const button=document.createElement('button');
  button.className='card';
  button.innerHTML=`<span class="sigil">${figure.sigil}</span><h3>${figure.name}</h3><p>${figure.role}</p><span class="open">Lire le destin →</span>`;
  button.onclick=()=>{
    dialog.querySelector('h2').textContent=figure.name;
    dialog.querySelector('.modal-role').textContent=figure.role;
    dialog.querySelector('.modal-body').textContent=figure.body;
    dialog.querySelector('.modal-note').textContent=figure.note;
    dialog.showModal();
  };
  cardWrap.appendChild(button);
});
dialog.querySelector('.close').onclick=()=>dialog.close();
dialog.onclick=event=>{if(event.target===dialog)dialog.close();};

const qbox=document.querySelector('.question');
const next=document.querySelector('.quiz-next');
function renderQ(){
  locked=false;
  const item=quiz[qIndex];
  qbox.querySelector('.count').textContent=`Question ${qIndex+1} sur ${quiz.length}`;
  qbox.querySelector('h3').textContent=item.q;
  qbox.querySelector('.feedback').textContent='';
  next.classList.remove('show');
  const answers=qbox.querySelector('.answers');
  answers.innerHTML='';
  item.a.forEach((label,index)=>{
    const button=document.createElement('button');
    button.className='answer';
    button.textContent=label;
    button.onclick=()=>answer(index);
    answers.appendChild(button);
  });
  document.querySelector('.progress i').style.width=`${qIndex/quiz.length*100}%`;
}
function answer(index){
  if(locked)return;
  locked=true;
  const item=quiz[qIndex];
  const buttons=[...qbox.querySelectorAll('.answer')];
  buttons.forEach((button,buttonIndex)=>{
    button.disabled=true;
    if(buttonIndex===item.ok)button.classList.add('correct');
  });
  if(index===item.ok){score++;document.querySelector('#score').textContent=score;}
  else buttons[index].classList.add('wrong');
  qbox.querySelector('.feedback').textContent=(index===item.ok?'Juste. ':'Pas tout à fait. ')+item.why;
  next.textContent=qIndex===quiz.length-1?'Voir mon résultat':'Question suivante';
  next.classList.add('show');
  document.querySelector('.progress i').style.width=`${(qIndex+1)/quiz.length*100}%`;
}
function advanceQuiz(){
  if(qIndex<quiz.length-1){qIndex++;renderQ();return;}
  qbox.querySelector('.count').textContent='Chronique terminée';
  qbox.querySelector('h3').textContent=score>=4?'Vous connaissez les grandes lignes d’Azeroth.':score>=2?'Vos archives méritent encore quelques lectures.':'Les chroniques ne demandent qu’à être rouvertes.';
  qbox.querySelector('.answers').innerHTML='';
  qbox.querySelector('.feedback').textContent=`Résultat final : ${score}/5.`;
  next.textContent='Recommencer';
  next.onclick=()=>{
    qIndex=0;score=0;document.querySelector('#score').textContent=0;
    next.onclick=advanceQuiz;
    renderQ();
  };
}
next.onclick=advanceQuiz;
renderQ();

document.querySelectorAll('[data-go]').forEach(button=>button.onclick=()=>document.querySelector('#'+button.dataset.go).scrollIntoView({behavior:'smooth'}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){document.querySelectorAll('nav button').forEach(button=>button.classList.toggle('active',button.dataset.go===entry.target.id));}
}),{rootMargin:'-35% 0px -55%'});
['chronologie','figures','quiz'].forEach(id=>observer.observe(document.getElementById(id)));
