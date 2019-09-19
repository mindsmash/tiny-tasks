CREATE TABLE "users" (
    id VARCHAR(32) CONSTRAINT user_id_pkey PRIMARY KEY,
    username VARCHAR(64) UNIQUE NOT NULL,
    password VARCHAR (128) NOT NULL
);
INSERT INTO "users" (id, username, password) VALUES ('1', 'test', 'hunter2');
