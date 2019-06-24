CREATE TABLE users (
    id VARCHAR(36) CONSTRAINT user_id_pkey PRIMARY KEY,
    name VARCHAR (128) NOT NULL,
    surname VARCHAR (128) NOT NULL,
    username VARCHAR (128) NOT NULL UNIQUE,
    password VARCHAR (128) NOT NULL,
    created TIMESTAMP WITH TIME ZONE NOT NULL
);


CREATE TABLE task (
    id VARCHAR(36) CONSTRAINT task_id_pkey PRIMARY KEY,
    name VARCHAR (128) NOT NULL,
    status VARCHAR (100) NOT NULL,
    created TIMESTAMP WITH TIME ZONE NOT NULL,
    username VARCHAR (128),
    FOREIGN KEY (username) REFERENCES users(username)

);

CREATE TABLE jobs (
    id VARCHAR(36) CONSTRAINT jobs_id_pkey PRIMARY KEY,
    schedule TIME NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    username VARCHAR (128),
    FOREIGN KEY (username) REFERENCES users(username)
);

CREATE TABLE emails (
    id VARCHAR(36) CONSTRAINT emails_id_pkey PRIMARY KEY,
    email VARCHAR (128),
    username VARCHAR (128),
    FOREIGN KEY (username) REFERENCES users(username)
);


INSERT INTO users VALUES ('coyo123','taulant', 'ymeri', 'admin', 'admin', current_timestamp);
INSERT INTO users VALUES ('coyo124','Jack', 'Smith', 'smitherin', 'itWouldBeNiceToBeEcrypted', current_timestamp);

INSERT INTO task VALUES ('t1','Fork COYO repo', 'DONE', current_timestamp, 'admin');
INSERT INTO task VALUES ('t2','Finish COYO task(s)', 'IN PROGRESS', current_timestamp, 'admin');
INSERT INTO task VALUES ('t3','Create Pull Request', 'TO DO', current_timestamp, 'admin');
INSERT INTO task VALUES ('t4','Win Nobel Price :D', 'IN PROGRESS', current_timestamp, 'admin');
INSERT INTO task VALUES ('t5','Cancel Netflix subscription :(', 'TO DO', current_timestamp, 'admin');
INSERT INTO task VALUES ('t6','Watch Avengers', 'TO DO', current_timestamp, 'admin');
INSERT INTO task VALUES ('t7','Do something valuable with my life', 'TO DO', current_timestamp, 'admin');


INSERT INTO jobs VALUES ('e1',current_time, current_timestamp, 'admin');
INSERT INTO jobs VALUES ('e2',current_time, current_timestamp, 'smitherin');

INSERT INTO emails VALUES ('em1','ymeritaulant@gmail.com', 'admin');
INSERT INTO emails VALUES ('em2','ymeritaulant@gmail.com', 'smitherin');
