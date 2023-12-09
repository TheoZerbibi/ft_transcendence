<template>
	<div>
		<v-container> <!-- provides the ability to center and horizontally pad site’s contents. -->
			<v-row align="center" no-gutters style="height: 150px;">
					<Button width="150px" height="50px">Click here 01</Button>
					<Button width="150px" height="50px">Click here 02</Button>
					<Button width="150px" height="50px">Click here 03</Button>
				<div>
					<table>
						<tr>
							<th>class="omoriFont"</th>
							<th>class="omoriDisturbed"</th>
							<th>class="omoriArcade"</th>
						</tr>
						<tr>
							<td>
								<h1 class="omoriFont">Titre h1</h1>
							</td>
							<td>
								<h1 class="omoriDisturbed">Titre h1</h1>
							</td>
							<td>
								<h1 class="omoriArcade">Titre h1</h1>
							</td>
						</tr>
						<tr>
							<td>
								<h2 class="omoriFont">Titre h2</h2>
							</td>
							<td>
								<h2 class="omoriDisturbed">Titre h2</h2>
							</td>
							<td>
								<h2 class="omoriArcade">Titre h2</h2>
							</td>
						</tr>
						<tr>
							<td>
								<h3 class="omoriFont">Titre h3</h3>
							</td>
							<td>
								<h3 class="omoriDisturbed">Titre h3</h3>
							</td>
							<td>
								<h3 class="omoriArcade">Titre h3</h3>
							</td>
						</tr>
						<tr>
							<td>
								<p class="omoriFont">Paragraphe</p>
							</td>
							<td>
								<p class="omoriDisturbed">Paragraphe</p>
							</td>
							<td>
								<p class="omoriArcade">Paragraphe</p>
							</td>
						</tr>
					</table>
				</div>
			</v-row>
		</v-container>
	</div>
</template>

<script lang="ts">
import Button from '../components/layout/Button.vue';
import { defineComponent } from 'vue';
import { useUser } from '../stores/user';
import { computed } from 'vue';

const userStore = useUser();

export default defineComponent({
	name: 'HomeView',
	components: { Button },
	setup() {
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);

		return {
			JWT,
			user,
		};
	},
	async beforeMount() {
		const token = this.$cookies.get('token');
		if (!this.JWT || token) {
			if (token) {
				this.$cookies.remove('token');
				try {
					await userStore.setJWT(token);
				} catch (err) {
					return this.$router.push({ name: `Login` });
				}
			} else return this.$router.push({ name: `Login` });
		}
	},
});
</script>

<style>
table,
th,
td {
	border: 1px solid white;
	white-space: nowrap;
	border-collapse: collapse;
	padding: auto;
}

table {
	width: 70%;
}

th,
td {
	height: auto;
	align-items: center;
}
</style>
