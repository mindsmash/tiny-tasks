CREATE TABLE users (
    id VARCHAR(36) CONSTRAINT user_id_pkey PRIMARY KEY,
    name VARCHAR (128) NOT NULL,
    email VARCHAR (128) NOT NULL UNIQUE,
    password VARCHAR (128) NOT NULL,
    created TIMESTAMP WITH TIME ZONE
);

CREATE TABLE task (
    id VARCHAR(36) CONSTRAINT task_id_pkey PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    name VARCHAR (128) NOT NULL,
    status VARCHAR (11),
    created TIMESTAMP WITH TIME ZONE NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE,
    CONSTRAINT user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users(id, name, email, password) VALUES ('ea8b3e3d-8b0a-4922-8a6a-c88e18fa995b','Default User', 'joseym90@gmail.com', 'encrypted');
