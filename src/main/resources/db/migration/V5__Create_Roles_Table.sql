CREATE TABLE roles (
                       id VARCHAR (36) CONSTRAINT roles_id_pkey PRIMARY KEY ,
                       name VARCHAR(255),
                       users VARCHAR (36),
                       created TIMESTAMP WITH TIME ZONE NOT NULL
);
