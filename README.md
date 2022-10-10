# Piiquante #

C'est projet est destiné à construire une API sécurisée pour une application web de critique d'avis gastronomique.



## 🛠 Skills
Node.js - Express - MongoDB


## Installation

Clonez le repository

* Backend

Depuis le répertoire "backend" du projet, exécutez les commandes suivantes

```bash
  npm install
```  
et  
```bash
  nodemon server
```

Ceci lancera un serveur node.

* Frontend 

Depuis le répertoire "frontend" du projet, exécutez les commandes suivantes :  

```bash
  npm install
```  
et  
```bash
  npm start
```  

Une fenêtre s'ouvrira instantannément et vous serez connecté à l'application.
    
## __Spécifications de l'API__


* #### Enregistrement d'un utilisateur

```http
  POST /api/auth/signup
```

| Corps de la requête | Type de réponse attendue     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `{email: string, password: string}`      | `{message: string}` | Hachage du mot de passe de l'utilisateur, ajout de l'utilisateur à la base de données.

* #### Connexion à l'application

```http
  POST /api/auth/login
```

| Corps de la requête | Type de réponse attendue     | Description                       |
| :-------- | :------- | :--------------------------------------------------------- |
| `{email: string, password: string}`      | `{userId: string, token: string}` | Vérification des informations d'identification de l'utilisateur, renvoie l _id de l'utilisateur depuis la base de données et un token web JSON signé (contenant également l'_id de l'utilisateur). |

* #### Afficher toutes les sauces  

```http
  GET /api/sauces
```

| Corps de la requête | Type de réponse attendue     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `-`      | `Array of sauces` | Renvoie un tableau de toutes les sauces de la base de données.  

* #### Afficher une sauce précise 

```http
  GET /api/sauces/:id
```

| Corps de la requête | Type de réponse attendue     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `-`      | `Single sauce` | Renvoie la sauce avec l'_id fourni.  

* #### Ajouter une sauce  

```http
  POST /api/sauces
```

| Corps de la requête | Type de réponse attendue     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `{sauce: string, image: File}`      | `{message: string}` __Verb__ | Enregistre une nouvelle sauce dans la base de donnée.  

* #### Modifier une sauce   

```http
  PUT /api/sauces/:id
```

| Corps de la requête | Type de réponse attendue     | Description                       |
| :-------- | :------- | :-------------------------------- |
| EITHER Sauce as JSON OR `{sauce: string, image; File}`      | `{message: string}` | Met à jour la sauce avec l'_id fourni.  

* #### Supprimer une sauce   

```http
  DELETE /api/sauces/:id
```

| Corps de la requête | Type de réponse attendue     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `-`      | `{message: string}` | Supprime la sauce avec l'_id fourni.  

* #### Liker ou disliker une sauce   

```http
  POST /api/sauces/:id/like
```

| Corps de la requête | Type de réponse attendue     | Description                       |
| :-------- | :------- | :-------------------------------- |
|  `{userId: string, like: Number}`      | `{message: string}` | Définit le status "Like" pour l'userId fourni. Si like = 1, l'utilisateur aime la sauce. Si like = 0, il annule son like ou dislike .  



