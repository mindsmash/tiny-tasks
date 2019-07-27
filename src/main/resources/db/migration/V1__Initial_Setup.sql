CREATE TABLE task (
    id VARCHAR(36) CONSTRAINT task_id_pkey PRIMARY KEY,
    name VARCHAR (128) NOT NULL,
    created TIMESTAMP WITH TIME ZONE NOT NULL,
    is_completed BOOLEAN NOT NULL,
    due_date_time TIMESTAMP NOT NULL,
    owner_id VARCHAR(36) NOT NULL REFERENCES users(id)
);
CREATE TABLE users (
    id VARCHAR(36) CONSTRAINT user_id_pkey PRIMARY KEY,
    name VARCHAR (128) NOT NULL,
    email VARCHAR (256) NOT NULL CONSTRAINT email_ukey UNIQUE
);
