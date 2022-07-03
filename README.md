# **CadConta**

API para cadastro de usuário


## **Documentação das rotas**

<a href="https://documenter.getpostman.com/view/20745940/UzJFuHep">Postman</a>

## **Utilizando a aplicação**

Para iniciar o projeto é necessário instalar os pacotes usados na aplicação, para isso utilize o comando abaixo:

```
yarn install
```

<br>

Antes de iniciar a aplicação será necessario criar um banco de dados postgres. E para isso será necessário ter o PostgreSQL instalado na sua maquina. Utilize as instruções de como instalar PostgreSQL para seus sistema operacional pela documentação fornecida através desse <a href="https://www.postgresql.org/download/">link</a>.

Assim que tiver o banco de dados pronto, será necessario adicionar a URL do banco de dados no arquivo .env substituindo os valores dos campos e as varias de ambiente obrigatórias.
```
// Arquivo .env

DB_URL=postgres://<username>:<password>@<host>:<port>/<database_name>
JWT_EXPIRES=1h
JWT_SECRET=secret
```

Para o próximo passo, será necessário criar as tabelas em seu banco de dados, utilizando o comando abaixo:

```
yarn typeorm migration:run
```

<br>

Após tudo, inicie o projeto utilizando o comando abaixo:

```
yarn dev
```

<br>

## **Variaveis de ambiente**

### **PORT**
Caso queria rodar a aplicação em outra porta, insira a porta que gostaria rodar o servidor, como no exemplo abaixo:
```
// Arquivo .env

PORT=3000
```

### **JWT_EXPIRES**
Essa variável é responsável pelo tempo que o token ira durar. Podendo ser milissegundos, segundos, horas e dias com o tempo máximo de 1 ano.
```
// Arquivo .env

JWT_EXPIRES=100 // 100 milissegundos

JWT_EXPIRES=100s // 100 segundos

JWT_EXPIRES=100h // 100 horas

JWT_EXPIRES=100d // 100 dias
```

### **JWT_SECRET**
Essa variável é a chave secreta responsabel pela segurança dos tokens. Nela você adicionar um valor o mais complexo e unico póssivel para manter a segurança da sua aplicação.
```
// Arquivo .env

JWT_SECRET=secret
```

### **DB_URL**
Essa variável é responsável pela conexão com o banco de dados. Caso queira utilizar outro banco de dados além do PostgreSQL será necessário mudar o valor **type** do arquivo src/db/ormconfig.ts para o nome do banco de dados que estiver utilizando.
```
// Arquivo .env

DB_URL=postgres://<username>:<password>@<host>:<port>/<database_name>

```