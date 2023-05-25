### Node - Express - Typescript - Neptune - Dynamo

- npm install
- npm run dev
- runs at port: 5005





## 🛎 Available Commands for the Server

- Run the Server in production mode : `npm run start` or `Start typescript-express-starter` in VS Code
- Run the Server in development mode : `npm run dev` or `Dev typescript-express-starter` in VS Code
- Run all unit-tests : `npm test` or `Test typescript-express-starter` in VS Code
- Check for linting errors : `npm run lint` or `Lint typescript-express-starter` in VS Code
- Fix for linting : `npm run lint:fix` or `Lint:Fix typescript-express-starter` in VS Code

## 💎 The Package Features

<p>
  <img src="https://img.shields.io/badge/-TypeScript-007ACC?style=for-the-badge&logo=TypeScript&logoColor=fff" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=fff" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-NPM-CB3837?style=for-the-badge&logo=NPM&logoColor=fff" />&nbsp;&nbsp;
</p>
<p>
  <img src="https://img.shields.io/badge/-Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=fff" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-NGINX-269539?style=for-the-badge&logo=NGINX&logoColor=fff" />
  <img src="https://img.shields.io/badge/-PM2-2B037A?style=for-the-badge&logo=PM2&logoColor=fff" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-Nodemon-76D04B?style=for-the-badge&logo=Nodemon&logoColor=fff" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=fff" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=000" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-Jest-C21325?style=for-the-badge&logo=Jest&logoColor=fff" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=000" />
  <img src="https://img.shields.io/badge/-SWC-FFFFFF?style=for-the-badge&logo=swc&logoColor=FBE1A6" />
</p>
<p>
  <img src="https://img.shields.io/badge/-MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=fff" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-MariaDB-003545?style=for-the-badge&logo=MariaDB&logoColor=fff" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-PostgreSQL-336791?style=for-the-badge&logo=PostgreSQL&logoColor=fff" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=fff" />
</p>

### 🐳 Docker :: Container Platform

[Docker](https://docs.docker.com/) is a platform for developers and sysadmins to build, run, and share applications with containers.

[Docker](https://docs.docker.com/get-docker/) Install.

- starts the containers in the background and leaves them running : `docker-compose up -d`
- Stops containers and removes containers, networks, volumes, and images : `docker-compose down`

Modify `docker-compose.yml` and `Dockerfile` file to your source code.

### ♻️ NGINX :: Web Server

[NGINX](https://www.nginx.com/) is a web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache.

Proxying is typically used to distribute the load among several servers, seamlessly show content from different websites, or pass requests for processing to application servers over protocols other than HTTP.

When NGINX proxies a request, it sends the request to a specified proxied server, fetches the response, and sends it back to the client.

Modify `nginx.conf` file to your source code.

### ✨ ESLint, Prettier :: Code Formatter

[Prettier](https://prettier.io/) is an opinionated code formatter.

[ESLint](https://eslint.org/), Find and fix problems in your JavaScript code

It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.

1. Install [VSCode](https://code.visualstudio.com/) Extension [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

2. `CMD` + `Shift` + `P` (Mac Os) or `Ctrl` + `Shift` + `P` (Windows)

3. Format Selection With

4. Configure Default Formatter...

5. Prettier - Code formatter

<img src="https://user-images.githubusercontent.com/42952358/126604937-4ef50b61-b7e4-4635-b3c9-3c94dd6b06fa.png" alt="Formatter Setting" />

> Palantir, the backers behind TSLint announced in 2019 that they would be deprecating TSLint in favor of supporting typescript-eslint in order to benefit the community.
> So, migration from TSLint to ESLint.

### 📗 Swagger :: API Document

[Swagger](https://swagger.io/) is Simplify API development for users, teams, and enterprises with the Swagger open source and professional toolset.

Easily used by Swagger to design and document APIs at scale.

Start your app in development mode at `http://localhost:3000/api-docs`

Modify `swagger.yaml` file to your source code.

### 🌐 REST Client :: HTTP Client Tools

REST Client allows you to send HTTP request and view the response in Visual Studio Code directly.

VSCode Extension [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) Install.

Modify `*.http` file in src/http folder to your source code.

### 🔮 PM2 :: Advanced, Production process manager for Node.js

[PM2](https://pm2.keymetrics.io/) is a daemon process manager that will help you manage and keep your application online 24/7.

- production mode :: `npm run deploy:prod` or `pm2 start ecosystem.config.js --only prod`
- development mode :: `npm run deploy:dev` or `pm2 start ecosystem.config.js --only dev`

Modify `ecosystem.config.js` file to your source code.

### 🏎 SWC :: a super-fast JavaScript / TypeScript compiler

[SWC](https://swc.rs/) is an extensible Rust-based platform for the next generation of fast developer tools.

`SWC is 20x faster than Babel on a single thread and 70x faster on four cores.`

- tsc build :: `npm run build`
- swc build :: `npm run build:swc`

Modify `.swcrc` file to your source code.

### 💄 Makefile :: This is a setting file of the make program used to make the compilation that occurs repeatedly on Linux

[Makefile](https://makefiletutorial.com/)s are used to help decide which parts of a large program need to be recompiled.

- help :: `make help`

Modify `Makefile` file to your source code.

## 📑 Recommended Commit Message

| When             | Commit Message     |
| :--------------- | :----------------- |
| Add Feature      | ✨ Add Feature     |
| Fix Bug          | 🐞 Fix Bug         |
| Refactoring Code | 🛠 Refactoring Code |
| Install Package  | 📦 Install Package |
| Fix Readme       | 📚 Fix Readme      |
| Update Version   | 🌼 Update Version  |
| New Template     | 🎉 New Template    |
