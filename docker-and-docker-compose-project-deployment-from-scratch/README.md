# Project in Docker | Docker Basics - Microservices

Notes and code from [Project in Docker | Docker Basics - Microservices](https://www.udemy.com/course/docker-and-docker-compose-project-deployment-from-scratch)

## Section 2: Configuration

### Section 2, Lesson 7: Creating Docker file

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

### Section 2, Lesson 8: Creating API application

Within `api` run `npm init`. Then add few packages:

```sh
npm install express
```
