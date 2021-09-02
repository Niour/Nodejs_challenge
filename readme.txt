Template from  
https://github.com/Niour/docker-compose-mysql-express-react

This project is a Nodejs challenge.
It was run via wsl2 and is needed to be placed or cloned inside wsl2 file system in order to chokidar ( nodemon dependency) to run.

Usernames and password:
database username: career
password: 123

- Start the app with docker command:
docker-compose up

Access CLI OF postgre:
exec -it [container] bash or use Docker-UI to access the image cli 
and then: psql -h localhost -U career -W 

Backup:
Inside Container:
pg_dump -U career -W -d career > outfile3
Copy files from container to wsl2:
docker cp [some container id]:/namefile /Path

RUN TESTS:
docker exec [some container id] npm test

Swagger Documentation: 
http://localhost/docs
