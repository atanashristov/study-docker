# Project in Docker | Docker Basics - Microservices

Notes and code from [Project in Docker | Docker Basics - Microservices](https://www.udemy.com/course/docker-and-docker-compose-project-deployment-from-scratch)

## Section 2: Configuration

### Section 2, Lesson 6: Creating Docker file

Work in directory `./realworld-docker`.

Create `./realworld-docker/docker-compose.yml` file.

It describes all the services. Each service is in a subdirectory, but later we will see how each to be in a separate repository.

```yaml
version: '3'

services:
  api:
    build: ./api
```

Create directory and docker file for _api_ service `./realworld-docker/api/Dockerfile`.

The Dockerfile describes how this service should be prepared.

```yaml
FROM node:22
```

Then run `docker-compose build`, shipped from output:

```sh
[+] Building 24.7s (5/5) FINISHED
=> [api internal] load .dockerignore
=> [api internal] load build definition from Dockerfile
=> [api internal] load metadata for docker.io/library/node:22
=> [api 1/1] FROM docker.io/library/node:22@sha256:c8a559f733bf1f9b3c1d05b97d9a9c7e5d3647c99abedaf5cdd3b54c9cbb8eff
=> [api] exporting to image 
=> => writing image sha256:8dce64792fcd4db304ecf4c76e89aa4637157e05ee1b2ccb43e9cc7e71990376 
=> => naming to docker.io/library/realworld-docker-api
```

We should not use docker commands directly when using docker-compose, because docker-compose will do pulling, tagging and everything for us in a stable way.

References:

- [Docker Compose overview](https://docs.docker.com/compose/)
- [Dockerfile Reference](https://docs.docker.com/reference/dockerfile/)
- [DockerHub Node images](https://hub.docker.com/_/node)

### Section 2, Lesson 7: Creating API application

Within `api` run `npm init`. Then add few packages:

```sh
npm install express
```

Next we add `.gitignore` file to ignore `node_modules`:

```sh
node_modules
```

We add `src` folder to write our code. And we add `index.js` into it with basic express web server:

```js
const express = require("express")

const app = express()

app.get("/test", (req, res) => {
  res.send("Our API server is working correctly")
})

app.listen(3000, () => {
  console.log("Started api service, listen at port 3000")
})
```

Then we add to package.json a script to start the app. Note **start** script is **standard name for production** ("dev" would be for development):

```json
{
  "name": "api",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node src/index.js"
  },
  ...
```

And then from `api` folder we can test if it is working by starting the app:

```sh
npm run start

> api@1.0.0 start
> node src/index.js

Started api service, listen at port 3000
```

We can test the app with:

```sh
curl http://localhost:3000/test
API server is working correctly
```

### Section 2, Lesson 8: Preparing API Docker image

Edit the Dockerfile `api/Dockerfile`.

We add `WORKDIR`. Can be any directory, as in our image we only have one application, so there is no naming conflicts:

```sh
WORKDIR /usr/src/app
```

Next we specify, _when we build the image_, we want to copy inside `package.json` and `package-lock.json` files. With these 2 we will install the node modules:

```sh
COPY package.* ./
```

We install the packages. The command `RUN` runs shell commands:

```sh
RUN npm install
```

The only thing we have to do now is to copy the rest of the code:

```sh
COPY . .
```

We also have to add `.dockerignore` file, so we skip `node_modules`. It works _the same way as_ `.gitignore`.

If we run `docker-compose build` we get:

```sh
docker-compose build
[+] Building 2.4s (10/10) FINISHED
=> [api internal] load build definition from Dockerfile
=> [api internal] load .dockerignore
=> [api internal] load metadata for docker.io/library/node:22
=> => transferring context: 27.88kB
=> [api 2/5] WORKDIR /usr/src/app
=> [api 3/5] COPY package.* ./
=> [api 4/5] RUN npm install
=> [api 5/5] COPY . .
=> [api] exporting to image
=> => writing image sha256:e5b14..
 => => naming to docker.io/library/realworld-docker-api
```

### Section 2, Lesson 9: Starting API server

If we were to run docker only, we had to add to the `Dockerfile`:

```sh
EXPOSE 3000

CMD ["npm", "run start"]
```

But since we are using Docker Compose, we set this is `docker-compose.yaml` and that is our only source of truth:

```yaml
version: '3'

services:
  api:
    build: ./api
    command: npm run start
    ports:
      - '3000:3000'
```

The port on the `left` is the `host port`.
The port on the `right` is the `container port`.

We run again `docker-compose build`.

Then we start Docker Compose with `docker-compose up`:

```sh
docker-compose up
[+] Running 2/0
 ✔ Network realworld-docker_default
 ✔ Container realworld-docker-api-1
Attaching to realworld-docker-api-1
realworld-docker-api-1  | > api@1.0.0 start
realworld-docker-api-1  | > node src/index.js
realworld-docker-api-1  | Started api service, listen at port 3000
```
