## Introduction

Application for managing your tasks in virtualized kanban bord. Created on Symfony framework,
MySQL database, Vanilla JS. 

## Specifications

- php 7.4
- symfony 5.2.3
- mysql 8
- yarn 1.22.5
- node 15.8.0
- Bootstrap 4.6.0

## Installation

- clone project from git repository

- run docker containers
```bash
docker-compose up -d
```

- install dependencies
```bash
docker exec -it php74-docker bash
composer install
```

- install yarn
```bash
docker-compose run --rm node-service yarn install
```

- install assets
```bash
docker-compose run --rm node-service yarn encore dev
```

- create database and run migrations
```bash
docker exec -it php74-docker bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
```

## Usage

Go to the url: http://localhost:8080

## Metrics

Project uses some third party tools for code quality inspection:

#### phpDepend
 - documentation: https://pdepend.org/documentation/software-metrics/index.html
 
 - Download
 ```bash
 php composer.phar install
```
 
 - Generate xml report
  ```bash
  pdepend --summary-xml=C:\Users\[SUMMARY_CREATION_PATH]\summary.xml C:/Users/[PATH_TO_FOLDER_YOU_WANT_TO_INSPECT]
 ```

 - Some native command line functions used for metric display
  ```bash
  symfony console command:help
  symfony console command:method-metrics
  symfony console command:object-metrics
 ```

#### sonarqube
 - documentation: https://docs.sonarqube.org/latest/setup/get-started-2-minutes/

- Download
 ```bash
  docker run -d --name sonarqube -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true -p 9010:9000 sonarqube:latest
 ```

 - Browser url: http://localhost:9010

- Next steps:
Create account, project, generate token, use given command in folder you want to inspect, see results in browser.

## Useful links 
- For sonarqube setup
https://www.youtube.com/watch?v=GeKQ2F3FtJw&list=LL&index=2&t=364s&ab_channel=TravelsCode
