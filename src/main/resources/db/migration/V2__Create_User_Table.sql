CREATE TABLE "user" (
    id VARCHAR(32) CONSTRAINT user_id_pkey PRIMARY KEY,
    username VARCHAR(64),
    password VARCHAR (128) NOT NULL
);
