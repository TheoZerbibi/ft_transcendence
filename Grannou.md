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
            • Si error cést quíl faut changer dans le fichier de config le port et l'ip
            Dans package.json remplacer "serve": "vue-cli-service serve" par "serve": "vue-cli-service serve --port 3000 --host 0.0.0.0"
        • ctrl + click sur http://localhost:3000/
    