<template>
  <!-- object values use dot notation -->
  <h1>Hello {{ userObj.firstName }} {{ userObj.lastName }} </h1>

  <!-- arrays use the indexer -->
  <h2>Hello {{ userArr[0] }} {{ userArr[1] }}</h2>

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
  <p> {{ number }} </p>
  <button v-on:click="increment">Increase number</button>
  <button v-on:click="decrement">Decrease number</button>

  <!-- Use input and display it-->
  <p>First name: <input type="text" @input="getFirstName"></p>
  <p>Last name : <input type="text" @input="getLastName"></p>
  <p>Your full name is: {{ fullName }}</p>

  <!-- Use a button to change a variable-->
  <button v-on:click="login = 'Akatsuki grannou'">Give power</button>
  <p>{{ login }} </p>

  <!-- Use a button to change a variable with method taking parameter-->
  <button v-on:click="changeLogin('Akatsuki Philantropist grannou')">Give Super power</button>
  <p>{{ login42 }} </p>

  <!-- Use a button to change a variable with method taking parameter-->
  <!-- Shortcut: v-on:click devient @click -->
  <button @click="changeLogin('Akatsuki Philantropist grannou Kyubie'), changeStatus('Alumni')">Give Mega power</button>
  <p>{{ login42 }} ({{ status}}) </p>

  <!-- Display the text of an input field on the page-->
  <p>Your favorite movie: {{ favoriteMovie }}</p>
  <input type="text" @input="getInput">

  <!-- Display the text of an input field on the page AND event has multiple paramters-->
  <p>Your cat name: {{ catName }}</p>
  <input type="text" @input="getCatNameInput($event, 'Meow')">

  <!-- Display two buttons as counter and a submit button-->
  <!-- that syntax to not loose counter to 0 when refreshing page-->
  <p> {{ counter }}</p>
  <button @click="incrementTemp">Increment Temperature</button>
  <button @click="decrementTemp">Decrement Temperature</button>

  <form @submit.prevent="submitForm"><p>
    <button>Send to guardian</button>
  </p></form>

  <!-- Display an input string AFTER enter key is pressed -->
  <p>Your secret code: {{ secretCode }}</p>
  <input type="text" @keyup.enter="getSecretCode">

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
  <input type="text" v-model="prenom">

  <!-- Input binding + lazy option (wait jump to next input to display previous-->
  <p>Fruit: {{ fruit }}</p>
  <input type="text" v-model.lazy="fruit">

  <p>Legume: {{ legume }}</p>
  <input type="text" v-model="legume">


</template>

<script>
  export default
  {
    data()
    {
      return {
        userObj: { firstName: 'Norminet', lastName: 'the prettiest'},
        userArr: ['Norminet', 'the prettiest'],
        link: 'https://www.facebook.com/42born2code/videos/lolcat-norminet-42/1493963563969224/?locale=fr_FR',
        isDisabled: false,
        msg: '<strong>BB chat</strong> (en gras hehe)',
        cat: '^ • ^',
        userName: 'grannou',
        number: 0,
        firstName: '',
        lastN42ame: '',
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
        legume: ''
      }
    },
    methods: 
    {
      greeting()
      {
        return 'Hello there ' + this.userName
      },
      bonjour(name)
      {
        return 'Hello my sweet ' + name
      },
      increment()
      {
        this.number++
      },
      decrement()
      {
        this.number--
      },
      getFirstName(event)
      {
        this.firstName = event.target.value
      },
      getLastName(event)
      {
        this.lastName = event.target.value
      },
      changeLogin(loginName)
      {
        this.login42 = loginName
      },
      changeStatus(newStatus)
      {
        this.status = newStatus
      },
      getInput()
      {
        this.favoriteMovie = event.target.value
      },
      getCatNameInput(event, catLogin)
      {
        this.catName = event.target.value + ' ' + catLogin
      },
      submitForm()
      {
        alert('The form was submitted')
      },
      incrementTemp() { this.counter++ },
      decrementTemp() { this.counter-- },
      getSecretCode(event)
      {
        this.secretCode = event.target.value
      },
      shiftAnyHandler()   { alert('Shift + Any + Click')  },
      shiftOnlyHandler()  { alert('Shift + Click Only')   },
      clickOnlyHandler()  { alert('Click Only')           },
      incrementGrade()    { this.grade++                  },
      decrementGrade()    { this.grade--                  }

    },
    computed:
    {
      fullName()
      {
        return this.firstName + ' ' + this.lastName
      }
    }

  }
</script>

<style scoped>
  h1
  {
    color: green;
    text-align: center;

  }
  h2
  {
    color: pink
  }
  a
  {
    color: orangered;
  }
</style>