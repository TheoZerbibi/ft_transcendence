<template>
	<!-- object values use dot notation -->
	<h1>Hello {{ userObj.firstName }} {{ userObj.lastName }}</h1>

	<!-- arrays use the indexer -->
	<h2 class="pink">Hello {{ userArr[0] }} {{ userArr[1] }}</h2>

	<!-- including a link -->
	<a v-bind:href="link">Jumping Norminet</a>

	<!-- including a button with booelan attribute-->
	<button :disabled="isDisabled">Press Me</button>

	<!-- including data with html tags-->
	<p v-html="msg"></p>

	<p>Moustache syntax wraps the data property in double curly braces</p>
	<p v-pre>Example: {{ cat }}</p>

	<p>Th resulting output will be the value of th data property</p>
	<p>Example: {{ cat }}</p>

	<!-- Using a method to say hello -->
	<h3>{{ greeting() }}</h3>

	<!-- Using a method to say hello that take an argument-->
	<h3>{{ bonjour('Tylung') }}</h3>

	<!-- Event handling -->
	<p>{{ number }}</p>
	<button v-on:click="increment">Increase number</button>
	<button v-on:click="decrement">Decrease number</button>

	<!-- Use input and display it-->
	<p>First name: <input type="text" @input="getFirstName" /></p>
	<p>Last name : <input type="text" @input="getLastName" /></p>
	<p>Your full name is: {{ fullName }}</p>

	<!-- Use a button to change a variable-->
	<button v-on:click="login = 'Akatsuki grannou'">Give power</button>
	<p>{{ login }}</p>

	<!-- Use a button to change a variable with method taking parameter-->
	<button v-on:click="changeLogin('Akatsuki Philantropist grannou')">Give Super power</button>
	<p>{{ login42 }}</p>

	<!-- Use a button to change a variable with method taking parameter-->
	<!-- Shortcut: v-on:click devient @click -->
	<button @click="changeLogin('Akatsuki Philantropist grannou Kyubie'), changeStatus('Alumni')">
		Give Mega power
	</button>
	<p>{{ login42 }} ({{ status }})</p>

	<!-- Display the text of an input field on the page-->
	<p>Your favorite movie: {{ favoriteMovie }}</p>
	<input type="text" @input="getInput" />

	<!-- Display the text of an input field on the page AND event has multiple paramters-->
	<p>Your cat name: {{ catName }}</p>
	<input type="text" @input="getCatNameInput($event, 'Meow')" />

	<!-- Display two buttons as counter and a submit button-->
	<!-- that syntax to not loose counter to 0 when refreshing page-->
	<p>{{ counter }}</p>
	<button @click="incrementTemp">Increment Temperature</button>
	<button @click="decrementTemp">Decrement Temperature</button>

	<form @submit.prevent="submitForm">
		<p>
			<button>Send to guardian</button>
		</p>
	</form>

	<!-- Display an input string AFTER enter key is pressed -->
	<p>Your secret code: {{ secretCode }}</p>
	<input type="text" @keyup.enter="getSecretCode" />

	<!-- This will work even if Shift and another key is pressed-->
	<p><button @click.shift="shiftAnyHandler">Shift + Any + Click</button></p>

	<!-- This will only work when Shift and no other key are pressed-->
	<p><button @click.shift.exact="shiftOnlyHandler">Shift + Click</button></p>

	<!-- This will only work when no key modifiers are pressed-->
	<p><button @click.shift="clickOnlyHandler">Click only</button></p>

	<!-- Display a counter and its initial value with only one variable -->
	<p v-once>Initial grade: {{ grade }}</p>
	<p>Updated grade: {{ grade }}</p>

	<button @click="incrementGrade">Increment grade</button>
	<button @click="decrementGrade">Decrement grade</button>

	<!-- Input binding -->
	<p>Prenom: {{ prenom }}</p>
	<input type="text" v-model="prenom" />

	<!-- Input binding + lazy option (wait jump to next input to display previous-->
	<p>Fruit: {{ fruit }}</p>
	<input type="text" v-model.lazy="fruit" />

	<p>Legume: {{ legume }}</p>
	<input type="text" v-model="legume" />

	<!-- Input binding + lazy option (wait jump to next input to display previous)-->
	<!-- Input binding + trim option: remove outer whitespaces-->
	<p>Signe astro: {{ signeAstro }}</p>
	<input type="text" v-model.lazy.trim="signeAstro" />

	<p>Ascendant: {{ ascendant }}</p>
	<input type="text" v-model.trim="ascendant" />

	<!-- Same with lazy on text area -->
	<p>Personal Profile: {{ profile }}</p>
	<textarea cols="30" rows="10" v-model.lazy="profile"></textarea>

	<!-- v-model on a group element, specified on the parent select, option are children -->
	<p>Country: {{ country }}</p>
	<select v-model="country">
		<option value="">Please select your country</option>
		<option value="UK">United Kingdom</option>
		<option value="FR">France</option>
		<option value="JP">Japan</option>
		<option value="NZ">New Zealand</option>
	</select>

	<!-- Same on multiselection (with ctrl or cmd) stored in an array -->
	<p>Countries visited: {{ visited.join(', ') }}</p>
	<select multiple v-model="visited">
		<option value="HY">Hyrule</option>
		<option value="KM">Kaer Mohren</option>
		<option value="F2">Forty 2</option>
		<option value="SDF">Salle des fêtes</option>
	</select>

	<!-- Radio button element -->
	<p>Rate this lesson: {{ rating }}</p>
	<label><input type="radio" name="rating" value="Bad" v-model="rating" />Bad</label><br />
	<label><input type="radio" name="rating" value="Okay" v-model="rating" />Okay</label><br />
	<label><input type="radio" name="rating" value="Good" v-model="rating" />Good</label><br />

	<!-- Check box with single choice that return a boolean -->
	<p>Subscribed: {{ subscribe }}</p>
	<label>
		Do you want to subscribe to our newsletter?
		<input type="checkbox" v-model="subscribe" />
	</label>

	<!-- Check box with single choice that return a boolean -->
	<p>FoxFan: {{ foxFan }}</p>
	<label>
		Do you want a fox?
		<input type="checkbox" v-model="foxFan" checked />
	</label>

	<!-- Multiple check boxes -> stored in an array -->
	<p>To do list done: {{ toDoList.join(', ') }}</p>
	<label><input type="checkbox" value="Frontend" v-model="toDoList" />Frontend</label><br />
	<label><input type="checkbox" value="Colors" v-model="toDoList" />Colors</label><br />
	<label><input type="checkbox" value="Emojis" v-model="toDoList" />Emojis</label><br />
	<label><input type="checkbox" value="Yatai Ramen Signature!" v-model="toDoList" />Yatai Ramen Signature!</label>

	<!-- Fill a form and submit it to console -->
	<p>Full address: {{ fullAddress.streetNumber }} {{ fullAddress.streetName }}</p>
	<form @submit.prevent="submitAddress">
		<p>
			<label for="streetNumber">Street number:</label>
			<input id="streetNumber" type="text" v-model.lazy.trim="fullAddress.streetNumber" />
		</p>
		<p>
			<label for="streetName">Street name:</label>
			<input id="streetName" type="text" v-model.lazy.trim="fullAddress.streetName" />
		</p>
		<button>Submit address</button>
	</form>

	<!-- Use a getter and setter methods in an object so we can display a property and also change it -->
	<p>Full Bike Model: {{ fullBikeModel }}</p>
	<button @click="changeBikeModel">Change Bike Model</button>

	<!-- Use a watcher that fire an alert when a count reachs a given value -->
	<p>Cat Counter: {{ catTotal }}</p>
	<button @click="catTotal++">One more cat</button>
	<button @click="catTotal--">One less cat</button>

	<!-- iTERATE THROUGH NESTED ARRAYS -->
	<div class="card" v-for="person in people" :key="person.id">
		<h2 class="card">{{ person.name }}</h2>
		¨
		<p class="card sub" v-for="friend in person.friends" :key="friend">{{ friend }}</p>
	</div>

	<!-- get an object in a v-for -->
	<p v-for="(value, key, i) in player" :key="value">{{ i }} - {{ key }}: {{ value }}</p>

	<!-- Conditional looping with v-for, v-if and computed properties -->
	<p>Students above level 7:</p>
	<p v-for="student in alumni" :key="student.level">{{ student.login }}</p>
</template>

<script>
export default {
	data: function () {
		return {
			userObj: { firstName: 'Norminet', lastName: 'the prettiest' },
			userArr: ['Norminet', 'the prettiest'],
			link: 'https://www.facebook.com/42born2code/videos/lolcat-norminet-42/1493963563969224/?locale=fr_FR',
			isDisabled: false,
			msg: '<strong>BB chat</strong> (en gras hehe)',
			cat: '^ • ^',
			userName: 'grannou',
			number: 0,
			firstName: '',
			lastName: '',
			login: 'grannou',
			login42: 'grannou',
			status: 'student',
			favoriteMovie: '',
			catName: '',
			counter: 0,
			secretCode: '',
			grade: 42,
			prenom: '',
			fruit: '',
			legume: '',
			signeAstro: '',
			ascendant: '',
			profile: '',
			country: '',
			visited: [],
			rating: '',
			subscribe: false,
			foxFan: true,
			toDoList: [],
			fullAddress: {
				streetNumber: '',
				streetName: '',
			},
			bikeBrand: 'Honda',
			bikeModel: 'cbr600',
			catTotal: 0,
			people: [
				{ id: 0, name: 'Harry Potter', friends: ['Hermione Granger', 'Ron Wisley'] },
				{ id: 1, name: 'Geralt of Rivia', friends: ['Cirilla of Cintra', 'Yennefer from Vengerberg'] },
			],
			player: {
				name: 'Ezio Auditore',
				type: 'Assassin',
				age: 52,
			},
			students: [
				{ login: 'Grannou', level: 8 },
				{ login: 'Norminet', level: 21 },
				{ login: 'Newbie', level: 3 },
				{ login: 'thzeribi', level: 12 },
				{ login: 'fcatinau', level: 2 },
			],
		};
	},
	methods: {
		greeting() {
			return 'Hello there ' + this.userName;
		},
		bonjour(name) {
			return 'Hello my sweet ' + name;
		},
		increment() {
			this.number++;
		},
		decrement() {
			this.number--;
		},
		getFirstName(event) {
			this.firstName = event.target.value;
		},
		getLastName(event) {
			this.lastName = event.target.value;
		},
		changeLogin(loginName) {
			this.login42 = loginName;
		},
		changeStatus(newStatus) {
			this.status = newStatus;
		},
		getInput() {
			this.favoriteMovie = event.target.value;
		},
		getCatNameInput(event, catLogin) {
			this.catName = event.target.value + ' ' + catLogin;
		},
		submitForm() {
			alert('The form was submitted');
		},
		incrementTemp() {
			this.counter++;
		},
		decrementTemp() {
			this.counter--;
		},
		getSecretCode(event) {
			this.secretCode = event.target.value;
		},
		shiftAnyHandler() {
			alert('Shift + Any + Click');
		},
		shiftOnlyHandler() {
			alert('Shift + Click Only');
		},
		clickOnlyHandler() {
			alert('Click Only');
		},
		incrementGrade() {
			this.grade++;
		},
		decrementGrade() {
			this.grade--;
		},
		changeBikeModel() {
			this.fullBikeModel = 'Suzuki Hayabusa1300';
		},
	},
	submitAddress() {
		console.log('Form Data: ', this.fullAddress);
	},
	computed: {
		fullName() {
			return this.firstName + ' ' + this.lastName;
		},
		fullBikeModel: {
			get() {
				return this.bikeBrand + ' ' + this.bikeModel;
			},
			set(value) {
				const names = value.split(' ');
				this.bikeBrand = names[0];
				this.bikeModel = names[1];
			},
		},
		alumni() {
			return this.students.filter((student) => student.level >= 7);
		},
	},
	watch: {
		catTotal(newValue) {
			if (newValue == 7) alert('value reached 7');
		},
	},
};
</script>

<style scoped>
h1 {
	color: green;
	text-align: center;
}
.pink {
	color: pink;
}
a {
	color: orangered;
}

.card {
	width: 30rem;
	margin: 1rem auto;
	padding: 0.5rem;
	border: 1px solid black;
}
.sub {
	width: initial;
	margin: 0.5rem;
}
</style>
