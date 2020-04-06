# Beginners guide to DevOps

## Display all docker containers that are running
```
docker ps
```
---
## Caching in Docker
In docker, if the lines have been executed before, 
the same lines if ran again will run faster due to the concept of caching.

In case somewhere in the middle a new line is added then till the new line
cache will be used and then everything after that line will be executed again.

----

For each line a new container is made and destroyed. That is the temporary container

----
## Providing a custom name for the container
```
docker build -t iamuv2000/mymongo:latest .
```
----
## Dockerising a node application
```
COPY ./ ./ 
```
 This will copy all the contents of the directory to the container's working directory
```
docker build -t iamuv2000/nodeapptest
```

 This will build the application and name the container as "iamuv2000/nodeapptest"

```
docker run -p <my_port>:<container_port> iamuv2000/nodeapptest
```
Opening <my_port> to the <container_port>. Only <my_port> will now be able to access the 
container's <container_port>

----
## Docker Compose
This allows you to have multiple containers in one container and run it all simultaneously!

### docker-compose.yml
- File for configuration of multiple containers
- version -> which version are we using
- services-> how many containers you want, and what do you want to call them?

```
docker-compose up --build
```
Builds the docker-compose and runs it (--build)

--- 
## Working with docker repositories

• docker-compose (multiple containers)
//  docker-compose build --pull
This will generate the image of the master container, ie, one container that holds the
various containers. Let the name of the container be "my_docker_container"

//  docker tag my_docker_container <username>/<repo-name>

//  docker push <username>/<repo-name>

-----
####
####
----

## Docker

Docker makes it really easy to install and run software without worrying about setup or dependencies

## IMAGE
An image is a single file with all the dependencies and configuration required to run a program

## CONTAINER
Instance of an image that runs a program

## DOCKER CLIENT (DOCKER CLI)
Tool that we are going to issue commands to

## DOCKER SERVER (DOCKER DAEMON)
Tool that is responsible for creating and running containers etc

-------

###  DOCKER COMMANDS
docker run <container-name> <alt-command to run inside the container once it is run>

Eg:
```
docker run busybox echo hi there
docker run busybox ls (once the busy box container is run, run the ‘ls’ command in the container) 
```
----

## LIST ALL RUNNING CONTAINERS
docker ps

## LIST ALL CONTAINERS EVER CREATED
docker ps —all

## RESTARTING STOPPED CONTAINER
```
docker start -a <container-id>
-a flag is for giving output
```
#REMOVING STOPPED CONTAINERS
docker system prune

#RETREIVING OUTPUT LOGS
docker logs <container-id>

#STOPPING CONTAINERS
docker stop <container-id>
docker kill <container-id>

#EXECUTING COMMANDS IN RUNNING CONTAINERS
docker exec -it <container-id> <command>
exec -> execute an additional command in a container
it flag -> Allows input output in the container’s application terminal

#GETTING DOCKER SHELL
docker exec -it <container-id> sh

—

docker run = docker create + docker start

——

#DOCKER FILE
Contains configuration on how our container should behave

---
A dockerfile is like giving a person a computer with no operating system on it, and asking the 
person to install google chrome.

# FROM alpine   //Downloading the operating system!
                //alpine is the base image


======
UDEMY

Docker

Docker makes it really easy to install and run software without worrying about setup or dependencies

IMAGE
An image is a single file with all the dependencies and configuration required to run a program

CONTAINER
Instance of an image that runs a program

DOCKER CLIENT (DOCKER CLI)
Tool that we are going to issue commands to

DOCKER SERVER (DOCKER DAEMON)
Tool that is responsible for creating and running containers etc
——

DOCKER COMMANDS
docker run <container-name> <alt-command to run inside the container once it is run>

Eg: docker run busybox echo hi there

docker run busybox ls (once the busy box container is run, run the ‘ls’ command in the container) 

#LIST ALL RUNNING CONTAINERS
docker ps

#LIST ALL CONTAINERS EVER CREATED
docker ps —all

#RESTARTING STOPPED CONTAINER
docker start -a <container-id>
-a flag is for giving output

#REMOVING STOPPED CONTAINERS
docker system prune

#RETREIVING OUTPUT LOGS
docker logs <container-id>

#STOPPING CONTAINERS
docker stop <container-id>
docker kill <container-id>

#EXECUTING COMMANDS IN RUNNING CONTAINERS
docker exec -it <container-id> <command>
exec -> execute an additional command in a container
it flag -> Allows input output in the container’s application terminal

#GETTING DOCKER SHELL
docker exec -it <container-id> sh

—

docker run = docker create + docker start

——

For incoming requests TO the container, we require port mapping!

docker run -p 8080:8080 <image_name>

——
WORKDIR /usr/app
COPY ./ ./ 

(so all your files are copied into /usr/app)

——
#Nodejs - minimising cache bursting
‘’’
COPY ./package.json ./
npm install
COPY ./ ./ 
‘’’

Every time you change code, you must rebuild docker container. However there would be times when there are times you have only change a bit of logic and added no dependencies, yet it will re-install all dependencies, because it has detected a change in them.
So we copy the package.json file first, that will only change when dependencies change. If it has not changed, it will use the cached version of dependencies.
We then copy everything else and rebuild the container.


—-
#DOCKER FILE
Contains configuration on how our container should behave

----

DOCKER COMPOSE

- A seperate CLI

- Exists to avoid writing repetitive commands used in docker. Like "run" "exec" etc.

- Avoid writing tiny little arguments each time we want to build adn run a container

- It also helps in running multiple containers and automatically connect them together using some
form of netwroking

TO START DOCKER-COMPOSE
docker compose up 

TO START DOCKER-COMPOSE AFTER REBUILDING
docker-compose up --build

TO STOP DOKCER-COMPOSE
docker compose down

CONTAINER MANTAINENCE WITH COMPOSE
-> Automatic contianer restarts!
#Restart policies defined in docker-compose.yml

restart: 'no' => never restart  
        'always' => restart always  
        'on-failure' => restart if exit status code != 0
        'unless-stopped' => Only when the developer forcibly stops it

Container status: docker-compose ps

---

## The development cycle

Building a production level application has 3 phases:
- Devlopment
- Testing
- Re-Deploying

To run the Dockerfile.dev 
```
docker build -f Dockerfile.dev .
```

## Docker Volumes

Each time we make changes to our source code we will have to rebuild the container. To avoid this we come up with <b>Docker Volumes</b>

Setting up a reference, so the files in the container and actually a reference of the files on our machine. So updating our source will reflect inside the container.

It is basically setting up a mapping from our local files to the files inside the container

```
docker run -it -p 3000:3000 -v /app/node_modules -v$(pwd):/app <container_id>
```
### Explanation

```
-v$(pwd):/app
```

The ':' implies mapping (it maps everything).

```
-v /app/node_modules
```

The absence of ':' tells the docker daemon not to map the <code>node_modules</code> to anything

## Using docker compose to use volumes

Clearly 
```
docker run -it -p 3000:3000 -v /app/node_modules -v$(pwd):/app <container_id>
```
running this lenghthy command every time we need to run the container is tedious. 

Hence to simplify this, we can always set a docker-compose file to run the container in a single command.
This is how we can set <bold>Volumes</bold> in a docker-compose.yml file

```
version: '3'
services: 
  web:
    stdin_open: true #bug in react-app
    build: 
      context: . #where do we want all the files and folders for this project to come from (current wokring directory)
      dockerfile: Dockerfile.dev
    ports: 
      - "3000:3000"
    volumes: 
      - /app/node_modules
      - .:/app  #map current folders outside the container to the folders inside the containers

```