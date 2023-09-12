<template>
	<v-container>
		<v-row class="text-center">
			<v-col cols="12">
				<v-img
					:src="logo"
					class="my-3"
					contain
					height="200"
				/>
			</v-col>

		<v-col class="mb-4">
			<h1 class="display-2 font-weight-bold mb-3">
				Welcome to<br> ft_transcendence MEOW team
			</h1>

			<h4>Starring:</h4>

			<p class="subheading font-weight-regular">
				Théo
				<a
					href="https://profile.intra.42.fr/users/thzeribi"
					target="_blank"
				>(thzeribi 42 Intra profile)</a>
				<br>Ismaël
				<a
					href="https://profile.intra.42.fr/users/iguidado"
					target="_blank"
				>(iguidado 42 Intra profile)</a>
				<br>Gaëlle
				<a
					href="https://profile.intra.42.fr/users/grannou"
					target="_blank"
				>(grannou 42 Intra profile)</a>
				<br>Semiha
				<a
					href="https://profile.intra.42.fr/users/seozcan"
					target="_blank"
				>(seozcan 42 Intra profile)</a>
				<br>Noémi
				<a
					href="https://profile.intra.42.fr/users/nfauconn"
					target="_blank"
				>(nfauconn 42 Intra profile)</a>

			</p>
		</v-col>

		<v-col
			class="mb-5"
			cols="12"
		>
		<h2 class="headline font-weight-bold mb-5">
			What's next?
		</h2>

		<v-row justify="center">
		  <a
			v-for="(next, i) in whatsNext"
			:key="i"
			:href="next.href"
			class="subheading mx-3"
			target="_blank"
		  >
			{{ next.text }}
		  </a>
		</v-row>
	  </v-col>

	  <v-col
		class="mb-5"
		cols="12"
	  >
		<h2 class="headline font-weight-bold mb-5">
		  Important Links
		</h2>

		<v-row justify="center">
		  <a
			v-for="(link, i) in importantLinks"
			:key="i"
			:href="link.href"
			class="subheading mx-3"
			target="_blank"
		  >
			{{ link.text }}
		  </a>
		</v-row>
	  </v-col>

	  <v-col
		class="mb-5"
		cols="12"
	  >
		<h2 class="headline font-weight-bold mb-5">
		  Ecosystem
		</h2>

		<v-row justify="center">
		  <a
			v-for="(eco, i) in ecosystem"
			:key="i"
			:href="eco.href"
			class="subheading mx-3"
			target="_blank"
		  >
			{{ eco.text }}
		  </a>
		</v-row>
	  </v-col>
	</v-row>
  </v-container>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

// Logo
// import logo from '../assets/logo.svg'
import logo from '../assets/Scoubigang.jpeg'

export default defineComponent({
  name: 'HelloWorld',

  data () {
	return {
	  ecosystem: [
		{
		  text: 'vuetify-loader',
		  href: 'https://github.com/vuetifyjs/vuetify-loader/tree/next',
		},
		{
		  text: 'github',
		  href: 'https://github.com/vuetifyjs/vuetify/tree/next',
		},
		{
		  text: 'awesome-vuetify',
		  href: 'https://github.com/vuetifyjs/awesome-vuetify',
		},
	  ],
	  importantLinks: [
		{
		  text: 'Chat',
		  href: 'https://community.vuetifyjs.com',
		},
		{
		  text: 'Made with Vuetify',
		  href: 'https://madewithvuejs.com/vuetify',
		},
		{
		  text: 'Twitter',
		  href: 'https://twitter.com/vuetifyjs',
		},
		{
		  text: 'Articles',
		  href: 'https://medium.com/vuetify',
		},
	  ],
	  logo,
	  whatsNext: [
		{
		  text: 'Explore components',
		  href: 'https://vuetifyjs.com',
		},
		{
		  text: 'Roadmap',
		  href: 'https://vuetifyjs.com/en/introduction/roadmap/',
		},
		{
		  text: 'Frequently Asked Questions',
		  href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
		},
	  ],
	}
  },
})
</script>
