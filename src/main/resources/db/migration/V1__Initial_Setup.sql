BEGIN;

CREATE TABLE task (
    id VARCHAR(36) CONSTRAINT task_id_pkey PRIMARY KEY,
    name VARCHAR (128) NOT NULL,
    creator VARCHAR (24) NOT NULL,
    created TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE user_data (
    username VARCHAR(24) CONSTRAINT user_username_pkey PRIMARY KEY,
    password VARCHAR NOT NULL
);

COMMIT;
