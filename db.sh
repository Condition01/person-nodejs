#!/bin/bash

HASMYSQL=$(docker ps -a | grep mysqldb)

up() {
    if [ "$HASMYSQL" != '' ];then
        docker start mysqldb
    else
        docker run -d --name mysqldb -p 3306:3306 -v ~/mysqltcc:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=password -e MYSQL_ROOT_HOST="%" mysql:8.0
    fi
}

cli() {
    if [ "$HASMYSQL" != '' ];then
        docker exec -it mysqldb  mysql -u user -ppassword
    else
        echo 'MySQL não esta presente'
    fi
}

help() {
    echo 'CLI do banco >> cli <<'
    echo 'Subir banco >> up <<'
}


case $1 in
    'cli') cli;;
    'up') up;;
    'help') help;;
    *) help;;
esac