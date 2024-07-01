Tutorial básico de uma API em NODEJS.
======================================

Instale o nodejs versão LTS no site oficial do node e reinicie o PC.

0- cria uma pasta com o nome do projeto e entra nela.

1- cria o package.json
yarn init -y

2-adiciona o express
yarn add express

3-roda o server
node index.js

4-live reload de api com nodemon em desenvolvimento
yarn add nodemon -D

5-roda o nodemon
nodemon index.js

5-roda nodemon de forma automática
add em package.json:
"scripts":{
    "dev": "nodemon index.js"
  },
e roda o comando
yarn dev
