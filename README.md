# FantomApp Frontend

Ce module contient le client web du projet FantomApp. Il est écrit en Angular.

## Installation pour le développeur

### Prérequis

- Node v18.19 ou supérieur (`nvm` conseillé)

### Installation

Tout d'abord, il faut installer les dépendances NPM.

```bash
pnpm install
```

L'utilisation de l'option `--force` peut être nécessaire.

Ensuite, la commande suivante permet de lancer le frontend :

```bash
pnpm start
```

Attention : cette commande n'est pas identique à `ng serve`, l'application ne fonctionnera pas correctement. 

### Structure du code

Le code utilise une structure classique et les packages sont organisés par type d'objets.

### Flow d'initialisation et interceptions d'erreurs

L'application s'initialise de la manière suivante :
- Un appel API est fait (`/api/config`)
- Si l'OIDC est utilisé, la connection est demandée pour authentifier l'utilisateur.
- L'utilisateur est alors redirigé vers l'accueil et on lui affiche son profil ainsi que les versions du backend et du frontend.

Dans le cas où une erreur survient sur un appel HTTP, les interceptor entre en jeu pour rediriger vers une page d'erreur. Les erreurs de redirigées sont dans le fichier `api.interceptor.ts`, il faut vérifier la configuration pour éviter les redirections intempestives.

### Services existants

Quelques services existent comme un loader. Ce dernier est automatiquement caché lorsqu'un appel se termine. C'est au développeur de décider s'il faut l'afficher ou non. La vue du loader n'est pas implémentée, car celle-ci dépend du système de design utilisé. Cette tâche est à la charge du développeur.

### Editorconfig

Ce module utilise un fichier `.editorconfig`. Ce dernier permet d'unifier le formatage de code, sans dépendre d'une librairie, et ce, pour tous les langages utilisés.

Il est donc préférable de ne pas utiliser de formateur de code à part celui-ci. La majorité des IDEs sont compatibles avec ce type de fichier sans nécessiter l'installation d'extensions.

## Licence

Ce projet est sous licence Apache 2.0 - voir le fichier [LICENSE](LICENSE.txt) pour plus de détails. 
