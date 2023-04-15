Site web de photographie 100% accessible
Bienvenue sur le site web de photographie entièrement accessible aux utilisateurs en situation de handicap !

Nous sommes fiers de vous présenter un site web de photographie accessible à tous. Nous avons mis en place des fonctionnalités spécifiques pour permettre une utilisation fluide et agréable pour les personnes malvoyantes ou atteintes d'autres handicaps.

Comment utiliser notre site web
Notre site web est facile à utiliser, il n'y a rien à installer pour l'utiliser. Nous avons utilisé des designs patterns en javascript pour créer une expérience utilisateur fluide et agréable.

L'extension "Plyr" est utilisée via cdn pour la gestion de lecture des vidéos, ce qui permet une expérience de lecture vidéo plus agréable et facile  d'utilisation pour l'ensemble des utilisateurs.

Fonctionnalités supplémentaires ajoutées
Voici quelques-unes des fonctionnalités que nous avons mises en place pour les utilisateurs de lecteurs d'écran :

Textes alternatifs : Nous avons ajouté des descriptions textuelles sur notre site web, pour permettre aux utilisateurs malvoyants d'obtenir une compréhension complète de toutes informations présentes sur le site.

Contraste élevé : Nous avons utilisé des couleurs de haute visibilité pour garantir que tous les utilisateurs puissent lire le texte et voir les images clairement.

Navigation clavier : Notre site web est facile à naviguer avec un clavier, pour les utilisateurs qui ont des difficultés à utiliser une souris.

Contactez-nous
Nous sommes engagés à rendre notre site web de photographie accessible à tous les utilisateurs. Si vous avez des suggestions ou des commentaires, n'hésitez pas à nous contacter. Nous sommes heureux de vous offrir une expérience agréable et accessible sur notre site web de photographie.

Installation
Rien à installer pour démarrer le projet, il suffit d'ouvrir le fichier `index.html`.

Architecture du projet

data : contient l'ensemble des informations sur les photographers ainsi que sur les publications de ces derniers

assets : contient les images, vidéos, icons et favicon

SCRIPT
api/Api : requêtes pour récupérer les informations présentes dans data

components/carousel : Ce fichier exporte une classe "Carousel" qui gère l'affichage d'un carousel de medias (pas l'affichage des medias). Elle contient des fonctions pour récupérer et définir l'élément actif du carousel, ainsi que pour gérer les événements sur les boutons de navigation.

components/carouselMedia : Le code exporte une classe "carouselMedia" qui crée un élément "li" pour chaque média et y ajoute des attributs et des valeurs (comme activeItem). carouselMediaRender ajoute des éléments "img" ou "video" ainsi qu'un titre à cet élément "li". Enfin un objet Plyr est initialisé pour la gestion des vidéos et l'ajoute à la page.

components/contactForm : Définit une classe FormModal qui crée et gère un formulaire de contact pour un photographe. La méthode formRender() crée le contenu du formulaire et ajoute des gestionnaires d'événements, tels que la validation des champs du formulaire et la fermeture du formulaire en appuyant sur la touche "Escape". La méthode handleEvents() s'occupe de la gestion des événements. Le code importe également des fonctions utilitaires à partir de deux fichiers externes (utils).

components/mediaCard : Construit les cards des medias pour la page photographe et gère les événements clic et like. La carte est créée à partir des informations de média fournies. La méthode mediaCard génère le HTML de la carte et la méthode eventsOnMedia ajoute les événements de clic et de like. La carte est ensuite ajoutée à la section photograph_media dans le DOM.

components/photographerCard : Cette classe crée une carte de photographe avec différentes informations telles que le nom, la photo, la localisation, le slogan et le prix. Elle contient des fonctions pour récupérer la photo et les informations du photographe pour l'afficher sur la page, ainsi qu'une fonction pour récupérer le nombre de likes et le prix pour afficher sur la page. Cette classe est utilisée sur la page d'accueil et sur la page du photographe.

components/triForm : Cette classe représente un menu déroulant de tri de médias grâçe à un filtre qui ordonne les médias. Elle contient des méthodes pour trier et afficher les médias en fonction du filtre sélectionné. Elle utilise également la classe 'ProxyTri' pour trier les médias. En outre, elle utilise les classes 'carouselMedia' et 'MediaCard' pour générer les éléments HTML correspondants.

factories/media : Ce code crée une instance de classe de média en fonction de si le média est une image ou une vidéo. Le type de média est ajouté à l'instance créée. Si aucun média n'est passé en paramètre, une erreur est retournée.

factories/photographer : Ce code crée des instances de la classe PhotographerInfo à partir des données renvoyées par une API. Il prend deux paramètres: le résultat contenant les données renvoyées par l'API et l'ID du photographe à récupérer (si le type est "photographer"). Selon le type, le code récupère les données d'un photographe spécifique ou de tous les photographes et crée une instance PhotographerInfo pour chaque photographe.

factories/tri : La classe "TriApi" prend en paramètre un tableau de données à trier et un critère de tri. Elle retourne une promesse avec un objet contenant la clé de tri et le tableau trié. La fonction utilise la méthode "sort" pour trier les données en fonction du critère choisi (popularité, date ou titre). Elle utilise également un "setTimeout" pour ne pas bloquer l'interface utilisateur pendant le tri.

models/media : Ce code contient une classe Media qui sert de parent pour les classes ImageMedia et VideoMedia. Elle permet de récupérer des informations sur une publication telles que l'id, le titre, le nombre de likes, la date, le prix et l'id du photographe. Les deux classes enfants retournent les chemins d'accès pour une image ou une vidéo en utilisant la méthode getSource() qui utilise le nom du photographe et le nom du fichier média.

models/Photographer : Ce code permet d'accéder aux données d'un photographe à l'aide de méthodes get. Les informations accessibles incluent le nom, l'identifiant, la ville et le pays, la description, le prix et le portrait du photographe.

pages/index : Ce code affiche les données de la page principale en récupérant les données des photographes via l'API, en les ordonnant et en les affichant sur la page avec la classe PhotographerCard. Il "initialise" également l'attribut tabindex pour les utilisateurs qui de naviguent au clavier ou avec une tablette.

pages/photographer : Ce code définit la classe "PhotographerPage" qui affiche la galerie de médias d'un photographe. Il récupère l'ID et les informations du photographe ainsi que les médias correspondants à partir de l'API. Il crée une carte pour le photographe et un carrousel pour afficher la galerie de médias triée et filtrée. Il affiche les informations du photographe, sa photo et le total de ses likes à l'écran. Il crée également une fenêtre modale pour le formulaire de contact et la galerie de médias.

proxy/proxyTri : Le code définit une classe ProxyTri qui ajoute une couche de cache pour stocker les résultats du tri précédent. La méthode trieur cherche d'abord si les données sont dans le cache, sinon elle appelle la méthode sortData de la class TriApi pour trier les données et stocker le résultat dans le cache. L'utilisation de ce cache permet de réduire le nombre de requêtes et améliore donc les performances du site.

utils/carouselAcces : Ce code contient des fonctions qui gèrent l'accessibilité du carrousel, ouvrent et ferment le carrousel, contrôlent la lecture vidéo et initialisent le lecteur vidéo Plyr. Les fonctions utilisent des événements de clavier pour permettre une interaction avec le carrousel et la vidéo.

utils/contactAcces : Ce code contient des fonctions pour gérer l'affichage et la validation d'un formulaire de contact. Les fonctions namesCheck(), emailCheck(), messageCheck() et formValidation() vérifient que les champs du formulaire sont correctement remplis tandis que les fonctions openContactForm() et closeContactForm() gèrent l'affichage du formulaire. La fonction clearForm() vide le formulaire.

utils/genRaccourci : Fonctions fludifiant la compréhension du code des autres fichiers. Gère surtout des évènements du DOM
