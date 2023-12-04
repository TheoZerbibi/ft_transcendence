<template>
	<main>
		<!-- <section> -->
			<v-container class="profileHome">
				<div class="box one">
					<link rel="icon" href="/favicon.ico" />
				</div>
				<div class="box two">
				</div>
				<div class="box three"></div>
				<div class="box four">
					<v-btn class="omoriButton omoriPolice">Modify</v-btn>
					<v-btn class="omoriButton omoriPolice">Logout</v-btn>
				</div>
				<div class="box five">
					<div></div>
					<div></div>
				</div>
				<div class="box six">
					<v-btn class="omoriButton omoriPolice" @click="$router.push('chat')"
						>Chat</v-btn
					>
				</div>
				<div class="box seven">
					Security
					<v-btn class="omoriButton omoriPolice">Enable 2FA</v-btn>
				</div>
				<div class="box eight">
					Privacy;
					<v-btn class="omoriButton omoriPolice">Delete account</v-btn>
				</div>
				<div class="box nine">Match history</div>
				<div class="box ten">
					<br />
					<br />
					<v-btn class="omoriButton omoriPolice" @click="$router.push('chat')"
						>Play</v-btn
					>
				</div>
				<div class ="box eleven"></div>
				<div class ="box twelve"></div>
				<div class ="box thirteen"></div>
				<div class ="box fourteen"></div>
				<div class ="box fifteen"></div>
				<div class ="box sixteen"></div>
				<div class ="box seventeen"></div>
				<div class ="box eighteen"></div>
				<div class ="box nineteen"></div>
				<div class ="box twenty"></div>
				<div class ="box twentyone"></div>
				<div class ="box twentytwo"></div>
				<div class ="box twentythree"></div>
				<div class ="box twentyfour"></div>

			</v-container>
		<!-- </section> -->
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
});
</script>

<style scoped>

.omoriButton {
	/* display: flex; */
	/* align-items: center; */
	/* min-width: auto; */
	/* padding-left: 20px; */

    max-width: 4.5rem;
    padding: 0.25rem 0.125rem;
    position: relative;
    top: 0px;
    flex: 0 0 calc(25% - 15px);
    --tw-bg-opacity: 1;
    background-color: rgb(0 0 0 / var(--tw-bg-opacity));
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
    box-shadow: inset 0 0 0 1px #000, inset 0 0 0 3px #fff;
    text-transform: uppercase;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    -moz-tap-highlight-color: transparent;
    -webkit-tap-highlight-color: transparent;
    cursor: url(/img/cursor/cursor.png),auto;
}


.site-footer__info>:not([hidden])~:not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.25rem * var(--tw-space-x-reverse));
    margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));
}
.profileHome {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: 70px 70px 70px 70px 70px 70px 70px 70px 70px 70px 70px 70px 70px;
	gap: 10px;
}

.box {
	background-color: white;
	background-size: cover;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
	/* Create border with color radiant */
	/* border: 2px solid #333; */
	/* text-align: center; */
	/* border: 5px solid transparent; */
  	/* border-image: linear-gradient(to right, #470979, #00d4ff) 5 repeat; */
}
.one {
	grid-row: 1 / 3;
}

.two {
	grid-row: 1 / 3;
}
.three {
	grid-row: 1 / 3;
}
.four {
	grid-row: 1 / 3;
}
.five {
	grid-column: 1 / 2;
	grid-row: 3 / 5;
}
.six {
	grid-row: 3 / 5;	
}
.seven {
	grid-row: 3 / 5;
}
.eight {
	grid-row: 3 / 5;
}
.nine {
	grid-column: 1 / 2;
	grid-row: 5 / 7;
}
.ten {
	grid-row: 5 / 7;
}

.eleven {
	grid-row: 5 / 7;
}

.twelve {
	grid-row: 5 / 7;
}


.thirteen {
	grid-column: 1 / 2;
	grid-row: 7 / 9;
}

.fourteen {
	grid-row: 7 / 9;
/*  */
	}
.fifteen {
	grid-row: 7 / 9;
	}
.sixteen {
	grid-row: 7 / 9;
}
.seventeen {
	grid-column: 1 / 2;
	grid-row: 9 / 11;
	}
.eighteen {
	grid-row: 9 / 11;
}
.nineteen {
	grid-row: 9 / 11;
}
.twenty {
	grid-row: 9 / 11;
}
.twentyone {
	grid-column: 1 / 2;
	grid-row: 11 / 13;
}
.twentytwo {
	grid-row: 11 / 13;
}

.twentythree {
	grid-row: 11 / 13;
}

.twentyfour {
	grid-row: 11 / 13;
}


@media screen and (max-width: 960px) {
	.profileHome {
		flex-direction: column;
	}
}
</style>
