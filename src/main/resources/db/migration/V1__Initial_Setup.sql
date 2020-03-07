CREATE TABLE users (id VARCHAR(36) CONSTRAINT user_id_pkey PRIMARY KEY,
                    user_name VARCHAR(36) NOT NULL,
                    password VARCHAR(36) not null,
                    created TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE task (id VARCHAR(36) CONSTRAINT task_id_pkey PRIMARY KEY,
                    name VARCHAR (128) NOT NULL,
                    created TIMESTAMP WITH TIME ZONE NOT NULL,
                    user_id VARCHAR(36),
                    CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES users(id)
);


