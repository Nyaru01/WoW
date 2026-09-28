const categories={
  quetes:{label:'Quêtes & navigation',short:'Quêtes',color:'#67c5dd'},
  donjons:{label:'Donjons & butin',short:'Donjons',color:'#d9ad54'},
  combat:{label:'Combat & raid',short:'Combat',color:'#e06c5f'},
  interface:{label:'Interface & lisibilité',short:'Interface',color:'#a58bdd'},
  confort:{label:'Confort & économie',short:'Confort',color:'#69bc8b'},
  support:{label:'Diagnostic & dépannage',short:'Diagnostic',color:'#d89152'}
};

const addons=[
  ['Forever PTR World Map','quetes','Une carte du monde adaptée au serveur WoW: Forever.','15,3 k','Lili','forever-ptr-server-world-map'],
  ['Questie','quetes','Les quêtes disponibles et leurs objectifs directement sur la carte.','Communauté','Gô','questie'],
  ['QuestTogether','quetes','Un suivi de quêtes plus simple lorsque vous jouez en groupe.','25,4 k','Apogée','questtogether'],
  ['Azeroth Pilot Reloaded','quetes','Des itinéraires rapides et des étapes précises pour le leveling.','3,6 M','Lili','azeroth-pilot-reloaded'],
  ['RestedXP Guide','quetes','Des guides de montée en niveau intégrés, étape par étape.','26,2 M','Lili','restedxp-guide'],
  ['TomTom','quetes','Coordonnées, points de passage et flèche directionnelle.','89,8 M','Lili','tomtom'],
  ['GuildMap','quetes','La position des membres de la guilde sur votre carte.','196,1 k','Lili','guildmap'],
  ['DungeonJournal','donjons','Quêtes, emplacements et butins des boss pour chaque donjon.','1,8 k','Apogée','dungeonjournal'],
  ['Atlas','donjons','Le navigateur classique de cartes d’instances.','22 M','Lili','atlas'],
  ['Attune','donjons','La progression de vos accès et harmonisations.','12,3 M','Lili','attune'],
  ['Nova Instance Tracker','donjons','Verrouillages, temps d’instance, or et XP reposée des rerolls.','18,5 M','Lili','nova-instance-tracker'],
  ['Lootified','donjons','Journal de butin et assistant Best in Slot pour WoW: Forever.','188','Apogée','lootified'],
  ['Forever Dungeon Scout','donjons','Un guide de donjons léger conçu pour WoW: Forever.','1,5 k','Apogée','forever-dungeon-scout'],
  ['Cooldown Manager Centered','combat','Personnalisez icônes, améliorations et barres de recharge.','6,7 M','Lili','cooldown-manager-centered'],
  ['MiniAuras','combat','Contrôles, défensifs et notifications de sorts importants.','5,9 M','Lili','minicc'],
  ['NKThreat','combat','Menace, TPS en temps réel et alertes de provocation.','35,4 k','Lili','nkthreat'],
  ['WhoDoesWhat','combat','Assignations de raid et bénédictions de paladins.','716','Lili','whodoeswhat'],
  ['BlizzMove','interface','Déplacez les fenêtres Blizzard par simple glisser-déposer.','11,9 M','Lili','blizzmove'],
  ['DarkMode','interface','Une interface et des fenêtres plus sombres.','3,5 M','Lili','darkmode'],
  ['FontMagic','interface','Polices et tailles personnalisées pour les textes de combat.','293,7 k','Lili','fontmagic'],
  ['Plumber','interface','Butin, difficulté d’instance et nombreuses améliorations UI.','19,2 M','Lili','plumber'],
  ['WilduTools','interface','Améliorations Blizzard et automatisation des tâches courantes.','1,3 M','Lili','wildutools'],
  ['Auctionator','confort','Un hôtel des ventes simple et un meilleur suivi des prix.','201,8 M','Lili','auctionator'],
  ['Better Fishing','confort','Pêche au raccourci de ciblage et au double-clic.','5,7 M','Lili','better-fishing'],
  ['Speedy AutoLoot','confort','La récupération automatique du butin à grande vitesse.','11,2 M','Lili','speedyautoloot'],
  ['WIM v3','confort','Les chuchotements dans de vraies fenêtres de messagerie.','22,8 M','Lili','wim-3'],
  ['BugGrabber','support','Capture les erreurs Lua sans interrompre votre partie.','18,6 M','Lili','bug-grabber'],
  ['BugSack','support','Centralise les erreurs dans un journal facile à consulter.','16,4 M','Lili','bugsack']
].map(([name,category,description,downloads,author,slug])=>({name,category,description,downloads,author,url:`https://www.curseforge.com/wow/addons/${slug}`}));

const tips=[
  {number:'01',category:'Installation',title:'Construire un pack propre',summary:'Partir sur une base stable',intro:'Ajoutez les outils progressivement pour identifier immédiatement un conflit ou une baisse de performances.',facts:['5 min','Avant connexion','BugSack'],steps:['Base — Installez d’abord BugGrabber et BugSack pour rendre les erreurs visibles.','Par lots — Ajoutez les addons par famille, puis rechargez l’interface entre chaque lot.','Tri — Conservez uniquement les fonctions réellement utiles à votre façon de jouer.'],note:'Avant une grosse mise à jour, sauvegardez toujours les dossiers Interface et WTF.',image:'https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt50839e89a98e4d22/6aa09f512437ed84d9d48846/System_Revamps.jpg'},
  {number:'02',category:'Butin',title:'Préparer sa liste de butin',summary:'Cibler les bons donjons',intro:'Un objectif de butin clair évite de parcourir des instances qui ne feront pas progresser votre personnage.',facts:['10 min','Avant instance','Lootified'],steps:['Cibles — Repérez trois améliorations prioritaires dans Lootified.','Sources — Croisez chaque objet avec DungeonJournal ou Forever Dungeon Scout.','Route — Placez l’entrée avec TomTom et contrôlez vos verrouillages avant le départ.'],note:'Une liste BiS reste un guide : adaptez-la à votre spécialisation, votre groupe et vos statistiques.',image:'https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt4865ad3281f25cb8/6aa09df51deff31ac7439163/Explore_Untold_Stories.jpg'},
  {number:'03',category:'Progression',title:'Quêter sans perdre le nord',summary:'Une route claire et flexible',intro:'Combinez la visibilité des objectifs avec un guide d’itinéraire, sans transformer l’aventure en pilote automatique.',facts:['3 min','Monde ouvert','Questie'],steps:['Carte — Affichez seulement les objectifs de votre zone avec Questie.','Cap — Choisissez un seul guide principal entre APR et RestedXP.','Liberté — Réservez TomTom aux coordonnées partagées et aux détours décidés par le groupe.'],note:'Désactivez les étapes automatiques lorsque vous souhaitez lire une suite de quêtes ou explorer librement.',image:'https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt7a58f20dd8f6b2d9/6aa09f1c7ec8fef91000059e/Take_Unknown_Paths.jpg'},
  {number:'04',category:'Instances',title:'Maîtriser ses verrouillages',summary:'Éviter les entrées inutiles',intro:'Le suivi des instances devient indispensable quand plusieurs personnages ou groupes tournent dans la même journée.',facts:['2 min','Avant départ','Nova Tracker'],steps:['Historique — Consultez Nova Instance Tracker avant de repartir.','Limites — Vérifiez le nombre d’entrées récentes et le mode prévu.','Journal — Notez l’objet ciblé et la durée réelle de la session pour comparer vos routes.'],note:'Le suivi dépend de votre historique local : sauvegardez les données de l’addon avant de les réinitialiser.',image:'https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt848d2f0dbc2d2d1e/6aa09dd67ec8fedf4f00059c/Every_Journey_Matters.jpg'},
  {number:'05',category:'Combat',title:'Lire sa menace',summary:'Frapper fort sans reprendre',intro:'Une bonne lecture de la menace protège le groupe et permet d’utiliser ses temps de recharge au bon moment.',facts:['4 min','Donjon & raid','NKThreat'],steps:['Placement — Gardez votre barre de menace dans l’axe entre personnage et cible.','Marge — Attendez une avance nette du tank avant un burst ou une ouverture agressive.','Signal — Rendez les provocations visibles, mais coupez les alertes qui ne changent aucune décision.'],note:'Un compteur informe ; il ne remplace ni la communication ni l’adaptation au rythme du tank.',image:'https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt2dc686732f526be5/6aa09db81deff3540b439161/Claim_New_Power.jpg'},
  {number:'06',category:'Dépannage',title:'Traquer une erreur Lua',summary:'Trouver le coupable rapidement',intro:'Quand une erreur apparaît, isolez sa source méthodiquement plutôt que de désactiver toute votre interface.',facts:['5 min','Après erreur','BugSack'],steps:['Indice — Ouvrez BugSack et relevez le premier addon cité dans la pile.','Isolation — Mettez-le à jour, puis testez-le seul avec ses dépendances.','Décision — Si l’erreur reste, désactivez-le et conservez le message complet pour le diagnostic.'],note:'Un journal peut contenir des chemins locaux : relisez-le toujours avant de le transmettre.',image:'https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt491397daad992c6d/6aa09e0ec751e10dc30c50e0/Soak_in_Breathtaking_Expanses.jpg'},
  {number:'07',category:'Groupe',title:'Partir sans perdre dix minutes',summary:'Le contrôle avant invocation',intro:'Une vérification commune de deux minutes évite les retours en ville, les attentes et les mauvaises surprises au premier boss.',facts:['2 min','Avant groupe','Checklist'],steps:['Rôles — Confirmez tank, soins, interruptions et contrôle avant le déplacement.','Sacs — Réparez, videz quelques emplacements et prenez composants, eau et projectiles.','Rendez-vous — Partagez une seule destination TomTom et annoncez immédiatement tout retard.'],note:'Le meilleur gain de temps reste une information claire donnée avant que tout le monde ne se mette en route.',image:'https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt848d2f0dbc2d2d1e/6aa09dd67ec8fedf4f00059c/Every_Journey_Matters.jpg'},
  {number:'08',category:'Lisibilité',title:'Garder un écran qui respire',summary:'Voir le jeu, pas ses cadres',intro:'Une bonne interface rapproche les informations décisives du centre sans masquer le monde ni répéter la même donnée.',facts:['8 min','Réglage unique','BlizzMove'],steps:['Centre — Conservez près du personnage la cible, la menace et les temps de recharge réellement décisifs.','Bords — Repoussez sacs, quêtes secondaires, chat et informations hors combat.','Épreuve — Testez en donjon, puis retirez tout élément que vous n’avez pas consulté pendant la session.'],note:'Commencez par déplacer les cadres Blizzard avant d’empiler des remplacements plus lourds.',image:'https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt50839e89a98e4d22/6aa09f512437ed84d9d48846/System_Revamps.jpg'}
];

const grid=document.querySelector('.addon-grid');
const search=document.querySelector('#addon-search');
const count=document.querySelector('#addon-count');
const empty=document.querySelector('.empty-state');
const pagination=document.querySelector('.catalogue-pagination');
const pageNumbers=document.querySelector('.page-numbers');
const pageStatus=document.querySelector('.page-status');
const previousPage=document.querySelector('.page-prev');
const nextPage=document.querySelector('.page-next');
let activeFilter='all';
let currentPage=1;
const pageSize=8;
const normalizeSearch=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('fr');
function readPreference(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback;}catch{return fallback;}}
function savePreference(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true;}catch{return false;}}
const savedFavorites=readPreference('renaissance-favorites',[]);
const favorites=new Set(Array.isArray(savedFavorites)?savedFavorites.filter(url=>addons.some(addon=>addon.url===url)):[]);
let favoritesOnly=false;
const favoritesFilter=document.querySelector('#favorites-filter');
const catalogueStatus=document.querySelector('#catalogue-status');
const initialView=readPreference('renaissance-view','cards');
function setView(view){
  grid.classList.toggle('list-view',view==='list');
  document.querySelectorAll('[data-view]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.view===view)));
}
setView(initialView==='list'?'list':'cards');
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{setView(button.dataset.view);savePreference('renaissance-view',button.dataset.view);}));
favoritesFilter.addEventListener('click',()=>{favoritesOnly=!favoritesOnly;currentPage=1;renderAddons();});
grid.addEventListener('click',event=>{
  const button=event.target.closest('[data-favorite]');
  if(!button)return;
  const url=button.dataset.favorite;
  const adding=!favorites.has(url);
  adding?favorites.add(url):favorites.delete(url);
  const persisted=savePreference('renaissance-favorites',[...favorites]);
  renderAddons();
  catalogueStatus.textContent=`${adding?'Ajouté aux favoris.':'Retiré des favoris.'}${persisted?'':' Conservation indisponible : favoris limités à cette visite.'}`;
  const replacement=[...grid.querySelectorAll('[data-favorite]')].find(candidate=>candidate.dataset.favorite===url);
  (replacement||favoritesFilter).focus({preventScroll:true});
});
document.querySelector('#reset-catalogue').addEventListener('click',()=>{
  search.value='';favoritesOnly=false;document.querySelector('[data-addon-filter="all"]').click();search.focus();
});

function renderAddons(){
  const query=normalizeSearch(search.value.trim());
  const matches=addons.filter(addon=>{
    const inCategory=activeFilter==='all'||addon.category===activeFilter;
    const haystack=normalizeSearch(`${addon.name} ${addon.description} ${categories[addon.category].label}`);
    return inCategory&&(!favoritesOnly||favorites.has(addon.url))&&(!query||haystack.includes(query));
  });
  const totalPages=Math.max(1,Math.ceil(matches.length/pageSize));
  currentPage=Math.min(currentPage,totalPages);
  const first=(currentPage-1)*pageSize;
  const pageItems=matches.slice(first,first+pageSize);
  grid.innerHTML=pageItems.map((addon,index)=>`<article class="addon-card" style="--accent:${categories[addon.category].color};--delay:${Math.min(index,8)*45}ms">
    <div class="addon-top"><span class="addon-category">${categories[addon.category].label}</span><button class="favorite-button" data-favorite="${addon.url}" aria-pressed="${favorites.has(addon.url)}" aria-label="${favorites.has(addon.url)?'Retirer':'Ajouter'} ${addon.name} ${favorites.has(addon.url)?'des':'aux'} favoris">${favorites.has(addon.url)?'★':'☆'}</button></div>
    <h3>${addon.name}</h3><p>${addon.description}</p>
    <div class="addon-meta"><span><b>↓ ${addon.downloads}</b> · par ${addon.author}</span><a href="${addon.url}" target="_blank" rel="noopener" aria-label="Voir ${addon.name} sur CurseForge">Installer ↗</a></div>
  </article>`).join('');
  count.textContent=matches.length;
  document.querySelector('#favorites-count').textContent=favorites.size;
  favoritesFilter.setAttribute('aria-pressed',String(favoritesOnly));
  catalogueStatus.textContent=`${matches.length} addon${matches.length===1?'':'s'} trouvé${matches.length===1?'':'s'}.`;
  empty.querySelector('h3').textContent=favoritesOnly&&favorites.size===0?'Votre sac est encore vide':'Aucun résultat';
  empty.querySelector('p').textContent=favoritesOnly&&favorites.size===0?'Ajoutez vos addons préférés avec l’étoile sur chaque fiche.':'Essayez un autre mot-clé ou réinitialisez les filtres.';
  empty.hidden=matches.length>0;
  pagination.hidden=matches.length===0;
  previousPage.disabled=currentPage===1;
  nextPage.disabled=currentPage===totalPages;
  pageStatus.textContent=`Page ${currentPage} sur ${totalPages}`;
  pageNumbers.innerHTML=Array.from({length:totalPages},(_,index)=>`<button class="${index+1===currentPage?'active':''}" data-page="${index+1}" aria-label="Page ${index+1}" ${index+1===currentPage?'aria-current="page"':''}>${String(index+1).padStart(2,'0')}</button>`).join('');
  pageNumbers.querySelectorAll('[data-page]').forEach(button=>button.addEventListener('click',()=>changePage(Number(button.dataset.page))));
}

function changePage(page){
  currentPage=page;
  renderAddons();
  document.querySelector('.catalogue-tools').scrollIntoView({behavior:'smooth',block:'start'});
}
previousPage.addEventListener('click',()=>changePage(currentPage-1));
nextPage.addEventListener('click',()=>changePage(currentPage+1));

document.querySelectorAll('[data-addon-filter]').forEach(button=>button.addEventListener('click',()=>{
  activeFilter=button.dataset.addonFilter;
  currentPage=1;
  document.querySelectorAll('[data-addon-filter]').forEach(candidate=>{
    candidate.classList.toggle('active',candidate===button);
    candidate.setAttribute('aria-pressed',String(candidate===button));
  });
  renderAddons();
}));
search.addEventListener('input',()=>{currentPage=1;renderAddons();});
document.querySelectorAll('[data-addon-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.addonFilter===activeFilter)));
document.addEventListener('keydown',event=>{
  if(event.key!=='/'||event.ctrlKey||event.metaKey||event.altKey||event.target.closest('input,textarea,select,[contenteditable]')) return;
  event.preventDefault();
  if(document.querySelector('#addons').hidden){location.hash='addons';showSection();}
  search.focus();
});
renderAddons();

document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
  const initial=button.textContent;
  try{
    let copied=false;
    if(navigator.clipboard&&window.isSecureContext){
      try{await navigator.clipboard.writeText(button.dataset.copy);copied=true;}catch{}
    }
    if(!copied){
      const field=document.createElement('textarea');
      field.value=button.dataset.copy;
      field.style.position='fixed';
      field.style.opacity='0';
      document.body.appendChild(field);
      field.select();
      if(!document.execCommand('copy')) throw new Error('copy unavailable');
      field.remove();
      copied=true;
    }
    button.textContent='Copié !';
    button.classList.add('copied');
  }catch{
    button.textContent='Copie impossible';
  }
  setTimeout(()=>{button.textContent=initial;button.classList.remove('copied');},1600);
}));

const tabList=document.querySelector('.guide-tabs');
const guide=document.querySelector('.guide-card');
tips.forEach((tip,index)=>{
  const button=document.createElement('button');
  button.className='guide-tab';
  button.role='tab';
  button.id=`guide-tab-${index}`;
  button.setAttribute('aria-controls','guide-panel');
  button.innerHTML=`<span>${tip.number}</span><div><strong>${tip.category}</strong><small>${tip.summary}</small></div><b>→</b>`;
  button.addEventListener('click',()=>renderTip(index));
  tabList.appendChild(button);
});

function renderTip(index){
  const tip=tips[index];
  guide.setAttribute('aria-labelledby',`guide-tab-${index}`);
  [...tabList.children].forEach((button,buttonIndex)=>{const selected=buttonIndex===index;button.classList.toggle('active',selected);button.setAttribute('aria-selected',selected);button.tabIndex=selected?0:-1;});
  guide.classList.remove('guide-switch');
  void guide.offsetWidth;
  guide.classList.add('guide-switch');
  guide.style.setProperty('--guide-image',`url('${tip.image}')`);
  guide.querySelector('.guide-category').textContent=tip.category;
  guide.querySelector('.guide-index').textContent=tip.number;
  guide.querySelector('.guide-kicker').textContent=`Guide ${tip.number} · ${tip.summary}`;
  guide.querySelector('h3').textContent=tip.title;
  guide.querySelector('.guide-intro').textContent=tip.intro;
  guide.querySelector('.guide-facts').innerHTML=tip.facts.map((fact,factIndex)=>`<span><small>${['Temps','Moment','Repère'][factIndex]}</small><b>${fact}</b></span>`).join('');
  guide.querySelector('.guide-steps').innerHTML=tip.steps.map(step=>`<li>${step}</li>`).join('');
  guide.querySelector('.guide-note span').textContent=tip.note;
}
renderTip(0);

addEventListener('load',()=>{
  if(!location.hash) return;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    const target=document.getElementById(location.hash.slice(1));
    if(!target) return;
    document.documentElement.style.scrollBehavior='auto';
    target.scrollIntoView({block:'start'});
    requestAnimationFrame(()=>document.documentElement.style.removeProperty('scroll-behavior'));
  }));
});

tabList.addEventListener('keydown',event=>{
  if(!['ArrowDown','ArrowUp','ArrowRight','ArrowLeft'].includes(event.key)) return;
  event.preventDefault();
  const current=[...tabList.children].findIndex(button=>button.classList.contains('active'));
  const direction=['ArrowDown','ArrowRight'].includes(event.key)?1:-1;
  const next=(current+direction+tips.length)%tips.length;
  renderTip(next);
  tabList.children[next].focus();
});

const progress=document.querySelector('.scroll-progress i');
const topbar=document.querySelector('.topbar');
addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max?scrollY/max*100:0}%`;topbar.classList.toggle('scrolled',scrollY>30);},{passive:true});

// Each chapter has its own short view; anchors and browser history remain usable.
const chapters=[...document.querySelectorAll('main > section[id]')];
document.querySelectorAll('.command-group').forEach((group,index)=>{
  const details=document.createElement('details');
  const summary=document.createElement('summary');
  const header=group.querySelector('header');
  const total=group.querySelectorAll('.command-card').length;
  summary.innerHTML=`<span>${header.querySelector('h3').textContent}</span><small>${total} réglage${total>1?'s':''}</small>`;
  details.open=index===0;
  details.append(summary,group.querySelector('.command-list'));
  header.remove();group.append(details);
});
function showSection(){
  const target=document.getElementById(location.hash.slice(1));
  const chapter=target?.closest('main > section[id]');
  const home=!chapter;
  document.querySelector('.hero').hidden=!home;
  document.querySelector('.essentials').hidden=!home;
  chapters.forEach(section=>section.hidden=home?section.id!=='addons':section!==chapter);
  document.body.classList.toggle('chapter-view',!home);
  document.querySelectorAll('.topbar nav a').forEach(link=>{
    if(link.hash===(home?'#top':`#${chapter.id}`))link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  });
  if(target?.classList.contains('command-group'))target.querySelector('details').open=true;
}
showSection();
addEventListener('hashchange',()=>{
  showSection();
  const target=document.getElementById(location.hash.slice(1))||document.querySelector('main');
  target.scrollIntoView({block:'start',behavior:'instant'});
  const heading=target.querySelector('h1,h2,summary');
  if(heading){if(heading.tagName!=='SUMMARY')heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});}
});
