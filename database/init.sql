CREATE TABLE Users (
    id serial PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,  
    email varchar(255) DEFAULT NULL, 
    "password" varchar(255) NOT NULL, 
    createdAt timestamp NOT NULL,
    updatedAt timestamp NOT NULL,
    deleted_at timestamp DEFAULT NULL
);

INSERT INTO Users (username, email, "password", createdAt, updatedAt, deleted_at) 
            VALUES ('Nikos', 'nikos.lourountzis@hotmail.com', '123', '2021-06-29 17:53:32', '2021-06-29 17:53:32', '2021-06-29 17:53:32' );
