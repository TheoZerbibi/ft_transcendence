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
        number: 0
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
      }
    }
  }
</script>

<style scoped>
  h1
  {
    color: green
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