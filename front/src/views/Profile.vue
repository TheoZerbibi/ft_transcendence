<template>
	<main
		:style="{
			backgroundImage: 'url(/ui/ProfileBackground.png)',
			backgroundPosition: 'center center',
			backgroundSize: '120% 100%',										// Déforme l'image pour s'adapter à 100% de la largeur et de la hauteur
			height: '100vh',													// Hauteur de la vue à 100%
			// margin: 0,															// Supprime les marges par défaut du body
		}"
	>
		<a href="https://bibliotheques.paris.fr/" target="_blank" class="clickable-area link1"></a>
		<a href="/chat" class="clickable-area link2"></a>
		<a href="https://meta.intra.42.fr/articles/read-the-french-manual-of-42paris" class="clickable-area link3"></a>
		<div class="clickable-area link4" onclick="openModal()">
        <!-- Utilisation de Vue pour gérer l'ouverture du modal -->
        <div @click="openModal" class="clickable-area link2">
            <div v-if="isModalOpen" class="modal">
                <div class="modal-content">
                    <span @click="closeModal" class="close">&times;</span>
                    <p>Contenu du modal ici</p>
                </div>
            </div>
        </div>
    </div>
	</main>
</template>

<script lang="ts">
import { useUser } from '../stores/user';
import { computed, defineComponent } from 'vue';

export default defineComponent({
	name: 'HomeView',
	setup() {
		const userStore = useUser();
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);

		return {
			JWT,
			user,
		};
	},
	beforeMount() {
		if (!this.JWT || !this.user) {
			return this.$router.push({ name: `Login` });
		}
	},
	data() {
        return {
            isModalOpen: false,
        };
    },
	methods: {
                redirectToPage(url) {
                    window.location.href = url;
                },
                openModal() {
                    this.isModalOpen = true;
                },
                closeModal() {
                    this.isModalOpen = false;
                },
            },
});
</script>

<style scoped>
.pageBackground {
	margin: 0;
	align-items: center;
	justify-content: center;
	background-color: black;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vw;
	z-index: -1;
}

.clickable-area {
	position: absolute;
	cursor: pointer;
}
.clickable-area:hover {
		cursor: url(https://www.omori-game.com/img/cursor/cursor.png), auto;
	}


.link1 {
	top: 13%;
	left: 5%;
	width: 10%;
	height: 20%;
	/* Background color pour montrer la zone cliquable, vous pouvez le supprimer */
	background-color: rgba(25, 218, 167, 0.3);
}
.link2 {
	top: 15%;
	left: 17%;
	width: 11%;
	height: 13%;
	/* Background color pour montrer la zone cliquable, vous pouvez le supprimer */
	background-color: rgba(25, 218, 167, 0.3);
}

.link3 {
	top: 70%;
	left: 5%;
	width: 8%;
	height: 5%;
	/* Background color pour montrer la zone cliquable, vous pouvez le supprimer */
	background-color: rgba(25, 218, 167, 0.3);
}
.link4 {
	top: 10%;
	left: 38%;
	width: 7%;
	height: 8%;
	/* Background color pour montrer la zone cliquable, vous pouvez le supprimer */
	background-color: rgba(25, 218, 167, 0.3);
}

/* Style du modal */
.modal {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: #fff;
    z-index: 2;
}

.modal-content {
    text-align: center;
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
}

.omoriButton {
	max-width: 4.5rem;
	padding: 0.25rem 0.125rem;
	position: relative;
	top: 0px;
	flex: 0 0 calc(25% - 15px);
	--tw-bg-opacity: 1;
	background-color: rgb(0 0 0 / var(--tw-bg-opacity));
	--tw-text-opacity: 1;
	color: rgb(255 255 255 / var(--tw-text-opacity));
	box-shadow:
		inset 0 0 0 1px #000,
		inset 0 0 0 3px #fff;
	text-transform: uppercase;
	-webkit-user-select: none;
	-moz-user-select: none;
	user-select: none;
	-moz-tap-highlight-color: transparent;
	-webkit-tap-highlight-color: transparent;
	cursor: url(/img/cursor/cursor.png), auto;
}

@media screen and (max-width: 960px) {
	.profileHome {
		flex-direction: column;
	}
}
</style>
