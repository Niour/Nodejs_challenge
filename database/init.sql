CREATE TABLE "Users" (
    id serial PRIMARY KEY,
    username varchar(255) UNIQUE NOT NULL,  
    email varchar(255) DEFAULT NULL, 
    "password" varchar(255) NOT NULL, 
    "createdAt" timestamp NOT NULL,
    "updatedAt" timestamp NOT NULL,
    "deletedAt" timestamp DEFAULT NULL
);

INSERT INTO "Users" (username, email, "password", "createdAt", "updatedAt", "deletedAt") 
            VALUES ('Nikos', 'nikos.lourountzis@hotmail.com', '123', '2021-06-29 17:53:32', '2021-06-29 17:53:32', NULL );


CREATE TABLE "Companies" (
    id serial PRIMARY KEY,
    "companyName" varchar(255) UNIQUE NOT NULL,  
    "companyUserId" integer DEFAULT NULL, 
    "createdAt" timestamp NOT NULL,
    "updatedAt" timestamp NOT NULL,
    "deletedAt" timestamp DEFAULT NULL
);

INSERT INTO "Companies" ("companyName", "companyUserId", "createdAt", "updatedAt", "deletedAt") 
            VALUES ('MyCompany', '2', '2021-06-29 17:53:32', '2021-06-29 17:53:32', NULL );


CREATE TABLE "Jobs" (
    id serial PRIMARY KEY,
    "title" varchar(255) NOT NULL,  
    "companyId" integer DEFAULT NOT NULL, 
    "description" TEXT,
    "createdAt" timestamp NOT NULL,
    "updatedAt" timestamp NOT NULL,
    "deletedAt" timestamp DEFAULT NULL
);

INSERT INTO "Jobs" ("title", "companyId", "description", "createdAt", "updatedAt", "deletedAt") VALUES ('MyCompany4', '1', 'WTF IS THIS DESCRIPTION' ,'2021-06-29 17:53:32', '2021-06-29 17:53:32', NULL );