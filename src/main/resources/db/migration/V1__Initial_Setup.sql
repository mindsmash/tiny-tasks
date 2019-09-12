CREATE TABLE
IF NOT EXISTS users
(
    id VARCHAR
(36) CONSTRAINT user_id_pkey PRIMARY KEY,
    username VARCHAR
(128) NOT NULL,
    pwd VARCHAR
(128) NOT NULL,
    created TIMESTAMP
WITH TIME ZONE NOT NULL
);

/*INSERT INTO users
    (id, username, pwd, created)
VALUES
    (1, 'user1', '12345678', current_timestamp); */

/*INSERT INTO users
    (id, username, pwd, created)
VALUES
    (2, 'user2', '12345678', current_timestamp); */

CREATE TABLE
IF NOT EXISTS task
(
        id VARCHAR
(36) CONSTRAINT task_id_pkey PRIMARY KEY,
        name VARCHAR
(128) NOT NULL,
        uid VARCHAR
(36) REFERENCES users
(id),
        created TIMESTAMP
WITH TIME ZONE NOT NULL
);