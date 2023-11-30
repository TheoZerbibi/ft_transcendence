Pour que les composants internes de votre ChatWindow, comme FriendRequestsList, s'adaptent à la taille d'une image spécifique et non à la taille de la fenêtre, vous pouvez utiliser une combinaison de CSS et de JavaScript pour atteindre cet objectif. Voici les étapes générales que vous pourriez suivre :

1. **Déterminez les dimensions de l'image** : Vous devrez connaître les dimensions réelles de l'image utilisée dans votre ChatWindow pour pouvoir définir les tailles relatives de vos composants en fonction de ces dimensions.

2. **Position relative** : Assurez-vous que le conteneur de votre ChatWindow utilise une position relative pour que tous les éléments enfants positionnés absolument puissent se baser sur ses dimensions.

3. **Utilisez JavaScript pour ajuster la taille** : Vous pouvez ajouter un écouteur d'événements `mounted` ou `updated` dans Vue.js qui ajustera la taille des composants internes en fonction des dimensions de l'image chargée.

4. **Ajustement dynamique** : Si votre ChatWindow peut changer de taille (par exemple, en réponse à des actions de l'utilisateur), vous devrez peut-être ajouter un écouteur d'événements pour redimensionner les composants internes chaque fois que la taille de l'image change.

Voici un exemple de code qui illustre comment vous pourriez procéder :

```javascript
<template>
  <div class="chat-window" ref="chatWindowRef">
    <img src="/chat/omorichat.png" @load="adjustComponentsToImage">
    <FriendRequestsList :style="{ width: friendRequestWidth + 'px', height: friendRequestHeight + 'px' }"/>
    <!-- Autres composants -->
  </div>
</template>

<script>
import FriendRequestsList from './FriendRequestsList.vue';

export default {
  components: {
    FriendRequestsList,
  },
  data() {
    return {
      friendRequestWidth: 0,
      friendRequestHeight: 0,
    };
  },
  methods: {
    adjustComponentsToImage(event) {
      // Obtenez les dimensions réelles de l'image
      const { width, height } = event.target;
      
      // Ajustez la taille de vos composants en fonction des dimensions de l'image
      this.friendRequestWidth = width * someScaleFactor; // someScaleFactor est un facteur d'échelle basé sur votre design
      this.friendRequestHeight = height * someScaleFactor;
    },
  },
};
</script>

<style scoped>
.chat-window {
  position: relative;
  /* Autres styles */
}
</style>
```

Dans cet exemple :

- `@load="adjustComponentsToImage"` appelle la méthode `adjustComponentsToImage` lorsque l'image est chargée pour obtenir ses dimensions.
- `adjustComponentsToImage` définit la largeur et la hauteur des composants enfants en fonction des dimensions de l'image. Vous pouvez définir `someScaleFactor` en fonction de la proportion que vous souhaitez que vos composants occupent par rapport à l'image.
- `:style="{ width: friendRequestWidth + 'px', height: friendRequestHeight + 'px' }"` applique ces dimensions au composant FriendRequestsList.

Assurez-vous que le chemin de l'image est correct et accessible à partir de l'emplacement de votre composant Vue.js. Vous devrez ajuster le `someScaleFactor` pour répondre à vos besoins spécifiques en matière de mise en page.