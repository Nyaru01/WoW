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
  {number:'01',category:'Installation',title:'Construire un pack propre',summary:'Partir sur une base stable',intro:'Ajoutez les outils progressivement pour identifier immédiatement un conflit ou une baisse de performances.',steps:['Installez d’abord BugGrabber et BugSack pour rendre les erreurs visibles.','Ajoutez les addons par famille, puis rechargez l’interface entre chaque lot.','Conservez uniquement les fonctions réellement utiles à votre façon de jouer.'],note:'Avant une grosse mise à jour, sauvegardez toujours les dossiers Interface et WTF.',image:'https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt50839e89a98e4d22/6aa09f512437ed84d9d48846/System_Revamps.jpg'},
  {number:'02',category:'Butin',title:'Préparer sa liste de butin',summary:'Cibler les bons donjons',intro:'Un objectif de butin clair évite de parcourir des instances qui ne feront pas progresser votre personnage.',steps:['Repérez vos améliorations dans Lootified et ajoutez-les à la liste de souhaits.','Croisez leur source avec DungeonJournal ou Forever Dungeon Scout.','Placez un point TomTom vers l’entrée et surveillez vos verrouillages avec Nova Instance Tracker.'],note:'Une liste BiS reste un guide : adaptez-la à votre spécialisation, votre groupe et vos statistiques.',image:'https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt4865ad3281f25cb8/6aa09df51deff31ac7439163/Explore_Untold_Stories.jpg'},
  {number:'03',category:'Progression',title:'Quêter sans perdre le nord',summary:'Une route claire et flexible',intro:'Combinez la visibilité des objectifs avec un guide d’itinéraire, sans transformer l’aventure en pilote automatique.',steps:['Utilisez Questie pour visualiser les objectifs disponibles.','Choisissez Azeroth Pilot Reloaded ou RestedXP comme guide principal.','Gardez TomTom pour les coordonnées partagées par le groupe ou la guilde.'],note:'Désactivez les étapes automatiques lorsque vous souhaitez lire une suite de quêtes ou explorer librement.',image:'https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt7a58f20dd8f6b2d9/6aa09f1c7ec8fef91000059e/Take_Unknown_Paths.jpg'},
  {number:'04',category:'Instances',title:'Maîtriser ses verrouillages',summary:'Éviter les entrées inutiles',intro:'Le suivi des instances devient indispensable quand plusieurs personnages ou groupes tournent dans la même journée.',steps:['Consultez Nova Instance Tracker avant de repartir vers une instance.','Vérifiez le nombre d’entrées récentes et la difficulté prévue.','Notez les objets ciblés et le temps moyen de chaque session.'],note:'Le suivi dépend de votre historique local : sauvegardez les données de l’addon avant de les réinitialiser.',image:'https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt848d2f0dbc2d2d1e/6aa09dd67ec8fedf4f00059c/Every_Journey_Matters.jpg'},
  {number:'05',category:'Combat',title:'Lire sa menace',summary:'Frapper fort sans reprendre',intro:'Une bonne lecture de la menace protège le groupe et permet d’utiliser ses temps de recharge au bon moment.',steps:['Placez la barre personnelle NKThreat près de votre point de focalisation.','Surveillez la marge avec le tank avant un burst ou une ouverture agressive.','Gardez les alertes de provocation visibles sans surcharger le centre de l’écran.'],note:'Un compteur informe ; il ne remplace ni la communication ni l’adaptation au rythme du tank.',image:'https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt2dc686732f526be5/6aa09db81deff3540b439161/Claim_New_Power.jpg'},
  {number:'06',category:'Dépannage',title:'Traquer une erreur Lua',summary:'Trouver le coupable rapidement',intro:'Quand une erreur apparaît, isolez sa source méthodiquement plutôt que de désactiver toute votre interface.',steps:['Ouvrez BugSack et relevez le premier addon cité dans la pile d’erreur.','Mettez cet addon à jour, puis testez-le seul avec ses dépendances.','Si l’erreur persiste, désactivez-le et transmettez le message complet à son auteur.'],note:'Vérifiez qu’un journal ne contient aucun nom de compte, chemin local ou donnée personnelle avant de le partager.',image:'https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt491397daad992c6d/6aa09e0ec751e10dc30c50e0/Soak_in_Breathtaking_Expanses.jpg'}
];

const grid=document.querySelector('.addon-grid');
const search=document.querySelector('#addon-search');
const count=document.querySelector('#addon-count');
const empty=document.querySelector('.empty-state');
let activeFilter='all';

const initials=name=>name.split(/\s+/).map(word=>word[0]).join('').slice(0,2).toUpperCase();

function renderAddons(){
  const query=search.value.trim().toLocaleLowerCase('fr');
  const matches=addons.filter(addon=>{
    const inCategory=activeFilter==='all'||addon.category===activeFilter;
    const haystack=`${addon.name} ${addon.description} ${categories[addon.category].label}`.toLocaleLowerCase('fr');
    return inCategory&&(!query||haystack.includes(query));
  });
  grid.innerHTML=matches.map((addon,index)=>`<article class="addon-card" style="--accent:${categories[addon.category].color};--delay:${Math.min(index,8)*35}ms">
    <div class="addon-top"><span class="addon-icon">${initials(addon.name)}</span><span class="addon-category">${categories[addon.category].short}</span></div>
    <h3>${addon.name}</h3><p>${addon.description}</p>
    <div class="addon-meta"><span><b>↓ ${addon.downloads}</b> · par ${addon.author}</span><a href="${addon.url}" target="_blank" rel="noopener" aria-label="Voir ${addon.name} sur CurseForge">Installer ↗</a></div>
  </article>`).join('');
  count.textContent=matches.length;
  empty.hidden=matches.length>0;
}

document.querySelectorAll('[data-addon-filter]').forEach(button=>button.addEventListener('click',()=>{
  activeFilter=button.dataset.addonFilter;
  document.querySelectorAll('[data-addon-filter]').forEach(candidate=>candidate.classList.toggle('active',candidate===button));
  renderAddons();
}));
search.addEventListener('input',renderAddons);
document.addEventListener('keydown',event=>{if(event.key==='/'&&document.activeElement!==search){event.preventDefault();search.focus();}});
renderAddons();

const tabList=document.querySelector('.guide-tabs');
const guide=document.querySelector('.guide-card');
tips.forEach((tip,index)=>{
  const button=document.createElement('button');
  button.className='guide-tab';
  button.role='tab';
  button.innerHTML=`<span>${tip.number}</span><div><strong>${tip.category}</strong><small>${tip.summary}</small></div><b>→</b>`;
  button.addEventListener('click',()=>renderTip(index));
  tabList.appendChild(button);
});

function renderTip(index){
  const tip=tips[index];
  [...tabList.children].forEach((button,buttonIndex)=>{const selected=buttonIndex===index;button.classList.toggle('active',selected);button.setAttribute('aria-selected',selected);button.tabIndex=selected?0:-1;});
  guide.style.setProperty('--guide-image',`url('${tip.image}')`);
  guide.querySelector('.guide-category').textContent=tip.category;
  guide.querySelector('.guide-index').textContent=tip.number;
  guide.querySelector('.guide-kicker').textContent=`Guide ${tip.number} · ${tip.summary}`;
  guide.querySelector('h3').textContent=tip.title;
  guide.querySelector('.guide-intro').textContent=tip.intro;
  guide.querySelector('.guide-steps').innerHTML=tip.steps.map(step=>`<li>${step}</li>`).join('');
  guide.querySelector('.guide-note span').textContent=tip.note;
}
renderTip(0);

const progress=document.querySelector('.scroll-progress i');
addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max?scrollY/max*100:0}%`;},{passive:true});
