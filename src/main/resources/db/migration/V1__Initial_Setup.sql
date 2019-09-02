CREATE TABLE user_task (
    id int CONSTRAINT user_id_pkey PRIMARY KEY,
    name VARCHAR (128) NOT NULL,
    email VARCHAR (128) NOT NULL,
    password VARCHAR(50)NOT NULL);


CREATE TABLE task (
    id VARCHAR(36) CONSTRAINT task_id_pkey PRIMARY KEY,
    name VARCHAR (128) NOT NULL,
    id_user int  NOT NULL, 
    FOREIGN KEY (id_user) REFERENCES user_task (id),
    created TIMESTAMP WITH TIME ZONE NOT NULL
);
 
