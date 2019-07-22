CREATE TABLE app_user (
    id VARCHAR(36) CONSTRAINT user_id_pkey PRIMARY KEY,
    name VARCHAR (128) NOT NULL,
    email VARCHAR (256) NOT NULL CONSTRAINT unique_email UNIQUE
);
