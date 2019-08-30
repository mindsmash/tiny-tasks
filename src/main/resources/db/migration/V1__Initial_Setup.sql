CREATE TABLE task (
    id VARCHAR(36) CONSTRAINT task_id_pkey PRIMARY KEY,
    assignedTo VARCHAR(36),
    name VARCHAR (128) NOT NULL,
    status VARCHAR (11),
    created TIMESTAMP WITH TIME ZONE NOT NULL,
    dueDate TIMESTAMP WITH TIME ZONE
);

CREATE TABLE user (
    id VARCHAR(36) CONSTRAINT user_id_pkey PRIMARY KEY,
    name VARCHAR (128) NOT NULL,
    email VARCHAR (128) NOT NULL ,
    password VARCHAR (128) NOT NULL ,
    created TIMESTAMP WITH TIME ZONE NOT NULL
);

INSERT INTO user(name, email, password) VALUES ("Default User", "joseym90@gmail.com", "encripted");
