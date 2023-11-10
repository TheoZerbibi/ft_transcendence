### Introduction aux Interfaces

1. **Définition** : Une interface en TypeScript est une façon de définir la structure d'un objet. Elle spécifie les propriétés, les méthodes et les types que l'objet doit avoir.

2. **Syntaxe de Base** :
   ```typescript
   interface NomInterface {
       propriete: type;
       // ...
   }
   ```

### Propriétés d'une Interface

1. **Propriétés Obligatoires** : Toutes les propriétés d'une interface sont par défaut obligatoires.
   ```typescript
   interface Personne {
       nom: string;
       age: number;
   }
   ```

2. **Propriétés Optionnelles** : Utilisez `?` pour marquer une propriété comme optionnelle.
   ```typescript
   interface Personne {
       nom: string;
       age?: number;
   }
   ```

3. **Propriétés en Lecture Seule** : Utilisez `readonly` pour rendre une propriété non modifiable après sa première assignation.
   ```typescript
   interface Personne {
       readonly id: number;
       nom: string;
   }
   ```

### Méthodes dans une Interface

1. **Définition de Méthode** : Vous pouvez définir des signatures de méthodes dans une interface.
   ```typescript
   interface Personne {
       nom: string;
       direBonjour(): string;
   }
   ```

2. **Méthodes avec Paramètres** :
   ```typescript
   interface Personne {
       nom: string;
       direQuelqueChose(message: string): string;
   }
   ```

### Héritage d'Interface

1. **Étendre une Interface** : Les interfaces peuvent hériter d'autres interfaces avec `extends`.
   ```typescript
   interface Employe extends Personne {
       poste: string;
   }
   ```

2. **Héritage Multiple** : Une interface peut étendre plusieurs interfaces.
   ```typescript
   interface Chef extends Employe, Contactable {
       departement: string;
   }
   ```

### Implémentation d'Interface

1. **Implémenter une Interface** : Les classes peuvent implémenter des interfaces pour assurer une certaine structure.
   ```typescript
   class Etudiant implements Personne {
       nom: string;
       direBonjour(): string {
           return `Bonjour, je m'appelle ${this.nom}`;
       }
   }
   ```

2. **Interfaces avec le Constructeur** : TypeScript ne permet pas de définir directement un constructeur dans une interface, mais vous pouvez contourner cela en utilisant une interface de fonction de construction.
   ```typescript
   interface PersonneConstructeur {
       new (nom: string): Personne;
   }
   ```

### Interfaces pour les Fonctions

1. **Interface de Fonction** : Vous pouvez définir une interface pour une fonction.
   ```typescript
   interface Recherche {
       (source: string, sousChaine: string): boolean;
   }
   ```

### Interfaces pour les Index

1. **Index Signatures** : Permet de définir des types pour les index d'un objet.
   ```typescript
   interface StringArray {
       [index: number]: string;
   }
   ```
