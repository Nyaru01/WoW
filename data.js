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
  const addonEnrichment={
    'ellesmereui':{bestFor:'Refondre une interface complète avec un ensemble visuel cohérent.',setupAdvice:'Installez uniquement les modules utiles, puis positionnez les éléments en situation de combat.',whyRecommended:['Réunit plusieurs fonctions d’interface dans un même ensemble','Dispose d’une version annoncée pour WoW: Forever','Évite d’empiler plusieurs remplacements visuels concurrents'],features:['Barres d’action configurables','Cadres et styles d’interface coordonnés','Modules activables selon les besoins']},
    'forever-ptr-server-world-map':{bestFor:'Consulter une carte adaptée aux zones et changements de Forever.',setupAdvice:'Vérifiez après chaque mise à jour que les données correspondent encore au client actuel.',whyRecommended:['Pensé autour de la carte du serveur Forever','Utile pour l’exploration et les repères propres à cette version'],features:['Carte du monde adaptée','Repères de navigation','Consultation depuis l’interface de carte']},
    'questie':{bestFor:'Voir les quêtes disponibles et leurs objectifs sans suivre un itinéraire imposé.',setupAdvice:'Limitez les icônes à la zone actuelle pour conserver une carte lisible.',whyRecommended:['Référence connue pour la navigation de quêtes','Complète la carte sans imposer un guide de leveling','Se combine bien avec TomTom'],features:['Objectifs affichés sur la carte','Quêtes disponibles à proximité','Suivi des objectifs en cours']},
    'questtogether':{bestFor:'Synchroniser plus clairement la progression d’un groupe en quête.',setupAdvice:'Tous les membres doivent vérifier qu’ils suivent la même étape avant de partir.',whyRecommended:['Réduit les incompréhensions pendant les suites de quêtes','Pensé pour les sessions en groupe'],features:['Suivi de quêtes de groupe','Repérage de la progression commune','Aide à la coordination des objectifs']},
    'azeroth-pilot-reloaded':{bestFor:'Suivre un parcours de leveling rapide et très dirigé.',setupAdvice:'Désactivez les automatismes ou étapes qui nuisent à votre rythme de lecture.',whyRecommended:['Propose une route de progression ordonnée','Réduit les détours pendant le leveling'],features:['Étapes successives intégrées','Itinéraires de montée en niveau','Indications de déplacement']},
    'restedxp-guide':{bestFor:'Suivre des guides de progression détaillés étape par étape.',setupAdvice:'N’utilisez pas simultanément plusieurs guides principaux pour éviter les consignes contradictoires.',whyRecommended:['Guidage détaillé directement en jeu','Parcours adaptés à une progression planifiée'],features:['Guides de leveling intégrés','Étapes et objectifs ordonnés','Suivi de progression du guide']},
    'tomtom':{bestFor:'Partager des coordonnées et rejoindre rapidement un point précis.',setupAdvice:'Supprimez les anciens points de passage pour ne garder qu’une destination claire.',whyRecommended:['Format /way largement partagé dans la communauté','Complément naturel des guides et objets RP'],features:['Création de points de passage','Flèche directionnelle','Gestion de coordonnées partagées']},
    'guildmap':{bestFor:'Repérer les membres de sa guilde pendant les activités en monde ouvert.',setupAdvice:'Vérifiez les réglages de partage avant une activité de guilde.',whyRecommended:['Facilite les regroupements spontanés','Donne une vue d’ensemble des membres présents'],features:['Positions des membres sur la carte','Repères de guilde','Aide au regroupement']},
    'dungeonjournal':{bestFor:'Préparer un donjon en consultant quêtes, boss et butins.',setupAdvice:'Croisez les butins affichés avec votre version du jeu lorsqu’un patch vient de sortir.',whyRecommended:['Centralise plusieurs informations de préparation','Évite de quitter le jeu pour les repères essentiels'],features:['Quêtes de donjon','Emplacements et informations de boss','Tables de butin']},
    'atlas':{bestFor:'Consulter rapidement les cartes des instances classiques.',setupAdvice:'Associez-le à un addon de butin si vous avez besoin d’informations détaillées sur les récompenses.',whyRecommended:['Navigation classique et familière','Cartes accessibles directement en jeu'],features:['Cartes d’instances','Navigation entre les donjons','Repères visuels des zones']},
    'attune':{bestFor:'Suivre les prérequis et étapes d’accès aux contenus.',setupAdvice:'Validez chaque étape sur le personnage concerné avant de rejoindre un groupe.',whyRecommended:['Rend visibles les chaînes d’accès longues','Aide à coordonner la progression d’un groupe'],features:['Suivi des harmonisations','Étapes et prérequis','Progression par personnage']},
    'nova-instance-tracker':{bestFor:'Contrôler ses verrouillages et son historique d’instances.',setupAdvice:'Sauvegardez ses données avant de réinitialiser les SavedVariables.',whyRecommended:['Évite les entrées inutiles','Pratique lorsque plusieurs personnages tournent en instance'],features:['Historique des entrées','Suivi des verrouillages','Temps, or et expérience de session']},
    'lootified':{bestFor:'Construire une liste de butin et suivre ses objectifs BiS sur Forever.',setupAdvice:'Traitez toute liste BiS comme un repère à adapter à votre spécialisation et votre groupe.',whyRecommended:['Pensé pour le butin de WoW: Forever','Relie objectifs d’équipement et sources de butin'],features:['Journal de butin','Assistant Best in Slot','Suivi des objets recherchés']},
    'forever-dungeon-scout':{bestFor:'Obtenir un aperçu léger des donjons de WoW: Forever.',setupAdvice:'Contrôlez les informations après les mises à jour qui modifient boss ou récompenses.',whyRecommended:['Conçu autour de Forever','Alternative légère pour préparer une instance'],features:['Guides de donjons','Informations synthétiques','Consultation rapide avant le départ']},
    'cooldown-manager-centered':{bestFor:'Ramener les temps de recharge importants près du centre de l’écran.',setupAdvice:'N’affichez que les compétences qui déclenchent réellement une décision.',whyRecommended:['Améliore la lecture des recharges importantes','Réduit les mouvements du regard en combat'],features:['Icônes de recharge repositionnables','Suivi d’améliorations','Barres et alertes configurables']},
    'minicc':{bestFor:'Voir les contrôles, défensifs et sorts importants sans interface lourde.',setupAdvice:'Commencez avec peu d’alertes puis ajoutez uniquement celles qui manquent en situation réelle.',whyRecommended:['Affichage compact','Utile en donjon comme en raid'],features:['Suivi des contrôles','Alertes de défensifs','Notifications de sorts importants']},
    'nkthreat':{bestFor:'Surveiller la menace et les provocations en groupe.',setupAdvice:'Placez le compteur près de la cible et gardez une marge avant les phases de burst.',whyRecommended:['Lecture immédiate de la menace','Aide tanks et DPS à coordonner leur rythme'],features:['Menace en temps réel','Estimation TPS','Alertes de provocation']},
    'whodoeswhat':{bestFor:'Distribuer les responsabilités et bénédictions en raid.',setupAdvice:'Confirmez les assignations avec le groupe avant le premier combat.',whyRecommended:['Clarifie les responsabilités collectives','Réduit les doublons et oublis en raid'],features:['Assignations de raid','Répartition des bénédictions','Vue partagée des responsabilités']},
    'blizzmove':{bestFor:'Déplacer les fenêtres Blizzard sans remplacer toute l’interface.',setupAdvice:'Commencez par les cadres les plus gênants et testez leur position sur petit écran.',whyRecommended:['Modification ciblée et légère','Conserve l’apparence native du jeu'],features:['Déplacement par glisser-déposer','Prise en charge de nombreuses fenêtres Blizzard','Positionnement personnalisé']},
    'darkmode':{bestFor:'Réduire la luminosité des cadres et uniformiser une interface sombre.',setupAdvice:'Contrôlez la lisibilité des textes et états sélectionnés après activation.',whyRecommended:['Améliore le confort dans une pièce sombre','Modification visuelle simple'],features:['Assombrissement des fenêtres','Style cohérent des cadres','Réduction des surfaces très claires']},
    'fontmagic':{bestFor:'Adapter polices et tailles aux besoins de lisibilité.',setupAdvice:'Évitez les polices décoratives pour les informations de combat urgentes.',whyRecommended:['Répond aux besoins de lisibilité variés','Permet d’uniformiser les textes de combat'],features:['Choix de polices','Réglage des tailles','Personnalisation des textes de combat']},
    'plumber':{bestFor:'Ajouter plusieurs améliorations ciblées à l’interface Blizzard.',setupAdvice:'Désactivez les modules qui doublonnent avec vos autres addons.',whyRecommended:['Regroupe de nombreux petits gains de confort','Modules utilisables indépendamment'],features:['Améliorations de butin','Informations de difficulté','Modules d’interface variés']},
    'wildutools':{bestFor:'Automatiser des tâches répétitives tout en conservant l’interface Blizzard.',setupAdvice:'Relisez chaque option d’automatisation avant de l’activer.',whyRecommended:['Nombreux réglages de confort dans un seul addon','S’intègre à l’interface existante'],features:['Améliorations de cadres Blizzard','Automatisation configurable','Outils de confort généraux']},
    'auctionator':{bestFor:'Acheter, vendre et suivre les prix avec une interface d’enchères plus claire.',setupAdvice:'Actualisez les données avant de prendre une décision de prix importante.',whyRecommended:['Simplifie l’hôtel des ventes','Aide à comparer les prix rapidement'],features:['Recherche améliorée','Mise en vente simplifiée','Historique et comparaison de prix']},
    'better-fishing':{bestFor:'Rendre les sessions de pêche plus confortables.',setupAdvice:'Vérifiez que les raccourcis choisis ne déclenchent pas d’autres actions.',whyRecommended:['Réduit les manipulations répétitives','Reste centré sur une fonction précise'],features:['Pêche via raccourci de ciblage','Interaction au double-clic','Réglages de confort de pêche']},
    'speedyautoloot':{bestFor:'Réduire le délai de récupération automatique du butin.',setupAdvice:'Testez-le seul si des fenêtres de butin se ferment mal ou si un objet reste au sol.',whyRecommended:['Gain de temps lors des sessions intensives','Fonction simple et ciblée'],features:['Récupération automatique accélérée','Traitement rapide des fenêtres de butin','Fonctionnement discret']},
    'wim-3':{bestFor:'Séparer les conversations privées du flux principal du chat.',setupAdvice:'Limitez le nombre de fenêtres conservées pour éviter d’encombrer l’écran.',whyRecommended:['Historique plus lisible des chuchotements','Pratique pour organiser plusieurs conversations'],features:['Fenêtres de messagerie dédiées','Historique des échanges','Gestion séparée des chuchotements']},
    'bug-grabber':{bestFor:'Capturer les erreurs Lua sans interrompre la partie.',setupAdvice:'Utilisez-le avec BugSack pour consulter et transmettre les erreurs.',whyRecommended:['Évite les fenêtres d’erreur répétitives','Base utile pour tout diagnostic addon'],features:['Capture des erreurs Lua','Collecte silencieuse','Transmission des erreurs à une interface de lecture']},
    'bugsack':{bestFor:'Lire, trier et copier les erreurs capturées par BugGrabber.',setupAdvice:'Relevez la première erreur de la pile avant les erreurs en cascade.',whyRecommended:['Journal lisible pour le dépannage','Complément naturel de BugGrabber'],features:['Centralisation des erreurs','Navigation dans les piles Lua','Copie des traces pour signalement']}
  };
  const addons=legacyAddons.map(([title,category,description,author,slug,tags],index)=>({
    type:'addon',slug,title,name:title,description,author,categories:[category],category,
    wowFlavor:['Forever'],foreverCompatibility:'retest',status:'unknown',tested:false,version:null,gameVersion:null,
    verifiedDate,verificationStatus:'À retester',recommended:index<3,features:[],commands:[],warnings:['Compatibilité à confirmer après une nouvelle version du jeu.'],
    tags,sources:[curseforge(slug)],curseforgeUrl:curseforge(slug).url,sourceUrl:null,...addonEnrichment[slug]
  }));
  addons.push({
    type:'addon',slug:'hunters-field-guide',title:"Hunter's Field Guide",name:"Hunter's Field Guide",
    description:'Un journal de terrain pour les chasseurs permettant de découvrir et cataloguer les bêtes domptables, leurs capacités et leurs emplacements.',
    author:'Alezyzz',categories:['hunter','map'],category:'hunter',wowFlavor:['Forever','Classic'],foreverCompatibility:'native',status:'beta',tested:false,
    version:'0.2.0',gameVersion:'1.60.1',verifiedDate,verificationStatus:'Information bêta',recommended:true,
    bestFor:'Découvrir, cataloguer et comparer les familiers pendant le leveling d’un chasseur.',setupAdvice:'Gardez les données masquées pour préserver la découverte, ou activez leur révélation complète dans les options.',
    whyRecommended:['Conçu spécifiquement pour WoW: Forever','Encyclopédie des familiers directement en jeu','Utile pendant le leveling du chasseur','Suit la découverte et les compétences de familier','Intégré à la carte du monde'],
    features:['501 bêtes domptables référencées','18 familles de familiers, dont la famille Fox','Pages par famille avec statistiques et régime','Progression de découverte','Pages de capacités et de rangs','Liste des bêtes enseignant chaque rang','Carte des points d’apparition et pins optionnels','Panneau sous la cible et informations dans les tooltips','Recherche par bête, famille, zone ou capacité','Apparences spellbook Forever et Classic'],
    discovery:['Une bête domptable ciblée est enregistrée avec son nom, son niveau, sa famille et sa position.','Beast Lore révèle les capacités et les rangs qu’elle peut enseigner.','Les données restent masquées jusqu’à leur découverte, sauf option explicite de révélation.'],
    commands:[{label:'Ouvrir le journal',value:'/fg'},{label:'Ouvrir les paramètres',value:'/fg config'},{label:'Exporter les nouvelles données',value:'/fg export'}],
    warnings:['Addon créé pendant la bêta de WoW: Forever.','La partie Beast Lore n’était pas considérée comme totalement testée par son auteur lors de la vérification.'],
    tags:['hunter','chasseur','familier','pet','tame','domptage','beast lore','forever','map','journal','skills','capacités'],
    sources:[curseforge('hunters-field-guide')],curseforgeUrl:curseforge('hunters-field-guide').url,sourceUrl:null,license:'MIT'
  });

  const tips=[
  {
    "type": "astuce",
    "slug": "construire-pack-propre",
    "title": "Installer ses addons sans les empiler",
    "description": "Commencez avec les outils dont vous avez besoin, puis ajoutez une fonction à la fois. Vous pourrez retrouver plus facilement l’origine d’un problème.",
    "facts": [
      "10 min",
      "Avant connexion",
      "Dossier AddOns"
    ],
    "steps": [
      "Quittez le jeu et choisissez un fichier annoncé compatible avec WoW: Forever ; une version Retail ou Classic ne garantit pas cette compatibilité.",
      "Placez les dossiers de l’addon dans Interface/AddOns du client utilisé. Vérifiez qu’ils ne sont pas enfermés dans un deuxième dossier issu de l’archive.",
      "Relancez le jeu, activez l’addon à la sélection des personnages et testez une action simple avant d’en ajouter un autre.",
      "Si deux addons remplissent le même rôle, commencez avec un seul. Gardez BugGrabber et BugSack si vous souhaitez consulter les erreurs."
    ],
    "note": "Un nouvel addon demande un redémarrage du jeu. /reload sert à recharger les addons déjà reconnus, pas à découvrir une nouvelle installation.",
    "tags": [
      "installation",
      "addons",
      "bugsack"
    ],
    "image": "/assets/bugsack-catalog-32366a1116.webp",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Sources consultées",
    "sources": [
      {
        "label": "Wowhead · installation et entretien des addons",
        "url": "https://www.wowhead.com/guide/addons-how-to-install-and-maintain-1998"
      },
      {
        "label": "BugSack · documentation de l’auteur",
        "url": "https://www.curseforge.com/wow/addons/bugsack"
      }
    ],
    "category": "Installation",
    "imageAlt": "Fenêtre de BugSack affichant une erreur Lua et sa pile",
    "imageCaption": "Capture publiée par l’auteur de BugSack sur CurseForge. L’apparence peut varier selon le client et la version.",
    "imagePage": "https://www.curseforge.com/wow/addons/bugsack",
    "relatedAddon": "bugsack"
  },
  {
    "type": "astuce",
    "slug": "preparer-liste-butin",
    "title": "Choisir un donjon pour son butin",
    "description": "Repérez quelques objets utiles et les quêtes associées avant de proposer une sortie au groupe.",
    "facts": [
      "10 min",
      "Avant instance",
      "Lootified"
    ],
    "steps": [
      "Ouvrez Lootified avec /lf et consultez les donjons adaptés au niveau de votre personnage.",
      "Dans le butin, filtrez les objets utilisables ou les améliorations, puis retenez deux ou trois objectifs accessibles.",
      "Consultez les boss et les quêtes du donjon : certaines récompenses demandent une suite de quêtes à préparer.",
      "Partagez vos objectifs et les règles de butin avec le groupe avant de partir."
    ],
    "note": "Le classement BiS de Lootified dépend des pondérations de statistiques. Comparez aussi votre équipement et votre rôle ; ce classement n’est pas une promesse de gain.",
    "tags": [
      "butin",
      "donjon",
      "lootified"
    ],
    "image": "/assets/lootified-catalog-0a44925ffc.webp",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Sources consultées",
    "sources": [
      {
        "label": "Lootified · documentation de l’auteur",
        "url": "https://www.curseforge.com/wow/addons/lootified"
      },
      {
        "label": "Lootified · présentation par son créateur à la communauté",
        "url": "https://www.reddit.com/r/wowforever/comments/1wrs5yi/lootified_i_made_an_addon_so_i_dont_need_10/"
      }
    ],
    "category": "Donjons",
    "imageAlt": "Journal de butin et recherche d’objets dans Lootified",
    "imageCaption": "Capture publiée par l’auteur de Lootified sur CurseForge. L’apparence peut varier selon le client et la version.",
    "imagePage": "https://www.curseforge.com/wow/addons/lootified",
    "relatedAddon": "lootified"
  },
  {
    "type": "astuce",
    "slug": "queter-sans-perdre-nord",
    "title": "Quêter avec une carte lisible",
    "description": "Utilisez les marqueurs comme des repères, tout en gardant le texte des quêtes et votre itinéraire au premier plan.",
    "facts": [
      "5 min",
      "Monde ouvert",
      "Questie"
    ],
    "steps": [
      "Installez une version de Questie compatible Forever et ouvrez la carte de votre zone.",
      "Dans les options, réduisez les catégories de marqueurs inutiles à votre session plutôt que de tout afficher.",
      "Regroupez les objectifs proches et lisez le journal si un marqueur manque ou si la quête demande une action particulière.",
      "Ajoutez TomTom si vous voulez une flèche de navigation ; Questie ne fournit pas cette flèche à lui seul."
    ],
    "note": "La documentation de Questie distingue les marqueurs de quête et la flèche TomTom. Une absence de marqueur ne prouve pas qu’une quête est impossible.",
    "tags": [
      "quête",
      "questie",
      "tomtom"
    ],
    "image": "/assets/questie-catalog-850c25ef32.webp",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Sources consultées",
    "sources": [
      {
        "label": "Questie · documentation de l’auteur",
        "url": "https://www.curseforge.com/wow/addons/questie"
      },
      {
        "label": "Questie · wiki officiel du projet",
        "url": "https://github.com/Questie/Questie/wiki/"
      }
    ],
    "category": "Exploration",
    "imageAlt": "Carte de WoW avec les marqueurs de quête de Questie",
    "imageCaption": "Capture publiée par l’auteur de Questie sur CurseForge. L’apparence peut varier selon le client et la version.",
    "imagePage": "https://www.curseforge.com/wow/addons/questie",
    "relatedAddon": "questie"
  },
  {
    "type": "astuce",
    "slug": "maitriser-verrouillages",
    "title": "Vérifier ses accès aux instances",
    "description": "Consultez votre historique et les informations du jeu avant de rejoindre une nouvelle sortie.",
    "facts": [
      "2 min",
      "Avant départ",
      "Nova Instance Tracker"
    ],
    "steps": [
      "Ouvrez Nova Instance Tracker avec /nit pour retrouver vos passages récents en instance.",
      "Vérifiez le personnage et le donjon concernés, puis consultez les informations de verrouillage affichées par le jeu.",
      "Prévenez le groupe si un accès est bloqué ou si vous avez déjà participé à l’instance prévue.",
      "Après un changement de client ou une réinitialisation des données, contrôlez le suivi sur une première sortie."
    ],
    "note": "Les limites documentées pour Classic ne doivent pas être reprises comme des règles Forever. L’historique de l’addon aide au suivi ; les restrictions du jeu font foi.",
    "tags": [
      "donjon",
      "verrouillage"
    ],
    "image": "/assets/nova-instance-tracker-catalog-acfb564edc.webp",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Sources consultées",
    "sources": [
      {
        "label": "Nova Instance Tracker · documentation de l’auteur",
        "url": "https://www.curseforge.com/wow/addons/nova-instance-tracker"
      }
    ],
    "category": "Donjons",
    "imageAlt": "Historique des instances dans Nova Instance Tracker",
    "imageCaption": "Capture publiée par l’auteur de Nova Instance Tracker sur CurseForge. L’apparence peut varier selon le client et la version.",
    "imagePage": "https://www.curseforge.com/wow/addons/nova-instance-tracker",
    "relatedAddon": "nova-instance-tracker"
  },
  {
    "type": "astuce",
    "slug": "lire-menace",
    "title": "Lire la menace disponible sur Forever",
    "description": "Réagissez aux états de menace visibles et au rythme du tank, sans attendre des chiffres que le client peut masquer.",
    "facts": [
      "5 min",
      "En groupe",
      "NKThreat"
    ],
    "steps": [
      "Installez la version Forever de NKThreat et placez son indicateur sans couvrir votre cible ni le sol.",
      "Repérez les états de menace disponibles sur votre cible : situation sûre, danger ou cible qui vous attaque.",
      "Si la situation devient dangereuse, adaptez vos dégâts et utilisez une réduction de menace si votre classe en possède une.",
      "Convenez avec le tank d’un rythme d’ouverture et signalez une reprise de cible."
    ],
    "note": "L’auteur indique que Forever peut masquer les chiffres de menace et limiter les annonces ou le suivi de provocations. Un indicateur absent ne signifie pas une menace nulle.",
    "tags": [
      "combat",
      "menace"
    ],
    "image": "/assets/nkthreat-catalog-44cdd25897.webp",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Sources consultées",
    "sources": [
      {
        "label": "NKThreat · documentation de l’auteur",
        "url": "https://www.curseforge.com/wow/addons/nkthreat"
      }
    ],
    "category": "Combat",
    "imageAlt": "Indicateurs de menace de NKThreat",
    "imageCaption": "Capture publiée par l’auteur de NKThreat sur CurseForge. L’apparence peut varier selon le client et la version.",
    "imagePage": "https://www.curseforge.com/wow/addons/nkthreat",
    "relatedAddon": "nkthreat"
  },
  {
    "type": "astuce",
    "slug": "traquer-erreur-lua",
    "title": "Isoler une erreur Lua",
    "description": "Conservez le message complet et cherchez une reproduction simple avant d’accuser un addon.",
    "facts": [
      "10 min",
      "Après une erreur",
      "BugGrabber + BugSack"
    ],
    "steps": [
      "Installez BugGrabber et BugSack ensemble : le premier collecte les erreurs, le second les affiche.",
      "Reproduisez une seule action, puis copiez le message et la pile complète dans BugSack.",
      "Mettez à jour l’addon suspect et ses dépendances. Testez ensuite avec ce petit ensemble activé.",
      "Réactivez les autres addons par lots. Notez les versions et l’action déclenchante si vous ouvrez un rapport chez l’auteur."
    ],
    "note": "Le premier nom dans la pile est une piste, pas une preuve. Une bibliothèque partagée ou un conflit peut faire apparaître un autre addon.",
    "tags": [
      "lua",
      "dépannage",
      "bugsack"
    ],
    "image": "/assets/bugsack-catalog-32366a1116.webp",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Sources consultées",
    "sources": [
      {
        "label": "BugSack · documentation de l’auteur",
        "url": "https://www.curseforge.com/wow/addons/bugsack"
      },
      {
        "label": "Wowhead · installation et entretien des addons",
        "url": "https://www.wowhead.com/guide/addons-how-to-install-and-maintain-1998"
      }
    ],
    "category": "Dépannage",
    "imageAlt": "Fenêtre de BugSack affichant une erreur Lua et sa pile",
    "imageCaption": "Capture publiée par l’auteur de BugSack sur CurseForge. L’apparence peut varier selon le client et la version.",
    "imagePage": "https://www.curseforge.com/wow/addons/bugsack",
    "relatedAddon": "bugsack"
  },
  {
    "type": "astuce",
    "slug": "preparer-groupe",
    "title": "Préparer une sortie en groupe",
    "description": "Un rendez-vous précis et quelques vérifications évitent de découvrir les problèmes à l’entrée du donjon.",
    "facts": [
      "5 min",
      "Avant groupe",
      "Groupe + TomTom"
    ],
    "steps": [
      "Confirmez le donjon, les rôles et les règles de butin avec les autres joueurs.",
      "Réparez votre équipement, libérez des places dans les sacs et vérifiez les consommables ou composants utiles à votre classe.",
      "Envoyez la zone et les coordonnées de l’entrée, avec un repère compréhensible par ceux qui n’utilisent pas TomTom.",
      "Annoncez votre temps de trajet et vérifiez les accès ou prérequis avant que le groupe ne parte."
    ],
    "note": "TomTom aide à rejoindre un point ; sa flèche ne garantit pas un chemin praticable. Une montagne, une grotte ou une entrée à un autre niveau peut demander un détour.",
    "tags": [
      "groupe",
      "donjon"
    ],
    "image": "/assets/tomtom-catalog-07aad5f0da.webp",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Sources consultées",
    "sources": [
      {
        "label": "TomTom · documentation de l’auteur",
        "url": "https://www.curseforge.com/wow/addons/tomtom"
      }
    ],
    "category": "Donjons",
    "imageAlt": "Repère et flèche de navigation de TomTom",
    "imageCaption": "Capture publiée par l’auteur de TomTom sur CurseForge. L’apparence peut varier selon le client et la version.",
    "imagePage": "https://www.curseforge.com/wow/addons/tomtom",
    "relatedAddon": "tomtom"
  },
  {
    "type": "astuce",
    "slug": "interface-lisible",
    "title": "Aménager une interface lisible",
    "description": "Gardez la cible et les informations utiles visibles, puis ajustez les fenêtres qui gênent votre lecture.",
    "facts": [
      "10 min",
      "Hors combat",
      "BlizzMove"
    ],
    "steps": [
      "Commencez par les options du jeu pour régler l’échelle et les éléments disponibles sur votre client.",
      "Avec BlizzMove, faites glisser le titre d’une fenêtre compatible pour la déplacer.",
      "Utilisez Ctrl + molette sur son titre pour ajuster son échelle. Testez un changement à la fois.",
      "Ouvrez carte, livre de sorts et sacs pour vérifier les chevauchements, puis testez votre disposition en jeu."
    ],
    "note": "BlizzMove déplace des fenêtres Blizzard compatibles ; ce n’est pas un remplacement complet du HUD. Maj + clic droit réinitialise la position, Ctrl + clic droit l’échelle.",
    "tags": [
      "interface",
      "hud",
      "lisibilité"
    ],
    "image": "/assets/blizzmove-catalog-f664c05aaa.webp",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Sources consultées",
    "sources": [
      {
        "label": "BlizzMove · documentation de l’auteur",
        "url": "https://www.curseforge.com/wow/addons/blizzmove"
      }
    ],
    "category": "Interface",
    "imageAlt": "Fenêtres Blizzard déplacées avec BlizzMove",
    "imageCaption": "Capture publiée par l’auteur de BlizzMove sur CurseForge. L’apparence peut varier selon le client et la version.",
    "imagePage": "https://www.curseforge.com/wow/addons/blizzmove",
    "relatedAddon": "blizzmove"
  },
  {
    "type": "astuce",
    "slug": "sauvegarder-interface",
    "title": "Sauvegarder ses réglages avant une mise à jour",
    "description": "Gardez une copie datée des addons et de leurs réglages avant un changement important.",
    "facts": [
      "5 min",
      "Jeu fermé",
      "Interface + WTF"
    ],
    "steps": [
      "Quittez complètement WoW pour que les réglages de la session soient enregistrés.",
      "Ouvrez le dossier du client avec lequel vous jouez, puis copiez Interface et WTF dans un dossier de sauvegarde extérieur.",
      "Nommez la copie avec la date et la version du client. Vérifiez que les deux dossiers et leurs fichiers sont présents.",
      "Pour revenir à cette copie, fermez le jeu et conservez d’abord les dossiers actuels sous un autre nom. Restaurez une sauvegarde compatible avec votre client."
    ],
    "note": "Interface contient les addons ; WTF contient notamment leurs réglages. Copier les addons seuls ne sauvegarde donc pas toute votre configuration.",
    "tags": [
      "sauvegarde",
      "mise à jour",
      "wtf"
    ],
    "image": "/assets/blizzmove-catalog-f664c05aaa.webp",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Sources consultées",
    "sources": [
      {
        "label": "Wowhead · installation et entretien des addons",
        "url": "https://www.wowhead.com/guide/addons-how-to-install-and-maintain-1998"
      }
    ],
    "category": "Interface",
    "imageAlt": "Fenêtres Blizzard déplacées avec BlizzMove",
    "imageCaption": "Exemple de fenêtres déplacées avec BlizzMove : leurs réglages font partie de la configuration à préserver. Cette capture ne représente pas la procédure de copie des dossiers.",
    "imagePage": "https://www.curseforge.com/wow/addons/blizzmove",
    "relatedAddon": "blizzmove"
  },
  {
    "type": "astuce",
    "slug": "diagnostiquer-baisse-fps",
    "title": "Comparer les FPS avant de changer les réglages",
    "description": "Cherchez si le ralentissement vient des addons ou du rendu avec deux essais aussi comparables que possible.",
    "facts": [
      "10 min",
      "Après ralentissement",
      "Test comparatif"
    ],
    "steps": [
      "Notez les FPS dans une zone précise avec une caméra et une activité faciles à reproduire.",
      "À la sélection des personnages, désactivez les addons, reconnectez-vous au même endroit et comparez.",
      "Si la situation s’améliore, réactivez les addons par lots pour identifier le groupe concerné.",
      "Si elle ne change pas, comparez une option graphique à la fois. Notez sa valeur initiale pour pouvoir revenir en arrière."
    ],
    "note": "Une mesure en ville vide et une mesure en combat chargé ne sont pas comparables. La mémoire occupée par un addon ne mesure pas, à elle seule, son coût en FPS.",
    "tags": [
      "fps",
      "performance",
      "diagnostic"
    ],
    "image": "/assets/cooldown-manager-centered-catalog-1e21ceab3f.webp",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Sources consultées",
    "sources": [
      {
        "label": "Wowhead · installation et entretien des addons",
        "url": "https://www.wowhead.com/guide/addons-how-to-install-and-maintain-1998"
      },
      {
        "label": "Blizzard · diagnostic des ressources et de l’interface",
        "url": "https://eu.support.blizzard.com/en/article/6926"
      }
    ],
    "category": "Dépannage",
    "imageAlt": "Interface de jeu avec des indicateurs de recharge centrés",
    "imageCaption": "Exemple d’interface personnalisée avec Cooldown Manager Centered. Cette capture illustre des éléments affichés en jeu ; elle ne constitue pas une mesure de performances.",
    "imagePage": "https://www.curseforge.com/wow/addons/cooldown-manager-centered",
    "relatedAddon": "cooldown-manager-centered"
  },
  {
    "type": "astuce",
    "slug": "partager-point-passage",
    "title": "Partager des coordonnées avec TomTom",
    "description": "Envoyez une destination avec sa zone et son objectif, plutôt qu’une paire de nombres sans contexte.",
    "facts": [
      "2 min",
      "Monde ouvert",
      "TomTom"
    ],
    "steps": [
      "Dans la zone concernée, utilisez par exemple /way 45 50 Rendez-vous pour placer un repère nommé.",
      "Pour un point dans une autre zone, indiquez aussi le nom de la zone reconnu par votre client.",
      "Si /way est utilisé par un autre addon, employez /tway, l’alias de TomTom.",
      "Une fois le trajet terminé, retirez le repère devenu inutile. /tway reset all efface tous les points : utilisez cette commande uniquement si c’est votre intention."
    ],
    "note": "Les coordonnées décimales utilisent un point, par exemple 45.5. Le nom de zone dépend de la langue du client ; accompagnez toujours les coordonnées d’un repère en clair.",
    "tags": [
      "tomtom",
      "waypoint",
      "groupe"
    ],
    "image": "/assets/tomtom-catalog-07aad5f0da.webp",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Sources consultées",
    "sources": [
      {
        "label": "TomTom · documentation de l’auteur",
        "url": "https://www.curseforge.com/wow/addons/tomtom"
      },
      {
        "label": "TomTom · commandes dans le dépôt du projet",
        "url": "https://github.com/MURPHYENGINEERING/tomtom"
      }
    ],
    "category": "Exploration",
    "imageAlt": "Repère et flèche de navigation de TomTom",
    "imageCaption": "Capture publiée par l’auteur de TomTom sur CurseForge. L’apparence peut varier selon le client et la version.",
    "imagePage": "https://www.curseforge.com/wow/addons/tomtom",
    "relatedAddon": "tomtom"
  },
  {
    "type": "astuce",
    "slug": "preparer-familier-chasseur",
    "title": "Tenir son carnet de familiers",
    "description": "Documentez les bêtes rencontrées et les capacités qui vous intéressent sans révéler toute la carte.",
    "facts": [
      "5 min",
      "En exploration",
      "Hunter’s Field Guide"
    ],
    "steps": [
      "Ouvrez le journal avec /fg et choisissez une famille ou une capacité à rechercher.",
      "Gardez la révélation générale désactivée si vous préférez découvrir les bêtes en voyageant.",
      "Ciblez une bête domptable pour enregistrer sa découverte. Lancez Connaissance des bêtes pour révéler les capacités prises en charge.",
      "Comparez les rangs, le niveau requis du familier et les emplacements indiqués avant de préparer votre prochaine capture."
    ],
    "note": "L’auteur signale que Connaissance des bêtes n’a pas encore été entièrement testée pendant la bêta Forever. Si une donnée semble manquer, vérifiez en jeu avant de changer de familier.",
    "tags": [
      "chasseur",
      "familier",
      "beast lore"
    ],
    "image": "/assets/hunters-field-guide-catalog-de3b472544.webp",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Sources consultées",
    "sources": [
      {
        "label": "Hunter’s Field Guide · documentation de l’auteur",
        "url": "https://www.curseforge.com/wow/addons/hunters-field-guide"
      }
    ],
    "category": "Chasseur",
    "imageAlt": "Journal des bêtes et capacités de Hunter’s Field Guide",
    "imageCaption": "Capture publiée par l’auteur de Hunter's Field Guide sur CurseForge. L’apparence peut varier selon le client et la version.",
    "imagePage": "https://www.curseforge.com/wow/addons/hunters-field-guide",
    "relatedAddon": "hunters-field-guide"
  }
];

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
    {type:'objet',slug:'torche-de-veillebois',title:'Torche du guetteur de nuit',description:'Un jouet lumineux obtenu avec la quête rapide « Une triste fin », auprès du corps d’un Garde des Veilleurs à la Colline-aux-corbeaux.',category:'Jouets & lumière',zone:'Bois de la pénombre — Colline-aux-corbeaux',coordinates:'Variables : le corps change d’emplacement',way:null,prerequisites:'Niveau 15 ; accessible à l’Alliance comme à la Horde',duration:'5 minutes',cooldown:'30 secondes',combat:'Non confirmé',indoors:'Non confirmé',accountBound:'Conservé dans les sacs ; liaison non confirmée',macro:'/tar Garde des Veilleurs',steps:['Rejoignez la Colline-aux-corbeaux, à l’ouest du Bois de la pénombre.','Cherchez le corps du Garde des Veilleurs ; utilisez /tar Garde des Veilleurs pour le repérer plus facilement.','Acceptez puis terminez la quête « Une triste fin », disponible à partir du niveau 15.','Utilisez le jouet depuis vos sacs pour brandir la torche pendant 5 minutes.'],notes:'Le corps peut apparaître à plusieurs endroits et finit par réapparaître ailleurs après une validation. Plusieurs joueurs peuvent néanmoins prendre la quête avant son déplacement. Nager éteint immédiatement la torche. Après la quête, un point d’interrogation bleu peut rester visible sans interaction possible.',tags:['torche','jouet','lumière','rp','bois de la pénombre','colline-aux-corbeaux','garde des veilleurs'],verifiedDate,verificationStatus:'Guide communautaire détaillé',image:'/assets/torche-jouet-forever.webp',gallery:[{src:'/assets/garde-veilleurs.webp',alt:'Corps du Garde des Veilleurs près d’une cabane dans le Bois de la pénombre',caption:'Le corps à cibler pour obtenir la quête.'},{src:'/assets/emplacement-garde-veilleurs.webp',alt:'Carte du Bois de la pénombre indiquant la Colline-aux-corbeaux à l’ouest',caption:'La zone de recherche : Colline-aux-corbeaux.'},{src:'/assets/torche-guetteur-nuit.webp',alt:'Personnage elfe de la nuit brandissant la Torche du guetteur de nuit',caption:'La torche allumée une fois le jouet utilisé.'}],sources:[{label:'Guide Mamytwink par Melody',url:'https://www.mamytwink.com/guides/wow-forever-guide-dobtention-du-jouet-torche-du-guetteur-de-nuit'},{label:'Fiche Wowhead Forever',url:'https://www.wowhead.com/forever/item=280612'}]},
    {type:'objet',slug:'torche-de-grayson',title:'Torche de Grayson',description:'Objet de main gauche obtenu auprès du capitaine Grayson au Phare de l’Ouest.',category:'Torches',zone:'Marche de l’Ouest',coordinates:null,way:null,prerequisites:'Quête « Menace sur la côte » au Phare de l’Ouest',duration:'Équipée',cooldown:'Aucun confirmé',combat:'Objet équipable',indoors:'Oui',accountBound:'Non confirmé',notes:'Récompense de quête de niveau 21.',tags:['torche','lumière','rp','grayson'],verifiedDate,verificationStatus:'Récompense de quête vérifiée',image:null,sources:[{label:'Quête Menace sur la côte',url:'https://www.wowhead.com/forever/fr/quest=104/menace-sur-la-c%C3%B4te'}]},
    {type:'objet',slug:'torche-flamme-eternelle',title:'Torche de la Flamme éternelle',description:'Objet de quête tenu en main gauche, utile comme accessoire de scène lorsqu’il reste disponible dans l’inventaire.',category:'Torches',zone:'Mille pointes',coordinates:null,way:null,prerequisites:'Objet lié à une quête ; disponibilité durable non confirmée',duration:'Équipée',cooldown:'Aucun confirmé',combat:'Objet de quête',indoors:'Non confirmé',accountBound:'Non',notes:'La conservation après la quête n’est pas confirmée : ne terminez aucune étape uniquement pour cet usage RP.',tags:['torche','quête','lumière','rp'],verifiedDate,verificationStatus:'Fiche objet vérifiée — usage RP à confirmer',image:'/assets/torch-rp.webp',sources:[{label:'Fiche Wowhead Forever',url:'https://www.wowhead.com/forever/fr/item=6654/torche-de-la-flamme-%C3%A9ternelle'}]},
    {type:'objet',slug:'torche-vindicte',title:'Torche de vindicte',description:'Grande torche de quête équipée à deux mains, adaptée aux scènes de procession ou de garde.',category:'Torches',zone:'Gangrebois',coordinates:null,way:null,prerequisites:'Objet de quête ; source et conservation à vérifier en jeu',duration:'Équipée',cooldown:'Aucun confirmé',combat:'Objet de quête à deux mains',indoors:'Non confirmé',accountBound:'Non',notes:'L’effet lumineux et la conservation sont rapportés par la communauté, pas garantis par la fiche objet.',tags:['torche','deux mains','lumière','rp'],verifiedDate,verificationStatus:'Fiche objet vérifiée — propriétés communautaires',image:'/assets/torch-rp.webp',sources:[{label:'Fiche Wowhead Forever',url:'https://www.wowhead.com/forever/fr/item=10515/torche-de-vindicte'}]},
    {type:'objet',slug:'deguisement-voile-hiver',title:'Déguisement pour le Voile d’hiver',description:'Consommable festif qui transforme le personnage en bonhomme de neige pour une scène hivernale.',category:'Déguisements',zone:'Événement du Voile d’hiver',coordinates:null,way:null,prerequisites:'Nécessite une boule de neige',duration:'Temporaire',cooldown:'Non confirmé',combat:'À éviter en combat',indoors:'Non confirmé',accountBound:'Non confirmé',notes:'Objet saisonnier : sa disponibilité dépend du calendrier de l’événement.',tags:['déguisement','hiver','bonhomme de neige','rp'],verifiedDate,verificationStatus:'Effet et prérequis vérifiés',image:null,sources:[{label:'Fiche Wowhead Forever',url:'https://www.wowhead.com/forever/fr/item=17712/d%C3%A9guisement-pour-le-voile-dhiver'}]},
    {type:'objet',slug:'four-en-fer',title:'Four en fer',description:'Objet de cuisine qui installe un four, pratique pour créer un décor de camp ou de cuisine.',category:'Cuisine & camp',zone:'Monde ouvert',coordinates:null,way:null,prerequisites:'Cuisine 300 et feu de cuisine à proximité',duration:'Non confirmée',cooldown:'1 heure',combat:'Hors combat recommandé',indoors:'Non confirmé',accountBound:'Non confirmé',notes:'La fiche confirme le niveau de cuisine, la recharge et le besoin d’un feu proche ; la durée du four reste à vérifier.',tags:['cuisine','camp','feu','rp'],verifiedDate,verificationStatus:'Prérequis vérifiés — durée à confirmer',image:null,sources:[{label:'Fiche Wowhead Forever',url:'https://www.wowhead.com/forever/fr/item=279982/four-en-fer'}]}
  ];

  const news=[
    {type:'actualite',slug:'notes-developpement-24-septembre-2026',title:'Notes de développement du 24 septembre 2026',description:'Équilibrage des classes, gestionnaire de temps de recharge et améliorations de la manette.',impact:['Ajustements de classes','Premiers tests du gestionnaire de temps de recharge','Améliorations de la navigation à la manette'],tags:['classes','ui','addons'],verifiedDate:'2026-09-28',verificationStatus:'Source officielle',sources:[{label:'Notes officielles Blizzard',url:'https://eu.forums.blizzard.com/en/wow/t/wow-forever-beta-development-notes-%E2%80%93-updated-24-september/631316'}]},
    {type:'actualite',slug:'client-1-60-1-69977',title:'Client 1.60.1.69977 : Mac et manette',description:'Correctifs d’affichage et de stabilité sur Mac et navigation améliorée à la manette.',impact:['Stabilité Mac','Sélection des personnages à la manette','Interaction avec les objets de quête'],tags:['client','mac','manette'],verifiedDate:'2026-09-28',verificationStatus:'Source officielle',sources:[{label:'Note Blizzard',url:'https://eu.forums.blizzard.com/en/wow/t/beta-client-update-23-september/630815'}]},
    {type:'actualite',slug:'systeme-heritage',title:'Le système d’héritage dévoilé',description:'65 défis, des points liés au compte et trois arbres d’avantages à spécialiser par personnage.',impact:['Nouvelle progression liée au compte','Choix d’avantages par personnage'],tags:['progression','héritage'],verifiedDate:'2026-09-28',verificationStatus:'Source officielle',sources:[{label:'Annonce Blizzard',url:'https://worldofwarcraft.blizzard.com/fr-fr/news/24307383'}]},
    {type:'actualite',slug:'eolides-wow-forever',title:'Les Éolides prennent leur envol',description:'Une zone de départ du niveau 1 à 12 et un choix d’allégeance entre Horde et Alliance.',impact:['Nouvelle race jouable','Zone de départ dédiée','Choix de faction'],tags:['éolides','race','quête'],verifiedDate:'2026-09-28',verificationStatus:'Source officielle',sources:[{label:'Annonce Blizzard',url:'https://worldofwarcraft.blizzard.com/fr-fr/news/24302071/d%C3%A9couvrez-les-%C3%A9olides-dans-wow-forever'}]},
    {type:'actualite',slug:'prenom-et-nom-personnage',title:'Prénom et nom pour chaque personnage',description:'Les personnages disposent désormais d’un nom complet unique à l’échelle de leur région.',impact:['Identité complète des personnages','Unicité régionale du nom complet'],tags:['identité','personnage','rp'],verifiedDate:'2026-09-28',verificationStatus:'Source officielle',sources:[{label:'Annonce Blizzard',url:'https://worldofwarcraft.blizzard.com/fr-fr/news/24304161/'}]},
    {type:'actualite',slug:'regles-de-jeu',title:'Les royaumes cèdent la place aux règles',description:'Normal, JcJ, Jeu de rôle et plus tard Extrême deviennent les portes d’entrée du monde.',impact:['Choix par règles de jeu','Normal, JcJ et Jeu de rôle disponibles'],tags:['royaumes','règles','jdr','jcj'],verifiedDate:'2026-09-28',verificationStatus:'Source officielle',sources:[{label:'Annonce Blizzard',url:'https://worldofwarcraft.blizzard.com/fr-fr/news/24302070/'}]},
    {type:'actualite',slug:'lancement-wow-forever',title:'WoW: Forever prépare son lancement',description:'Blizzard présente la nouvelle aventure et fixe la sortie mondiale au 5 novembre 2026.',impact:['Sortie annoncée au 5 novembre 2026','Préparation des personnages et communautés','Cadre général des nouveautés de Forever'],tags:['lancement','forever','calendrier'],verifiedDate:'2026-09-29',verificationStatus:'Source officielle',sources:[{label:'Annonce officielle Blizzard',url:'https://worldofwarcraft.blizzard.com/fr-fr/news/24302093/'}]},
    {type:'actualite',slug:'beta-wow-forever-ouverte',title:'La bêta de WoW: Forever est ouverte',description:'La phase bêta permet de tester les systèmes, l’interface et le contenu avant la sortie.',impact:['Retours attendus sur les systèmes en test','Compatibilité des addons susceptible d’évoluer','Données et équilibrage non définitifs'],tags:['bêta','test','addons'],verifiedDate:'2026-09-29',verificationStatus:'Source officielle',sources:[{label:'Cette semaine dans WoW',url:'https://worldofwarcraft.blizzard.com/fr-fr/news/24304074/'}]},
    {type:'actualite',slug:'panel-photos-retrouvees',title:'Les coulisses de Photos retrouvées',description:'Un panel officiel revient sur la création de cette fonctionnalité et sur son rôle dans l’exploration.',impact:['Nouveau contexte pour les amateurs d’exploration','Idées de parcours et de scènes communautaires','Mise en avant d’une fonctionnalité de découverte'],tags:['exploration','photos','communauté'],verifiedDate:'2026-09-29',verificationStatus:'Source officielle',sources:[{label:'Panel officiel Blizzard',url:'https://worldofwarcraft.blizzard.com/fr-fr/news/24304071/'}]}
  ];

  const presets=[
    {type:'preset',slug:'immersion',title:'Preset Immersion',description:'Végétation et météo renforcées avec priorité au rendu.',commands:['/console groundEffectDensity 128','/console weatherdensity 3','/console horizonstart 4000'],restore:'Les valeurs d’origine n’étant pas toutes confirmées, sauvegardez Config.wtf avant application.',tags:['graphismes','immersion'],verifiedDate,verificationStatus:'Information bêta',sources:commands.find(c=>c.slug==='ground-effect-density').sources},
    {type:'preset',slug:'performance',title:'Preset Performance',description:'Réduit les options coûteuses et active la résolution dynamique.',commands:['/console giquality 0','/console ssaotype 0','/console assaoBlurPassCount 1','/console DynamicRenderScale 1','/console DynamicRenderScaleMin 0.8'],restore:'Utilisez /console DynamicRenderScale 0 puis restaurez votre sauvegarde Config.wtf pour les valeurs non confirmées.',tags:['fps','performance'],verifiedDate,verificationStatus:'Information bêta',sources:commands.find(c=>c.slug==='giquality').sources},
    {type:'preset',slug:'cinematique',title:'Preset Cinématique',description:'Météo, distance et ambiance destinées aux captures.',commands:['/console weatherdensity 3','/console horizonstart 4000','/console shadowNumCascades 4','/console groundEffectDensity 128'],restore:'Les valeurs d’origine n’étant pas toutes confirmées, sauvegardez Config.wtf avant application.',tags:['graphismes','capture'],verifiedDate,verificationStatus:'Information bêta',sources:commands.find(c=>c.slug==='weather-density').sources}
  ];

  // Sélection du 30 septembre : mise à jour par slug, sans doublons.
  const septemberAddons=[
  {
    "slug": "forever-quest-tint",
    "title": "Forever Quest Tint",
    "name": "Forever Quest Tint",
    "category": "quetes",
    "categories": [
      "quetes"
    ],
    "description": "Colore les nouvelles quêtes de Forever en turquoise pour les distinguer des quêtes classiques.",
    "author": "xanastar",
    "image": "/assets/addon-forever-quest-tint.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1985/75/screenshot-2026-09-20-121627-png.png",
    "addedDate": "2026-09-30",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Fiche CurseForge consultée",
    "sourceNote": null,
    "tested": false,
    "status": "unknown",
    "foreverCompatibility": "retest",
    "wowFlavor": [
      "Forever"
    ],
    "tags": [
      "quetes",
      "sélection septembre",
      "Forever Quest Tint"
    ],
    "features": [],
    "commands": [],
    "warnings": [
      "Non testé en jeu par Nyaru."
    ],
    "sources": [
      {
        "label": "CurseForge",
        "url": "https://www.curseforge.com/wow/addons/forever-quest-tint"
      }
    ],
    "curseforgeUrl": "https://www.curseforge.com/wow/addons/forever-quest-tint"
  },
  {
    "slug": "offhand",
    "title": "Offhand",
    "name": "Offhand",
    "category": "interface",
    "categories": [
      "interface"
    ],
    "description": "Déplace cartes, sacs et fenêtres sur un second écran tout en gardant le jeu centré sur le principal.",
    "author": "N4UX",
    "image": "/assets/addon-offhand.webp",
    "imageKind": "capture",
    "imageSource": "https://raw.githubusercontent.com/N4UX-GIT/Offhand-DualMonitor/main/Website/assets/offhand-screenshot.jpg",
    "addedDate": "2026-09-30",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Fiche CurseForge consultée",
    "sourceNote": null,
    "tested": false,
    "status": "beta",
    "foreverCompatibility": "retest",
    "wowFlavor": [
      "Forever"
    ],
    "tags": [
      "interface",
      "sélection septembre",
      "Offhand"
    ],
    "features": [],
    "commands": [],
    "warnings": [
      "Non testé en jeu par Nyaru."
    ],
    "sources": [
      {
        "label": "CurseForge",
        "url": "https://www.curseforge.com/wow/addons/offhand"
      }
    ],
    "curseforgeUrl": "https://www.curseforge.com/wow/addons/offhand"
  },
  {
    "slug": "shotrange",
    "title": "ShotRange",
    "name": "ShotRange",
    "category": "combat",
    "categories": [
      "combat"
    ],
    "description": "Affiche sur les plaques ennemies un indicateur de portée pour la capacité de votre choix.",
    "author": "axetowers",
    "image": "/assets/addon-shotrange-d97210ce5a.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1975/273/normal-jpeg.jpeg",
    "addedDate": "2026-09-30",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Fiche CurseForge consultée",
    "sourceNote": null,
    "tested": false,
    "status": "unknown",
    "foreverCompatibility": "retest",
    "wowFlavor": [
      "Classic Era",
      "Classic TBC"
    ],
    "tags": [
      "combat",
      "sélection septembre",
      "ShotRange"
    ],
    "features": [],
    "commands": [],
    "warnings": [
      "L’auteur indique des tests sur Classic Era et TBC ; la compatibilité Forever reste à confirmer."
    ],
    "sources": [
      {
        "label": "CurseForge",
        "url": "https://www.curseforge.com/wow/addons/shotrange"
      }
    ],
    "curseforgeUrl": "https://www.curseforge.com/wow/addons/shotrange"
  },
  {
    "slug": "reverse-engineering-by-chills",
    "title": "Reverse Engineering",
    "name": "Reverse Engineering",
    "category": "confort",
    "categories": [
      "confort"
    ],
    "description": "Calcule les matières premières nécessaires à vos crafts, en tenant compte des composants déjà possédés.",
    "author": "IAmChills",
    "image": "/assets/addon-reverse-engineering-by-chills.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1980/305/4-png.png",
    "addedDate": "2026-09-30",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Fiche CurseForge consultée",
    "sourceNote": null,
    "tested": false,
    "status": "unknown",
    "foreverCompatibility": "retest",
    "wowFlavor": [
      "Forever"
    ],
    "tags": [
      "confort",
      "sélection septembre",
      "Reverse Engineering"
    ],
    "features": [],
    "commands": [],
    "warnings": [
      "Non testé en jeu par Nyaru."
    ],
    "sources": [
      {
        "label": "CurseForge",
        "url": "https://www.curseforge.com/wow/addons/reverse-engineering-by-chills"
      }
    ],
    "curseforgeUrl": "https://www.curseforge.com/wow/addons/reverse-engineering-by-chills"
  },
  {
    "slug": "roarforever",
    "title": "RoarForever",
    "name": "RoarForever",
    "category": "rp",
    "categories": [
      "rp"
    ],
    "description": "Rétablit les voix des emotes, comme /roar, avec les sons déjà présents dans le jeu.",
    "author": "BabuniGaming",
    "image": "/assets/addon-roarforever.webp",
    "imageKind": "logo",
    "imageSource": "https://media.forgecdn.net/avatars/thumbnails/2059/464/256/256/639255079886676656.png",
    "addedDate": "2026-09-30",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Fiche CurseForge consultée",
    "sourceNote": null,
    "tested": false,
    "status": "unknown",
    "foreverCompatibility": "retest",
    "wowFlavor": [
      "Forever"
    ],
    "tags": [
      "rp",
      "sélection septembre",
      "RoarForever"
    ],
    "features": [],
    "commands": [],
    "warnings": [
      "Non testé en jeu par Nyaru."
    ],
    "sources": [
      {
        "label": "CurseForge",
        "url": "https://www.curseforge.com/wow/addons/roarforever"
      }
    ],
    "curseforgeUrl": "https://www.curseforge.com/wow/addons/roarforever"
  },
  {
    "slug": "loot-triage",
    "title": "Loot Triage",
    "name": "Loot Triage",
    "category": "confort",
    "categories": [
      "confort"
    ],
    "description": "Quand vos sacs sont pleins, repère le butin intéressant et les objets les moins rentables à retirer.",
    "author": "Krelock",
    "image": "/assets/addon-loot-triage-aedb0a6f55.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1987/113/image-1790633376331-jpg.jpg",
    "addedDate": "2026-09-30",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Fiche CurseForge consultée",
    "sourceNote": null,
    "tested": false,
    "status": "unknown",
    "foreverCompatibility": "retest",
    "wowFlavor": [
      "Forever"
    ],
    "tags": [
      "confort",
      "sélection septembre",
      "Loot Triage"
    ],
    "features": [],
    "commands": [],
    "warnings": [
      "Non testé en jeu par Nyaru."
    ],
    "sources": [
      {
        "label": "CurseForge",
        "url": "https://www.curseforge.com/wow/addons/loot-triage"
      }
    ],
    "curseforgeUrl": "https://www.curseforge.com/wow/addons/loot-triage"
  },
  {
    "slug": "dungeonjournal",
    "title": "DungeonJournal",
    "name": "DungeonJournal",
    "category": "donjons",
    "categories": [
      "donjons"
    ],
    "description": "Retrouvez les quêtes, les emplacements et le butin des boss pour préparer vos donjons.",
    "author": "ExehnTV",
    "image": "/assets/addon-dungeonjournal.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/description/1707971/description_bf74259f-a1a4-4982-9d43-b130b33a2630.png",
    "addedDate": "2026-09-30",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Fiche CurseForge consultée",
    "sourceNote": null,
    "tested": false,
    "status": "unknown",
    "foreverCompatibility": "retest",
    "wowFlavor": [
      "Forever"
    ],
    "tags": [
      "donjons",
      "sélection septembre",
      "DungeonJournal"
    ],
    "features": [],
    "commands": [],
    "warnings": [
      "Non testé en jeu par Nyaru."
    ],
    "sources": [
      {
        "label": "CurseForge",
        "url": "https://www.curseforge.com/wow/addons/dungeonjournal"
      }
    ],
    "curseforgeUrl": "https://www.curseforge.com/wow/addons/dungeonjournal"
  },
  {
    "slug": "trainerspells",
    "title": "TrainerSpells",
    "name": "TrainerSpells",
    "category": "confort",
    "categories": [
      "confort"
    ],
    "description": "Liste les sorts et recettes que vous pouvez apprendre auprès des maîtres de classe et de métier.",
    "author": "D4KiR",
    "image": "/assets/addon-trainerspells.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1967/261/1-jpg.jpg",
    "addedDate": "2026-09-30",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Fiche CurseForge consultée",
    "sourceNote": null,
    "tested": false,
    "status": "unknown",
    "foreverCompatibility": "retest",
    "wowFlavor": [
      "Forever"
    ],
    "tags": [
      "confort",
      "sélection septembre",
      "TrainerSpells"
    ],
    "features": [],
    "commands": [],
    "warnings": [
      "Non testé en jeu par Nyaru."
    ],
    "sources": [
      {
        "label": "CurseForge",
        "url": "https://www.curseforge.com/wow/addons/trainerspells"
      }
    ],
    "curseforgeUrl": "https://www.curseforge.com/wow/addons/trainerspells"
  },
  {
    "slug": "forever-field-journal",
    "title": "Forever Field Journal",
    "name": "Forever Field Journal",
    "category": "rp",
    "categories": [
      "rp"
    ],
    "description": "Un carnet de découverte qui raconte votre parcours, les créatures étudiées et les lieux explorés.",
    "author": "Mangzane",
    "image": "/assets/addon-forever-field-journal-8cdc2ebab1.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1988/287/fj-mob-png.png",
    "addedDate": "2026-09-30",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Source communautaire",
    "sourceNote": "Présentation communautaire consultée ; page CurseForge indisponible lors de la vérification.",
    "tested": false,
    "status": "beta",
    "foreverCompatibility": "retest",
    "wowFlavor": [
      "Forever"
    ],
    "tags": [
      "rp",
      "sélection septembre",
      "Forever Field Journal"
    ],
    "features": [],
    "commands": [],
    "warnings": [
      "Non testé en jeu par Nyaru."
    ],
    "sources": [
      {
        "label": "CurseForge",
        "url": "https://www.curseforge.com/wow/addons/forever-field-journal"
      },
      {
        "label": "Présentation communautaire",
        "url": "https://www.reddit.com/r/wowforever/comments/1wthraq/collection_of_neat_new_addons_from_reddit_users/"
      }
    ],
    "curseforgeUrl": "https://www.curseforge.com/wow/addons/forever-field-journal"
  },
  {
    "slug": "foreverthreatplate",
    "title": "ForeverThreatPlate",
    "name": "ForeverThreatPlate",
    "category": "combat",
    "categories": [
      "combat"
    ],
    "description": "Ajoute des couleurs de menace aux plaques Blizzard en conservant leur apparence d’origine.",
    "author": "Maks31",
    "image": "/assets/addon-foreverthreatplate-90bbb8ce70.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1981/724/screenshot_20260927_154836-png.png",
    "addedDate": "2026-09-30",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Fiche CurseForge consultée",
    "sourceNote": null,
    "tested": false,
    "status": "unknown",
    "foreverCompatibility": "retest",
    "wowFlavor": [
      "Forever"
    ],
    "tags": [
      "combat",
      "sélection septembre",
      "ForeverThreatPlate"
    ],
    "features": [],
    "commands": [],
    "warnings": [
      "Non testé en jeu par Nyaru."
    ],
    "sources": [
      {
        "label": "CurseForge",
        "url": "https://www.curseforge.com/wow/addons/foreverthreatplate"
      }
    ],
    "curseforgeUrl": "https://www.curseforge.com/wow/addons/foreverthreatplate"
  },
  {
    "slug": "banterblocker",
    "title": "BanterBlocker",
    "name": "BanterBlocker",
    "category": "confort",
    "categories": [
      "confort"
    ],
    "description": "Filtre les messages du chat selon les sujets et les termes que vous choisissez de bloquer.",
    "author": "Smellikat",
    "image": "/assets/addon-banterblocker-3b70c8df81.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1990/208/banterblocker-png.png",
    "addedDate": "2026-09-30",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Source communautaire",
    "sourceNote": "Présentation communautaire consultée ; page CurseForge indisponible lors de la vérification.",
    "tested": false,
    "status": "unknown",
    "foreverCompatibility": "retest",
    "wowFlavor": [
      "Forever"
    ],
    "tags": [
      "confort",
      "sélection septembre",
      "BanterBlocker"
    ],
    "features": [],
    "commands": [],
    "warnings": [
      "Non testé en jeu par Nyaru."
    ],
    "sources": [
      {
        "label": "CurseForge",
        "url": "https://www.curseforge.com/wow/addons/banterblocker"
      },
      {
        "label": "Présentation communautaire",
        "url": "https://www.reddit.com/r/wowforever/comments/1wthraq/collection_of_neat_new_addons_from_reddit_users/"
      }
    ],
    "curseforgeUrl": "https://www.curseforge.com/wow/addons/banterblocker"
  },
  {
    "slug": "the-fishing-log",
    "title": "The Fishing Log",
    "name": "The Fishing Log",
    "category": "confort",
    "categories": [
      "confort"
    ],
    "description": "Gardez un journal de vos prises, battez des records et organisez des concours de pêche.",
    "author": "Boomflex",
    "image": "/assets/addon-the-fishing-log.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1959/731/wowb_3vhwud0pev-png.png",
    "addedDate": "2026-09-30",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Fiche CurseForge consultée",
    "sourceNote": null,
    "tested": false,
    "status": "unknown",
    "foreverCompatibility": "retest",
    "wowFlavor": [
      "Forever"
    ],
    "tags": [
      "confort",
      "sélection septembre",
      "The Fishing Log",
      "pêche"
    ],
    "features": [],
    "commands": [],
    "warnings": [
      "Non testé en jeu par Nyaru."
    ],
    "sources": [
      {
        "label": "CurseForge",
        "url": "https://www.curseforge.com/wow/addons/the-fishing-log"
      }
    ],
    "curseforgeUrl": "https://www.curseforge.com/wow/addons/the-fishing-log"
  },
  {
    "slug": "immersion",
    "title": "Immersion",
    "name": "Immersion",
    "category": "quetes",
    "categories": [
      "quetes"
    ],
    "description": "Présente les quêtes et dialogues dans une interface immersive avec des raccourcis personnalisables.",
    "author": "MunkDev",
    "image": "/assets/addon-immersion.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/308/437/pvw69981.jpg",
    "addedDate": "2026-09-30",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Fiche CurseForge consultée",
    "sourceNote": null,
    "tested": false,
    "status": "unknown",
    "foreverCompatibility": "retest",
    "wowFlavor": [
      "Forever"
    ],
    "tags": [
      "quetes",
      "sélection septembre",
      "Immersion"
    ],
    "features": [],
    "commands": [],
    "warnings": [
      "Non testé en jeu par Nyaru."
    ],
    "sources": [
      {
        "label": "CurseForge",
        "url": "https://www.curseforge.com/wow/addons/immersion"
      }
    ],
    "curseforgeUrl": "https://www.curseforge.com/wow/addons/immersion"
  },
  {
    "slug": "coloured-enemy-nameplates",
    "title": "Coloured Enemy Nameplates",
    "name": "Coloured Enemy Nameplates",
    "category": "combat",
    "categories": [
      "combat"
    ],
    "description": "Colore les plaques ennemies pour repérer les cibles prioritaires, les lanceurs de sorts et la menace.",
    "author": "retromojo",
    "image": "/assets/addon-coloured-enemy-nameplates.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1534/624/wowscrnshot_021526_154748-png.png",
    "addedDate": "2026-09-30",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Fiche CurseForge consultée",
    "sourceNote": null,
    "tested": false,
    "status": "unknown",
    "foreverCompatibility": "retest",
    "wowFlavor": [
      "Forever"
    ],
    "tags": [
      "combat",
      "sélection septembre",
      "Coloured Enemy Nameplates"
    ],
    "features": [],
    "commands": [],
    "warnings": [
      "Non testé en jeu par Nyaru."
    ],
    "sources": [
      {
        "label": "CurseForge",
        "url": "https://www.curseforge.com/wow/addons/coloured-enemy-nameplates"
      }
    ],
    "curseforgeUrl": "https://www.curseforge.com/wow/addons/coloured-enemy-nameplates"
  },
  {
    "slug": "forever-thanks",
    "title": "Forever Thanks",
    "name": "Forever Thanks",
    "category": "confort",
    "categories": [
      "confort"
    ],
    "description": "Remercie automatiquement les joueurs qui vous offrent des améliorations de plus de deux minutes.",
    "author": "Sinestro",
    "image": "/assets/addon-forever-thanks.webp",
    "imageKind": "logo",
    "imageSource": "https://media.forgecdn.net/avatars/thumbnails/2061/917/256/256/639256030144932371.png",
    "addedDate": "2026-09-30",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Fiche CurseForge consultée",
    "sourceNote": null,
    "tested": false,
    "status": "unknown",
    "foreverCompatibility": "retest",
    "wowFlavor": [
      "Forever"
    ],
    "tags": [
      "confort",
      "sélection septembre",
      "Forever Thanks"
    ],
    "features": [],
    "commands": [],
    "warnings": [
      "Non testé en jeu par Nyaru."
    ],
    "sources": [
      {
        "label": "CurseForge",
        "url": "https://www.curseforge.com/wow/addons/forever-thanks"
      }
    ],
    "curseforgeUrl": "https://www.curseforge.com/wow/addons/forever-thanks"
  },
  {
    "slug": "shard-source",
    "title": "ShardSource",
    "name": "ShardSource",
    "category": "rp",
    "categories": [
      "rp"
    ],
    "description": "Garde la trace des créatures à l’origine des fragments d’âme de votre démoniste.",
    "author": "Blueteak",
    "image": "/assets/addon-shard-source.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1958/84/68747470733a2f2f692e696d6775722e636f6d2f6752557657.png",
    "addedDate": "2026-09-30",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Fiche CurseForge consultée",
    "sourceNote": null,
    "tested": false,
    "status": "unknown",
    "foreverCompatibility": "retest",
    "wowFlavor": [
      "Forever"
    ],
    "tags": [
      "rp",
      "sélection septembre",
      "ShardSource"
    ],
    "features": [],
    "commands": [],
    "warnings": [
      "Non testé en jeu par Nyaru."
    ],
    "sources": [
      {
        "label": "CurseForge",
        "url": "https://www.curseforge.com/wow/addons/shard-source"
      }
    ],
    "curseforgeUrl": "https://www.curseforge.com/wow/addons/shard-source"
  },
  {
    "slug": "lorewalker",
    "title": "Lorewalker",
    "name": "Lorewalker",
    "category": "quetes",
    "categories": [
      "quetes"
    ],
    "description": "Modernise les dialogues de quête avec des bulles immersives et une interface déplaçable.",
    "author": "AdaptiveX",
    "image": "/assets/addon-lorewalker.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1858/594/reimagined.png",
    "addedDate": "2026-09-30",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Fiche CurseForge consultée",
    "sourceNote": null,
    "tested": false,
    "status": "unknown",
    "foreverCompatibility": "retest",
    "wowFlavor": [
      "Forever"
    ],
    "tags": [
      "quetes",
      "sélection septembre",
      "Lorewalker"
    ],
    "features": [],
    "commands": [],
    "warnings": [
      "Non testé en jeu par Nyaru."
    ],
    "sources": [
      {
        "label": "CurseForge",
        "url": "https://www.curseforge.com/wow/addons/lorewalker"
      }
    ],
    "curseforgeUrl": "https://www.curseforge.com/wow/addons/lorewalker"
  },
  {
    "slug": "forever-fishing",
    "title": "Forever Fishing",
    "name": "Forever Fishing",
    "category": "confort",
    "categories": [
      "confort"
    ],
    "description": "Réunit raccourci de pêche, aide au repérage du bouchon, gestion des appâts et suivi des prises.",
    "author": "Hamish336",
    "image": "/assets/addon-forever-fishing-a46c3c7b77.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1988/632/fishing1-jpg.jpg",
    "addedDate": "2026-09-30",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Source communautaire",
    "sourceNote": "Présentation communautaire consultée ; page CurseForge indisponible lors de la vérification.",
    "tested": false,
    "status": "unknown",
    "foreverCompatibility": "retest",
    "wowFlavor": [
      "Forever"
    ],
    "tags": [
      "confort",
      "sélection septembre",
      "Forever Fishing",
      "pêche"
    ],
    "features": [],
    "commands": [],
    "warnings": [
      "Non testé en jeu par Nyaru."
    ],
    "sources": [
      {
        "label": "CurseForge",
        "url": "https://www.curseforge.com/wow/addons/forever-fishing"
      },
      {
        "label": "Présentation communautaire",
        "url": "https://www.reddit.com/r/wowforever/comments/1wthraq/collection_of_neat_new_addons_from_reddit_users/"
      }
    ],
    "curseforgeUrl": "https://www.curseforge.com/wow/addons/forever-fishing"
  },
  {
    "slug": "questtogether",
    "title": "QuestTogether",
    "name": "QuestTogether",
    "category": "quetes",
    "categories": [
      "quetes"
    ],
    "description": "Comparez les quêtes du groupe, partagez les objectifs et suivez la progression de vos compagnons.",
    "author": "ChevCast",
    "image": "/assets/addon-questtogether.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1579/765/qt-nameplates-png.png",
    "addedDate": "2026-09-30",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Fiche CurseForge consultée",
    "sourceNote": null,
    "tested": false,
    "status": "unknown",
    "foreverCompatibility": "retest",
    "wowFlavor": [
      "Forever"
    ],
    "tags": [
      "quetes",
      "sélection septembre",
      "QuestTogether"
    ],
    "features": [],
    "commands": [],
    "warnings": [
      "Non testé en jeu par Nyaru."
    ],
    "sources": [
      {
        "label": "CurseForge",
        "url": "https://www.curseforge.com/wow/addons/questtogether"
      }
    ],
    "curseforgeUrl": "https://www.curseforge.com/wow/addons/questtogether"
  },
  {
    "slug": "books-forever",
    "title": "Books Forever",
    "name": "Books Forever",
    "category": "quetes",
    "categories": [
      "quetes"
    ],
    "description": "Suivez les livres de bibliothèque collectés ou remis, avec des repères TomTom optionnels.",
    "author": "mr_blank",
    "image": "/assets/addon-books-forever-47eb4aeb69.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1986/729/screenshot_127-jpg.jpg",
    "addedDate": "2026-09-30",
    "verifiedDate": "2026-09-30",
    "verificationStatus": "Source communautaire",
    "sourceNote": "Présentation communautaire consultée ; page CurseForge indisponible lors de la vérification.",
    "tested": false,
    "status": "unknown",
    "foreverCompatibility": "retest",
    "wowFlavor": [
      "Forever"
    ],
    "tags": [
      "quetes",
      "sélection septembre",
      "Books Forever"
    ],
    "features": [],
    "commands": [],
    "warnings": [
      "Non testé en jeu par Nyaru."
    ],
    "sources": [
      {
        "label": "CurseForge",
        "url": "https://www.curseforge.com/wow/addons/books-forever"
      },
      {
        "label": "Présentation communautaire",
        "url": "https://www.reddit.com/r/wowforever/comments/1wthraq/collection_of_neat_new_addons_from_reddit_users/"
      }
    ],
    "curseforgeUrl": "https://www.curseforge.com/wow/addons/books-forever"
  }
];
  for(const entry of septemberAddons){
    const existing=addons.find(addon=>addon.slug===entry.slug);
    if(existing)Object.assign(existing,entry,{features:existing.features,whyRecommended:existing.whyRecommended});
    else addons.push({type:"addon",recommended:false,version:null,gameVersion:null,sourceUrl:null,...entry});
  }

  const catalogImages={
  "atlas": {
    "image": "/assets/atlas-catalog-40d612e27e.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/78/339/Screenshot_v1.15.0.jpg",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://www.curseforge.com/wow/addons/atlas"
  },
  "attune": {
    "image": "/assets/attune-catalog-3941e1f5ab.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1984/818/attune-new-ui-png.png",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://www.curseforge.com/wow/addons/attune"
  },
  "auctionator": {
    "image": "/assets/auctionator-catalog-029d8b19bf.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/721/368/2023-screenshot-classic-shopping-1.png",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://www.curseforge.com/wow/addons/auctionator"
  },
  "azeroth-pilot-reloaded": {
    "image": "/assets/azeroth-pilot-reloaded-catalog-70fe1fb541.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/754/667/currentframe.png",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://www.curseforge.com/wow/addons/azeroth-pilot-reloaded"
  },
  "ellesmereui": {
    "image": "/assets/ellesmereui-catalog-000040df68.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1664/341/1-png.png",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://www.curseforge.com/wow/addons/ellesmereui"
  },
  "forever-ptr-server-world-map": {
    "image": "/assets/forever-ptr-server-world-map-catalog-a261c66f13.webp",
    "imageKind": "logo",
    "imageSource": "https://media.forgecdn.net/avatars/thumbnails/2054/298/256/256/639253160518080768.png",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://www.curseforge.com/wow/addons/forever-ptr-server-world-map"
  },
  "questie": {
    "image": "/assets/questie-catalog-850c25ef32.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/258/916/4abi5yu.png",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://www.curseforge.com/wow/addons/questie"
  },
  "restedxp-guide": {
    "image": "/assets/restedxp-guide-catalog-e91b709850.webp",
    "imageKind": "capture",
    "imageSource": "https://community.restedxp.com/wp-content/uploads/2025/07/img-step-3-section.png",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://community.restedxp.com/start/"
  },
  "tomtom": {
    "image": "/assets/tomtom-catalog-07aad5f0da.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1372/754/tomtom-crazyarrow-png.png",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://www.curseforge.com/wow/addons/tomtom"
  },
  "guildmap": {
    "image": "/assets/guildmap-catalog-21d8fa6b27.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/description/1149802/description_896d4db5-7558-4c73-87f8-8dd9f8315c28.png",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://www.curseforge.com/wow/addons/guildmap"
  },
  "nova-instance-tracker": {
    "image": "/assets/nova-instance-tracker-catalog-acfb564edc.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/300/531/log1.jpg",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://www.curseforge.com/wow/addons/nova-instance-tracker"
  },
  "lootified": {
    "image": "/assets/lootified-catalog-0a44925ffc.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1989/199/screenshot-2026-09-29-153813-png.png",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://www.curseforge.com/wow/addons/lootified"
  },
  "forever-dungeon-scout": {
    "image": "/assets/forever-dungeon-scout-catalog-daafe27ea4.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1989/42/wowb_zlv6l4a25f-png.png",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://www.curseforge.com/wow/addons/forever-dungeon-scout"
  },
  "cooldown-manager-centered": {
    "image": "/assets/cooldown-manager-centered-catalog-1e21ceab3f.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1536/53/image-3-png.png",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://www.curseforge.com/wow/addons/cooldown-manager-centered"
  },
  "minicc": {
    "image": "/assets/minicc-catalog-9cb29b2d90.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1860/789/testframes-png.png",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://www.curseforge.com/wow/addons/minicc"
  },
  "nkthreat": {
    "image": "/assets/nkthreat-catalog-44cdd25897.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1985/814/nkthreat-threat-meter-window-png.png",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://www.curseforge.com/wow/addons/nkthreat"
  },
  "whodoeswhat": {
    "image": "/assets/whodoeswhat-catalog-87f9470653.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1840/144/buffgrid-jpg.jpg",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://www.curseforge.com/wow/addons/whodoeswhat"
  },
  "blizzmove": {
    "image": "/assets/blizzmove-catalog-f664c05aaa.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/106/689/blizzmove.jpg",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://www.curseforge.com/wow/addons/blizzmove"
  },
  "darkmode": {
    "image": "/assets/darkmode-catalog-b6278dd327.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/609/233/playerframe.png",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://www.curseforge.com/wow/addons/darkmode"
  },
  "fontmagic": {
    "image": "/assets/fontmagic-catalog-8d12b54a18.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1244/726/fontmagic-png.png",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://www.curseforge.com/wow/addons/fontmagic"
  },
  "plumber": {
    "image": "/assets/plumber-catalog-707e420e3a.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1300/473/plumberlandingpage_7.jpg",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://www.curseforge.com/wow/addons/plumber"
  },
  "wildutools": {
    "image": "/assets/wildutools-catalog-2c99fc5858.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1486/351/wildu-tools-preview-small-jpg.jpg",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://www.curseforge.com/wow/addons/wildutools"
  },
  "better-fishing": {
    "image": "/assets/better-fishing-catalog-e33de933f6.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/524/140/softtargeting.png",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://www.curseforge.com/wow/addons/better-fishing"
  },
  "speedyautoloot": {
    "image": "/assets/speedyautoloot-catalog-f8853000e7.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1642/584/speedyautoloot-display-png.png",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://www.curseforge.com/wow/addons/speedyautoloot"
  },
  "wim-3": {
    "image": "/assets/wim-3-catalog-1b7d3a06e5.webp",
    "imageKind": "capture",
    "imageSource": "https://cdn-wow.mmoui.com/preview/pvw3863.jpg",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://www.wowinterface.com/downloads/info5342-3.10.9.html"
  },
  "bug-grabber": {
    "image": "/assets/bug-grabber-catalog-32366a1116.webp",
    "imageKind": "capture",
    "imageSource": "https://cdn-wow.mmoui.com/preview/pvw69047.jpg",
    "imageCaption": "Interface de BugSack, compagnon de BugGrabber pour afficher les erreurs collectées.",
    "imagePage": "https://www.wowinterface.com/downloads/info5995-BugSack.html"
  },
  "bugsack": {
    "image": "/assets/bugsack-catalog-32366a1116.webp",
    "imageKind": "capture",
    "imageSource": "https://cdn-wow.mmoui.com/preview/pvw69047.jpg",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://www.wowinterface.com/downloads/info5995-BugSack.html"
  },
  "hunters-field-guide": {
    "image": "/assets/hunters-field-guide-catalog-de3b472544.webp",
    "imageKind": "capture",
    "imageSource": "https://media.forgecdn.net/attachments/1983/145/hunters-field-guide-png.png",
    "imageCaption": "Capture de la présentation de l’auteur",
    "imagePage": "https://www.curseforge.com/wow/addons/hunters-field-guide"
  }
};
  addons.forEach(addon=>{if(catalogImages[addon.slug])Object.assign(addon,catalogImages[addon.slug]);});

  const all=[...addons,...tips,...commands,...troubleshooting,...items,...news,...presets];
  const routeFor=item=>item.type==='addon'?`/addons/${item.slug}`:item.type==='astuce'?`/astuces/${item.slug}`:item.type==='commande'?`/commandes/${item.slug}`:item.type==='depannage'?`/depannage/${item.slug}`:item.type==='objet'?`/objets/${item.slug}`:item.type==='actualite'?`/actualites/${item.slug}`:`/commandes/presets#${item.slug}`;
  const selections=[
    {slug:'debuter',title:'Je débute',description:'Quêtes, repères et diagnostic : quelques fiches pour commencer sans surcharger votre interface.',addons:['questie','tomtom','bugsack','bug-grabber']},
    {slug:'donjons',title:'Je pars en donjon',description:'Explorez les cartes, les quêtes et le suivi du butin avant votre prochaine sortie.',addons:['atlas','dungeonjournal','lootified','nova-instance-tracker']},
    {slug:'interface',title:'Je refais mon interface',description:'Comparez les approches pour organiser vos fenêtres, vos barres et les dialogues.',addons:['ellesmereui','blizzmove','darkmode','immersion']},
    {slug:'chasseur',title:'Je joue chasseur',description:'Parcourez les fiches consacrées aux familiers et à la portée des tirs.',addons:['hunters-field-guide','shotrange']},
    {slug:'exploration',title:'J’explore Azeroth',description:'Repères, journal et livres : choisissez les outils qui accompagnent vos découvertes.',addons:['tomtom','forever-field-journal','books-forever','lorewalker']}
  ];
  const parseSelection=value=>{
    const wanted=new Set(String(value||'').slice(0,12000).split(',').slice(0,120));
    return all.filter(item=>wanted.has(`${item.type}:${item.slug}`));
  };
  return {verifiedDate,categoryLabels,addons,tips,commands,troubleshooting,items,news,presets,all,routeFor,selections,parseSelection};
});


