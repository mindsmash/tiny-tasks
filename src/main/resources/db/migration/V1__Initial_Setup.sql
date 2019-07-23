CREATE TABLE task (
    id VARCHAR(36) CONSTRAINT task_id_pkey PRIMARY KEY,
    name VARCHAR (128) NOT NULL,
    task_date DATE NULL,
    task_time time without time zone null,
    created TIMESTAMP WITH TIME ZONE NOT NULL
);
