#!/bin/bash
HASMYSQL=$(docker ps -a | grep mysqldb)
HASMONGO=$(docker ps -a | grep mongodb)

upSQL() {
    if [ "$HASMYSQL" != '' ];then
        docker start mysqldb
    else
        docker run -d --name mysqldb -p 3306:3306 -v ~/mysqltcc:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=password -e MYSQL_ROOT_HOST="%" mysql:8.0
    fi
}

cliSQL() {
    if [ "$HASMYSQL" != '' ];then
        docker exec -it mysqldb  mysql -u user -ppassword
    else
        echo 'MySQL não esta presente'
    fi
}

upMONGO() {
    if [ "$HASMONGO" != '' ];then
        docker start mongodb
    else
        docker run --name mongodb -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=password -p 27017:27017 -d mongo:4.4.1
    fi
}

cliMONGO() {
    if [ "$HASMONGO" != '' ];then
        docker exec -it mongodb  mongo -u root -ppassword
    else
        echo 'MySQL não esta presente'
    fi
}

help() {
    echo 'Subir SQL >> up <<'
    echo 'Subir Mongo >> up <<'
    echo '>>>> CLI do banco >> cli <<'
    echo '>>>> Subir banco >> up <<'
}

commandsSQL() {
    case $1 in
        'cli') cliSQL;;
        'up') upSQL;;
        *) help;;
    esac
}

commandsMONGO() {
    case $1 in
        'cli') cliMONGO;;
        'up') upMONGO;;
        *) help;;
    esac
}

case $1 in
    '--sql') commandsSQL $2;;
    '--mongo') commandsMONGO $2;;
    'help') help;;
    *) help;;
esac