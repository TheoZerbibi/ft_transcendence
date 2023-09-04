*** WORK ROUTINE ***

    • aller dans folder ft_transcendence (ou le git clone si perdu)
        => ft_transcendence git: (features/frontend/grannou)
            si pas ca faire git checkout features/frontend/grannou 
    • GIT PULL
    • ouvrir dans VsCode avec code .
    • lancer le script ./scripts/setup.sh
        il check le hostname, clear les volumes, check si .env ou le crée etc
    • docker exec -it front sh
    • Dans le terminal du container lancer le site avec pnpm dev
    • ouvrir un autre terminal pour les git add / commit / push


*** DEVOIRS ***

    - trouver le shortcut de • (en attendant crl shift u 2022 espace)

    TRAVAILLER DANS LE CONTAINER DOCKER puis en dehors du container docker compose down

    • Faire un site onepage avec plusieurs onglets et un menu qui switch d'un à l'autre
    • Learn: https://www.youtube.com/watch?v=j3GHwTq0I7k&list=PLFAU47Id44XG48v5dPPTGMgJfjMnsU8Bw&index=2
        version doc https://www.koderhq.com/tutorial/vue/
    
        • an API is a way to interact or communicate with an application
        • Vue language: JS or Typescript
        • Install node js
        • Install VS Code
            • View->Appearance->Activity bar
            • Extensions-> Install Vetur
            • Settings (bottom left wheel) -> Settings -> search bar "validation:template" -> uncheck Vetur > Validation: Template
        • Install vue command line interface: sudo npm install @vue/cli -g
        • Create a VueProjects folder: mkdir VueProject
        • Create a new vue project: vue create my-one-page-website (lowercase separated with -)
            • choose preset Vue3 => create the project folder and all the files neeed inside
            • choose preset npm
        • cd my-one-page-website
        • code . (deja ouvert dans le VS Code de transcendence dans ft_transcendence/front/VueProjects/my-one-page-website)
        • npm run serve
            • Si error c'est quíl faut changer dans le fichier de config le port et l'ip
            Dans package.json remplacer "serve": "vue-cli-service serve" par "serve": "vue-cli-service serve --port 3000 --host 0.0.0.0"
        • ctrl + click sur http://localhost:3000/
    
        • open VueProjects/my-one-page-website/src/App.vue
            • delete all   
            • type:
                <template>
                    <h>Hello World</h1>
                </template>
            • refresh page => Hello World
            • Let's make the text dynamic
                
                <template>
                <h1>Hello {{name}} World</h1>
                </template>

                <script>
                  export default
                  {
                    data()
                    {
                      return { name: 'Norminet' }
                    }
                  }
                </script>

            • Let's add color

                <template>
                <h1>Hello {{name}} World</h1>
                </template>

                <script>
                  export default
                  {
                    data()
                    {
                      return { name: 'Norminet' }
                    }
                  }
                </script>

                <style scoped>
                  h1
                  {
                    color: orangered
                  }
                </style>

            • <template> </template>, <script> </script> et <style> </style> sont des components single units that perform a single task
            • components are combined into pages that later forms a fully functionnal vue application
            • a component uses the .vue extension that is made up with 3 languages blocks
                • template block    -> HTML Markup
                • script block      -> Data & functionality
                • style block       -> CSS Styling
        
          • a vue app starts its life in the main.js file with "createApp(App).   mount('#app') that set up and configure the instance
          • Vue looks inside the component script block for the config objects    used for the configuration then it mounts that componenent with an    element of the DOM
          • When we use the Application API, the convention is to use the <div    id="app"> element but it can be anything you want, like <article    class="my-app"> .
          • When we generate a new project with the Vue CLI, it will    automatically add the div for us and set up the application instance to   use it.

          • Alternative setup with plugins in main.js file:
            import { createApp } from 'vue'
            import store from './store/index'
            import router from './router/index'
            import App from './App.vue'

            // create app instance
            const app = createApp(App)

            // use plugins
            app.use(store)
            app.use(router)

            // use app instance to
            // mount to <div id="app">
            app.mount('#app')

          • Example of using an array as data instead of string in App.vue:
            <template>
              <!-- object values use dot notation -->
              <h1>Hello {{ userObj.firstName }} {{ userObj.lastName }} </h1>

              <!-- arrays use the indexer -->
              <h2>Hello {{ userArr[0] }} {{ userArr[1] }}</h2>
            </template>

            <script>
              export default
              {
                data()
                {
                  return {
                    userObj: { firstName: 'Norminet', lastName: 'the prettiest'},
                    userArr: ['Norminet', 'the prettiest'] 
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
            </style>

          • Attribute binding

            • exemple: inclure un lien

              <template>
                < element v-bind:attribute="dataProperty"/>
              </template>

              <script>
                export default {
                  data() {
                    return {
                      dataProperty: 'value'
                    }
                  }
                }
              </script>
              **************************************************            
              <template>
                <!-- object values use dot notation -->
                <h1>Hello {{ userObj.firstName }} {{ userObj.lastName }} </h1>

                <!-- arrays use the indexer -->
                <h2>Hello {{ userArr[0] }} {{ userArr[1] }}</h2>

                <!-- including a link -->
                <a v-bind:href="link">Jumping Norminet</a>
              </template>

              <script>
                export default
                {
                  data()
                  {
                    return {
                      userObj: { firstName: 'Norminet', lastName: 'the prettiest'},
                      userArr: ['Norminet', 'the prettiest'],
                      link: 'https://www.facebook.com/42born2code/videos/lolcat-norminet-42/              1493963563969224/?locale=fr_FR'
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
          
          • Binding boolean attribute
              <template>
                <!-- object values use dot notation -->
                <h1>Hello {{ userObj.firstName }} {{ userObj.lastName }} </h1>

                <!-- arrays use the indexer -->
                <h2>Hello {{ userArr[0] }} {{ userArr[1] }}</h2>

                <!-- including a link -->
                <a v-bind:href="link">Jumping Norminet</a>

                <!-- including a button with booelan attribute-->
                <button :disabled="isDisabled">Boolean Attribute Binding</button>
              </template>

              <script>
                export default
                {
                  data()
                  {
                    return {
                      userObj: { firstName: 'Norminet', lastName: 'the prettiest'},
                      userArr: ['Norminet', 'the prettiest'],
                      link: 'https://www.facebook.com/42born2code/videos/lolcat-norminet-42/              1493963563969224/?locale=fr_FR',
                      isDisabled: false
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
          
          • Binding data with html tags (execute the html tags)

            <template>
              <!-- object values use dot notation -->
              <h1>Hello {{ userObj.firstName }} {{ userObj.lastName }} </h1>

              <!-- arrays use the indexer -->
              <h2>Hello {{ userArr[0] }} {{ userArr[1] }}</h2>

              <!-- including a link -->
              <a v-bind:href="link">Jumping Norminet</a>

              <!-- including a button with booelan attribute-->
              <button :disabled="isDisabled">Press Me</button>
            </template>

            <script>
              export default
              {
                data()
                {
                  return {
                    userObj: { firstName: 'Norminet', lastName: 'the prettiest'},
                    userArr: ['Norminet', 'the prettiest'],
                    link: 'https://www.facebook.com/42born2code/videos/lolcat-norminet-42/            1493963563969224/?locale=fr_FR',
                    isDisabled: false
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

          • Tell Vue to skip compilation on an element (exple for tutotrial)

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

            </template>

            <script>
              export default
              {
                data()
                {
                  return {
                    userObj: { firstName: 'Norminet', lastName: 'the prettiest'},
                    userArr: ['Norminet', 'the prettiest'],
                    link: 'https://www.facebook.com/42born2code/videos/lolcat-norminet-42/            1493963563969224/?locale=fr_FR',
                    isDisabled: false,
                    msg: '<strong>BB chat</strong> (en gras hehe)',
                    cat: '^ • ^'
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


          • Methods on Data

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
            </template>

            <script>
              export default
              {
                data()
                {
                  return {
                    userObj: { firstName: 'Norminet', lastName: 'the prettiest'},
                    userArr: ['Norminet', 'the prettiest'],
                    link: 'https://www.facebook.com/42born2code/videos/lolcat-norminet-42/            1493963563969224/?locale=fr_FR',
                    isDisabled: false,
                    msg: '<strong>BB chat</strong> (en gras hehe)',
                    cat: '^ • ^'
                  }
                },
                methods: 
                {
                  greeting()
                  {
                    return 'Hello there'
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

          • Add to the greeting function a variable

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
            </template>

            <script>
              export default
              {
                data()
                {
                  return {
                    userObj: { firstName: 'Norminet', lastName: 'the prettiest'},
                    userArr: ['Norminet', 'the prettiest'],
                    link: 'https://www.facebook.com/42born2code/videos/lolcat-norminet-42/            1493963563969224/?locale=fr_FR',
                    isDisabled: false,
                    msg: '<strong>BB chat</strong> (en gras hehe)',
                    cat: '^ • ^',
                    userName: 'grannou'
                  }
                },
                methods: 
                {
                  greeting()
                  {
                    return 'Hello there ' + this.userName
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

            Ici this.userName fonctionne en dehors du scope de methods car Vue cree un meta objet qui englobe data et methods

          • Make the greeting function take an argument to say hello to

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
            </template>

            <script>
              export default
              {
                data()
                {
                  return {
                    userObj: { firstName: 'Norminet', lastName: 'the prettiest'},
                    userArr: ['Norminet', 'the prettiest'],
                    link: 'https://www.facebook.com/42born2code/videos/lolcat-norminet-42/            1493963563969224/?locale=fr_FR',
                    isDisabled: false,
                    msg: '<strong>BB chat</strong> (en gras hehe)',
                    cat: '^ • ^',
                    userName: 'grannou'
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

          • WARNING:

            <template>
              <p>{{ thisInArrowFunc() }}</p>
              <p>{{ thisInRegularFunc() }}</p>
            </template>

            <script>
            export default {
              methods: {
                username: 'Obi-Wan Kenobi',

                thisInArrowFunc: () => {
                  return 'Help us ' + this.username // no 'this' binding
                },

                thisInRegularFunc() {
                  return 'Help us ' + this.username // global 'this'
                }
              }
            }
            </script>

            An arrow function doesn’t have its own this . An arrow function inherits its this from the closest non-arrow parent function.
            Because there is no outer non-arrow function, there is no this it can inherit from. Therefore the arrow function’s this is undefined and we get the error in the console.
            A good rule to remember is to use regular functions as outer functions and arrow functions as inner functions, if there is a need. In most cases the code can be refactored in a way that removes the need for an arrow function.

          • Reference vs Invoke: function () { [native code] }
            Some students encounter a situation where they want to display the result of a function on the page with string interpolation, but it displays function () { [native code] } instead.

            That happens when we try to reference a function instead of invoking it.

            We reference a function by excluding the parentheses at the end. Callback functions are referenced.
            We invoke a function by adding parentheses at the end. Standard functions are invoked.
            Let’s see an example where we reference a function.

            <template>
              <p>{{ greeting }}</p>
            </template>

            <script>
            export default {
              methods: {
                greeting() {
                  return 'Hello there'
                }
              }
            }
            </script>

            The project compiles successfully without errors but on the page it displays function () { [native code] } .
            To fix the issue, simply add the parentheses to the function name to invoke it.

            <template>
              <p>{{ greeting() }}</p>
            </template>

            <script>
            export default {
              methods: {
                greeting() {
                  return 'Hello there'
                }
              }
            }
            </script>

          • Event handling:

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
                    link: 'https://www.facebook.com/42born2code/videos/lolcat-norminet-42/            1493963563969224/?locale=fr_FR',
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

          • Computed properties

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
            </template>

            <script>
              export default
              {
                data()
                {
                  return {
                    userObj: { firstName: 'Norminet', lastName: 'the prettiest'},
                    userArr: ['Norminet', 'the prettiest'],
                    link: 'https://www.facebook.com/42born2code/videos/lolcat-norminet-42/            1493963563969224/?locale=fr_FR',
                    isDisabled: false,
                    msg: '<strong>BB chat</strong> (en gras hehe)',
                    cat: '^ • ^',
                    userName: 'grannou',
                    number: 0,
                    firstName: '',
                    lastName: ''
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
                  }
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

        BETTER PRACTICE to write 

          data: function
          {
            return 
            {
              blabla
            }
          }

          • Add a button that change a string variable

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
            </template>

            <script>
              export default
              {
                data()
                {
                  return {
                    userObj: { firstName: 'Norminet', lastName: 'the prettiest'},
                    userArr: ['Norminet', 'the prettiest'],
                    link: 'https://www.facebook.com/42born2code/videos/lolcat-norminet-42/            1493963563969224/?locale=fr_FR',
                    isDisabled: false,
                    msg: '<strong>BB chat</strong> (en gras hehe)',
                    cat: '^ • ^',
                    userName: 'grannou',
                    number: 0,
                    firstName: '',
                    lastName: '',
                    login: 'grannou'
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
                  }
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

          • REFERENCE vs INVOKE

            <template>
              <!-- reference method without parameters -->
              <element v-on:event_name="method_name"></element>

              <!-- invoke method without parameters -->
              <element v-on:event_name=¨method_name(param1, ...)"></element>
            </template>

          •  Add a button that change a string variable (with a method that takes parameters)

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
              <button v-on:click="changeLogin('Akatsuki Philantropist grannou')">Give Super             power</button>
              <p>{{ login42 }} </p>

              <!-- Use a button to change a variable with method taking parameter-->
              <button v-on:click="changeLogin('Akatsuki Philantropist grannou Kyubie'),             changeStatus('Alumni')">Give Mega power</button>
              <p>{{ login42 }} ({{ status}}) </p>


            </template>

            <script>
              export default
              {
                data()
                {
                  return {
                    userObj: { firstName: 'Norminet', lastName: 'the prettiest'},
                    userArr: ['Norminet', 'the prettiest'],
                    link: 'https://www.facebook.com/42born2code/videos/lolcat-norminet-42/            1493963563969224/?locale=fr_FR',
                    isDisabled: false,
                    msg: '<strong>BB chat</strong> (en gras hehe)',
                    cat: '^ • ^',
                    userName: 'grannou',
                    number: 0,
                    firstName: '',
                    lastName: '',
                    login: 'grannou',
                    login42: 'grannou',
                    status: 'student'
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
                  }
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

          • Display the text of an input on the page:

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
              <button v-on:click="changeLogin('Akatsuki Philantropist grannou')">Give Super             power</button>
              <p>{{ login42 }} </p>

              <!-- Use a button to change a variable with method taking parameter-->
              <!-- Shortcut: v-on:click devient @click -->
              <button @click="changeLogin('Akatsuki Philantropist grannou Kyubie'),             changeStatus('Alumni')">Give Mega power</button>
              <p>{{ login42 }} ({{ status}}) </p>

              <!-- Display the text of an input field on the page-->
              <p>Your favorite movie: {{ favoriteMovie }}</p>
              <input type="text" @input="getInput">

            </template>

            <script>
              export default
              {
                data()
                {
                  return {
                    userObj: { firstName: 'Norminet', lastName: 'the prettiest'},
                    userArr: ['Norminet', 'the prettiest'],
                    link: 'https://www.facebook.com/42born2code/videos/lolcat-norminet-42/            1493963563969224/?locale=fr_FR',
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
                    favoriteMovie: ''
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
                  }
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

          • Display the text of an input field on the page AND event has multiple paramters

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
              <button v-on:click="changeLogin('Akatsuki Philantropist grannou')           ">Give Super power</button>
              <p>{{ login42 }} </p>

              <!-- Use a button to change a variable with method taking parameter-->
              <!-- Shortcut: v-on:click devient @click -->
              <button @click="changeLogin('Akatsuki Philantropist grannou Kyubie'),             changeStatus('Alumni')">Give Mega power</button>
              <p>{{ login42 }} ({{ status}}) </p>

              <!-- Display the text of an input field on the page-->
              <p>Your favorite movie: {{ favoriteMovie }}</p>
              <input type="text" @input="getInput">

              <!-- Display the text of an input field on the page AND event has             multiple paramters-->
              <p>Your cat name: {{ catName }}</p>
              <input type="text" @input="getCatNameInput($event, 'Meow')">


            </template>

            <script>
              export default
              {
                data()
                {
                  return {
                    userObj: { firstName: 'Norminet', lastName: 'the prettiest'},
                    userArr: ['Norminet', 'the prettiest'],
                    link: 'https://www.facebook.com/42born2code/videos/           lolcat-norminet-42/1493963563969224/?locale=fr_FR',
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
                    catName: ''

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
                  }
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

          • Create a counter with two button that keeps the score when submit form button

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
              <button v-on:click="changeLogin('Akatsuki Philantropist grannou')           ">Give Super power</button>
              <p>{{ login42 }} </p>

              <!-- Use a button to change a variable with method taking parameter-->
              <!-- Shortcut: v-on:click devient @click -->
              <button @click="changeLogin('Akatsuki Philantropist grannou Kyubie'),             changeStatus('Alumni')">Give Mega power</button>
              <p>{{ login42 }} ({{ status}}) </p>

              <!-- Display the text of an input field on the page-->
              <p>Your favorite movie: {{ favoriteMovie }}</p>
              <input type="text" @input="getInput">

              <!-- Display the text of an input field on the page AND event has             multiple paramters-->
              <p>Your cat name: {{ catName }}</p>
              <input type="text" @input="getCatNameInput($event, 'Meow')">

              <!-- Display two buttons as counter and a submit button-->
              <!-- that syntax to not loose counter to 0 when refreshing page-->
              <p> {{ counter }}</p>
              <button @click="incrementTemp">Increment Temperature</button>
              <button @click="decrementTemp">Decrement Temperature</button>

              <form @submit="submitForm"><p>
                <button>Send to guardian</button>
              </p></form>

            </template>

            <script>
              export default
              {
                data()
                {
                  return {
                    userObj: { firstName: 'Norminet', lastName: 'the prettiest'},
                    userArr: ['Norminet', 'the prettiest'],
                    link: 'https://www.facebook.com/42born2code/videos/           lolcat-norminet-42/1493963563969224/?locale=fr_FR',
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
                    counter: 0
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
                    event.preventDefault()
                    alert('The form was submitted')
                  },
                  incrementTemp() { this.counter++ },
                  decrementTemp() { this.counter-- }
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

          • SAME WITH SHORTER SYNTAX

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
              <button v-on:click="changeLogin('Akatsuki Philantropist grannou')           ">Give Super power</button>
              <p>{{ login42 }} </p>

              <!-- Use a button to change a variable with method taking parameter-->
              <!-- Shortcut: v-on:click devient @click -->
              <button @click="changeLogin('Akatsuki Philantropist grannou Kyubie'),             changeStatus('Alumni')">Give Mega power</button>
              <p>{{ login42 }} ({{ status}}) </p>

              <!-- Display the text of an input field on the page-->
              <p>Your favorite movie: {{ favoriteMovie }}</p>
              <input type="text" @input="getInput">

              <!-- Display the text of an input field on the page AND event has             multiple paramters-->
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

            </template>

            <script>
              export default
              {
                data()
                {
                  return {
                    userObj: { firstName: 'Norminet', lastName: 'the prettiest'},
                    userArr: ['Norminet', 'the prettiest'],
                    link: 'https://www.facebook.com/42born2code/videos/           lolcat-norminet-42/1493963563969224/?locale=fr_FR',
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
                    counter: 0
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
                  decrementTemp() { this.counter-- }
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

          • CLICK MODIFIERS

            <template>
              <element @click.left=""></element>
              <element @click.right=""></element>
              <element @click.middle=""></element>
            </template>

            click produce action with mouse left/right or middle click

          • KEY PRESS MODIFIERS
          example: input a name but wait user to press enter to display full name

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
              <button v-on:click="changeLogin('Akatsuki Philantropist grannou')           ">Give Super power</button>
              <p>{{ login42 }} </p>

              <!-- Use a button to change a variable with method taking parameter-->
              <!-- Shortcut: v-on:click devient @click -->
              <button @click="changeLogin('Akatsuki Philantropist grannou Kyubie'),             changeStatus('Alumni')">Give Mega power</button>
              <p>{{ login42 }} ({{ status}}) </p>

              <!-- Display the text of an input field on the page-->
              <p>Your favorite movie: {{ favoriteMovie }}</p>
              <input type="text" @input="getInput">

              <!-- Display the text of an input field on the page AND event has             multiple paramters-->
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
              <input type="text" @keyup.enter="getSecretCode">
              <p>Your secret code: {{ secretCode }}</p>

            </template>

            <script>
              export default
              {
                data()
                {
                  return {
                    userObj: { firstName: 'Norminet', lastName: 'the prettiest'},
                    userArr: ['Norminet', 'the prettiest'],
                    link: 'https://www.facebook.com/42born2code/videos/           lolcat-norminet-42/1493963563969224/?locale=fr_FR',
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
                    secretCode: ''
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
                  }
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

          • THE EXACT MODIFIER

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
              <button v-on:click="changeLogin('Akatsuki Philantropist grannou')           ">Give Super power</button>
              <p>{{ login42 }} </p>

              <!-- Use a button to change a variable with method taking parameter-->
              <!-- Shortcut: v-on:click devient @click -->
              <button @click="changeLogin('Akatsuki Philantropist grannou Kyubie'),             changeStatus('Alumni')">Give Mega power</button>
              <p>{{ login42 }} ({{ status}}) </p>

              <!-- Display the text of an input field on the page-->
              <p>Your favorite movie: {{ favoriteMovie }}</p>
              <input type="text" @input="getInput">

              <!-- Display the text of an input field on the page AND event has             multiple paramters-->
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
              <p><button @click.shift="shiftAnyHandler">Shift + Any + Click</           button></p>

              <!-- This will only work when Shift and no other key are pressed-->
              <p><button @click.shift.exact="shiftOnlyHandler">Shift + Click</            button></p>

              <!-- This will only work when no key modifiers are pressed-->
              <p><button @click.shift="clickOnlyHandler">Click only</button></p>

            </template>

            <script>
              export default
              {
                data()
                {
                  return {
                    userObj: { firstName: 'Norminet', lastName: 'the prettiest'},
                    userArr: ['Norminet', 'the prettiest'],
                    link: 'https://www.facebook.com/42born2code/videos/           lolcat-norminet-42/1493963563969224/?locale=fr_FR',
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
                    secretCode: ''
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
                  shiftAnyHandler()   { alert('Shift + Any + Click') },
                  shiftOnlyHandler() { alert('Shift + Click Only')  },
                  clickOnlyHandler()  { alert('Click Only')          }

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

          • LOCK CONTENT (lock dynamic content in an element)
            Same exemple with counter but we want to keep the initil value of counter without creating a second variable

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
              <button v-on:click="changeLogin('Akatsuki Philantropist grannou')           ">Give Super power</button>
              <p>{{ login42 }} </p>

              <!-- Use a button to change a variable with method taking parameter-->
              <!-- Shortcut: v-on:click devient @click -->
              <button @click="changeLogin('Akatsuki Philantropist grannou Kyubie'),             changeStatus('Alumni')">Give Mega power</button>
              <p>{{ login42 }} ({{ status}}) </p>

              <!-- Display the text of an input field on the page-->
              <p>Your favorite movie: {{ favoriteMovie }}</p>
              <input type="text" @input="getInput">

              <!-- Display the text of an input field on the page AND event has             multiple paramters-->
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
              <p><button @click.shift="shiftAnyHandler">Shift + Any + Click</           button></p>

              <!-- This will only work when Shift and no other key are pressed-->
              <p><button @click.shift.exact="shiftOnlyHandler">Shift + Click</            button></p>

              <!-- This will only work when no key modifiers are pressed-->
              <p><button @click.shift="clickOnlyHandler">Click only</button></p>

              <!-- Display a counter and its initial value with only one variable             -->
              <p v-once>Initial grade: {{ grade }}</p>
              <p>Updated grade: {{ grade }}</p>

              <button @click="incrementGrade">Increment grade</button>
              <button @click="decrementGrade">Decrement grade</button>

            </template>

            <script>
              export default
              {
                data()
                {
                  return {
                    userObj: { firstName: 'Norminet', lastName: 'the prettiest'},
                    userArr: ['Norminet', 'the prettiest'],
                    link: 'https://www.facebook.com/42born2code/videos/           lolcat-norminet-42/1493963563969224/?locale=fr_FR',
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
                    grade: 42
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

          • INPUT BINDING (two-way databinding)

            <template>
              <p>Prenom: {{ prenom }}</p>
              <input type="text" v-model="prenom">
            </template>

            <script>
            export default
            {
              data: function()
              {
                return { prenom: '' }
              }
            }
            </script>

          • With lazy option

            <template>
              <!-- Input binding + lazy option (wait jump to next input to display previous)-->
              <p>Fruit: {{ fruit }}</p>
              <input type="text" v-model.lazy="fruit">

              <p>Legume: {{ legume }}</p>
              <input type="text" v-model="legume">
            </template>

            <script>
            export default
            {
              data: function()
              {
                return 
                {
                  fruit: '',
                  legume: ''
                }
              }
            }
            </script>

          • With lazy and trim option
          
            <template>
              <!-- Input binding + lazy option (wait jump to next input to display            previous)-->
              <!-- Input binding + trim option: remove outer whitespaces-->
              <p>Signe astro: {{ signeAstro }}</p>
              <input type="text" v-model.lazy.trim="signeAstro">

              <p>Ascendant: {{ ascendant }}</p>
              <input type="text" v-model.trim="ascendant">
            </template>

            <script>
            export default
            {
              data: function()
              {
                return
                {
                  signeAstro: '',
                  ascendant: ''
                }
              }
            }
            </script>

          • Same with text area
          
            <template>
              <!-- Same with lazy on text area -->
              <p>Personal Profile: {{ profile }}</p>
              <textarea cols="30" rows="10" v-model.lazy="profile"></textarea>
            </template>

            <script>
            export default
            {
              data: function()
              {
                return
                {
                  profile: ''
                }
              }
            }
            </script>

          • When using a group element, specify the v-model element on the parent select, option are the children
          
            <template>
              <!-- v-model on a group element, specified on the parent -->
              <p>Country: {{ country }}</p>
              <select v-model="country">
                <option value="">Please select your country</option>
                <option value="UK">United Kingdom</option>
                <option value="FR">France</option>
                <option value="JP">Japan</option>
                <option value="NZ">New Zealand</option>
              </select>
            </template>

            <script>
            export default
            {
              data: function()
              {
                return
                {
                  country: ''
                }
              }
            }
            </script>

          • Same with multi selected (with ctrl or cmd) stored in an array
          
            <template>
              <!-- Same on multiselection (with ctrl or cmd) stored in an array -->
              <p>Countries visited: {{ visited.join(', ') }}</p>
              <select multiple v-model="visited">
                <option value="HY">Hyrule</option>
                <option value="KM">Kaer Mohren</option>
                <option value="F2">Forty 2</option>
                <option value="SDF">Salle des fêtes</option>
              </select>
            </template>

            <script>
            export default
            {
              data: function()
              {
                return
                {
                  visited: []
                }
              }
            }
            </script>

          • RADIO BUTTON ELEMENT, works similarly as a text input field
          
            <template>
              <!-- Radio button element -->
              <p>Rate this lesson: {{ rating }}</p>
              <label><input type="radio" name="rating" value="Bad" v-model="rating">Bad</           label><br>
              <label><input type="radio" name="rating" value="Okay" v-model="rating">Okay</           label><br>
              <label><input type="radio" name="rating" value="Good" v-model="rating">Good</           label><br>
            </template>

            <script>
            export default
            {
              data: function()
              {
                return
                {
                  rating: ''
                }
              }
            }
            </script>

          • CHECK BOX works a little different
            A single check box without a value attribute will return a boolean true or false
          
            <template>
              <!-- Check box with single choice that return a boolean -->
              <p>Subscribed: {{ subscribe }}</p>
              <label>
                Do you want to subscribe to our newsletter?
                <input type="checkbox" v-model= "subscribe">
              </label>
            </template>

            <script>
            export default
            {
              data: function()
              {
                return
                {
                  subscribe: false
                }
              }
            }
            </script>

          • SAME but we set the choice already checked, true by default
          
            <template>
              <!-- Check box with single choice that return a boolean -->
              <p>FoxFan: {{ foxFan }}</p>
              <label>
                Do you want a fox?
                <input type="checkbox" v-model= "foxFan" checked>
              </label>
            </template>

            <script>
            export default
            {
              data: function()
              {
                return
                {
                  foxFan: true
                }
              }
            }
            </script>

          • MULTIPLE CHECK BOXES: the content of their value property can be sent to an array if they are checked
          
            <template>
              <!-- Multiple check boxes -> stored in an array -->
              <p>To do list done: {{ toDoList.join(', ') }}</p>
              <label><input type="checkbox" value="Frontend" v-model="toDoList">Frontend</label><br>
              <label><input type="checkbox" value="Colors" v-model="toDoList">Colors</label><br>
              <label><input type="checkbox" value="Emojis" v-model="toDoList">Emojis</label><br>
              <label><input type="checkbox" value="Yatai Ramen Signature!" v-model="toDoList">Yatai Ramen Signature!</label>
            </template>

            <script>
            export default
            {
              data: function()
              {
                return
                {
                  toDoList: []
                }
              }
            }
            </script>

          • How to submit data
          
            <template>
              <!-- Fill a form and submit it to console -->
              <p>Full address: {{ fullAddress.streetNumber }} {{ fullAddress.streetName }}</p>
              <form @submit.prevent="submitAddress">
                <p>
                  <label for="streetNumber">Street number:</label>
                  <input id="streetNumber" type="text" v-model.lazy.trim="fullAddress.            streetNumber">
                </p>
                <p>
                  <label for="streetName">Street name:</label>
                  <input id="streetName" type="text" v-model.lazy.trim="fullAddress.            streetName">
                </p>
                <button>Submit address</button>
              </form>
            </template>

            <script>
            export default
            {
              data: function()
              {
                return
                {
                  fullAddress:
                  {
                    streetNumber: '',
                    streetName: ''
                  }
                }
              },
              methods:
              {
                submitAddress()
                {
                  console.log('Form Data: ', this.fullAddress)
                }
              }
            }
            </script>

          • COMPUTED PROPERTIES: they can be bound to the template like Data properties but also have logic like methods
            • They are highly performant because they're cached
            • A computed property is defined as a method in a computed option of the component configured object
            • When you need to display a property but also change it, the easiest way is to us getter and setter. We change the method syntax to an object that contains two methods get() and set()

            <template>
              <!-- Use a getter and setter methods in an object so we can             display a property and also change it -->
              <p>Full Bike Model: {{ fullBikeModel }}</p>
              <button @click="changeBikeModel">Change Bike Model</button>
            </template>

            <script>
            export default
            {
              data: function()
              {
                return
                {
                  bikeBrand: 'Honda',
                  bikeModel: 'cbr600'
                }
              },
              methods:
              {
                changeBikeModel()
                {
                  this.fullBikeModel = 'Suzuki Hayabusa1300'
                }
              },
              computed:
              {
                fullBikeModel:
                {
                  get()
                  {
                    return this.bikeBrand + ' ' + this.bikeModel
                  },
                  set(value)
                  {
                    const names = value.split(' ')
                    this.bikeBrand = names[0]
                    this.bikeModel = names[1]
                  }
                }
              }
            }
            </script>

          •
          
            <template>

            </template>

            <script>
            export default
            {
              data: function()
              {
                return {  }
              }
            }
            </script>

          •
          
            <template>

            </template>

            <script>
            export default
            {
              data: function()
              {
                return {  }
              }
            }
            </script>


          •
          •
          •
          •
          •
          •
          •
          •
          •
          •
          •
          •
          •
          •
          •
          •
          •
          
            <template>

            </template>

            <script>
            export default
            {
              data: function()
              {
                return {  }
              }
            }
            </script>


