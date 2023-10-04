# WSL Readme

## Importer et configurer la distribution WSL école

Elle contient déjà `apache, mysql, php, xdebug, Vscode wsl`.

Une copie de la distribution école se trouve dans `c:\distributions-wsl`.  
Nom : `wsl-amp-ei-u2204-precfg-2023`  
Contenu : `Ubuntu-22.04-lts, apache, mariadb, php, xdebug, vscode`

## Sources

[Documentation sur le sous-système Windows pour Linux](https://learn.microsoft.com/fr-fr/windows/wsl/)  
[Configurer un environnement de développement WSL](https://learn.microsoft.com/fr-fr/windows/wsl/setup/environment)  
[Commandes de base pour WSL](https://learn.microsoft.com/fr-fr/windows/wsl/basic-commands)  

??? warning "Attention"
    Tous les mots de passe de la distribution sont "Super", pensez à les changer.

-----------------------------

## Ouvrez un powershell (avec ou sans admin, selon votre choix)

### Créer et se placer dans un dossier conteneur de distributions

``` py
cd c:\distributions-wsl
```

## Importer une distribution

``` py
wsl --import '<Distribution Name> <InstallLocation> <FileName>'
```

## Commande générale

``` py
wsl --import "ubuntu-2204-amp" . wsl-amp-ei-u2204-precfg-2023
```

### Assigner la nouvelle image comme image par défaut

``` py
wsl --set-default ubuntu-2204-amp
```

### Démarrer la distribution

``` py
wsl
```

### Effectuer un update & upgrade

``` py
sudo apt update && sudo apt upgrade
```

### Créer l'utilisateur principal

``` py
sudo adduser '<utilisateur-EEL>'
```

!!! note
    Ne pas oublier de l'ajouter au groupe des sudoers

``` py
sudo usermod -aG sudo '<utilisateur-EEL>'
```

### Pour en faire l'utilisateur par defaut

``` py
sudo echo -e "[user]\ndefault=<utilisateur-EEL>" > /etc/wsl.conf
```

Si la commande ci-dessus pose des problèmes, éditer le fichier `/etc/wsl.conf` avec `vi` ou `nano`

!!! warning
    !!! VERIFIER PLUTOT DEUX FOIS QU'UNE !!!

-----------------------------

## Sortir de la distribution

``` py
exit
```

### Depuis powershell

``` py
wsl --terminate wsl-ei-u2204-precfg-2023
```

## Démarrer la distribution avec le dossier user windows

``` py
wsl ~
```

-----------------------------

## Commandes pratiques

### Vérifier l'état de wsl

``` py
`wsl --status`
```

### Installer wsl

``` py
wsl --install
```

### Mettre à jour wsl

``` py
wsl --update
```

### Afficher les distributions actives

``` py
wsl --list
```

### Arrêter l'exécution de la distribution active

``` py
wsl --terminate '<Distribution Name>'
```
