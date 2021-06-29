Create dumb folder, or comment out the copy command from dockerfile of mysql container.
This is needed if we want to start our database with an init.sql script.
database/dumbs/

start docker-compose
docker-compose up

access docker mysql, where [hospital_app_default] is the [network] 
docker run -it --network hospital_app_default --rm mysql:8.0 mysql -hmysql_1 -uroot -p

create a sql dump file of all databases.
docker exec  [container-name] sh -c 'exec mysqldump --all-databases -uroot -p"[password]"' > [path]/all-databases.sql

This project actually froze and it is just a docker-compose node,mysql,react started kit.
It was run via wsl2 and is needed to be placed or cloned inside wsl2 file system in order to chokidar ( nodemon dependency) to run.
