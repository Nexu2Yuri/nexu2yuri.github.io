# Commandes linux

Le fichier ci-dessous est mis en forme pour des raisons pratiques.
La [source (brute) se trouve ici](./commandes_linux.sh).

```sh
#!/bin/zsh
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#
# Formation continue - Pascal Bonvin - Juin 2021
# Corrections / mises à jour - Pascal Bonvin - Mars 2022
# Ajout des mises à jour - Aout 2022
#
# Pour trouver une commande spécifique, utilisez CTRL+F
#
# Vous êtes libre d'utiliser et de partager ce document. Si vous souhaitez y apporter des modifications, 
# merci de contacter l'auteur : pascal.bonvin@edu.ge.ch
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

#-------------------------------------------------------------------------------------------
# Mise à jour (update / upgrade)
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# Linux utilise une liste de dépot que vous pouvez trouver dans le dossier :
ls -ls /etc/apt
# vous pouvez vous déplacer dans ce dossier
cd /etc/apt
# et réafficher le contenu
ls -als
# pour avoir la description détaillée d'une commande par exemple ls :
man ls
# on y apprend que -als = -a(ll) -l(ist) -s(ize) 
# vérifier le contenu de la liste des dépôts par défaut
cat sources.list
# Vous pouvez décommenter la dernière ligne si vous souhaitez télécharger les sources des packages
# Evidemment, cette option va alourdir les téléchargements mais vous permettra si nécessaire
# de compiler les packages depuis leurs sources en local.
# Pour afficher le contenu d'un fichier texte sous linux en mode console
cat sources.list
more sources.list
head sources.list
tail sources.list
# Pour les pros en mode console
vi sources.list
# Après l'installation de visual studio code (cf ci-dessous)
code sources.list
# pour les débutants en mode console
nano sources.list
# pour aller plus loin avec les commandes foreground et background, utilisez man.
# Un process que vous venez de lancer bloque votre terminal ? 
# Tapez ctrl+z(suspendre un processus), puis :
# mettre en background un processus suspendu
bg
# mettre en foreground un processus suspendu
fg
# Afficher les process en course
top
htop
# Mise à jour des dépots (commande apt)
sudo apt update
sudo apt upgrade
sudo apt full-upgrade
sudo apd autoremove
sudo apt clean
sudo apt search command
sudo apt purge package
sudo apt purge package --simulate
# ----- Fin Mise à jour (update / upgrade) --------------------------------------------

#--------------------------------------------------------------------------------------
# Migration majeure Debian
#--------------------------------------------------------------------------------------

# Source : https://wiki.debian.org/DebianUpgrade

# First, ensure your system is up-to-date in it's current release.
$ sudo apt update
$ sudo apt upgrade

# If you haven't already, ensure all backups are up-to-date.  

# In a text editor, replace the codename of your release with that of the next release in APT's package sources
# For instance, the line
#    deb https://deb.debian.org/debian/ buster main
# should be replaced with
#    deb https://deb.debian.org/debian/ bullseye main
$ sudo nano /etc/apt/sources.list /etc/apt/sources.list.d/*

# Clean and update package lists
$ sudo apt clean
$ sudo apt update

# Perform the major release upgrade, removing packages if required
# Interrupting this step after downloading has completed is an excellent way to stress-test your backups
$ sudo apt full-upgrade

# Remove packages that are not required anymore
# Be sure to review this list: you may want to keep some of them
$ sudo apt autoremove

# Reboot to make changes effective (optional, but recommended)
$ sudo shutdown -r now
# ----- Fin de migration majeure Debian -----------------------------------------------

#--------------------------------------------------------------------------------------
# Migration majeure Ubuntu
#--------------------------------------------------------------------------------------
# Source : https://guide.ubuntu-fr.org/server/installing-upgrading.html#do-release-upgrade
sudo do-realease-upgrade
# ----- Fin de migration majeure Ubuntu -----------------------------------------------


#--------------------------------------------------------------------------------------
# Purger Python2 et n'utiliser que python3
#--------------------------------------------------------------------------------------
# Remove python2
sudo apt purge -y python2.7-minimal

# You already have Python3 but 
# don't care about the version 
sudo ln -s /usr/bin/python3 /usr/bin/python

# Same for pip
sudo apt install -y python3-pip
sudo ln -s /usr/bin/pip3 /usr/bin/pip

# Confirm the new version of Python: 3
python --version
# ----- Fin de purge de python2 et installation de python 3 ---------------------------

#--------------------------------------------------------------------------------------
# Mise à jour des paquets pip obsolètes
#--------------------------------------------------------------------------------------
# Mise à jour de pip
pip install pip -U
# Packages de l'utilisateur
pip freeze --user | cut -d'=' -f1 | xargs -n1 pip install -U
# Packages système
sudo pip freeze | cut -d'=' -f1 | xargs -n1 pip install -U
# Pour s'assurer que c'est bien pip3 :
sudo python3 -m pip freeze | cut -d'=' -f1 | xargs -n1 python3 -m pip install -U
# ----- Fin Mise à jour des paquets pip obsolètes -------------------------------------

#-------------------------------------------------------------------------------------------
# installer zsh
# ~~~~~~~~~~~~~~~~
sudo apt install zsh
# installer oh-my-zsh (https://ohmyz.sh)
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
# remplacer votre shell actuel par zsh (redémarrer pour impacter effet)
chsh $(whoami) -s $(which zsh)
# Changer de thème de zsh
# dans ~/.zshrc remplacer ZSH_THEME="..." par ZSH_THEME="bira" + enregistrer
nano ~/.zshrc
# appliquer les changements
source ~/.zshrc
#----- fin installer zsh -------------------------------------------------------------------

#-------------------------------------------------------------------------------------------
# Installation AMP
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#
# Commençons par attribuer un nom d'hôte à 127.0.0.1 (si possible)
# editez /etc/hosts
sudo nano /etc/hosts
# ajoutez la ligne à la fin (ou modifez-la si elle existe déjà)
127.0.0.1 ${compte-eel}.local
# reboot et vérification : 
ping ${compte-eel}.local
#
# Comme une impression de déja-vu ...
sudo apt install apache2 apache2-doc
# Démarrer le service apache2
sudo service apache2 start
# Arrêter le service apache2
sudo service apache2 stop
# Redémarrer le service apache2
sudo service apache2 restart
# Vérifier le fichier de configuration
sudo apachectl configtest
# Afficher la version d'Apache utilisée :
sudo apache2ctl -v
# Tester l'ensemble de la configuration d'Apache :
sudo apache2ctl -t
# Tester la configuration des hôtes virtuels :
sudo apache2ctl -t -D DUMP_VHOSTS
# Afficher les modules d'Apache chargés :
sudo apache2ctl -M
# Vérifier la configuration apache  
sudo apachectl -S
# Où sont les fichiers d'installation/configuration apache2 ?
cd /etc/apache2
# Où sont les logs apache ?
cd /var/log/apache2
# Documentation http://${compte-eel}.local/manual/fr/index.html
# Accès impossible ?
# ajouter le groupe adm à votre compte actuel
sudo usermod -aG adm $(whoami)
# Redémarrer le terminal
# changer votre groupe par défaut, par exemple pour adm
sudo usermod -g adm $(whoami)
# Redémarrer le terminal
cd /var/log/apache2
# accès possible
# vérifier le bon démarrage apache2
# dans un navigateur http://${compte-eel}.local
# Actuellement, un ls -ls de /var/www donne :
ls -ls /var/www                                                                                                                                                            1 ↵
# total 4
# 4 drwxr-xr-x 2 root root 4096 jun 25 06:04 html
# le groupe root n'est pas une bonne idée
# changer les droits du dossier source apache /var/www/html
sudo chown -R root:adm /var/www/html
# Désormais, un ls -ls de /var/www donne :
ls -ls /var/www
# total 4
# 4 drwxr-xr-x 2 root adm 4096 jun 25 06:04 html
#
# Samba
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# cf https://debian-handbook.info/browse/fr-FR/stable/sect.windows-file-server-with-samba.html
#
# Installation de Samba / Disque de partage
sudo apt-get install samba samba-common-bin
sudo vi /etc/samba/smb.conf
# ajouter à la fin du fichier
# # Ajout de l'accès partagé au dossier utilisateur
# [${compte-eel}]
# path = /home/${compte-eel}/
# writeable=Yes
# create mask=0777
# directory mask=0777
# public=no
# Ajouter un mot de passe au partage
sudo smbpasswd -a ${compte-eel}
sudo service smbd restart
# qui fait quoi 
sudo smbstatus
# configuration actuelle
testparm
#
# Activer samba dans windows 10 :
# Ouvrez un powershell en mode administrateur et copiez :
# Enable-WindowsOptionalFeature -Online -FeatureName smb1protocol
# Utiliser le partage dans votre dossier de travail pour permettre
# d'éditer vos fichiers depuis Visual Studio Code Windows (avec samba)
# retournez dans votre dossier home
cd
cd Documents
# créer un lien statique
ln -s /var/www www
# Changer les droits d'écriture du groupe
sudo chmod -R g+w /var/www/html
# Modification du fichier de configuration samba
sudo vi /etc/samba/smb.conf
# chercher votre [${compte-eel}]
# y ajouter les lignes suivantes (sans le #) :
# follow symlinks = yes
# wide links = yes
#
# [global]
# allow insecure wide links = yes
# Question 16 : Tout fonctionne ? Renommer depuis windows le fichier index.html en
#               accueil.html
#
# Pour aller plus loin (hors FC): 
# Installation d'un serveur ftp : https://www.raspberrypi.org/documentation/remote-access/ftp.md
#
# installation de mariadb
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
sudo apt install mariadb-client mariadb-server
# ... installation
# configuration
sudo mysql_secure_installation
# mode console mysql
sudo mysql -u root -p
# Accorder les droits, 
# !!! ATTENTION, RACCOURCI POUR LA FC !!! On doit faire mieux mais une autre fois ...
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' IDENTIFIED BY '*** your password ***';
FLUSH PRIVILEGES;
exit
# modifier le fichier server en ajoutant un commentaire devant bind-adress (ligne 28)
sudo vi /etc/mysql/mariadb.conf.d/50-server.cnf
sudo service mysql restart
# Connectez votre base depuis windows, dbeaver ce.
# cf https://dbeaver.io
#
# installation php (7.4) mars 2022
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# base
sudo apt install php7.4 php7.4-mysql php-pear
# développement
sudo apt install php7.4-dev
# ajoutez vos modules préférés s'il en manque sudo apt install php7.3-xml ...
#
# xdebug
sudo pecl install xdebug
# editer le fichier php.ini
sudo vi /etc/php/7.4/apache2/php.ini
# et ajoutez à la fin : (copier les lignes ci-dessous et enlever le commentaire en début de ligne)
# [xdebug]
# zend_extension=/usr/lib/php/20180731/xdebug.so
# xdebug.mode = debug
# xdebug.client_port = 9003
# # En prévision du remote debugging
# xdebug.start_with_request = yes
# xdebug.discover_client_host = 1
# xdebug.remote_log=/var/log/xdebug.log
# xdebug.client_host = ${compte-eel}.local
#
# redémarrage apache2
sudo service apache2 restart
# Vérifications de fonctionnement
#
# Créer un fichier i.php avec l'appel à phpinfo(); à la racine du site
# Installation du dossier compagnion normes et standard école
# Aller sur moodle -> Documents référence (https://moodle.labogecinf.ch/course/view.php?id=199)
# Dézipper depuis windows dans le dossier html.
# 
# apache2 en https : 
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#
# Documentation apache2 : https://${compte-eel}.local/manual/fr/ssl/index.html
# En ligne de commande : /usr/share/doc/apache2/README.Debian.gz
#
# Dans cette partie, nous allons installer un certificat local, passer le serveur en https
# et rediriger les urls http en https.
# Si vous avez votre propre serveur accessible par internet, configurez vos certificats
# avec l'excellent https://letsencrypt.org/fr/ (pensez à faire un don ;-)
#
# Creation du certificat ssl pour apache (certificat local) avec openssl
sudo mkdir -p /etc/ssl/localcerts
cd /etc/ssl/localcerts
# Création d'un fichier de configuration openssl (plus simple pour regénérer des certificats)
touch ${compte-eel}.cnf
# Editez-le et ajoutez les lignes suivantes (enlevez les commentaires) et remplacez ${compte-eel} par votre propre compte :
# [req]
# distinguished_name = ${compte-eel}
# x509_extensions = v3_req
# prompt = no
# [${compte-eel}]
# C = CH
# ST = GE
# L = Geneva
# O = CFPT
# OU = Informatique
# CN = ${compte-eel}.local
# [v3_req]
# keyUsage = critical, digitalSignature, keyAgreement
# extendedKeyUsage = serverAuth
# subjectAltName = @alt_names
# [alt_names]
# DNS.1 = ${compte-eel}.local
# # DNS.2 = ${compte-eel}.local
#
# Générer les certificats
sudo openssl req -x509 -nodes -days 730 -newkey rsa:2048 \
 -keyout ${compte-eel}.key -out ${compte-eel}.pem -config ${compte-eel}.cnf -sha256

# activation du certificat dans apache
sudo chmod 600 /etc/ssl/localcerts/${compte-eel}*
# activer ssl
sudo a2enmod ssl
# activer ssl par defaut (pas obligatoire)
# sudo a2ensite default-ssl
# désactiver ssl par defaut (pas obligatoire)
# sudo a2dissite default-ssl
#
# Créez un fichier de config pour notre serveur
cd /etc/apache2/sites-available
sudo cp default-ssl.conf ${compte-eel}-ssl.conf
# Editez le fichier de configuration et modifiez les quatre lignes :
# ServerAdmin prenom.nom@edu.ge.ch
# ServerName www.${compte-eel}.local
# SSLCertificateFile	/etc/ssl/localcerts/${compte-eel}.pem
# SSLCertificateKeyFile	/etc/ssl/localcerts/${compte-eel}.key
# Sauvegardez
#
# Vérifiez la configuration apache  
sudo apachectl -S
#
# Output attendu (edubonvinp.local)
# VirtualHost configuration:
# 127.0.1.1:443          www.edubonvinp.local (/etc/apache2/sites-enabled/edubonvinp-ssl.conf:2)
# *:80                   www.edubonvinp.local (/etc/apache2/sites-enabled/000-default.conf:1)
# ServerRoot: "/etc/apache2"
# Main DocumentRoot: "/var/www/html"
# Main ErrorLog: "/var/log/apache2/error.log"
# Mutex default: dir="/var/run/apache2/" mechanism=default 
# Mutex mpm-accept: using_defaults
# Mutex watchdog-callback: using_defaults
# Mutex ssl-stapling-refresh: using_defaults
# Mutex ssl-stapling: using_defaults
# Mutex ssl-cache: using_defaults
# PidFile: "/var/run/apache2/apache2.pid"
# Define: DUMP_VHOSTS
# Define: DUMP_RUN_CFG
# User: name="www-data" id=33
# Group: name="www-data" id=33

# pour terminer, ajoutez le groupe www-data à votre utilisateur
sudo usermod -aG ${compte-eel} www-data
sudo reboot
# Vérification finale :
# Dans votre navigateur : https://${compte-eel}.local (https://edubonvinp.local)
#
# redirection http -> https
sudo vi /etc/apache2/sites-available/000-default.conf
# Après la ligne DocumentRoot ...
# ajoutez :
#         redirect / https://edubonvinp.local/
sudo service apache2 restart
#----- Fin Installation AMP ----------------------------------------------------------------

#-------------------------------------------------------------------------------------------
# gitlab-ce
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#
# Changement de la taille du swap
sudo dphys-swapfile swapoff
# Modifier le fichier :
sudo vi /etc/dphys-swapfile
# Commenter :
# CONF_SWAPSIZE=100
# Décommenter :
# CONF_SWAPFACTOR=2
sudo dphys-swapfile setup
sudo dphys-swapfile swapon
# Vérifier 
sudo swapon -s
#
# installation de gitlab-ce
# cf https://about.gitlab.com/install/
# 
# Arrêtons temporairement notre apache2 :
sudo service apache2 stop
# Installer les dépendances :
# sudo apt install curl openssh-server ca-certificates apt-transport-https perl
# Ajouter la signature de gitlab pour apt
curl https://packages.gitlab.com/gpg.key | sudo apt add -
# 
# Installation de postfix (serveur mail)
sudo apt install -y postfix 
# Choisir l'option "Internet"
#
# Ajouter les dépots gitlab à apt
sudo curl -sS https://packages.gitlab.com/install/repositories/gitlab/raspberry-pi2/script.deb.sh | sudo bash
# installer gitlab-ce
sudo EXTERNAL_URL="http://${compte-eel}.local/gitlab" apt install gitlab-ce   
sudo a2enmod ssl
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod rewrite
sudo a2enmod headers
# Modification du fichier gitlab.rb pour remplacer nginx par apache2
# cf : https://gitlab.com/gitlab-org/gitlab-recipes/tree/master/web-server/apache 
#----- fin de gitlab-ce --------------------------------------------------------------------

#-------------------------------------------------------------------------------------------
# mkdocs / mkdocs-material
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
pip install mkdocs mkdocs-material
# mise à jour de mkdocs
pip install -U mkdocs
# idem pour mkdocs-material
pip install -U mkdocs-material
mkdocs new demo
cd demo
mkdocs serve
#----- fin de mkdocs --------------------------------------------------------------------

#-------------------------------------------------------------------------------------------
# Sauvegarde, duplication et backups
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#
# Faire une copie complète de son dossier de travail
cd /home/
sudo tar czf compte_eel_home.tar.gz ${compte-eel}
#
# Sauvegarde d'une base de données
mysqldump -uroot -p votre_db > votre_db.sql
# Restauration (pour le user root)
sudo mysql -uroot -p -Bse "create database votre_db"
cat votre_db.sql | mysql -uroot -p votre_db
#-------------------------------------------------------------------------------------------

#-------------------------------------------------------------------------------------------
# Trucs et astuces
# ~~~~~~~~~~~~~~~~
#
# changer de superutilisateur et rester dans un nouveau shell
sudo -u user -s
# ajouter le groupe adm à votre compte actuel
sudo usermod -aG adm $(whoami)
# changer votre groupe par défaut, par exemple pour adm
sudo usermod -g adm $(whoami)
# Supprimer récursivement des fichiers correspondants à un pattern :
sudo find . -name "._*" -delete
# "Pusher" un directory avant de partir ailleurs :
pushd .
# allez où vous voulez
cd ...
# revenez au dossier "Pushé" précédemment
popd
#
# Vérifier la quantité de mémoire utilisée
free -m
# Afficher la taille d'un dossier et ses sous-dossiers (en kilos)
du -ks
# Afficher les partitions et les disques montés
df -k
# Chercher un process en fonction de son nom
sudo ps -ef | grep son_nom
# Tuer un process en fonction de son id
sudo kill -9 process_id
#
# Quelques commandes pratiques
# ~~~~~~~~~~~~~~~~
#
# htop <https://htop.dev>
sudo apt install htop  
# nano <https://doc.ubuntu-fr.org/nano>
sudo apt install nano
# fzf <https://github.com/junegunn/fzf>
sudo apt install fzf

# Quelques commandes amusantes
# ~~~~~~~~~~~~~~~~
#
# cmatrix <https://doc.ubuntu-fr.org/tutoriel/matrix_terminal)>
sudo apt install cmatrix  
# cowsay <https://manpages.ubuntu.com/manpages/bionic/man6/cowsay.6.html>
sudo apt install cowsay  
# sl <https://manpages.ubuntu.com/manpages/bionic/man6/sl.6.html>
sudo apt install sl
# figlet <https://manpages.ubuntu.com/manpages/trusty/man6/figlet-figlet.6.html>
sudo apt install figlet
# toilet  <https://manpages.ubuntu.com/manpages/bionic/man1/toilet.1.html>
sudo apt install toilet
# cacademo <https://doc.ubuntu-fr.org/caca-utils>
sudo apt install caca-utils
#----- Fin Trucs et astuces ----------------------------------------------------------------
```
