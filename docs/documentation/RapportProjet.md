# Rapport de projet Country Guesser

## Descriptif de l'application web

Le but de notre site web est et que l'utilisateur doit deviner si un pays a plus d'habitants qu'un autre et donc il y aura un choix qu'il devra faire entre les deux pays.

Si l'utilisateur choisi le pays avec le plus d'habitants, il passe au prochain niveau où il va devoir faire la même chose mais avec le pays gagnant et un autre pays jusqu'à ce qu'il perde, c'est-à-dire quand il choisit le pays avec le moins d'habitants.

L'utilisateur peut avoir un record et une série de bonnes réponses pendant qu'il joue. (Il y a aussi plusieurs modes différents où la donnée à deviner est différente.)

## Architecture de Country Guesser

![Architecture application](/wsl/img/ArchiCountryGuesser.png)

## La fiabilité de Country Guesser

### Certaines choses à surveiller 

Les principales données/opérations à surveiller sont si, par exemple, les données des deux pays ont été récupérées, si oui, l'opération a réussi et dans le cas contraire, l'opération a échoué. On peut aussi voir combien de temps ça nous a pris pour récupérer ces infos.

### Les données loguées

Les différentes données qui seront loguées sont :

  - Les nouveaux pays appeleé depuis l'API
  - Le pays gagnant de chaque manche
  - Les différentes erreurs qui peut y avoir
  - Les erreurs de l'API (exemple : un appel n'a pas retourné de réponse)
  - D'autres choses comme des exceptions, des avertissement, des debugs, etc...

Les deux premières mentions sont pour pouvoir s'assurer que l'application fonctionne et que les logs fonctionnent aussi.

Si l'API qu'on utilise retourner une erreur, elle sera considérée comme une alerte et sera ajoutée au fichier log accessible depuis la page admin.

### Descriptif de la fiabilité

Sachant qu'il n'y a pas de base de données d'utilisateur dans notre application web, il faut que nous nous concentrons plus sur la rapidité et le fonctionnement de notre site.

Pour cela, nous surveillons le taux d'opérations réussies, le taux qui ont échouées et le temps qu'elles ont pris. Il faudra aussi surveiller le temps de réponse de l'API pour être sûr que le site ne soit pas ralenti à cause de ça ou juste qu'il ne fonctionne pas, car si l'API n'est plus disponible, le site ne fonctionnera plus.

### Les valeurs limites

Les valeurs limite à définir sont la fiabilité de l'API (SLO et SLI), du système de log et de l'appli de manière générale (SLA). On peut aussi définir l'Error Budget grâce aux logs, l'Error budget sera donc de l'API ET de l'application web.

 - L'API doit être disponible à 98,5%
 - La récupération des pays doit être disponible à 99%
 - On peut considérer que 2 secondes est le temps limite de réponse de l'API pour chaque appel
 - Le système de log doit être fiable à 99,7%
 - On peut calculer le SLI de l'API grâce aux logs
 - Le pourcentage de l'Error Budget est de 0,5%

Un point critique serait que l'API soit beaucoup trop lente ou ne réponde pas et donc ce problème sera enregistrer sur la page admin et quand un admin se connectera sur l'appli en cliquant sur un boutton et en rentrant ses identifiants, il pourra voir les plus gros problèmes avec le site. 

## Conclusion

Pour conclure, il nous faudrait un moyen pour pouvoir surveiller constamment l'API pour pouvoir réagir vite en cas de problème, une page pour afficher toutes les erreurs qui sont dans les logs et un statut de la disponibilité de l'API sur la page admin.