CREATE TABLE usr (
                     id VARCHAR (36) CONSTRAINT usr_id_pkey PRIMARY KEY ,
                     username VARCHAR(36) NOT NULL,
                     password VARCHAR(36) NOT NULL,
                     firstname VARCHAR(36) NOT NULL,
                     lastname VARCHAR(36) NOT NULL,
                     email VARCHAR(36) NOT NULL,
                     created TIMESTAMP WITH TIME ZONE NOT NULL,
                     modified  TIMESTAMP WITH TIME ZONE NOT NULL
);
