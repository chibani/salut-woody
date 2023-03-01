# Générateur de salutations de la WoodyLutherie Corporation

## De quoi s'agit-il ?  
Ce dépôt héberge le code source du site https://woody.loicg.net/ , fait pour me distraire un peu.  
L'outil proposé est un simple générateur de texte à trou, basé sur le template : `Salut les copeaux $1, les échardes $2 et les sciures $3`, avec : 
 - $1 : un qualificatif au masculin
 - $2 et $3, des qualificatifs au féminin


## Les qualificatifs  
Ils sont "stockés" dans une constante, dans le script `src/dict/woody.js`.  
La liste des qualificatifs est assez longue, plus de 700 éléments, mais ne vous privew pas d'en rajouter.  

### Format des qualificatifs et accord en genre  
Parce que le Français est une langue genrée (quelle chance ont les anglophones... ça simplifie tellement le code), j'ai adopté la convention de codage suivante :  
 - Quand féminin et masculin s'écrivent de la même manière (ex : `libres`), je mets juste la string `libre` dans la liste
 - Quand l'accord consiste à ajouter quelques lettres (ex: `gentils` -> `gentilles`), alors les lettres supplémentaires sont entourées d'underscore (ex: `gentil_le_s`)
 - Quand l'accord est plus complexe (ex: `beaux` -> `belles`), il faut définir un objet avec les clés `m` et `f` (ex: `{'m':'beaux', 'f':'belles'}`)

Ensuite, une règle métier vient appliquer l'accord en fonction du genre du nom à qualifier.

## Comment contribuer  
J'accepte avec plaisir les contributions : nouveaux qualificatifs, correction de fautes diverses ou encore optimisation du code (ou de l'apparence de la page).  
Pour contribuer, vous pouvez forker ce projet, faire vos modifs puis créer une Pull Request (Github permet de faire ça assez facilement, du moment que vous avez un compte).  
Autrement, vous pouvez ouvrir une issue, sur ce projet, j'en prendrais note et ferai éventuellement les modifications demandées.