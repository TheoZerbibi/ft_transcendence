<template>
    <v-app-bar app color="black" dark flat class="px-12">
        <v-btn>
            <!-- Icon does not work -->
            <v-icon color="yellow" left class="mr-2">fas fa-signature</v-icon>42 paris 
        </v-btn>

        <v-icon color="yellow" left class="mr-2">
        <i class="fas fa-signature"></i>
        </v-icon>

        <v-spacer></v-spacer>
        <v-btn text @click="scroll('home')" class="text-yellow">Home</v-btn>
        <v-btn text @click="scroll('about')">About</v-btn>
        <v-btn text @click="scroll('portfolio')">Portfolio</v-btn>
        <v-btn text @click="scroll('services')">Services</v-btn>
        <v-btn text @click="scroll('page')">Page</v-btn>
        <v-btn text @click="scroll('blog')">Blog</v-btn>
        <v-btn text @click="scroll('contact')">Contact</v-btn>
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
