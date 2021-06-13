CREATE TABLE task (
                      id VARCHAR(36) CONSTRAINT task_id_pkey PRIMARY KEY,
                      name VARCHAR (128) NOT NULL,
                      due_date TIMESTAMP WITH TIME ZONE,
                      user_id varchar(36),
                      done boolean,
                      created TIMESTAMP WITH TIME ZONE NOT NULL
);
