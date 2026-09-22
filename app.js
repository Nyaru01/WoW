const eras=[
  {tab:'Cosmos',kicker:'Avant l’histoire mortelle',title:'L’ordonnancement d’Azeroth',text:'Les Titans découvrent Azeroth, un monde abritant une âme-monde exceptionnelle. Leurs gardiens affrontent les Dieux très anciens et façonnent les structures qui stabilisent la planète.',facts:[['Acteurs','Titans · Gardiens'],['Menace','Dieux très anciens'],['Héritage','Forges titanesques']],img:'assets/azeroth-cosmique.png',alt:'Monde fantastique entouré de gardiens cosmiques'},
  {tab:'Kaldorei',kicker:'Il y a plus de 10 000 ans',title:'L’Empire et le Puits d’éternité',text:'La civilisation kaldorei s’élève autour du Puits d’éternité. L’usage démesuré de sa magie attire la Légion ardente et déclenche la Guerre des Anciens.',facts:[['Capitale','Zin-Azshari'],['Souveraine','Reine Azshara'],['Rupture','Grande Fracture']],img:'assets/kaldorei-puits-eternite.png',alt:'Capitale kaldorei autour du Puits d’éternité sous une lune immense'},
  {tab:'Première Guerre',kicker:'An 0 du calendrier moderne',title:'L’ouverture de la Porte des ténèbres',text:'Manipulés par la Légion ardente, les clans orcs passent de Draenor à Azeroth. Hurlevent tombe : le conflit entre la Horde et l’Alliance commence.',facts:[['Passage','Porte des ténèbres'],['Envahisseurs','Clans orcs'],['Conséquence','Chute de Hurlevent']],img:'assets/porte-tenebres.png',alt:'Armée franchissant une gigantesque porte d’énergie gangrenée'},
  {tab:'Troisième Guerre',kicker:'La peste de Lordaeron',title:'La chute d’Arthas',text:'Le prince Arthas poursuit la peste de non-mort jusqu’en Norfendre. En saisissant Deuillegivre pour sauver son peuple, il perd son âme et devient l’instrument du Roi-liche.',facts:[['Départ','Stratholme'],['Arme','Deuillegivre'],['Point de non-retour','Norfendre']],img:'assets/chute-arthas.png',alt:'Prince déchu tendant la main vers une lame maudite dans le blizzard'},
  {tab:'Nouveau monde',kicker:'Après le mont Hyjal',title:'Horde et Alliance se reforment',text:'La Légion est repoussée au mont Hyjal, mais la paix ne dure pas. La nouvelle Horde s’établit en Kalimdor tandis que les survivants de l’Alliance reconstruisent leurs royaumes.',facts:[['Horde','Orgrimmar'],['Alliance','Hurlevent'],['Tension','Ressources et frontières']],img:'assets/mont-hyjal.png',alt:'Armées alliées contemplant un arbre-monde au lever du soleil'},
  {tab:'Norfendre',kicker:'La guerre contre le Fléau',title:'La fin du règne du Roi-liche',text:'Les armées d’Azeroth assiègent la Couronne de glace. Arthas est vaincu, mais le Fléau ne peut rester sans maître : Bolvar Fordragon accepte la couronne et devient son geôlier.',facts:[['Forteresse','Citadelle de la Couronne de glace'],['Champion','Tirion Fordring'],['Successeur','Bolvar Fordragon']],img:'assets/citadelle-glace.png',alt:'Forteresse sombre prise dans une tempête de glace'}
];

const figures=[
  {sigil:'A',color:'#77bce5',image:'assets/chute-arthas.png',name:'Arthas Menethil',role:'Prince de Lordaeron · Roi-liche',body:'Convaincu que toute limite morale pouvait être franchie pour sauver son royaume, Arthas devient précisément la menace qu’il combattait. Sa chute est une tragédie de l’obsession et du libre arbitre.',note:'Héritage : la destruction de Lordaeron et l’ascension du Fléau.'},
  {sigil:'T',color:'#d87848',image:'assets/porte-tenebres.png',name:'Thrall',role:'Chef de guerre · Chaman',body:'Né esclave, Thrall libère les orcs des camps, redonne à la Horde une identité qui ne repose plus sur le sang démoniaque et conduit son peuple vers Kalimdor.',note:'Héritage : une nouvelle Horde fondée sur la survie, l’honneur et des alliances fragiles.'},
  {sigil:'J',color:'#7bd8ef',image:'assets/mont-hyjal.png',name:'Jaina Portvaillant',role:'Archimage · Dirigeante de Kul Tiras',body:'Idéaliste puis profondément marquée par Theramore, Jaina incarne le coût humain des guerres répétées entre factions. Son rapport à la paix évolue sans jamais devenir simple.',note:'Héritage : un pont difficile entre diplomatie, mémoire et puissance.'},
  {sigil:'S',color:'#b58ad9',image:'assets/kaldorei-puits-eternite.png',name:'Sylvanas Coursevent',role:'Reine banshee · Réprouvée',body:'Tuée puis relevée par Arthas, Sylvanas construit sa liberté autour du refus de toute domination. Cette quête la conduit pourtant à imposer aux autres des choix aussi radicaux que ceux qu’elle a subis.',note:'Héritage : l’émancipation des Réprouvés, puis une fracture majeure au sein de la Horde.'}
];

const questionBank=[
  {c:'Origines',q:'Que cherchent à protéger les Titans en ordonnant Azeroth ?',a:['Une âme-monde','Le Rêve d’émeraude','La Porte des ténèbres'],ok:0,why:'Azeroth abrite une âme-monde d’une puissance exceptionnelle, raison centrale de l’intérêt des Titans.'},
  {c:'Origines',q:'Quels êtres furent enfermés sous Azeroth par les gardiens titanesques ?',a:['Les Naaru','Les Dieux très anciens','Les Seigneurs de l’effroi'],ok:1,why:'Les Dieux très anciens furent emprisonnés sous la surface plutôt que détruits, leur présence étant profondément liée au monde.'},
  {c:'Origines',q:'Quel Dieu très ancien fut arraché d’Azeroth par Aman’Thul ?',a:['Yogg-Saron','N’Zoth','Y’Shaarj'],ok:2,why:'Aman’Thul arracha Y’Shaarj du monde, laissant une blessure immense qui devint le Puits d’éternité.'},
  {c:'Origines',q:'Quelle installation titanesque se trouve en Norfendre ?',a:['Ulduar','Uldum','Uldir'],ok:0,why:'Ulduar est la vaste cité-prison titanesque du Norfendre, notamment liée à Yogg-Saron.'},
  {c:'Origines',q:'De quelle malédiction descendent les races de chair issues des créations titanesques ?',a:['La malédiction des worgens','La malédiction de la chair','La peste de non-mort'],ok:1,why:'La malédiction de la chair transforma progressivement plusieurs créations de pierre ou de métal en êtres mortels.'},
  {c:'Origines',q:'Quel titan devint le chef de la Légion ardente ?',a:['Aman’Thul','Sargeras','Aggramar'],ok:1,why:'Sargeras abandonna le Panthéon et fonda la Légion ardente pour mener sa croisade cosmique.'},
  {c:'Kaldorei',q:'Quelle source de magie alimentait l’empire kaldorei ?',a:['Le Puits d’éternité','Le Maelström','Le Sunwell'],ok:0,why:'Le Puits d’éternité était au cœur de la puissance et de la civilisation de l’ancien empire kaldorei.'},
  {c:'Kaldorei',q:'Qui régnait sur Zin-Azshari avant la Guerre des Anciens ?',a:['Tyrande Murmevent','Azshara','Maiev Chantelombre'],ok:1,why:'La reine Azshara dirigeait l’empire kaldorei depuis Zin-Azshari avec les Bien-nés.'},
  {c:'Kaldorei',q:'Quel événement attira la Légion ardente sur Azeroth ?',a:['L’usage immodéré du Puits','La naissance des dragons','La forge de Deuillegivre'],ok:0,why:'La magie considérable exploitée par les Bien-nés permit à la Légion de repérer Azeroth.'},
  {c:'Kaldorei',q:'Qui enseigna le druidisme à Malfurion Hurlorage ?',a:['Cénarius','Nozdormu','Velen'],ok:0,why:'Le demi-dieu Cénarius fut le mentor de Malfurion, premier grand druide parmi les elfes de la nuit.'},
  {c:'Kaldorei',q:'Que provoqua l’effondrement du Puits d’éternité ?',a:['La Grande Fracture','Le Cataclysme','La destruction de Draenor'],ok:0,why:'L’implosion du Puits disloqua l’ancien continent unique : cet événement est la Grande Fracture.'},
  {c:'Kaldorei',q:'Quel arbre-monde fut planté après la Guerre des Anciens ?',a:['Teldrassil','Nordrassil','Shaladrassil'],ok:1,why:'Nordrassil fut planté au mont Hyjal au-dessus du nouveau puits créé par Illidan.'},
  {c:'Kaldorei',q:'Quel artefact Illidan utilisa-t-il pour accroître sa puissance démoniaque ?',a:['Le Crâne de Gul’dan','Le Marteau-du-Destin','Le Cœur d’Y’Shaarj'],ok:0,why:'Illidan consomma l’énergie du Crâne de Gul’dan et acquit une forme démoniaque.'},
  {c:'Kaldorei',q:'Qui devint la grande prêtresse d’Élune ?',a:['Azshara','Tyrande Murmevent','Shandris Pennelune'],ok:1,why:'Tyrande Murmevent devint la grande prêtresse d’Élune et une dirigeante centrale des Kaldorei.'},
  {c:'Ancienne Horde',q:'Quel était le monde d’origine des orcs ?',a:['Argus','Draenor','K’aresh'],ok:1,why:'Les orcs sont originaires de Draenor, monde devenu plus tard l’Outreterre.'},
  {c:'Ancienne Horde',q:'Quel démon offrit son sang aux clans orcs ?',a:['Mannoroth','Archimonde','Kil’jaeden'],ok:0,why:'Le sang de Mannoroth lia de nombreux orcs à la corruption démoniaque.'},
  {c:'Ancienne Horde',q:'Qui ouvrit la Porte des ténèbres depuis Azeroth ?',a:['Medivh','Khadgar','Anduin Lothar'],ok:0,why:'Possédé par Sargeras, Medivh coopéra avec Gul’dan pour ouvrir la Porte entre les deux mondes.'},
  {c:'Ancienne Horde',q:'Quelle cité humaine tomba pendant la Première Guerre ?',a:['Lordaeron','Hurlevent','Dalaran'],ok:1,why:'Hurlevent fut prise par la Horde, forçant ses survivants à fuir vers le nord.'},
  {c:'Ancienne Horde',q:'Qui renversa Main-Noire et devint chef de guerre ?',a:['Orgrim Marteau-du-Destin','Durotan','Grommash Hurlenfer'],ok:0,why:'Orgrim tua Main-Noire, prit le titre de chef de guerre et mena la Horde durant la Deuxième Guerre.'},
  {c:'Ancienne Horde',q:'Quel héros mena les forces de l’Alliance pendant la Deuxième Guerre ?',a:['Turalyon','Anduin Lothar','Daelin Portvaillant'],ok:1,why:'Anduin Lothar fut le commandant suprême de l’Alliance de Lordaeron jusqu’à sa mort.'},
  {c:'Ancienne Horde',q:'Qui ferma la Porte des ténèbres depuis Draenor ?',a:['Khadgar','Medivh','Antonidas'],ok:0,why:'Khadgar et l’expédition de l’Alliance refermèrent la Porte depuis Draenor pour protéger Azeroth.'},
  {c:'Ancienne Horde',q:'Pourquoi Draenor fut-il déchiré et devint-il l’Outreterre ?',a:['Le réveil de Gruul','Les portails de Ner’zhul','Une attaque des Titans'],ok:1,why:'Ner’zhul ouvrit simultanément de nombreux portails, provoquant la dislocation du monde.'},
  {c:'Troisième Guerre',q:'Quelle ville Arthas fit-il purger pour stopper la peste ?',a:['Andorhal','Stratholme','Comté-de-l’Or'],ok:1,why:'Arthas ordonna la purge de Stratholme lorsque ses habitants furent contaminés par le grain pestiféré.'},
  {c:'Troisième Guerre',q:'Quel nathrezim Arthas poursuivit-il en Norfendre ?',a:['Tichondrius','Balnazzar','Mal’Ganis'],ok:2,why:'Mal’Ganis attira Arthas vers le Norfendre, où le prince trouva Deuillegivre.'},
  {c:'Troisième Guerre',q:'Comment se nomme la lame runique d’Arthas ?',a:['Deuillegivre','Porte-Cendres','Quel’Delar'],ok:0,why:'Deuillegivre dévora l’âme d’Arthas et le lia au Roi-liche.'},
  {c:'Troisième Guerre',q:'Quel ancien compagnon Arthas retrouva-t-il près de Deuillegivre ?',a:['Muradin Barbe-de-Bronze','Magni Barbe-de-Bronze','Falstad Marteau-Hardi'],ok:0,why:'Muradin accompagnait une expédition naine en Norfendre lorsqu’Arthas le retrouva.'},
  {c:'Troisième Guerre',q:'Quel paladin fut tué par Arthas après son retour en Lordaeron ?',a:['Tirion Fordring','Uther le Porteur de Lumière','Alexandros Mograine'],ok:1,why:'Uther tenta d’empêcher Arthas de profaner les cendres du roi Terenas.'},
  {c:'Troisième Guerre',q:'Pourquoi Arthas attaqua-t-il Quel’Thalas ?',a:['Pour ressusciter Kel’Thuzad','Pour capturer le roi Anasterian','Pour détruire le Puits de soleil'],ok:0,why:'Arthas utilisa l’énergie du Puits de soleil afin de ramener Kel’Thuzad sous forme de liche.'},
  {c:'Troisième Guerre',q:'Quel était le titre de Sylvanas avant sa mort ?',a:['Grande prêtresse','Générale des forestiers','Dame de Theramore'],ok:1,why:'Sylvanas était la générale des forestiers de Lune-d’Argent avant d’être relevée par Arthas.'},
  {c:'Troisième Guerre',q:'Qui mena l’assaut final de la Légion au mont Hyjal ?',a:['Archimonde','Kil’jaeden','Mannoroth'],ok:0,why:'Archimonde tenta d’absorber la puissance de Nordrassil avant d’être détruit par les feux follets.'},
  {c:'Troisième Guerre',q:'Quel prophète avertit Thrall et Jaina de partir vers Kalimdor ?',a:['Velen','Medivh','Khadgar'],ok:1,why:'Medivh, revenu comme prophète, chercha à unir les peuples contre la Légion.'},
  {c:'Roi-liche',q:'Quelles âmes fusionnèrent initialement dans le Roi-liche couronné ?',a:['Arthas et Ner’zhul','Arthas et Kel’Thuzad','Bolvar et Ner’zhul'],ok:0,why:'Après avoir revêtu le heaume, Arthas s’unit à l’esprit de Ner’zhul.'},
  {c:'Roi-liche',q:'Qui brisa Deuillegivre lors du combat final ?',a:['Darion Mograine','Tirion Fordring','Bolvar Fordragon'],ok:1,why:'Tirion, libéré de la glace, frappa Deuillegivre avec Porte-Cendres et brisa la lame.'},
  {c:'Roi-liche',q:'Qui porta le Heaume de domination après Arthas ?',a:['Bolvar Fordragon','Tirion Fordring','Darion Mograine'],ok:0,why:'Bolvar accepta de devenir le geôlier du Fléau pour empêcher les morts-vivants de se déchaîner.'},
  {c:'Royaumes',q:'Quelle est la capitale traditionnelle des humains de l’Alliance ?',a:['Hurlevent','Boralus','Stromgarde'],ok:0,why:'Hurlevent est la capitale du royaume éponyme et le principal centre humain de l’Alliance.'},
  {c:'Royaumes',q:'Quelle ville Thrall fonda-t-il en Durotar ?',a:['Fossoyeuse','Orgrimmar','Pitons-du-Tonnerre'],ok:1,why:'Orgrimmar fut fondée par Thrall et nommée en hommage à Orgrim Marteau-du-Destin.'},
  {c:'Royaumes',q:'Où l’Exodar s’écrasa-t-il en arrivant sur Azeroth ?',a:['L’île de Brume-Azur','L’île de Quel’Danas','Tol Barad'],ok:0,why:'Le vaisseau draeneï s’écrasa sur l’île de Brume-Azur, au large de Kalimdor.'},
  {c:'Royaumes',q:'Qui ordonna l’incendie de Teldrassil ?',a:['Garrosh Hurlenfer','Sylvanas Coursevent','Genn Grisetête'],ok:1,why:'Sylvanas ordonna de brûler Teldrassil à la fin de la guerre des Épines.'},
  {c:'Royaumes',q:'Quel désastre força les gnomes à abandonner Gnomeregan ?',a:['Une irradiation','Une inondation','Une invasion du Fléau'],ok:0,why:'La tentative de Sicco Thermaplugg contre les troggs contamina la cité par irradiation.'},
  {c:'Royaumes',q:'Quel royaume resta longtemps isolé derrière un immense mur ?',a:['Gilnéas','Kul Tiras','Alterac'],ok:0,why:'Gilnéas se retira de l’Alliance et s’isola derrière le mur de Grisetête.'},
  {c:'Aspects',q:'Quel Aspect est lié à la vie ?',a:['Alexstrasza','Ysera','Kalecgos'],ok:0,why:'Alexstrasza la Lieuse-de-Vie veille sur la vie et dirigeait le Vol draconique rouge.'},
  {c:'Aspects',q:'Quel Aspect garde les voies du temps ?',a:['Malygos','Nozdormu','Neltharion'],ok:1,why:'Nozdormu l’Intemporel et le Vol de bronze protègent le déroulement du temps.'},
  {c:'Aspects',q:'Quel Aspect était le gardien de la magie ?',a:['Malygos','Ysera','Irion'],ok:0,why:'Malygos et le Vol bleu furent chargés de surveiller les forces magiques.'},
  {c:'Aspects',q:'Quel était le nom de Deathwing avant sa corruption ?',a:['Neltharion','Galakrond','Sabellian'],ok:0,why:'Neltharion, le Gardeterre, devint Deathwing après sa corruption par les Dieux très anciens.'},
  {c:'Aspects',q:'À quel royaume Ysera est-elle intimement liée ?',a:['Les Terres de l’Ombre','Le Rêve d’émeraude','Le Néant distordu'],ok:1,why:'Ysera et le Vol vert veillent sur le Rêve d’émeraude.'},
  {c:'Aspects',q:'Quel proto-dragon gigantesque menaça les autres avant la naissance des Aspects ?',a:['Galakrond','Raszageth','Iridikron'],ok:0,why:'La corruption et l’appétit de Galakrond poussèrent cinq proto-dragons à s’unir contre lui.'},
  {c:'Peuples',q:'Qui mena les trolls Sombrelance après Sen’jin ?',a:['Vol’jin','Zul’jin','Rokhan'],ok:0,why:'Vol’jin succéda à son père Sen’jin et devint le chef des Sombrelance.'},
  {c:'Peuples',q:'Quel chef tauren fonda les Pitons-du-Tonnerre ?',a:['Baine Sabot-de-Sang','Cairne Sabot-de-Sang','Hamuul Totem-Runique'],ok:1,why:'Cairne mena les tribus taurènes vers Mulgore et établit leur capitale.'},
  {c:'Peuples',q:'Quel dirigeant guida les draeneï jusqu’à Azeroth ?',a:['Velen','Maraad','Akama'],ok:0,why:'Le prophète Velen refusa Sargeras et guida les exilés érédars devenus les draeneï.'},
  {c:'Peuples',q:'Quel prince donna aux hauts-elfes le nom de Sin’dorei ?',a:['Kael’thas Haut-Soleil','Lor’themar Theron','Anasterian Haut-Soleil'],ok:0,why:'Kael’thas renomma les survivants elfes de sang, ou Sin’dorei, en mémoire des morts.'},
  {c:'Peuples',q:'Quelle magie transforma les habitants de Gilnéas en worgens ?',a:['Une forme druidique incontrôlée','Le sang de Mannoroth','La peste de non-mort'],ok:0,why:'La malédiction worgen provient d’une ancienne forme de meute druidique devenue incontrôlable.'},
  {c:'Cataclysme',q:'Qui provoqua le Cataclysme en surgissant du Tréfonds ?',a:['Ragnaros','Deathwing','Al’Akir'],ok:1,why:'Le retour de Deathwing depuis le Tréfonds fractura Azeroth et bouleversa ses continents.'},
  {c:'Cataclysme',q:'Au-dessus de quel lieu Deathwing surgit-il ?',a:['Le Maelström','Le mont Hyjal','La Couronne de glace'],ok:0,why:'Deathwing traversa le plan terrestre et émergea au niveau du Maelström.'},
  {c:'Pandarie',q:'Que sont les Sha ?',a:['Des fragments d’émotions négatives','Des esprits élémentaires','Des serviteurs des Naaru'],ok:0,why:'Les Sha sont des manifestations des émotions négatives, issues de l’essence d’Y’Shaarj.'},
  {c:'Pandarie',q:'Quel empereur enveloppa la Pandarie dans les brumes ?',a:['Shaohao','Lei Shen','Shao-Tien'],ok:0,why:'L’empereur Shaohao sacrifia son existence pour protéger la Pandarie lors de la Grande Fracture.'},
  {c:'Draenor',q:'Avec quel dragon Garrosh s’échappa-t-il avant son procès ?',a:['Kairozdormu','Chromie','Nozdormu'],ok:0,why:'Kairozdormu aida Garrosh à rejoindre un Draenor alternatif.'},
  {c:'Draenor',q:'Quelle Horde naquit sur le Draenor alternatif ?',a:['La Horde de Fer','La Horde noire','La Gangr’Horde'],ok:0,why:'Garrosh poussa les clans à refuser le sang démoniaque et à former la Horde de Fer.'},
  {c:'Légion',q:'Quel monde servait de siège principal à la Légion ardente ?',a:['Argus','Draenor','Xoroth'],ok:0,why:'Argus, ancien monde des érédars, devint le cœur militaire de la Légion.'},
  {c:'Légion',q:'Par quel lieu la Légion lança-t-elle sa grande invasion ?',a:['La Tombe de Sargeras','La Porte du Courroux','Le Temple noir'],ok:0,why:'Gul’dan ouvrit un portail à la Tombe de Sargeras, permettant l’invasion des îles Brisées.'},
  {c:'Quatrième Guerre',q:'Quel minerai apparut après la blessure infligée à Azeroth ?',a:['Azerite','Saronite','Gangreschiste'],ok:0,why:'L’Azerite est le sang cristallisé de l’âme-monde, apparu après le coup de Sargeras.'},
  {c:'Quatrième Guerre',q:'Quel Dieu très ancien fut affronté à Ny’alotha ?',a:['C’Thun','Yogg-Saron','N’Zoth'],ok:2,why:'N’Zoth tenta de superposer Ny’alotha à la réalité avant sa défaite.'},
  {c:'Ombreterre',q:'Qui gouverne le royaume de Bastion ?',a:['La reine de l’hiver','L’Archonte','Le Primat'],ok:1,why:'L’Archonte dirige les Kyrians et le royaume de Bastion.'},
  {c:'Ombreterre',q:'Quel Éternel est lié à Maldraxxus ?',a:['Le Primat','Denathrius','Le Geôlier'],ok:0,why:'Le Primat est le maître stratège et le dirigeant de Maldraxxus.'},
  {c:'Ombreterre',q:'Qui règne sur Sylvarden ?',a:['La reine de l’hiver','L’Archonte','Élune'],ok:0,why:'La reine de l’hiver veille sur les âmes de la nature à Sylvarden.'},
  {c:'Îles aux Dragons',q:'Quelle Incarnation primordiale fut libérée en premier ?',a:['Fyrakka','Raszageth','Vyranoth'],ok:1,why:'Raszageth la Mange-tempêtes fut libérée avant ses frères et sœur.'}
];

const QUIZ_SIZE=50;
const shuffle=items=>{
  for(let index=items.length-1;index>0;index--){
    const random=Math.floor(Math.random()*(index+1));
    [items[index],items[random]]=[items[random],items[index]];
  }
  return items;
};
let quiz=shuffle([...questionBank]).slice(0,QUIZ_SIZE);

let era=0,qIndex=0,score=0,locked=false;
let bestScore=Number(localStorage.getItem('azeroth-best-score-50'))||0;
document.querySelector('#quiz-total').textContent=quiz.length;
document.querySelector('#best-score').textContent=bestScore?`${bestScore}/${quiz.length}`:'—';
const controls=document.querySelector('.era-controls');
const stage=document.querySelector('.era-stage');

eras.forEach((item,index)=>{
  const button=document.createElement('button');
  button.innerHTML=`<span>${String(index+1).padStart(2,'0')}</span><strong>${item.tab}</strong>`;
  button.setAttribute('aria-label',item.tab);
  button.role='tab';
  button.tabIndex=index===0?0:-1;
  button.onclick=()=>renderEra(index);
  button.onkeydown=event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();
    const target=event.key==='Home'?0:event.key==='End'?eras.length-1:(index+(event.key==='ArrowRight'?1:-1)+eras.length)%eras.length;
    renderEra(target);
    controls.children[target].focus();
  };
  controls.appendChild(button);
});

function renderEra(index){
  era=index;
  const item=eras[index];
  [...controls.children].forEach((button,buttonIndex)=>{
    button.classList.toggle('active',buttonIndex===index);
    button.setAttribute('aria-selected',buttonIndex===index);
    button.tabIndex=buttonIndex===index?0:-1;
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
  stage.querySelector('.era-progress-count').textContent=`${String(index+1).padStart(2,'0')} / ${String(eras.length).padStart(2,'0')}`;
  stage.querySelector('.era-progress b').style.width=`${(index+1)/eras.length*100}%`;
}

stage.querySelector('.next-era').onclick=()=>renderEra((era+1)%eras.length);
renderEra(0);

const cardWrap=document.querySelector('.cards');
const dialog=document.querySelector('#lore-dialog');
figures.forEach(figure=>{
  const button=document.createElement('button');
  button.className='card';
  button.style.setProperty('--card-accent',figure.color);
  button.style.setProperty('--card-image',`url('${figure.image}')`);
  button.innerHTML=`<span class="sigil">${figure.sigil}</span><h3>${figure.name}</h3><p>${figure.role}</p><span class="open">Lire le destin →</span>`;
  button.onclick=()=>{
    dialog.querySelector('h2').textContent=figure.name;
    dialog.querySelector('.modal-role').textContent=figure.role;
    dialog.querySelector('.modal-body').textContent=figure.body;
    dialog.querySelector('.modal-note').textContent=figure.note;
    dialog.querySelector('.modal-sigil').textContent=figure.sigil;
    dialog.querySelector('.modal-accent').style.backgroundImage=`linear-gradient(180deg,${figure.color}22,rgba(5,8,16,.32)),url('${figure.image}')`;
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
  qbox.classList.remove('result-copy');
  const item=quiz[qIndex];
  qbox.querySelector('.count').textContent=`${item.c} · Question ${qIndex+1} sur ${quiz.length}`;
  qbox.querySelector('h3').textContent=item.q;
  qbox.querySelector('.feedback').textContent='';
  qbox.querySelector('.feedback').classList.remove('visible');
  next.classList.remove('show');
  const answers=qbox.querySelector('.answers');
  answers.innerHTML='';
  item.a.forEach((label,index)=>{
    const button=document.createElement('button');
    button.className='answer';
    button.dataset.letter=String.fromCharCode(65+index);
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
  qbox.querySelector('.feedback').classList.add('visible');
  next.textContent=qIndex===quiz.length-1?'Voir mon résultat':'Question suivante';
  next.classList.add('show');
  document.querySelector('.progress i').style.width=`${(qIndex+1)/quiz.length*100}%`;
}
function advanceQuiz(){
  if(qIndex<quiz.length-1){qIndex++;renderQ();return;}
  bestScore=Math.max(bestScore,score);
  localStorage.setItem('azeroth-best-score-50',String(bestScore));
  document.querySelector('#best-score').textContent=`${bestScore}/${quiz.length}`;
  const ratio=score/quiz.length;
  qbox.classList.add('result-copy');
  qbox.querySelector('.count').textContent='Chronique terminée';
  qbox.querySelector('h3').textContent=ratio===1?'Gardien absolu des chroniques':ratio>=.8?'Érudit d’Azeroth':ratio>=.5?'Chroniqueur confirmé':'Voyageur nouvellement arrivé';
  qbox.querySelector('.answers').innerHTML=`<div class="result-medal"><span>${score}/${quiz.length}</span></div>`;
  qbox.querySelector('.feedback').textContent=ratio>=.8?'Votre mémoire rivalise avec celle des plus grands archivistes.':ratio>=.5?'Les fondations sont solides. Quelques archives restent à explorer.':'Azeroth est vaste : chaque nouvelle lecture révèle un autre fragment de son histoire.';
  qbox.querySelector('.feedback').classList.add('visible');
  next.textContent='Recommencer';
  next.onclick=()=>{
    quiz=shuffle([...questionBank]).slice(0,QUIZ_SIZE);
    qIndex=0;score=0;document.querySelector('#score').textContent=0;
    next.onclick=advanceQuiz;
    renderQ();
  };
}
next.onclick=advanceQuiz;
renderQ();

document.querySelectorAll('[data-go]').forEach(button=>button.onclick=()=>document.querySelector('#'+button.dataset.go).scrollIntoView({behavior:'smooth'}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){document.querySelectorAll('nav button').forEach(button=>{const active=button.dataset.go===entry.target.id;button.classList.toggle('active',active);button.setAttribute('aria-current',active?'true':'false');});}
}),{rootMargin:'-35% 0px -55%'});
['chronologie','figures','quiz'].forEach(id=>observer.observe(document.getElementById(id)));

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}
}),{threshold:.12});
document.querySelectorAll('.section-head,.era-stage,.card,.ice-break blockquote,.quiz-wrap').forEach((element,index)=>{
  element.classList.add('reveal');
  element.style.transitionDelay=`${Math.min(index%4,3)*70}ms`;
  revealObserver.observe(element);
});

const updateScrollProgress=()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  document.querySelector('.scroll-progress i').style.width=`${max?scrollY/max*100:0}%`;
};
addEventListener('scroll',updateScrollProgress,{passive:true});
updateScrollProgress();
