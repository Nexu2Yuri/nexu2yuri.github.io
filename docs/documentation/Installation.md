# Guide d'installation multipass

## Début de l'installation

Une fois que multipass a été installé sur le poste, il faudra lancer un terminal et lancer la commande :

    multipass
Pour pouvoir vérifier que multipass a été bel et bien installé.

Ensuite, avant de lancer la prochaine commande, vérifier que dans le répertoire où vous êtes, le fichier :

    cloud-init-amp-ssh.yaml
Soit présent où nimporte quel autre fichier que vous souhaitez utiliser comme cloud init.

Il faut aussi vérifier que votre fichier cloud init contient la clé publique que vous allez utiliser pour vous connecter depuis VS Code grâce à Remote-SSH. Pour cela, ouvrez votre fichier cloud init dans un éditeur de fichier et dans la section : 

    ssh_authorized_keys:
Ajouter votre clé publique comme ceci : 

        - <cléPublique>
Une fois dans le bon répertoire et la clé ajoutée au fichier, lancer la commande suivante pour créer une nouvelle instance : 

    multipass launch --name amp-devops --cloud-init .\cloud-init-amp-ssh.yaml
Si cela prend du temps, c'est normal.
Une fois l'installation terminée, vérifier que l'instance existe en lancer la commande suivante : 

    multipass list
Le résultat devrait être le suivant : 

    Name                    State             IPv4             Image
    amp-devops              Running           172.21.3.11      Ubuntu 22.04 LTS

L'adresse ip change à chaque fois que vous lancer l'instance, donc si elle est différente que l'exemple, c'est normal aussi.

Enfin, pour vérifier que l'instance fonctionne correctement, entrez la commande suivante pour ouvrir un terminal depuis l'instance :

    multipass shell amp-devops
Le résultat devrait être le suivant : 

    ╭─ubuntu@amp-devops ~
    ╰─$
Vous pouvez sortir de l'instance en entrant la commande suivante : 

    ╭─ubuntu@amp-devops ~
    ╰─$ exit