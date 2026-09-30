# Votes communautaires

Les votes sont conservés dans `votes.sqlite` sur le volume Railway. Monter un volume sur `/data` ; Railway fournit automatiquement `RAILWAY_VOLUME_MOUNT_PATH`. Un déploiement Railway sans volume désactive les votes (503) plutôt que d’enregistrer des données temporaires. En local, `.community/` est ignoré par Git. `COMMUNITY_DATA_DIR` permet de choisir un autre répertoire.

Utiliser une seule instance du service avec ce volume SQLite. Inclure le volume dans les sauvegardes Railway ; ne pas supprimer le volume lors d’un redéploiement. Le volume ne contient aucun fichier servi publiquement.

Un cookie fonctionnel HttpOnly, SameSite=Strict identifie anonymement un navigateur pendant un an. La base conserve son empreinte SHA-256, le slug, le vote et la date. Une contrainte unique interdit les doublons ; changer de choix remplace le vote, la valeur zéro l’annule. Effacer le cookie ou utiliser un autre navigateur permet un nouveau vote : ce système sans compte ne garantit pas une personne unique. Pas d’adresse IP conservée dans la base ; une empreinte en mémoire limite les écritures à 40 par minute et par adresse.

Le tri utilise la borne inférieure de Wilson à 95 %, puis le nombre d’avis positifs. Les addons sans vote viennent après ceux qui ont été évalués. Les votes ne prouvent aucune compatibilité.

Les signalements ouvrent un brouillon public d’issue GitHub à relire et publier par le visiteur. Ils ne sont pas envoyés automatiquement et ne sont pas enregistrés par le site. Aucun compte ou secret GitHub n’est nécessaire côté serveur.

Les statuts de compatibilité restent prudents : seul un champ explicite `testedBy: 'Nyaru'` autorise « Testé par Nyaru » ; `foreverCompatibility: 'native'` indique une conception Forever annoncée ; les autres fiches restent à vérifier. Aucun statut « testé » n’est déduit des votes ou du nom de l’addon.
