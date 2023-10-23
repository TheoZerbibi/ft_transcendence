<template>
    <v-app-bar app color="black" dark flat class="px-12">
        <v-btn>
            <!-- Icon does not work -->
            <v-icon color="pink" left class="mr-2">fas fa-solid fa-paw fa-bounce</v-icon>42 paris 
            <font-awesome-icon :icon="['fas', 'paw']"></font-awesome-icon>
            <font-awesome-icon icon="fa-solid fa-heart" beat></font-awesome-icon>
        </v-btn>

        <!-- <v-btn color="orange" left class="mr-2"> -->
        <!-- <i class="fa-solid fa-paw fa-bounce"></i> -->
        <!-- 42 Paris -->
        <!-- </v-btn> -->

        <v-spacer></v-spacer>
        <v-btn text @click="scroll('home')" class="text-red">Home</v-btn>
        <v-btn text @click="scroll('project')" class="text-orange">The project</v-btn>
        <v-btn text @click="scroll('tools')" class="text-yellow">The tools</v-btn>
        <v-btn text @click="scroll('team')" class="text-green">The team</v-btn>
        <v-btn text @click="scroll('game')" class="text-blue">The game</v-btn>
        <v-btn text @click="scroll('blog')" class="text-purple">Blog</v-btn>
        <v-btn text @click="scroll('contact')" class="text-pink">Contact</v-btn>
    </v-app-bar>
</template>

<script>
import { defineComponent } from 'vue';

export default {
    methods: {
        scroll(refName) {
            const element = document.getElementById(refName);
            element.scrollIntoView({behavior: "smooth"});
        }
    }
}
</script>

<style scoped>
</style>
