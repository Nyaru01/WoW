(function(root,factory){
  const data=factory();
  if(typeof module==='object'&&module.exports)module.exports=data;
  root.RenaissanceData=data;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  const verifiedDate='2026-09-29';
  const curseforge=slug=>({label:'CurseForge',url:`https://www.curseforge.com/wow/addons/${slug}`});
  const categoryLabels={
    quetes:'Quêtes & navigation',donjons:'Donjons & butin',combat:'Combat & raid',interface:'Interface & lisibilité',
    confort:'Confort & économie',support:'Diagnostic & dépannage',hunter:'Hunter',map:'Carte',rp:'RP'
  };
  const legacyAddons=[
    ['EllesmereUI','interface','Interface modulaire : barres d’action, cadres et styles. Une version WoW: Forever est disponible.','Ellesmere','ellesmereui',['interface','hud']],
    ['Forever PTR World Map','quetes','Une carte du monde adaptée au serveur WoW: Forever.','Lili','forever-ptr-server-world-map',['map','forever']],
    ['Questie','quetes','Les quêtes disponibles et leurs objectifs directement sur la carte.','Gô','questie',['quête','carte']],
    ['QuestTogether','quetes','Un suivi de quêtes plus simple lorsque vous jouez en groupe.','Apogée','questtogether',['quête','groupe']],
    ['Azeroth Pilot Reloaded','quetes','Des itinéraires rapides et des étapes précises pour le leveling.','Lili','azeroth-pilot-reloaded',['leveling','route']],
    ['RestedXP Guide','quetes','Des guides de montée en niveau intégrés, étape par étape.','Lili','restedxp-guide',['leveling','guide']],
    ['TomTom','quetes','Coordonnées, points de passage et flèche directionnelle.','Lili','tomtom',['map','waypoint']],
    ['GuildMap','quetes','La position des membres de la guilde sur votre carte.','Lili','guildmap',['map','guilde']],
    ['DungeonJournal','donjons','Quêtes, emplacements et butins des boss pour chaque donjon.','Apogée','dungeonjournal',['donjon','boss','butin']],
    ['Atlas','donjons','Le navigateur classique de cartes d’instances.','Lili','atlas',['donjon','map']],
    ['Attune','donjons','La progression de vos accès et harmonisations.','Lili','attune',['donjon','accès']],
    ['Nova Instance Tracker','donjons','Verrouillages, temps d’instance, or et XP reposée des rerolls.','Lili','nova-instance-tracker',['donjon','verrouillage']],
    ['Lootified','donjons','Journal de butin et assistant Best in Slot pour WoW: Forever.','Apogée','lootified',['butin','bis','forever']],
    ['Forever Dungeon Scout','donjons','Un guide de donjons léger conçu pour WoW: Forever.','Apogée','forever-dungeon-scout',['donjon','forever']],
    ['Cooldown Manager Centered','combat','Personnalisez icônes, améliorations et barres de recharge.','Lili','cooldown-manager-centered',['combat','cooldown']],
    ['MiniAuras','combat','Contrôles, défensifs et notifications de sorts importants.','Lili','minicc',['combat','auras']],
    ['NKThreat','combat','Menace, TPS en temps réel et alertes de provocation.','Lili','nkthreat',['combat','menace']],
    ['WhoDoesWhat','combat','Assignations de raid et bénédictions de paladins.','Lili','whodoeswhat',['raid','groupe']],
    ['BlizzMove','interface','Déplacez les fenêtres Blizzard par simple glisser-déposer.','Lili','blizzmove',['interface','fenêtres']],
    ['DarkMode','interface','Une interface et des fenêtres plus sombres.','Lili','darkmode',['interface','thème']],
    ['FontMagic','interface','Polices et tailles personnalisées pour les textes de combat.','Lili','fontmagic',['interface','police']],
    ['Plumber','interface','Butin, difficulté d’instance et nombreuses améliorations UI.','Lili','plumber',['interface','butin']],
    ['WilduTools','interface','Améliorations Blizzard et automatisation des tâches courantes.','Lili','wildutools',['interface','confort']],
    ['Auctionator','confort','Un hôtel des ventes simple et un meilleur suivi des prix.','Lili','auctionator',['économie','enchères']],
    ['Better Fishing','confort','Pêche au raccourci de ciblage et au double-clic.','Lili','better-fishing',['pêche','confort']],
    ['Speedy AutoLoot','confort','La récupération automatique du butin à grande vitesse.','Lili','speedyautoloot',['butin','confort']],
    ['WIM v3','confort','Les chuchotements dans de vraies fenêtres de messagerie.','Lili','wim-3',['chat','confort']],
    ['BugGrabber','support','Capture les erreurs Lua sans interrompre votre partie.','Lili','bug-grabber',['lua','diagnostic']],
    ['BugSack','support','Centralise les erreurs dans un journal facile à consulter.','Lili','bugsack',['lua','diagnostic']]
  ];
  const addons=legacyAddons.map(([title,category,description,author,slug,tags],index)=>({
    type:'addon',slug,title,name:title,description,author,categories:[category],category,
    wowFlavor:['Forever'],foreverCompatibility:'retest',status:'unknown',tested:false,version:null,gameVersion:null,
    verifiedDate,verificationStatus:'À retester',recommended:index<3,features:[],commands:[],warnings:['Compatibilité à confirmer après une nouvelle version du jeu.'],
    tags,sources:[curseforge(slug)],curseforgeUrl:curseforge(slug).url,sourceUrl:null
  }));
  addons.push({
    type:'addon',slug:'hunters-field-guide',title:"Hunter's Field Guide",name:"Hunter's Field Guide",
    description:'Un journal de terrain pour les chasseurs permettant de découvrir et cataloguer les bêtes domptables, leurs capacités et leurs emplacements.',
    author:'Alezyzz',categories:['hunter','map'],category:'hunter',wowFlavor:['Forever','Classic'],foreverCompatibility:'native',status:'beta',tested:false,
    version:'0.2.0',gameVersion:'1.60.1',verifiedDate,verificationStatus:'Information bêta',recommended:true,
    whyRecommended:['Conçu spécifiquement pour WoW: Forever','Encyclopédie des familiers directement en jeu','Utile pendant le leveling du chasseur','Suit la découverte et les compétences de familier','Intégré à la carte du monde'],
    features:['501 bêtes domptables référencées','18 familles de familiers, dont la famille Fox','Pages par famille avec statistiques et régime','Progression de découverte','Pages de capacités et de rangs','Liste des bêtes enseignant chaque rang','Carte des points d’apparition et pins optionnels','Panneau sous la cible et informations dans les tooltips','Recherche par bête, famille, zone ou capacité','Apparences spellbook Forever et Classic'],
    discovery:['Une bête domptable ciblée est enregistrée avec son nom, son niveau, sa famille et sa position.','Beast Lore révèle les capacités et les rangs qu’elle peut enseigner.','Les données restent masquées jusqu’à leur découverte, sauf option explicite de révélation.'],
    commands:[{label:'Ouvrir le journal',value:'/fg'},{label:'Ouvrir les paramètres',value:'/fg config'},{label:'Exporter les nouvelles données',value:'/fg export'}],
    warnings:['Addon créé pendant la bêta de WoW: Forever.','La partie Beast Lore n’était pas considérée comme totalement testée par son auteur lors de la vérification.'],
    tags:['hunter','chasseur','familier','pet','tame','domptage','beast lore','forever','map','journal','skills','capacités'],
    sources:[curseforge('hunters-field-guide')],curseforgeUrl:curseforge('hunters-field-guide').url,sourceUrl:null,license:'MIT'
  });

  const tips=[
    ['construire-pack-propre','Construire un pack propre','Ajoutez les outils progressivement afin d’identifier immédiatement un conflit ou une baisse de performances.',['installation','addons','bugsack']],
    ['preparer-liste-butin','Préparer sa liste de butin','Ciblez les bons donjons et comparez vos améliorations avant de partir.',['butin','donjon','lootified']],
    ['queter-sans-perdre-nord','Quêter sans perdre le nord','Combinez objectifs visibles et itinéraire sans transformer l’aventure en pilote automatique.',['quête','questie','tomtom']],
    ['maitriser-verrouillages','Maîtriser ses verrouillages','Consultez vos entrées récentes et préparez votre route d’instances.',['donjon','verrouillage']],
    ['lire-menace','Lire sa menace','Placez les informations de menace là où elles guident réellement vos décisions.',['combat','menace']],
    ['traquer-erreur-lua','Traquer une erreur Lua','Isolez méthodiquement l’addon responsable et conservez la pile complète.',['lua','dépannage']],
    ['preparer-groupe','Partir sans perdre dix minutes','Vérifiez rôles, consommables et point de rendez-vous avant le départ.',['groupe','donjon']],
    ['interface-lisible','Garder un écran qui respire','Rapprochez les informations décisives du centre sans masquer le monde.',['interface','hud']]
  ].map(([slug,title,description,tags])=>({type:'astuce',slug,title,description,tags,verifiedDate,verificationStatus:'Vérifié',sources:[]}));

  const commands=[
    ['giquality','Éclairage secondaire minimal','/console giquality 0','Réduit l’éclairage indirect.','Gain possible','Valeur par défaut non confirmée.'],
    ['ssaotype','Désactiver SSAO','/console ssaotype 0','Désactive l’occlusion ambiante SSAO.','Gain possible','Valeur par défaut non confirmée.'],
    ['assao-horizon','Ombres de contact renforcées','/console assaoHorizonAngleThresh 0.5\n/console assaoDetailShadowStrength 5000\n/console assaoBlurPassCount 4','Renforce les détails ASSAO.','Coût moyen','Valeurs par défaut non confirmées.'],
    ['assao-blur','Flou ASSAO réduit','/console assaoBlurPassCount 1','Réduit les passes de flou de l’occlusion.','Gain léger','Valeur par défaut non confirmée.'],
    ['shadow-cascades','Ombres lointaines','/console shadowNumCascades 4','Augmente le nombre de cascades d’ombres.','Coût élevé','Valeur par défaut non confirmée.'],
    ['horizon-start','Distance d’horizon','/console horizonstart 4000','Repousse le début de l’horizon.','Coût variable','Valeur par défaut non confirmée.'],
    ['ground-effect-density','Densité de l’herbe','/console groundEffectDensity 128','Augmente la densité des effets au sol.','Coût moyen','Valeur par défaut non confirmée.'],
    ['resample-sharpen','Netteté de rééchantillonnage','/console ResampleAlwaysSharpen 1','Maintient la netteté lors du rééchantillonnage.','Faible','Restauration : /console ResampleAlwaysSharpen 0'],
    ['dynamic-render-scale','Résolution dynamique','/console DynamicRenderScale 1','Active la résolution dynamique.','Gain variable','Restauration : /console DynamicRenderScale 0'],
    ['dynamic-render-min','Résolution dynamique minimale','/console DynamicRenderScaleMin 0.8','Empêche la résolution dynamique de descendre sous 80 %.','Gain variable','Valeur par défaut non confirmée.'],
    ['weather-density','Météo dense','/console weatherdensity 3','Force des effets météo plus présents.','Coût faible','Valeur par défaut non confirmée.'],
    ['reload','Recharger l’interface','/reload','Recharge l’interface sans quitter le jeu.','Aucun','Aucune restauration nécessaire.']
  ].map(([slug,title,command,description,impact,restore])=>({type:'commande',slug,title,description,command,impact,restore,testedValue:command,defaultValue:restore.includes('non confirmée')?'Non confirmée':null,tags:[title,command],verifiedDate,verificationStatus:slug==='reload'?'Vérifié':'Information bêta',sources:slug==='reload'?[]:[{label:'Tests communautaires',url:'https://www.reddit.com/r/classicwow/comments/1wr75vx/useful_console_commands/'}]}));

  const troubleshooting=[
    {type:'depannage',slug:'addon-ne-se-charge-pas',title:'Addon non chargé',description:'Checklist progressive pour retrouver un addon absent sans effacer immédiatement ses réglages.',steps:['Vérifier que le dossier de l’addon n’est pas imbriqué deux fois.','Vérifier la version du jeu annoncée par l’auteur.','Activer les addons périmés uniquement si nécessaire.','Tester l’addon seul avec ses dépendances.','Exécuter /reload.','Consulter BugSack et BugGrabber.','Réinitialiser les SavedVariables ciblées seulement en dernier recours.'],tags:['addon','chargement','savedvariables'],verifiedDate,verificationStatus:'Vérifié',sources:[]},
    {type:'depannage',slug:'erreur-lua',title:'Erreur Lua',description:'Activer les erreurs, récupérer la pile et isoler proprement l’addon responsable.',steps:['Installer BugGrabber et BugSack.','Reproduire l’erreur une seule fois.','Copier la première pile complète en retirant les chemins personnels.','Tester l’addon cité seul avec ses dépendances.','Conserver la trace pour un signalement utile.'],tags:['lua','bugsack','buggrabber'],verifiedDate,verificationStatus:'Vérifié',sources:[]},
    {type:'depannage',slug:'reset-interface',title:'Réinitialiser l’interface sans tout perdre',description:'Trois niveaux de remise à zéro, du simple rechargement aux SavedVariables ciblées.',steps:['Niveau 1 — utiliser /reload.','Niveau 2 — désactiver temporairement les addons.','Niveau 3 — sauvegarder puis réinitialiser uniquement les SavedVariables concernées.','Ne supprimer intégralement WTF qu’après sauvegarde et diagnostic confirmé.'],tags:['reset','interface','wtf'],verifiedDate,verificationStatus:'Vérifié',sources:[]}
  ];

  const items=[
    {type:'objet',slug:'torche-de-veillebois',title:'Torche de Veillebois',description:'Une torche temporaire signalée sur un veilleur de nuit tombé pendant la bêta.',category:'Torches',zone:'Duskwood',coordinates:'73.2 46.8',way:'/way Duskwood 73.2 46.8',prerequisites:'Aucun prérequis confirmé',duration:'5 minutes (communautaire)',cooldown:'30 secondes (communautaire)',combat:'Non confirmé',indoors:'Non confirmé',accountBound:'Non confirmé',notes:'Emplacement et valeurs susceptibles de changer après la bêta.',tags:['torche','lumière','rp','veillebois'],verifiedDate,verificationStatus:'Source communautaire — non vérifiée',image:'assets/torch-rp.png',sources:[{label:'Découverte communautaire',url:'https://www.reddit.com/r/classicwow/comments/1wq5ljc/they_added_torches_to_forever/'}]},
    {type:'objet',slug:'torche-de-grayson',title:'Torche de Grayson',description:'Objet de main gauche obtenu auprès du capitaine Grayson au Phare de l’Ouest.',category:'Torches',zone:'Marche de l’Ouest',coordinates:null,way:null,prerequisites:'Quête « Menace sur la côte » au Phare de l’Ouest',duration:'Équipée',cooldown:'Aucun confirmé',combat:'Objet équipable',indoors:'Oui',accountBound:'Non confirmé',notes:'Récompense de quête de niveau 21.',tags:['torche','lumière','rp','grayson'],verifiedDate,verificationStatus:'Récompense de quête vérifiée',image:null,sources:[{label:'Quête Menace sur la côte',url:'https://www.wowhead.com/forever/fr/quest=104/menace-sur-la-c%C3%B4te'}]}
  ];

  const news=[
    {type:'actualite',slug:'notes-developpement-24-septembre-2026',title:'Notes de développement du 24 septembre 2026',description:'Équilibrage des classes, gestionnaire de temps de recharge et améliorations de la manette.',impact:['Ajustements de classes','Premiers tests du gestionnaire de temps de recharge','Améliorations de la navigation à la manette'],tags:['classes','ui','addons'],verifiedDate:'2026-09-28',verificationStatus:'Source officielle',sources:[{label:'Notes officielles Blizzard',url:'https://eu.forums.blizzard.com/en/wow/t/wow-forever-beta-development-notes-%E2%80%93-updated-24-september/631316'}]},
    {type:'actualite',slug:'client-1-60-1-69977',title:'Client 1.60.1.69977 : Mac et manette',description:'Correctifs d’affichage et de stabilité sur Mac et navigation améliorée à la manette.',impact:['Stabilité Mac','Sélection des personnages à la manette','Interaction avec les objets de quête'],tags:['client','mac','manette'],verifiedDate:'2026-09-28',verificationStatus:'Source officielle',sources:[{label:'Note Blizzard',url:'https://eu.forums.blizzard.com/en/wow/t/beta-client-update-23-september/630815'}]},
    {type:'actualite',slug:'systeme-heritage',title:'Le système d’héritage dévoilé',description:'65 défis, des points liés au compte et trois arbres d’avantages à spécialiser par personnage.',impact:['Nouvelle progression liée au compte','Choix d’avantages par personnage'],tags:['progression','héritage'],verifiedDate:'2026-09-28',verificationStatus:'Source officielle',sources:[{label:'Annonce Blizzard',url:'https://worldofwarcraft.blizzard.com/fr-fr/news/24307383'}]},
    {type:'actualite',slug:'eolides-wow-forever',title:'Les Éolides prennent leur envol',description:'Une zone de départ du niveau 1 à 12 et un choix d’allégeance entre Horde et Alliance.',impact:['Nouvelle race jouable','Zone de départ dédiée','Choix de faction'],tags:['éolides','race','quête'],verifiedDate:'2026-09-28',verificationStatus:'Source officielle',sources:[{label:'Annonce Blizzard',url:'https://worldofwarcraft.blizzard.com/fr-fr/news/24302071/d%C3%A9couvrez-les-%C3%A9olides-dans-wow-forever'}]},
    {type:'actualite',slug:'prenom-et-nom-personnage',title:'Prénom et nom pour chaque personnage',description:'Les personnages disposent désormais d’un nom complet unique à l’échelle de leur région.',impact:['Identité complète des personnages','Unicité régionale du nom complet'],tags:['identité','personnage','rp'],verifiedDate:'2026-09-28',verificationStatus:'Source officielle',sources:[{label:'Annonce Blizzard',url:'https://worldofwarcraft.blizzard.com/fr-fr/news/24304161/'}]},
    {type:'actualite',slug:'regles-de-jeu',title:'Les royaumes cèdent la place aux règles',description:'Normal, JcJ, Jeu de rôle et plus tard Extrême deviennent les portes d’entrée du monde.',impact:['Choix par règles de jeu','Normal, JcJ et Jeu de rôle disponibles'],tags:['royaumes','règles','jdr','jcj'],verifiedDate:'2026-09-28',verificationStatus:'Source officielle',sources:[{label:'Annonce Blizzard',url:'https://worldofwarcraft.blizzard.com/fr-fr/news/24302070/'}]}
  ];

  const presets=[
    {type:'preset',slug:'immersion',title:'Preset Immersion',description:'Végétation et météo renforcées avec priorité au rendu.',commands:['/console groundEffectDensity 128','/console weatherdensity 3','/console horizonstart 4000'],restore:'Les valeurs d’origine n’étant pas toutes confirmées, sauvegardez Config.wtf avant application.',tags:['graphismes','immersion'],verifiedDate,verificationStatus:'Information bêta',sources:commands.find(c=>c.slug==='ground-effect-density').sources},
    {type:'preset',slug:'performance',title:'Preset Performance',description:'Réduit les options coûteuses et active la résolution dynamique.',commands:['/console giquality 0','/console ssaotype 0','/console assaoBlurPassCount 1','/console DynamicRenderScale 1','/console DynamicRenderScaleMin 0.8'],restore:'Utilisez /console DynamicRenderScale 0 puis restaurez votre sauvegarde Config.wtf pour les valeurs non confirmées.',tags:['fps','performance'],verifiedDate,verificationStatus:'Information bêta',sources:commands.find(c=>c.slug==='giquality').sources},
    {type:'preset',slug:'cinematique',title:'Preset Cinématique',description:'Météo, distance et ambiance destinées aux captures.',commands:['/console weatherdensity 3','/console horizonstart 4000','/console shadowNumCascades 4','/console groundEffectDensity 128'],restore:'Les valeurs d’origine n’étant pas toutes confirmées, sauvegardez Config.wtf avant application.',tags:['graphismes','capture'],verifiedDate,verificationStatus:'Information bêta',sources:commands.find(c=>c.slug==='weather-density').sources}
  ];

  const all=[...addons,...tips,...commands,...troubleshooting,...items,...news,...presets];
  const routeFor=item=>item.type==='addon'?`/addons/${item.slug}`:item.type==='astuce'?`/astuces/${item.slug}`:item.type==='commande'?`/commandes/${item.slug}`:item.type==='depannage'?`/depannage/${item.slug}`:item.type==='objet'?`/objets/${item.slug}`:item.type==='actualite'?`/actualites/${item.slug}`:`/commandes/presets#${item.slug}`;
  return {verifiedDate,categoryLabels,addons,tips,commands,troubleshooting,items,news,presets,all,routeFor};
});
